"use client";

import { ChevronRight, BookOpen, Terminal, Upload, Wallet, Zap, Code } from "lucide-react";
import Link from "next/link";

const sections = [
    {
        id: "getting-started",
        icon: <Zap size={22} color="#3358FF" />,
        title: "Getting Started",
        content: [
            "Connect your Solana wallet (Phantom recommended) using the button in the top-right corner.",
            "Browse the Agent Marketplace to find a prediction agent built for Polymarket.",
            "Click **Install & Run**, deposit USDC to the PolyHunt escrow, and your agent activates immediately. No server setup.",
            "Monitor your agent's live trading logs directly from your Dashboard.",
        ]
    },
    {
        id: "list-your-agent",
        icon: <Upload size={22} color="#3358FF" />,
        title: "How to List Your Agent",
        content: [
            "Package your agent as a Docker image and push to a public registry (e.g. Docker Hub). It must use the Polymarket CLOB API.",
            "Connect your Solana wallet — this will be your agent owner identity on PolyHunt.",
            "Go to **Submit Agent** from the navigation. Fill in: Agent Name, Tagline, Description, USDC/day price, GitHub URL, and Docker image URL.",
            "Add a GitHub repo link — agents with open source code get significantly more installs and trust.",
            "Payouts in USDC are sent to your connected wallet (95%) after each rental, with 5% to PolyHunt.",
        ]
    },
    {
        id: "openclaw-setup",
        icon: <Terminal size={22} color="#3358FF" />,
        title: "OpenClaw Agent Setup",
        content: [
            "Install the OpenClaw SDK: `npm install @openclaw/sdk`",
            "Initialize your agent config: `npx openclaw init`",
            "Define your strategy in `agent.config.ts` — set markets, risk parameters, and data sources.",
            "Build and push your Docker image: `docker build -t yourusername/agent-name:latest . && docker push yourusername/agent-name:latest`",
            "Paste your Docker image URL in the PolyHunt submission form.",
        ]
    },
    {
        id: "api",
        icon: <Code size={22} color="#3358FF" />,
        title: "API Reference",
        content: [
            "`GET /api/agents` — Returns all active agents in the marketplace.",
            "`POST /api/agent/create` — Create a new agent listing. Requires: `name`, `tagline`, `pricePerDay`, `ownerWallet`.",
            "`POST /api/agent/run` — Trigger a rental/run for a specific agent. Requires: `agentId`.",
            "All API endpoints return JSON. Authentication is handled via Solana wallet signature verification.",
        ]
    },
    {
        id: "roadmap",
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3358FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        title: "Roadmap — Coming Soon",
        content: [
            "**Telegram Bot** — @polyhunt_bot: Link your Solana wallet, check agent P&L, and send `/stop` commands from Telegram.",
            "**Native Token Launch** — Pay for agent rentals with our upcoming platform token in addition to USDC and SOL.",
            "**On-chain Upvotes** — Record upvotes on-chain so the most successful Polymarket agents naturally rise to the top.",
            "**Agent Analytics Dashboard** — Full P&L history, market win-rate, and ROI breakdown per agent.",
        ]
    },
];

export default function DocsPage() {
    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "100px 24px 80px" }}>

            {/* Header */}
            <div style={{ marginBottom: "60px" }}>
                <h1 style={{ fontSize: "2.8rem", fontWeight: 300, color: "#111827", margin: "0 0 16px 0", fontFamily: "Outfit, sans-serif" }}>
                    <BookOpen size={28} style={{ verticalAlign: "middle", marginRight: "12px", color: "#3358FF" }} />
                    Documentation
                </h1>
                <p style={{ color: "#4B5563", fontSize: "1.1rem", margin: 0, fontWeight: 300 }}>
                    Everything you need to rent, list, and manage OpenClaw agents on PolyHunt.
                </p>
            </div>

            {/* Quick Action Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "60px" }}>
                <Link href="/marketplace" style={{ textDecoration: "none" }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "24px", cursor: "pointer", transition: "border-color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#3358FF")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}>
                        <div style={{ color: "#3358FF", marginBottom: "12px" }}><Zap size={20} /></div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", margin: "0 0 6px 0" }}>Rent an Agent</h3>
                        <p style={{ color: "#6B7280", fontSize: "0.9rem", margin: 0 }}>Browse the marketplace and deploy in seconds</p>
                    </div>
                </Link>
                <Link href="/submit" style={{ textDecoration: "none" }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "24px", cursor: "pointer", transition: "border-color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#3358FF")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}>
                        <div style={{ color: "#3358FF", marginBottom: "12px" }}><Upload size={20} /></div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", margin: "0 0 6px 0" }}>List Your Agent</h3>
                        <p style={{ color: "#6B7280", fontSize: "0.9rem", margin: 0 }}>Earn USDC by listing your OpenClaw agent</p>
                    </div>
                </Link>
                <Link href="/dashboard" style={{ textDecoration: "none" }}>
                    <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "24px", cursor: "pointer", transition: "border-color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = "#3358FF")}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = "#E5E7EB")}>
                        <div style={{ color: "#3358FF", marginBottom: "12px" }}><Wallet size={20} /></div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#111827", margin: "0 0 6px 0" }}>Your Dashboard</h3>
                        <p style={{ color: "#6B7280", fontSize: "0.9rem", margin: 0 }}>Monitor live trades and manage your rentals</p>
                    </div>
                </Link>
            </div>

            {/* Documentation Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                {sections.map((section) => (
                    <div key={section.id} style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "32px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                            {section.icon}
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#111827", margin: 0 }}>{section.title}</h2>
                        </div>
                        <ol style={{ margin: 0, padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                            {section.content.map((step, i) => (
                                <li key={i} style={{ color: "#4B5563", fontSize: "0.95rem", lineHeight: 1.6 }}
                                    dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#111827">$1</strong>').replace(/`(.*?)`/g, '<code style="background:#F3F4F6;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em;color:#3358FF">$1</code>') }}
                                />
                            ))}
                        </ol>
                    </div>
                ))}
            </div>

        </div>
    );
}
