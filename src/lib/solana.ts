import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
    getAssociatedTokenAddress,
    createTransferInstruction,
    TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import bs58 from "bs58";

// USDC mint addresses
const USDC_MINT_MAINNET = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const USDC_MINT_DEVNET  = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

const IS_MAINNET = process.env.SOLANA_NETWORK === "mainnet";
export const USDC_MINT = IS_MAINNET ? USDC_MINT_MAINNET : USDC_MINT_DEVNET;
export const RPC_URL   = IS_MAINNET
    ? (process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com")
    : "https://api.devnet.solana.com";

export const PLATFORM_FEE_BPS = 1000; // 10% platform fee (1000 basis points)

export function getConnection(): Connection {
    return new Connection(RPC_URL, "confirmed");
}

/**
 * Load the master (escrow) keypair from the Base58 private key stored in env.
 * This is the format Phantom exports when you click "Export Private Key".
 */
export function getMasterKeypair(): Keypair {
    const privKey = process.env.POLYHUNT_MASTER_PRIVATE_KEY;
    if (!privKey) throw new Error("POLYHUNT_MASTER_PRIVATE_KEY not set in env.");
    const bytes = bs58.decode(privKey);
    return Keypair.fromSecretKey(bytes);
}

export function usdcToUnits(amount: number): bigint {
    return BigInt(Math.round(amount * 1_000_000));
}

/**
 * Send USDC from one wallet to another using SPL token transfer.
 */
export async function sendUSDC(
    from: Keypair,
    toWallet: string,
    amount: number
): Promise<string> {
    const connection = getConnection();
    const toPubkey = new PublicKey(toWallet);

    const fromATA = await getAssociatedTokenAddress(USDC_MINT, from.publicKey);
    const toATA   = await getAssociatedTokenAddress(USDC_MINT, toPubkey);

    const ix = createTransferInstruction(
        fromATA,
        toATA,
        from.publicKey,
        usdcToUnits(amount),
        [],
        TOKEN_PROGRAM_ID
    );

    const tx = new Transaction().add(ix);
    const sig = await sendAndConfirmTransaction(connection, tx, [from]);
    return sig;
}

/**
 * Verify that a USDC deposit was made to the master wallet on-chain.
 * Returns whether the deposit is valid and the amount received.
 */
export async function verifyUSDCDeposit(
    txSignature: string,
    expectedSender: string,
    expectedAmount: number
): Promise<{ valid: boolean; amount: number; error?: string }> {
    try {
        const connection = getConnection();
        const tx = await connection.getParsedTransaction(txSignature, {
            maxSupportedTransactionVersion: 0,
        });

        if (!tx || tx.meta?.err) {
            return { valid: false, amount: 0, error: "Transaction not found or failed." };
        }

        const masterPubkey = getMasterKeypair().publicKey.toBase58();

        const preBalances  = tx.meta?.preTokenBalances  || [];
        const postBalances = tx.meta?.postTokenBalances || [];

        let masterIncrease = 0;
        for (const post of postBalances) {
            if (post.owner === masterPubkey && post.mint === USDC_MINT.toBase58()) {
                const pre = preBalances.find(b => b.accountIndex === post.accountIndex);
                const preAmt  = pre  ? Number(pre.uiTokenAmount.uiAmount  || 0) : 0;
                const postAmt = Number(post.uiTokenAmount.uiAmount || 0);
                masterIncrease += postAmt - preAmt;
            }
        }

        // Allow 1% tolerance for rounding
        const tolerance = expectedAmount * 0.01;
        if (masterIncrease < expectedAmount - tolerance) {
            return {
                valid: false,
                amount: masterIncrease,
                error: `Expected ${expectedAmount} USDC but only ${masterIncrease.toFixed(2)} received.`,
            };
        }

        return { valid: true, amount: masterIncrease };
    } catch (err: any) {
        return { valid: false, amount: 0, error: err.message };
    }
}
