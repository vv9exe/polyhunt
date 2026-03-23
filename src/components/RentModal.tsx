"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { X, Copy, Check, ArrowRight, Loader2, ExternalLink } from "lucide-react";
import type { Agent } from "@prisma/client";

interface RentModalProps {
    agent: Agent;
    onClose: () => void;
}

type Step = "configure" | "pay" | "verify" | "done";

const MASTER_WALLET = process.env.NEXT_PUBLIC_MASTER_WALLET || "Configure POLYHUNT_MASTER_PUBKEY in .env";

export function RentModal({ agent, onClose }: RentModalProps) {
    const { publicKey } = useWallet();
    const [step, setStep] = useState<Step>("configure");
    const [days, setDays] = useState(7);
    const [rentalId, setRentalId] = useState("");
    const [txSig, setTxSig] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);
    const [result, setResult] = useState<any>(null);

    const totalCost = agent.pricePerDay * days;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Step 1: Create pending rental
    const handleInitiate = async () => {
        if (!publicKey) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/rent/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    agentId: agent.id,
                    renterWallet: publicKey.toBase58(),
                    days,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setRentalId(data.rentalId);
            setStep("pay");
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Verify the deposit
    const handleVerify = async () => {
        if (!txSig || !publicKey) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/rent/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rentalId,
                    txSignature: txSig.trim(),
                    renterWallet: publicKey.toBase58(),
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setResult(data);
            setStep("done");
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "24px"
        }}>
            <div style={{
                background: "#FFFFFF", borderRadius: "16px", padding: "32px",
                width: "100%", maxWidth: "480px", position: "relative",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)"
            }}>
                {/* Close */}
                <button onClick={onClose} style={{
                    position: "absolute", top: "16px", right: "16px",
                    background: "none", border: "none", cursor: "pointer", padding: "4px"
                }}>
                    <X size={20} color="#9CA3AF" />
                </button>

                {/* Step: Configure */}
                {step === "configure" && (
                    <>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 4px 0", color: "#111827" }}>
                            Rent {agent.name}
                        </h2>
                        <p style={{ color: "#6B7280", fontSize: "0.9rem", margin: "0 0 28px 0" }}>
                            {agent.tagline}
                        </p>

                        <div style={{ marginBottom: "20px" }}>
                            <label style={{ fontWeight: 600, color: "#374151", fontSize: "0.9rem", display: "block", marginBottom: "8px" }}>
                                Rental Duration
                            </label>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {[1, 3, 7, 14, 30].map(d => (
                                    <button key={d} onClick={() => setDays(d)} style={{
                                        flex: 1, padding: "8px 4px", borderRadius: "8px",
                                        border: "1px solid", cursor: "pointer",
                                        fontSize: "0.85rem", fontWeight: 500,
                                        backgroundColor: days === d ? "#3358FF" : "transparent",
                                        borderColor: days === d ? "#3358FF" : "#E5E7EB",
                                        color: days === d ? "#FFF" : "#6B7280",
                                    }}>
                                        {d}d
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ background: "#F8FAFF", border: "1px solid #E0E7FF", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ color: "#6B7280", fontSize: "0.9rem" }}>Daily Rate</span>
                                <span style={{ fontWeight: 600, color: "#111827" }}>{agent.pricePerDay} USDC</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ color: "#6B7280", fontSize: "0.9rem" }}>Duration</span>
                                <span style={{ fontWeight: 600, color: "#111827" }}>{days} days</span>
                            </div>
                            <div style={{ borderTop: "1px solid #E0E7FF", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontWeight: 700, color: "#111827" }}>Total</span>
                                <span style={{ fontWeight: 700, color: "#3358FF", fontSize: "1.1rem" }}>{totalCost} USDC</span>
                            </div>
                        </div>

                        {!publicKey && (
                            <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "12px" }}>
                                ⚠ Connect your Solana wallet first.
                            </p>
                        )}
                        {error && <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p>}

                        <button onClick={handleInitiate} disabled={!publicKey || loading} style={{
                            width: "100%", padding: "12px", borderRadius: "8px",
                            background: "#3358FF", color: "#FFF", border: "none",
                            fontSize: "1rem", fontWeight: 600, cursor: publicKey ? "pointer" : "not-allowed",
                            opacity: publicKey ? 1 : 0.5,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                        }}>
                            {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : null}
                            Continue — {totalCost} USDC <ArrowRight size={16} />
                        </button>
                    </>
                )}

                {/* Step: Pay */}
                {step === "pay" && (
                    <>
                        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px 0", color: "#111827" }}>
                            Send USDC Payment
                        </h2>
                        <p style={{ color: "#6B7280", fontSize: "0.9rem", margin: "0 0 24px 0" }}>
                            Open Phantom and send exactly <strong>{totalCost} USDC</strong> to the address below.
                        </p>

                        {/* Escrow wallet */}
                        <div style={{ background: "#F3F4F6", borderRadius: "10px", padding: "14px", marginBottom: "8px" }}>
                            <div style={{ fontSize: "0.75rem", color: "#9CA3AF", marginBottom: "6px", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.06em" }}>
                                PolyHunt Escrow Wallet
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                                <code style={{ fontSize: "0.8rem", color: "#111827", wordBreak: "break-all", flex: 1 }}>
                                    {MASTER_WALLET}
                                </code>
                                <button onClick={() => copyToClipboard(MASTER_WALLET)} style={{
                                    background: "none", border: "none", cursor: "pointer", flexShrink: 0
                                }}>
                                    {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} color="#6B7280" />}
                                </button>
                            </div>
                        </div>

                        <div style={{ background: "#EEF2FF", borderRadius: "8px", padding: "10px 14px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ color: "#3358FF", fontWeight: 600, fontSize: "0.9rem" }}>Exact amount to send:</span>
                            <span style={{ color: "#3358FF", fontWeight: 700, fontSize: "1.1rem" }}>{totalCost} USDC</span>
                        </div>

                        <p style={{ color: "#374151", fontSize: "0.9rem", fontWeight: 500, marginBottom: "8px" }}>
                            After sending, paste your transaction signature:
                        </p>
                        <input
                            type="text"
                            placeholder="e.g. 5xKj3...abc (from Phantom history)"
                            value={txSig}
                            onChange={e => setTxSig(e.target.value)}
                            style={{
                                width: "100%", padding: "10px 12px", borderRadius: "8px",
                                border: "1px solid #D1D5DB", fontSize: "0.85rem",
                                color: "#111827", marginBottom: "8px", boxSizing: "border-box"
                            }}
                        />
                        <p style={{ color: "#9CA3AF", fontSize: "0.75rem", margin: "0 0 16px 0" }}>
                            In Phantom: click the transaction → click "View on Solana Explorer" → copy the signature from the URL.
                        </p>

                        {error && <p style={{ color: "#DC2626", fontSize: "0.85rem", marginBottom: "12px" }}>{error}</p>}

                        <button onClick={handleVerify} disabled={!txSig || loading} style={{
                            width: "100%", padding: "12px", borderRadius: "8px",
                            background: "#3358FF", color: "#FFF", border: "none",
                            fontSize: "1rem", fontWeight: 600, cursor: txSig ? "pointer" : "not-allowed",
                            opacity: txSig ? 1 : 0.5,
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                        }}>
                            {loading ? <Loader2 size={16} /> : null}
                            Verify & Activate Agent
                        </button>
                    </>
                )}

                {/* Step: Done */}
                {step === "done" && (
                    <>
                        <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
                            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🎉</div>
                            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 6px 0", color: "#111827" }}>
                                Agent is Live!
                            </h2>
                            <p style={{ color: "#6B7280", margin: "0 0 20px 0", fontSize: "0.9rem" }}>
                                <strong>{agent.name}</strong> is now trading on Polymarket.
                            </p>
                        </div>

                        {/* Rental Code — most important thing */}
                        <div style={{ background: "#F8FAFF", border: "2px solid #3358FF", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                            <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#3358FF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                                🔑 Your Rental Code — Save This!
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <code style={{ fontSize: "1.3rem", fontWeight: 800, color: "#3358FF", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.05em" }}>
                                    {result?.rentalCode || "RC-loading"}
                                </code>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(result?.rentalCode || "");
                                    setCodeCopied(true);
                                    setTimeout(() => setCodeCopied(false), 2000);
                                }} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
                                    {codeCopied ? <Check size={18} color="#0A7C4E" /> : <Copy size={18} color="#3358FF" />}
                                </button>
                            </div>
                            <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "8px 0 0 0" }}>
                                Use this code in your Dashboard and the PolyHunt API to manage your agent.
                            </p>
                        </div>

                        {/* Expiry */}
                        <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "10px", padding: "12px", marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                <span style={{ color: "#6B7280", fontSize: "0.85rem" }}>Expires</span>
                                <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#111827" }}>
                                    {result?.expiresAt ? new Date(result.expiresAt).toLocaleDateString() : "—"}
                                </span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#6B7280", fontSize: "0.85rem" }}>Status</span>
                                <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "#16A34A" }}>✓ Running</span>
                            </div>
                        </div>

                        <a href="/dashboard" style={{ textDecoration: "none" }}>
                            <button style={{
                                width: "100%", padding: "12px", borderRadius: "8px",
                                background: "#3358FF", color: "#FFF", border: "none",
                                fontSize: "1rem", fontWeight: 600, cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                            }}>
                                Go to Dashboard <ExternalLink size={16} />
                            </button>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
