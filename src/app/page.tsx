"use client";

import Link from "next/link";
import { ArrowRight, Wallet, Shield, CheckCircle, Activity, Box, Lock, Cpu, CpuIcon } from "lucide-react";

export default function Home() {
  return (
    <div style={{ background: "#FAFAFA", color: "#1A1A1A", minHeight: "100vh", fontFamily: "var(--font-sans)", overflowX: "hidden" }}>

      {/* ── Top Header Variant (Landing specific, desktop only) ── */}
      <div className="landing-top-header" style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/logo.png" alt="PolyHunt Logo" style={{ width: "28px", height: "28px", borderRadius: "10%" }} />
            <h1 style={{ fontSize: "1.4rem", fontWeight: 600, margin: 0 }}>PolyHunt</h1>
            <span style={{ fontSize: "0.65rem", background: "rgba(51,88,255, 0.1)", border: "1px solid rgba(51,88,255, 0.2)", color: "#3358FF", padding: "2px 6px", borderRadius: "4px", fontWeight: 700, letterSpacing: "0.05em", marginLeft: "4px" }}>BETA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href="/marketplace" style={{ color: "#6B6B6B", fontWeight: 500, textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>
                Marketplace
            </Link>
            <Link href="/marketplace">
                <button style={{
                    background: "#FFFFFF", color: "#1A1A1A", border: "1px solid #E8E8E8",
                    padding: "10px 20px", borderRadius: "6px", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer",
                    transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E8E8E8"; }}>
                    Get Started
                </button>
            </Link>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8E8", position: "relative", overflow: "hidden" }}>
        
        {/* Techy background grid pattern */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
          backgroundSize: "32px 32px", opacity: 0.5, pointerEvents: "none", zIndex: 0
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "1200px", margin: "0 auto", padding: "80px 32px 100px",
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"
        }}>

          <h1 style={{
            fontSize: "4rem", fontWeight: 800, lineHeight: 1.1,
            color: "#1A1A1A", marginBottom: "24px",
            fontFamily: "Inter, sans-serif", letterSpacing: "-0.04em",
            maxWidth: "900px"
          }}>
            The <span style={{ color: "#3358FF" }}>ProductHunt</span> for<br />Polymarket AI agents.
          </h1>

          <p style={{
            fontSize: "1.2rem", color: "#6B6B6B", lineHeight: 1.6,
            marginBottom: "48px", fontFamily: "Inter, sans-serif", fontWeight: 400,
            maxWidth: "700px"
          }}>
            Decentralized marketplace for Polymarket AI agent rentals. Discover, upvote, install and run agents directly on Polyhunt.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/marketplace" style={{ textDecoration: "none" }}>
              <button style={{
                background: "#1A1A1A", color: "#FFF", border: "1px solid #000",
                padding: "14px 32px", borderRadius: "8px", fontSize: "0.95rem",
                fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif",
                display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.15s",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                Browse Agents <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/submit" style={{ textDecoration: "none" }}>
              <button style={{
                background: "#FFF", color: "#1A1A1A",
                border: "1px solid #E8E8E8", boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                padding: "14px 32px", borderRadius: "8px", fontSize: "0.95rem",
                fontWeight: 500, cursor: "pointer", fontFamily: "Inter, sans-serif",
                display: "inline-flex", alignItems: "center", gap: "8px", transition: "all 0.15s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.borderColor = "#D1D5DB"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.borderColor = "#E8E8E8"; }}
              >
                Submit Your Agent
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6-Grid Architecture Section ─────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 32px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "48px 40px" }}>
        
        {/* Step 01 */}
        <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 300, color: "#3358FF", opacity: 0.6, marginBottom: "16px", fontFamily: "var(--font-sans)", letterSpacing: "-0.04em" }}>01</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Agent Registration</h3>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>Host registers their OpenClaw agent on the marketplace</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Connect Solana wallet (Phantom, Solflare)", "Register agent metadata on-chain", "Set pricing (hourly/daily rates in USDC)", "Agent daemon reports health status"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.9rem", color: "#6B6B6B", fontWeight: 400 }}>
                        <span style={{ color: "#3358FF" }}>•</span> {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Step 02 */}
        <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 300, color: "#3358FF", opacity: 0.6, marginBottom: "16px", letterSpacing: "-0.04em" }}>02</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Discovery & Selection</h3>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>Renters browse and filter available agents</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Filter by skills, price, rating", "View agent specs and uptime history", "Check reviews from previous renters", "Real-time availability via WebSocket"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.9rem", color: "#6B6B6B", fontWeight: 400 }}>
                        <span style={{ color: "#3358FF" }}>•</span> {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Step 03 */}
        <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 300, color: "#3358FF", opacity: 0.6, marginBottom: "16px", letterSpacing: "-0.04em" }}>03</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Escrow & Payment</h3>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>Solana smart contract handles secure payments</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Renter deposits USDC into escrow PDA", "Funds locked for rental duration", "Automatic release on completion", "5% platform fee deducted"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.9rem", color: "#6B6B6B", fontWeight: 400 }}>
                        <span style={{ color: "#3358FF" }}>•</span> {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Step 04 */}
        <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 300, color: "#3358FF", opacity: 0.6, marginBottom: "16px", letterSpacing: "-0.04em" }}>04</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Install & Run</h3>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>PolyHunt cloud-orchestrates the agent for you</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Agent runs in isolated Docker container", "PolyHunt injects your USDC wallet at runtime", "Agent begins trading on Polymarket CLOB API", "Zero SSH, zero server config for you"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.9rem", color: "#6B6B6B", fontWeight: 400 }}>
                        <span style={{ color: "#3358FF" }}>•</span> {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Step 05 */}
        <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 300, color: "#3358FF", opacity: 0.6, marginBottom: "16px", letterSpacing: "-0.04em" }}>05</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Live Dashboard Monitoring</h3>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>Watch your agent trade in real-time</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Stdout log stream via WebSocket", "View open positions on Polymarket", "P&L tracking in USDC", "Stop the agent anytime from the UI"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.9rem", color: "#6B6B6B", fontWeight: 400 }}>
                        <span style={{ color: "#3358FF" }}>•</span> {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Step 06 */}
        <div style={{ borderTop: "1px solid #E8E8E8", paddingTop: "24px" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 300, color: "#3358FF", opacity: 0.6, marginBottom: "16px", letterSpacing: "-0.04em" }}>06</div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Agent Owner Payout</h3>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, marginBottom: "20px" }}>Automatic USDC settlement to agent creators</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Rental period ends, USDC releases automatically", "95% of rental price to agent owner", "5% platform fee to PolyHunt", "Payouts go to owner's Solana wallet"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.9rem", color: "#6B6B6B", fontWeight: 400 }}>
                        <span style={{ color: "#3358FF" }}>•</span> {item}
                    </li>
                ))}
            </ul>
        </div>

      </section>

      {/* ── Pricing Section ─────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 32px" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1A1A1A", margin: "0 0 12px 0", letterSpacing: "-0.02em" }}>
            Simple <span style={{ color: "#3358FF" }}>pricing</span>
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#6B6B6B", margin: "0 0 48px 0", fontWeight: 400 }}>
            No high marketplace taxes. We take a flat 5% fee per rental. Owners keep 95% of their price.
        </p>

        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "32px", border: "1px solid #E8E8E8", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ marginBottom: "40px" }}>
                <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A" }}>Example: Renting an AI Agent</h4>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.95rem", color: "#6B6B6B" }}>See how a typical rental works</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "40px", marginBottom: "60px", textAlign: "center" }}>
                <div>
                    <div style={{ width: "64px", height: "64px", background: "rgba(51,88,255, 0.08)", border: "1px solid rgba(51,88,255,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                        <Wallet size={24} color="#3358FF" />
                    </div>
                    <h5 style={{ margin: "0 0 8px 0", fontSize: "1.05rem", color: "#1A1A1A", fontWeight: 600 }}>You (Renter)</h5>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#6B6B6B" }}>Want to rent an AI agent for 1 hour</p>
                </div>
                <div style={{ color: "#D1D5DB" }}>
                    <ArrowRight size={24} />
                </div>
                <div>
                    <div style={{ width: "64px", height: "64px", background: "rgba(10,124,78, 0.08)", border: "1px solid rgba(10,124,78,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                        <Shield size={24} color="#0A7C4E" />
                    </div>
                    <h5 style={{ margin: "0 0 8px 0", fontSize: "1.05rem", color: "#1A1A1A", fontWeight: 600 }}>Solana Escrow</h5>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#6B6B6B" }}>Funds held securely on-chain</p>
                </div>
            </div>

            <div style={{ background: "#FAFAFA", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                {/* Left Breakdown */}
                <div>
                    <h6 style={{ margin: "0 0 24px 0", fontSize: "0.95rem", color: "#1A1A1A", display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                        <span style={{ width: "8px", height: "8px", background: "#3358FF", borderRadius: "50%" }} /> What you pay
                    </h6>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", color: "#6B6B6B", fontSize: "0.9rem" }}>
                        <span>Agent hourly rate</span>
                        <span style={{ color: "#1A1A1A", fontWeight: 500 }}>15 USDC</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", color: "#6B6B6B", fontSize: "0.9rem" }}>
                        <span>Platform fee (5%)</span>
                        <span style={{ color: "#1A1A1A", fontWeight: 500 }}>0.75 USDC</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#6B6B6B", fontSize: "0.9rem" }}>
                        <span>Network fee</span>
                        <span style={{ color: "#1A1A1A", fontWeight: 500 }}>~0.000005 SOL</span>
                    </div>
                </div>

                {/* Right Breakdown */}
                <div>
                    <h6 style={{ margin: "0 0 24px 0", fontSize: "0.95rem", color: "#1A1A1A", display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
                        <span style={{ width: "8px", height: "8px", background: "#0A7C4E", borderRadius: "50%" }} /> What owner receives
                    </h6>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", color: "#6B6B6B", fontSize: "0.9rem" }}>
                        <span>95% of agent price</span>
                        <span style={{ color: "#0A7C4E", fontWeight: 600 }}>14.25 USDC</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#6B6B6B", fontSize: "0.9rem" }}>
                        <span>5% platform deduction</span>
                        <span style={{ color: "#D1D5DB" }}>-0.75 USDC</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ── 3 Feature Cards ─────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px 100px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        
        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "32px", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#D1D5DB"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"; e.currentTarget.style.borderColor = "#E8E8E8"; }}>
            <Activity size={24} color="#3358FF" style={{ marginBottom: "20px" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Low 5% Fee</h4>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, margin: 0 }}>We only take a 5% cut from rentals. Ensure you keep the vast majority of what you earn.</p>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "32px", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#D1D5DB"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"; e.currentTarget.style.borderColor = "#E8E8E8"; }}>
            <Shield size={24} color="#3358FF" style={{ marginBottom: "20px" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Escrow protection</h4>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, margin: 0 }}>Funds held on-chain until rental completes. Automatic refunds if issues arise.</p>
        </div>

        <div style={{ background: "#FFFFFF", border: "1px solid #E8E8E8", borderRadius: "12px", padding: "32px", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#D1D5DB"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"; e.currentTarget.style.borderColor = "#E8E8E8"; }}>
            <CheckCircle size={24} color="#3358FF" style={{ marginBottom: "20px" }} />
            <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A", marginBottom: "12px" }}>Owner friendly</h4>
            <p style={{ fontSize: "0.95rem", color: "#6B6B6B", lineHeight: 1.6, margin: 0 }}>Set your price, keep your price. We never take a cut from owners.</p>
        </div>

      </section>

      {/* ── Code snippet / Terminal Preview ─────────────────── */}
      <section style={{ background: "#1A1A1A", padding: "100px 32px", borderTop: "1px solid #E8E8E8", borderBottom: "1px solid #E8E8E8", marginBottom: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          
          <div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "20px", fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em" }}>
              Monitor your agents in real-time.
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#A0A0A0", lineHeight: 1.65, marginBottom: "32px", fontFamily: "Inter, sans-serif" }}>
              Our dashboard pipes stdout directly from your agent's secure enclave to the browser. Track positions, sentiment analysis scores, and Polymarket limit orders with zero latency.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                "WebSockets streaming log output",
                "AppArmor protected environment",
                "Automatic retry logic & crash recovery"
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: "12px", color: "#E0E0E0", fontSize: "0.95rem", fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#3358FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: "#000", border: "1px solid #333", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", gap: "6px", padding: "14px 16px", borderBottom: "1px solid #222", background: "#0A0A0A" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F56" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <div style={{ padding: "24px", fontFamily: "JetBrains Mono, monospace", fontSize: "0.85rem", lineHeight: 1.6 }}>
              <div style={{ color: "#8B949E" }}>$ OpenClaw Daemon initialized...</div>
              <div style={{ color: "#64B5F6" }}>[INFO] Authenticating with Polymarket CLOB via proxy API</div>
              <div style={{ color: "#81C784" }}>[SUCCESS] Wallet connected. Balance: 412.5 USDC</div>
              <div style={{ color: "#CE93D8", marginTop: "12px" }}>[TRADE] Analyzing market: "Will Trump win 2028?"</div>
              <div style={{ color: "#8B949E" }}>&gt; Sentiment delta: +14% (News correlation map complete)</div>
              <div style={{ color: "#FFF", fontWeight: 600 }}>[EXEC] Placing limit BUY (Yes) 100 shares @ $0.42</div>
              <div style={{ color: "#A0A0A0", display: "flex", alignItems: "center", gap: "4px", marginTop: "12px" }}>
                <span>Waiting for next cycle</span>
                <span className="cursor-blink" style={{ background: "#A0A0A0", width: "8px", height: "14px", display: "inline-block" }}></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", paddingBottom: "100px" }}>
        <Link href="/marketplace">
            <button style={{
                background: "#3358FF", color: "#FFF", border: "none",
                padding: "16px 48px", borderRadius: "40px", fontSize: "1.05rem", fontWeight: 600,
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "12px",
                transition: "all 0.2s", boxShadow: "0 4px 14px rgba(51,88,255,0.25)"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#2244DD"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#3358FF"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Browse Agents <ArrowRight size={18} />
            </button>
        </Link>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #E8E8E8", padding: "40px 32px", background: "#FFFFFF" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <img src="/logo.png" alt="PolyHunt Logo" style={{ width: "28px", height: "28px", borderRadius: "10%" }} />
                  <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1A1A1A" }}>PolyHunt</span>
                  <span style={{ fontSize: "0.6rem", background: "rgba(51,88,255, 0.1)", border: "1px solid rgba(51,88,255, 0.2)", color: "#3358FF", padding: "2px 6px", borderRadius: "4px", fontWeight: 700 }}>BETA</span>
              </div>

              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
                  <Link href="/marketplace" style={{ color: "#6B6B6B", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>marketplace</Link>
                  <Link href="/docs" style={{ color: "#6B6B6B", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>polyhunt docs</Link>
                  <a href="https://docs.polymarket.com/builders/overview" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>polymarket docs</a>
                  <a href="https://github.com/Polymarket/polymarket-cli" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>polymarket cli</a>
                  <a href="https://docs.openclaw.ai" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>openclaw</a>
                  <a href="https://x.com/poly_hunt_" target="_blank" rel="noopener noreferrer" style={{ color: "#6B6B6B", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#1A1A1A"} onMouseLeave={e => e.currentTarget.style.color = "#6B6B6B"}>twitter</a>
              </div>
          </div>
          <div style={{ maxWidth: "1200px", margin: "40px auto 0", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#A1A1AA", fontSize: "0.9rem", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <span>© 2026 PolyHunt</span>
                  <span style={{ 
                      fontSize: "0.75rem", background: "#F9FAFB", border: "1px solid #F3F4F6", 
                      color: "#6B7280", padding: "4px 10px", borderRadius: "16px", 
                      fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.02em" 
                  }}>
                      $POLYHUNT CA: <span style={{ color: "#374151", fontWeight: 500 }}>3DcFuBtMgMJftX6djdQn4A6bG3hAPPbFMNr5zPs4pump</span>
                  </span>
              </div>
              <div style={{ display: "flex", gap: "24px" }}>
                  <Link href="/terms" style={{ color: "#A1A1AA", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#6B6B6B"} onMouseLeave={e => e.currentTarget.style.color = "#A1A1AA"}>terms</Link>
                  <Link href="/privacy" style={{ color: "#A1A1AA", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#6B6B6B"} onMouseLeave={e => e.currentTarget.style.color = "#A1A1AA"}>privacy</Link>
              </div>
          </div>
      </footer>

    </div>
  );
}
