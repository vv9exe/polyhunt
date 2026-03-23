import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name, tagline, description, pricePerDay, tags,
            dockerImageUrl, githubUrl, webhookUrl, hookToken, ownerWallet,
        } = body;

        if (!name || !ownerWallet || pricePerDay === undefined) {
            return NextResponse.json(
                { error: "Missing required fields (name, ownerWallet, pricePerDay)" },
                { status: 400 }
            );
        }

        // 1. Find or Create User (Upsert based on Solana wallet)
        const user = await db.user.upsert({
            where:  { wallet: ownerWallet },
            update: {},
            create: { wallet: ownerWallet },
        });

        // 2. Create the Agent linked to this User
        const agent = await db.agent.create({
            data: {
                name,
                tagline:       tagline       || "A PolyHunt Agent",
                description:   description   || "",
                pricePerDay:   Number(pricePerDay),
                tags:          tags          || [],
                dockerImageUrl: dockerImageUrl || null,
                githubUrl:     githubUrl     || null,
                webhookUrl:    webhookUrl    || null,
                hookToken:     hookToken     || null,
                ownerWallet,
                ownerId:       user.id,
            },
        });

        return NextResponse.json({ success: true, agent });
    } catch (error: any) {
        console.error("Error creating agent:", error);
        return NextResponse.json(
            { error: "Failed to create agent", details: error.message },
            { status: 500 }
        );
    }
}
