import { NextResponse } from "next/server";
import db from "@/lib/db";
import { verifyUSDCDeposit } from "@/lib/solana";
import { randomBytes } from "crypto";

/** Generates a unique rental code like RC-a1b2c3d4 */
function generateRentalCode(): string {
    return "RC-" + randomBytes(4).toString("hex");
}

/**
 * POST /api/rent/verify
 * User provides the Solana tx signature after sending USDC.
 * We verify on-chain, then activate the rental and issue a Rental Code.
 * Body: { rentalId, txSignature, renterWallet }
 */
export async function POST(req: Request) {
    try {
        const { rentalId, txSignature, renterWallet } = await req.json();

        if (!rentalId || !txSignature || !renterWallet) {
            return NextResponse.json(
                { error: "rentalId, txSignature, and renterWallet are required." },
                { status: 400 }
            );
        }

        const rental = await db.rental.findUnique({
            where:   { id: rentalId },
            include: { agent: true },
        });

        if (!rental) {
            return NextResponse.json({ error: "Rental not found." }, { status: 404 });
        }
        if (rental.paymentStatus === "confirmed") {
            return NextResponse.json({ error: "Rental already confirmed." }, { status: 400 });
        }

        // Verify the on-chain transaction
        const result = await verifyUSDCDeposit(txSignature, renterWallet, rental.totalAmount);

        if (!result.valid) {
            return NextResponse.json(
                { error: result.error || "USDC deposit could not be verified." },
                { status: 400 }
            );
        }

        // Calculate fee split: 2% to PolyHunt, 98% to agent owner
        const platformFee = rental.totalAmount * 0.02;
        const ownerAmount = rental.totalAmount * 0.98;

        // Generate a unique rental code for dashboard access (e.g. RC-a1b2c3d4)
        const rentalCode = generateRentalCode();

        // Mark rental as confirmed and active
        const updated = await db.rental.update({
            where: { id: rentalId },
            data: {
                paymentStatus:   "confirmed",
                depositTxSig:    txSignature,
                startedAt:       new Date(),
                containerStatus: "running",
                platformFee,
                ownerAmount,
                rentalCode,
            },
        });

        return NextResponse.json({
            success:       true,
            rentalId:      updated.id,
            rentalCode,
            paymentStatus: "confirmed",
            ownerAmount,
            platformFee,
            expiresAt:     rental.expiresAt,
            agentName:     rental.agent.name,
            message:       "Payment verified. Your agent is now running on Polymarket!",
        });
    } catch (err: any) {
        console.error("rent/verify error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
