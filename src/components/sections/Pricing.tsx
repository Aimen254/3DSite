// src/components/sections/Pricing.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const PLANS = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "For small farms getting started with precision agriculture.",
    features: ["Up to 5 hectares", "Weekly crop reports", "Basic yield forecast", "Email support", "1 user account"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Growth",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "For serious farmers ready to maximise every harvest.",
    features: ["Up to 100 hectares", "Daily satellite monitoring", "AI yield prediction", "Precision irrigation control", "Market price intelligence", "5 user accounts", "Priority support"],
    cta: "Get started",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    annualPrice: 159,
    description: "For cooperatives and large-scale commercial operations.",
    features: ["Unlimited hectares", "Real-time drone integration", "Custom AI model training", "API access", "Unlimited users", "Dedicated account manager", "SLA guarantee"],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function Pricing() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const toggleRef   = useRef<HTMLDivElement>(null);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
    });
    gsap.from(toggleRef.current, {
      y: 20, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: toggleRef.current, start: "top 90%" },
    });
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 100, opacity: 0, duration: 1.1, delay: i * 0.12, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", zIndex: 1,
        padding: "120px max(40px, 6vw) 160px",
        borderTop: "1px solid rgba(117,112,188,0.15)",
      }}
    >
      <div ref={headingRef} style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "rgba(191,199,222,0.55)", marginBottom: "20px" }}>
          PRICING
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 600,
          letterSpacing: "-0.04em", color: "#C7DBF7", lineHeight: 1.1, marginBottom: "16px",
        }}>
          Simple, transparent pricing
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(191,199,222,0.7)", maxWidth: "420px", margin: "0 auto", lineHeight: 1.7 }}>
          Start free, scale when you&apos;re ready. No hidden fees, no long-term contracts.
        </p>
      </div>

      {/* Toggle */}
      <div ref={toggleRef} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "64px" }}>
        <span style={{ fontSize: "13px", color: !annual ? "#C7DBF7" : "rgba(191,199,222,0.45)", transition: "color 0.3s" }}>
          Monthly
        </span>
        <div
          onClick={() => setAnnual((v) => !v)}
          style={{
            width: 44, height: 24, borderRadius: 12,
            border: "1px solid rgba(117,112,188,0.3)",
            background: annual ? "rgba(117,112,188,0.3)" : "rgba(117,112,188,0.08)",
            position: "relative", cursor: "pointer", transition: "background 0.3s",
          }}
        >
          <div style={{
            position: "absolute", top: 3, left: annual ? 22 : 3,
            width: 16, height: 16, borderRadius: "50%",
            background: annual ? "#7570BC" : "#C7DBF7",
            transition: "left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }} />
        </div>
        <span style={{ fontSize: "13px", color: annual ? "#C7DBF7" : "rgba(191,199,222,0.45)", transition: "color 0.3s" }}>
          Annual
          <span style={{
            marginLeft: "8px", padding: "2px 8px", borderRadius: "100px",
            background: "rgba(197,149,148,0.15)", border: "1px solid rgba(197,149,148,0.35)",
            fontSize: "10px", color: "#C59594", letterSpacing: "0.04em",
          }}>
            SAVE 20%
          </span>
        </span>
      </div>

      {/* Cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "16px", maxWidth: "1000px", margin: "0 auto", alignItems: "start",
      }}>
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              padding: plan.highlight ? "40px 32px" : "32px",
              borderRadius: "24px",
              border: plan.highlight ? "1px solid rgba(117,112,188,0.4)" : "1px solid rgba(117,112,188,0.15)",
              background: plan.highlight ? "rgba(117,112,188,0.1)" : "rgba(117,112,188,0.03)",
              position: "relative", backdropFilter: "blur(10px)",
            }}
          >
            {plan.highlight && (
              <div style={{
                position: "absolute", top: -12, left: "50%",
                transform: "translateX(-50%)",
                padding: "4px 16px", borderRadius: "100px",
                background: "linear-gradient(135deg, #7570BC, #C59594)",
                color: "#ffffff", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.08em", whiteSpace: "nowrap",
              }}>
                MOST POPULAR
              </div>
            )}

            <p style={{ fontSize: "12px", letterSpacing: "0.12em", color: "rgba(191,199,222,0.6)", marginBottom: "12px" }}>
              {plan.name.toUpperCase()}
            </p>

            <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "8px" }}>
              <span style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.04em", color: "#C7DBF7", lineHeight: 1 }}>
                {plan.monthlyPrice === 0 ? "Free" : `$${annual ? plan.annualPrice : plan.monthlyPrice}`}
              </span>
              {plan.monthlyPrice > 0 && (
                <span style={{ fontSize: "13px", color: "rgba(191,199,222,0.6)", marginBottom: "6px" }}>/ mo</span>
              )}
            </div>

            <p style={{ fontSize: "13px", color: "rgba(191,199,222,0.7)", lineHeight: 1.6, marginBottom: "28px", minHeight: "40px" }}>
              {plan.description}
            </p>

            <div style={{ height: "1px", background: "rgba(117,112,188,0.15)", marginBottom: "24px" }} />

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {plan.features.map((feature) => (
                <li key={feature} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(191,199,222,0.85)" }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: "rgba(117,112,188,0.2)", border: "1px solid rgba(117,112,188,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "9px", color: "#C7DBF7", flexShrink: 0,
                  }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <MagneticButton variant={plan.highlight ? "primary" : "outline"} style={{ width: "100%" }}>
              {plan.cta}
            </MagneticButton>
          </div>
        ))}
      </div>
    </section>
  );
}
