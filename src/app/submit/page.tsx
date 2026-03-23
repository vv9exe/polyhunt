"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { UploadCloud, CheckCircle, ShieldCheck, AlertCircle, Github, Info } from "lucide-react";
import Link from "next/link";

export default function SubmitPage() {
    const router = useRouter();
    const { publicKey } = useWallet();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        name: "",
        tagline: "",
        description: "",
        pricePerDay: "",
        tags: "",
        dockerImageUrl: "",
        githubUrl: "",
        webhookUrl: "",
        hookToken: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!publicKey) {
            setError("Please connect your Solana wallet first to submit an agent.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/agent/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    tagline: form.tagline,
                    description: form.description,
                    pricePerDay: Number(form.pricePerDay),
                    tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
                    dockerImageUrl: form.dockerImageUrl || null,
                    githubUrl: form.githubUrl || null,
                    webhookUrl: form.webhookUrl || null,
                    hookToken: form.hookToken || null,
                    ownerWallet: publicKey.toBase58(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Submission failed");
            }

            setIsSuccess(true);
            setTimeout(() => router.push("/marketplace"), 2500);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div style={{ maxWidth: "600px", margin: "120px auto", textAlign: "center", padding: "0 24px" }}>
                <CheckCircle size={64} color="#00C853" style={{ margin: "0 auto 24px", display: "block" }} />
                <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "12px", color: "#111827" }}>Agent Submitted!</h1>
                <p style={{ color: "#4B5563", fontSize: "1.1rem" }}>
                    Your agent has been listed on PolyHunt. Redirecting to the marketplace...
                </p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "100px 24px 60px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ fontSize: "2.4rem", fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "-0.02em", fontFamily: "Inter, sans-serif", color: "#111827" }}>
                    List Your Agent
                </h1>
                <p style={{ fontSize: "1.1rem", color: "#4B5563", margin: 0, fontWeight: 400 }}>
                    List any Polymarket-compatible prediction agent. Earn USDC passively when users install &amp; run your model via PolyHunt.
                </p>
            </div>

            {/* What we accept banner */}
            <div style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                background: "rgba(51,88,255,0.04)", border: "1px solid rgba(51,88,255,0.15)",
                padding: "16px", borderRadius: "10px", marginBottom: "24px"
            }}>
                <Info size={18} color="#3358FF" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                    <p style={{ fontSize: "0.9rem", color: "#1A1A1A", fontWeight: 600, margin: "0 0 4px 0" }}>What agents can I list?</p>
                    <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>
                        We accept any agent that trades on Polymarket using the official CLOB API.{" "}
                        <strong>OpenClaw agents</strong> are preferred (full orchestration support), but any Docker-packaged agent using the{" "}
                        <a href="https://github.com/Polymarket/clob-client" target="_blank" rel="noopener noreferrer" style={{ color: "#3358FF" }}>Polymarket CLOB client</a>{" "}
                        is welcome.
                    </p>
                </div>
            </div>

            {!publicKey && (
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    background: "rgba(255, 196, 0, 0.1)", border: "1px solid rgba(255, 196, 0, 0.4)",
                    padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", color: "#92600A"
                }}>
                    <AlertCircle size={18} />
                    <span style={{ fontSize: "0.9rem" }}>Connect your Solana wallet to submit an agent.</span>
                </div>
            )}

            {error && (
                <div style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.25)",
                    padding: "12px 16px", borderRadius: "8px", marginBottom: "24px", color: "#B91C1C"
                }}>
                    <AlertCircle size={18} />
                    <span style={{ fontSize: "0.9rem" }}>{error}</span>
                </div>
            )}

            <div className="card" style={{ padding: "32px" }}>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                        <div>
                            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Agent Name</label>
                            <input required name="name" type="text" value={form.name} onChange={handleChange} className="input-base" placeholder="e.g. SentientOracle" />
                        </div>
                        <div>
                            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Price (USDC/Day)</label>
                            <input required name="pricePerDay" type="number" min="1" value={form.pricePerDay} onChange={handleChange} className="input-base" placeholder="e.g. 15" />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Tagline</label>
                        <input required name="tagline" type="text" value={form.tagline} onChange={handleChange} className="input-base" placeholder="Catchy one-liner describing your strategy..." />
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Full Description</label>
                        <textarea
                            required name="description" value={form.description} onChange={handleChange}
                            className="input-base" rows={4}
                            placeholder="Explain the data sources, risk management, and methodology behind your model..."
                            style={{ resize: "vertical" }}
                        />
                    </div>

                    <div>
                        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Tags (comma separated)</label>
                        <input name="tags" type="text" value={form.tags} onChange={handleChange} className="input-base" placeholder="e.g. Politics, NLP, Sentiment" />
                    </div>

                    {/* GitHub URL - strongly recommended */}
                    <div>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>
                            <Github size={16} color="#1A1A1A" />
                            GitHub Repository{" "}
                            <span style={{ color: "#0A7C4E", fontWeight: 500, fontSize: "0.8rem", background: "rgba(10,124,78,0.08)", padding: "1px 6px", borderRadius: "4px" }}>Strongly Recommended</span>
                        </label>
                        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 8px 0" }}>
                            A public GitHub repo builds trust with renters and increases installs. Agents without a GitHub link may appear lower in search results.
                        </p>
                        <input name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} className="input-base" placeholder="https://github.com/yourname/your-agent" />
                    </div>

                    {/* Docker Image URL */}
                    <div>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>
                            <ShieldCheck size={16} color="#3358FF" /> Docker Image URL <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(recommended)</span>
                        </label>
                        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 8px 0" }}>
                            Your public Docker image using the Polymarket CLOB API. Learn how in the <Link href="/docs" style={{ color: "#3358FF" }}>Docs</Link>.
                        </p>
                        <input name="dockerImageUrl" type="text" value={form.dockerImageUrl} onChange={handleChange} className="input-base" placeholder="e.g. docker.io/yourusername/agent-name:latest" />
                    </div>

                    {/* Webhook URL (OpenClaw gateway) */}
                    <div>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3358FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                            OpenClaw Webhook URL <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
                        </label>
                        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0 0 8px 0" }}>
                            If your agent uses an OpenClaw gateway, paste your webhook endpoint here (e.g. <code style={{ fontSize: "0.8rem" }}>https://your-gateway.openclaw.ai/hooks/agent</code>).
                        </p>
                        <input name="webhookUrl" type="url" value={form.webhookUrl} onChange={handleChange} className="input-base" placeholder="https://your-gateway.openclaw.ai/hooks/agent" />
                    </div>

                    {/* Hook Token */}
                    {form.webhookUrl && (
                        <div>
                            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>
                                Hook Token <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(OpenClaw secret)</span>
                            </label>
                            <input name="hookToken" type="password" value={form.hookToken} onChange={handleChange} className="input-base" placeholder="your-secret-hook-token" />
                        </div>
                    )}

                    <hr className="divider" style={{ margin: "8px 0" }} />


                    <button
                        type="submit"
                        className="btn-brand"
                        disabled={isSubmitting}
                        style={{
                            width: "100%", padding: "14px", fontSize: "1rem",
                            justifyContent: "center",
                            opacity: isSubmitting ? 0.7 : 1,
                            cursor: isSubmitting ? "not-allowed" : "pointer"
                        }}
                    >
                        {isSubmitting ? (
                            <span className="animate-pulse-dot">Saving to database...</span>
                        ) : (
                            <><UploadCloud size={18} /> Submit Agent</>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
