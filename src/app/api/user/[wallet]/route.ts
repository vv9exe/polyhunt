import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ wallet: string }> }
) {
    try {
        const resolvedParams = await params;
        const user = await prisma.user.findUnique({
            where: { wallet: resolvedParams.wallet },
            include: {
                agents: { orderBy: { upvotes: 'desc' } }, // Built agents
                hunted: { 
                    orderBy: { upvotes: 'desc' },
                    include: { owner: true } // Include owner info for cards
                }  // Hunted agents
            }
        });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({ user });
    } catch (error: any) {
        console.error("Fetch profile error:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}
