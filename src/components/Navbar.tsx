"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    const { publicKey } = useWallet();

    const navLinks = [
        { href: "/marketplace", label: "Marketplace" },
        { href: "/leaderboard", label: "Leaderboards" },
        { href: "/submit", label: "Submit Agent" },
        { href: "/docs", label: "Docs" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <>
            <header style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                height: "56px",
                backgroundColor: "#FFFFFF",
                borderBottom: "1px solid #E8E8E8",
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                    <img src="/logo.png" alt="PolyHunt Logo" style={{ width: "28px", height: "28px", borderRadius: "10%" }} />
                    <span style={{
                        fontWeight: 700, fontSize: "1rem", color: "#1A1A1A",
                        fontFamily: "Inter, sans-serif", letterSpacing: "-0.02em"
                    }}>
                        PolyHunt
                    </span>
                </Link>

                {/* Desktop Nav links */}
                <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            style={{
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                fontWeight: pathname === link.href ? 600 : 400,
                                color: pathname === link.href ? "#1A1A1A" : "#6B6B6B",
                                fontFamily: "Inter, sans-serif",
                                transition: "color 0.1s",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop: Wallet + Trade button */}
                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {publicKey && (
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "8px", borderRight: "1px solid #E8E8E8", paddingRight: "20px" }}>
                            <Link href={`/profile/${publicKey.toBase58()}`} style={{ textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, color: "#3358FF" }}>My Profile</Link>
                        </div>
                    )}
                    <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer" className="nav-trade-btn" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "7px 14px", borderRadius: "6px",
                        border: "1px solid #E8E8E8", background: "#FFFFFF",
                        color: "#1A1A1A", fontSize: "0.8rem", fontWeight: 600,
                        textDecoration: "none", fontFamily: "Inter, sans-serif",
                        transition: "all 0.15s", whiteSpace: "nowrap",
                    }}>
                        Trade on Polymarket ↗
                    </a>
                    <div style={{ transform: "scale(0.85)", transformOrigin: "right center" }}>
                        <WalletMultiButton style={{
                            backgroundColor: "#1A1A1A", borderRadius: "8px",
                            fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600,
                        }} />
                    </div>
                </div>

                {/* Mobile: Wallet + Hamburger */}
                <div className="mobile-nav" style={{ display: "none", alignItems: "center", gap: "8px" }}>
                    <div style={{ transform: "scale(0.75)", transformOrigin: "right center" }}>
                        <WalletMultiButton style={{
                            backgroundColor: "#1A1A1A", borderRadius: "8px",
                            fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600,
                        }} />
                    </div>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#1A1A1A" }}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </header>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="mobile-nav" style={{
                    display: "none",
                    position: "fixed", top: "56px", left: 0, right: 0, zIndex: 49,
                    backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8E8E8",
                    flexDirection: "column", padding: "8px 0",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                textDecoration: "none", padding: "14px 20px",
                                fontSize: "1rem", fontWeight: pathname === link.href ? 600 : 400,
                                color: pathname === link.href ? "#1A1A1A" : "#6B6B6B",
                                fontFamily: "Inter, sans-serif",
                                borderBottom: "1px solid #F5F5F5",
                                display: "block",
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {publicKey && (
                        <Link href={`/profile/${publicKey.toBase58()}`} onClick={() => setMenuOpen(false)} style={{
                            textDecoration: "none", padding: "14px 20px", fontSize: "1rem", fontWeight: 600, color: "#3358FF",
                            fontFamily: "Inter, sans-serif", borderBottom: "1px solid #F5F5F5", display: "block"
                        }}>My Profile</Link>
                    )}
                    <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer" style={{
                        padding: "14px 20px", fontSize: "1rem", fontWeight: 500,
                        color: "#6B6B6B", fontFamily: "Inter, sans-serif",
                        textDecoration: "none", display: "block"
                    }}>
                        Trade on Polymarket ↗
                    </a>
                </div>
            )}
        </>
    );
}
