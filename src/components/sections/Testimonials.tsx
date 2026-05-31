// src/components/sections/Testimonials.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TESTIMONIALS = [
  {
    quote:
      "Oryzo's yield prediction was within 3% of our actual harvest. We've never been able to plan logistics this accurately.",
    author: "Muhammad Tariq",
    role:   "Farm Manager · Punjab, Pakistan",
    avatar: "MT",
    accent: "#4ade80",
  },
  {
    quote:
      "The irrigation automation alone saved us 40% water consumption in our first season. Incredible ROI.",
    author: "Priya Sharma",
    role:   "Agricultural Director · Tamil Nadu, India",
    avatar: "PS",
    accent: "#60a5fa",
  },
  {
    quote:
      "Finally a product that understands the realities of rice farming, not just a generic ag tool.",
    author: "Bui Thi Lan",
    role:   "Cooperative Lead · Mekong Delta, Vietnam",
    avatar: "BL",
    accent: "#f59e0b",
  },
  {
    quote:
      "Crop disease alerts caught a fungal outbreak two weeks before visible symptoms. Saved my entire harvest.",
    author: "Amara Diallo",
    role:   "Rice Farmer · Senegal River Valley",
    avatar: "AD",
    accent: "#e879f9",
  },
  {
    quote:
      "Market intelligence helped us sell at a 22% premium over our usual buyer. The data speaks for itself.",
    author: "Chen Wei",
    role:   "Export Coordinator · Hunan, China",
    avatar: "CW",
    accent: "#fb923c",
  },
  {
    quote:
      "Setup took 20 minutes. Drone integration, satellite sync, everything just worked out of the box.",
    author: "Kofi Mensah",
    role:   "Agri-tech Consultant · Ghana",
    avatar: "KM",
    accent: "#34d399",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Heading reveal
    gsap.from(headingRef.current, {
      y: 60, opacity: 0, duration: 1.2, ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
      },
    });

    // Cards stagger in
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: (i % 3) * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "120px max(40px, 6vw) 160px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Heading */}
      <div ref={headingRef} style={{ textAlign: "center", marginBottom: "80px" }}>
        <p style={{
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.25)",
          marginBottom: "20px",
        }}>
          WHAT FARMERS SAY
        </p>
        <h2 style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          color: "#ffffff",
          lineHeight: 1.1,
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          Results that speak for themselves
        </h2>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              padding: "32px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              transition: "border-color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                `${t.accent}40`;
              (e.currentTarget as HTMLDivElement).style.background =
                `${t.accent}08`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLDivElement).style.background =
                "rgba(255,255,255,0.02)";
            }}
          >
            {/* Stars */}
            <div style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} style={{ color: t.accent, fontSize: "14px" }}>
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.75,
              flex: 1,
            }}>
              {'"'}{t.quote}{'"'}
            </p>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: 40, height: 40,
                borderRadius: "50%",
                background: `${t.accent}20`,
                border: `1px solid ${t.accent}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 600,
                color: t.accent,
                flexShrink: 0,
              }}>
                {t.avatar}
              </div>
              <div>
                <p style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "2px",
                }}>
                  {t.author}
                </p>
                <p style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                }}>
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}