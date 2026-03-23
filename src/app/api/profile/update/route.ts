import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { wallet, signature, message, username, bio, avatarUrl, email, github, twitter, discord, telegram, website } = body;

        if (!wallet || !signature || !message) {
            return NextResponse.json({ error: "Missing authentication parameters" }, { status: 400 });
        }

        // Verify the signature
        const messageBytes = new TextEncoder().encode(message);
        const signatureBytes = bs58.decode(signature);
        const publicKeyBytes = new PublicKey(wallet).toBytes();

        const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);
        
        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const timestampMatch = message.match(/Timestamp: (\d+)/);
        if (timestampMatch) {
            const timestamp = parseInt(timestampMatch[1]);
            if (Date.now() - timestamp > 1000 * 60 * 5) {
                return NextResponse.json({ error: "Signature expired" }, { status: 401 });
            }
        }

        const user = await prisma.user.upsert({
            where: { wallet },
            update: {
                username: username || null,
                bio: bio || null,
                avatarUrl: avatarUrl || null,
                email: email || null,
                github: github || null,
                twitter: twitter || null,
                discord: discord || null,
                telegram: telegram || null,
                website: website || null,
            },
            create: {
                wallet,
                username: username || null,
                bio: bio || null,
                avatarUrl: avatarUrl || null,
                email: email || null,
                github: github || null,
                twitter: twitter || null,
                discord: discord || null,
                telegram: telegram || null,
                website: website || null,
            }
        });

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        console.error("Profile update error:", error);
        if (error.code === "P2002" && error.meta?.target.includes("username")) {
            return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
