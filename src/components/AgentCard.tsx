"use client";

import { useState } from "react";
import { ArrowUp, Play } from "lucide-react";
import type { Agent } from "@prisma/client";
import { RentModal } from "@/components/RentModal";

interface AgentCardProps {
    agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
    const [upvotes, setUpvotes] = useState(agent.upvotes);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleUpvote = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasUpvoted) {
            // Optimistic local undo (no DB undo endpoint needed for MVP)
            setUpvotes((prev) => prev - 1);
            setHasUpvoted(false);
            return;
        }
        // Optimistic update
        setUpvotes((prev) => prev + 1);
        setHasUpvoted(true);
        try {
            await fetch(`/api/agents/${agent.id}/upvote`, { method: "POST" });
        } catch {
            // Revert on error
            setUpvotes((prev) => prev - 1);
            setHasUpvoted(false);
        }
    };

    const handleRent = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (agent.id.startsWith("example-")) {
            alert("This is an example agent. Real deployments are disabled for this demo.");
            return;
        }
        setShowModal(true);
    };

    return (
        <>
        <div className="agent-card" style={{ 
            display: "flex", 
            padding: "24px", 
            gap: "24px", 
            background: "#FFFFFF", 
            border: "1px solid #E8E8E8",
            borderRadius: "12px",
            alignItems: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
            transition: "box-shadow 0.2s"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)"; }}
        >
            {/* Logo */}
            <div
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #F9FAFB 0%, #E8E8E8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid #E5E7EB",
                }}
            >
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#3358FF", fontFamily: "Outfit, sans-serif" }}>
                    {agent.name.charAt(0).toUpperCase()}
                </span>
            </div>

            {/* Content */}
            <div className="agent-card-content" style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "#1A1A1A" }}>
                        {agent.name}
                    </h3>
                    {agent.id.startsWith("example-") && (
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "#F1F5F9", color: "#64748B", padding: "2px 6px", borderRadius: "4px", border: "1px solid #E2E8F0" }}>EXAMPLE</span>
                    )}
                    {agent.status === "live" ? (
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0A7C4E", background: "rgba(10,124,78,0.1)", padding: "2px 8px", borderRadius: "12px", textTransform: "uppercase" }}>Live</span>
                    ) : (
                        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#DA552F", background: "rgba(218,85,47,0.1)", padding: "2px 8px", borderRadius: "12px", textTransform: "uppercase" }}>Beta</span>
                    )}
                </div>

                <p style={{ margin: 0, fontSize: "1rem", color: "#6B6B6B", lineHeight: 1.5, fontWeight: 400 }}>
                    {agent.tagline}
                </p>

                <div style={{ display: "flex", gap: "8px", marginTop: "4px", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.85rem", color: "#3358FF", fontWeight: 600, background: "rgba(51,88,255,0.08)", padding: "4px 10px", borderRadius: "6px" }}>
                        {agent.pricePerDay} USDC/day
                    </span>
                    <span style={{ color: "#D1D5DB" }}>•</span>
                    {agent.tags.slice(0, 3).map((tag) => (
                        <span key={tag} style={{ fontSize: "0.85rem", color: "#6B6B6B", background: "#F6F8FA", padding: "4px 10px", borderRadius: "6px", border: "1px solid #E8E8E8" }}>
                            {tag}
                        </span>
                    ))}
                    {agent.roi > 0 && (
                        <>
                            <span style={{ color: "#D1D5DB" }}>•</span>
                            <span style={{ fontSize: "0.85rem", color: "#0A7C4E", fontWeight: 600 }}>
                                +{agent.roi}% ROI
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Actions: Upvote & Install */}
            <div className="agent-card-actions" style={{ display: "flex", alignItems: "center", gap: "24px", flexShrink: 0, marginLeft: "16px" }}>
                
                {/* Upvote Column */}
                <button
                    onClick={handleUpvote}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        border: `1px solid ${hasUpvoted ? "#3358FF" : "#E8E8E8"}`,
                        background: hasUpvoted ? "rgba(51,88,255,0.05)" : "#FFFFFF",
                        color: hasUpvoted ? "#3358FF" : "#1A1A1A",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                        if (!hasUpvoted) e.currentTarget.style.borderColor = "#9CA3AF";
                    }}
                    onMouseLeave={(e) => {
                        if (!hasUpvoted) e.currentTarget.style.borderColor = "#E8E8E8";
                    }}
                >
                    <ArrowUp size={20} strokeWidth={hasUpvoted ? 3 : 2} color={hasUpvoted ? "#3358FF" : "#1A1A1A"} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, marginTop: "4px", color: hasUpvoted ? "#3358FF" : "#1A1A1A" }}>
                        {upvotes}
                    </span>
                </button>

                {/* Install & Run */}
                <button
                    onClick={handleRent}
                    style={{
                        background: "#3358FF",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        padding: "12px 24px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        boxShadow: "0 2px 8px rgba(51,88,255,0.2)"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2244DD"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#3358FF"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                    <Play size={16} fill="currentColor" />
                    Install & Run
                </button>
            </div>
        </div>
        {showModal && <RentModal agent={agent} onClose={() => setShowModal(false)} />}
        </>
    );
}
