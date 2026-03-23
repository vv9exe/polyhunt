"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Terminal, Activity, Server, Database, Copy, Check, ExternalLink, RefreshCw } from "lucide-react";

interface Rental {
    id: string;
    rentalCode: string;
    totalAmount: number;
    paymentStatus: string;
    containerStatus: string;
    startedAt: string | null;
    expiresAt: string;
    agent: {
        id: string;
        name: string;
        tagline: string;
        dockerImageUrl: string | null;
        webhookUrl: string | null;
    };
}

function RentalCard({ rental }: { rental: Rental }) {
    const [copied, setCopied] = useState(false);
    const isRunning = rental.containerStatus === "running";
    const isExpired = new Date(rental.expiresAt) < new Date();

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusColor = isExpired ? "#9CA3AF" : isRunning ? "#0A7C4E" : "#DA552F";
    const statusLabel = isExpired ? "Expired" : isRunning ? "Running" : "Pending";

    return (
        <div style={{
            background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: "12px",
            padding: "20px", display: "flex", flexDirection: "column", gap: "16px"
        }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 4px 0" }}>
                        {rental.agent.name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: 0 }}>{rental.agent.tagline}</p>
                </div>
                <span style={{
                    fontSize: "0.75rem", fontWeight: 700, color: statusColor,
                    background: `${statusColor}15`, padding: "3px 10px",
                    borderRadius: "12px", textTransform: "uppercase"
                }}>
                    ● {statusLabel}
                </span>
            </div>

            {/* Rental Code */}
            <div style={{ background: "#F8FAFF", border: "1px solid #E0E7FF", borderRadius: "8px", padding: "12px" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                    Your Rental Code
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <code style={{ fontSize: "1rem", fontWeight: 700, color: "#3358FF", fontFamily: "JetBrains Mono, monospace" }}>
                        {rental.rentalCode}
                    </code>
                    <button onClick={() => copy(rental.rentalCode)} style={{
                        background: "none", border: "none", cursor: "pointer", padding: "4px"
                    }}>
                        {copied ? <Check size={16} color="#0A7C4E" /> : <Copy size={16} color="#6B7280" />}
                    </button>
                </div>
                <p style={{ fontSize: "0.72rem", color: "#9CA3AF", margin: "6px 0 0 0" }}>
                    Use this code to authenticate via the PolyHunt API
                </p>
            </div>

            {/* Details row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div style={{ textAlign: "center", background: "#F8F8F8", borderRadius: "6px", padding: "10px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: "2px" }}>Paid</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1A1A1A" }}>{rental.totalAmount} USDC</div>
                </div>
                <div style={{ textAlign: "center", background: "#F8F8F8", borderRadius: "6px", padding: "10px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: "2px" }}>Started</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1A1A1A" }}>
                        {rental.startedAt ? new Date(rental.startedAt).toLocaleDateString() : "—"}
                    </div>
                </div>
                <div style={{ textAlign: "center", background: "#F8F8F8", borderRadius: "6px", padding: "10px" }}>
                    <div style={{ fontSize: "0.7rem", color: "#9CA3AF", marginBottom: "2px" }}>Expires</div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: isExpired ? "#DC2626" : "#1A1A1A" }}>
                        {new Date(rental.expiresAt).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* API access link */}
            <div style={{ display: "flex", gap: "8px" }}>
                <a href="/marketplace" style={{ textDecoration: "none", flex: 1 }}>
                    <button style={{
                        width: "100%", padding: "8px", background: "#3358FF", color: "#FFF",
                        border: "none", borderRadius: "6px", fontSize: "0.8rem",
                        fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
                    }}>
                        <ExternalLink size={14} /> View on Polymarket
                    </button>
                </a>
                <a href="/docs" style={{ textDecoration: "none", flex: 1 }}>
                    <button style={{
                        width: "100%", padding: "8px", background: "#FFFFFF", color: "#1A1A1A",
                        border: "1px solid #E8E8E8", borderRadius: "6px", fontSize: "0.8rem",
                        fontWeight: 600, cursor: "pointer"
                    }}>
                        API Docs
                    </button>
                </a>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { connected, publicKey } = useWallet();
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!connected || !publicKey) return;
        setLoading(true);
        fetch(`/api/rentals/my?wallet=${publicKey.toBase58()}`)
            .then(r => r.json())
            .then(data => setRentals(Array.isArray(data) ? data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [connected, publicKey]);

    if (!connected) {
        return (
            <div style={{ background: "#F6F8FA", minHeight: "calc(100vh - 56px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                    background: "#FFF", border: "1px solid #E8E8E8", borderRadius: "12px",
                    padding: "48px", maxWidth: "440px", width: "100%", textAlign: "center",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)"
                }}>
                    <div style={{
                        width: "48px", height: "48px", background: "rgba(51,88,255,0.08)",
                        borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 24px"
                    }}>
                        <Server size={24} color="#3358FF" />
                    </div>
                    <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px", fontFamily: "Inter, sans-serif" }}>
                        Connect Your Wallet
                    </h1>
                    <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "32px", lineHeight: 1.6 }}>
                        Connect your Solana wallet to view your active Polymarket agents, rental codes, and deployment status.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <WalletMultiButton style={{
                            backgroundColor: "#1A1A1A", borderRadius: "8px",
                            fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: 600,
                        }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: "#F6F8FA", minHeight: "calc(100vh - 56px)" }}>
            {/* Header */}
            <div style={{ background: "#FFF", borderBottom: "1px solid #E8E8E8" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                                <Activity size={14} color="#0A7C4E" />
                                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0A7C4E" }}>Connected</span>
                            </div>
                            <h1 style={{ fontSize: "1.7rem", fontWeight: 700, color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em" }}>
                                My Dashboard
                            </h1>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <p style={{ fontSize: "0.7rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px", fontWeight: 600 }}>Wallet</p>
                            <p style={{ fontSize: "0.85rem", color: "#1A1A1A", fontFamily: "JetBrains Mono, monospace", margin: 0 }}>
                                {publicKey?.toBase58().slice(0, 6)}...{publicKey?.toBase58().slice(-4)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>

                {/* Active Rentals */}
                <div style={{ marginBottom: "32px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1A1A", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                            <Terminal size={16} color="#6B7280" /> Active Agents
                            <span style={{ fontSize: "0.75rem", background: "#F0F0F0", color: "#6B7280", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                                {loading ? "..." : rentals.length}
                            </span>
                        </h2>
                        <button onClick={() => {
                            if (!publicKey) return;
                            setLoading(true);
                            fetch(`/api/rentals/my?wallet=${publicKey.toBase58()}`)
                                .then(r => r.json()).then(d => setRentals(Array.isArray(d) ? d : []))
                                .finally(() => setLoading(false));
                        }} style={{
                            background: "none", border: "1px solid #E8E8E8", borderRadius: "6px",
                            padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                            fontSize: "0.8rem", color: "#6B7280"
                        }}>
                            <RefreshCw size={13} /> Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "48px", color: "#9CA3AF" }}>Loading your agents...</div>
                    ) : rentals.length === 0 ? (
                        <div style={{
                            background: "#FFF", border: "1px solid #E8E8E8", borderRadius: "12px",
                            padding: "56px 32px", textAlign: "center"
                        }}>
                            <Database size={32} color="#D1D5DB" style={{ margin: "0 auto 16px", display: "block" }} />
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "8px" }}>
                                No active agents
                            </h3>
                            <p style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: "24px", maxWidth: "360px", margin: "0 auto 24px" }}>
                                Install an agent from the marketplace to start trading on Polymarket automatically.
                            </p>
                            <a href="/marketplace" style={{ textDecoration: "none" }}>
                                <button style={{
                                    background: "#3358FF", color: "#FFF", border: "none",
                                    padding: "10px 24px", borderRadius: "6px", fontSize: "0.9rem",
                                    fontWeight: 600, cursor: "pointer"
                                }}>
                                    Browse Marketplace
                                </button>
                            </a>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
                            {rentals.map(rental => (
                                <RentalCard key={rental.id} rental={rental} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Protocol info strip */}
                <div style={{ background: "#FFF", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", textAlign: "center" }}>
                        <div>
                            <div style={{ fontSize: "0.72rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Escrow</div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A1A1A" }}>USDC on Solana</div>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.72rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Platform Fee</div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A1A1A" }}>2% per rental</div>
                        </div>
                        <div>
                            <div style={{ fontSize: "0.72rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>Owner Payout</div>
                            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0A7C4E" }}>98% in USDC</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
