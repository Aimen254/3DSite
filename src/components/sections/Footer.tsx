// src/components/sections/Footer.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const LINKS = {
  Product:  ["Features", "Pricing", "Changelog", "Roadmap"],
  Farmers:  ["Case studies", "Community", "Blog", "Webinars"],
  Company:  ["About", "Careers", "Press", "Contact"],
  Legal:    ["Privacy", "Terms", "Security", "Cookies"],
};

const SOCIALS = [
  { label: "X",        href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub",   href: "#" },
];

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const btnRef     = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.to(bigTextRef.current, {
      yPercent: -20, ease: "none",
      scrollTrigger: { trigger: footerRef.current, start: "top bottom", end: "bottom bottom", scrub: true },
    });
    gsap.from(footerRef.current?.querySelectorAll(".footer-col") ?? [], {
      y: 40, opacity: 0, duration: 1, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(117,112,188,0.15)", overflow: "hidden" }}
    >
      {/* Newsletter strip */}
      <div style={{
        padding: "80px max(40px, 6vw)",
        borderBottom: "1px solid rgba(117,112,188,0.15)",
        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "32px",
      }}>
        <div>
          <h3 style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "#C7DBF7", marginBottom: "8px" }}>
            Stay ahead of the season
          </h3>
          <p style={{ fontSize: "14px", color: "rgba(191,199,222,0.7)" }}>
            Agronomy insights, product updates, and farmer stories.
          </p>
        </div>

        <div style={{
          display: "flex", gap: "0", borderRadius: "100px",
          border: "1px solid rgba(117,112,188,0.25)", overflow: "hidden",
          background: "rgba(117,112,188,0.06)", flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            type="email"
            placeholder="your@email.com"
            style={{
              background: "transparent", border: "none", outline: "none",
              padding: "12px 20px", color: "#C7DBF7", fontSize: "14px",
              width: "220px", fontFamily: "inherit",
            }}
          />
          <button
            ref={btnRef}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(135deg, #7570BC, #C59594)",
              color: "#ffffff", border: "none", fontSize: "13px",
              fontWeight: 500, fontFamily: "inherit",
              borderRadius: "100px", margin: "3px", transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Main footer links */}
      <div style={{
        padding: "64px max(40px, 6vw)",
        display: "grid", gridTemplateColumns: "2fr repeat(4, 1fr)",
        gap: "48px", borderBottom: "1px solid rgba(117,112,188,0.15)",
      }}>
        <div className="footer-col">
          <div style={{ fontSize: "20px", fontWeight: 600, color: "#C7DBF7", letterSpacing: "-0.03em", marginBottom: "16px" }}>
            oryzo
          </div>
          <p style={{ fontSize: "13px", color: "rgba(191,199,222,0.65)", lineHeight: 1.75, maxWidth: "220px", marginBottom: "24px" }}>
            AI-powered tools for the world&apos;s most important crop.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid rgba(117,112,188,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", color: "rgba(191,199,222,0.65)",
                  textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(117,112,188,0.6)";
                  el.style.color = "#C7DBF7";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(117,112,188,0.25)";
                  el.style.color = "rgba(191,199,222,0.65)";
                }}
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(LINKS).map(([group, links]) => (
          <div key={group} className="footer-col">
            <p style={{ fontSize: "11px", letterSpacing: "0.12em", color: "rgba(191,199,222,0.55)", marginBottom: "20px" }}>
              {group.toUpperCase()}
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ fontSize: "13px", color: "rgba(191,199,222,0.7)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C7DBF7")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(191,199,222,0.7)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: "24px max(40px, 6vw)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "12px",
      }}>
        <p style={{ fontSize: "12px", color: "rgba(191,199,222,0.5)" }}>
          © {new Date().getFullYear()} Oryzo Inc. All rights reserved.
        </p>
        <p style={{ fontSize: "12px", color: "rgba(191,199,222,0.4)" }}>
          Built with ♥ for rice farmers worldwide
        </p>
      </div>

      {/* Big background text */}
      <div
        ref={bigTextRef}
        style={{
          position: "absolute", bottom: "-20px", left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(5rem, 20vw, 18rem)", fontWeight: 700,
          color: "rgba(117,112,188,0.04)",
          letterSpacing: "-0.06em", whiteSpace: "nowrap",
          pointerEvents: "none", userSelect: "none", lineHeight: 1,
        }}
      >
        oryzo
      </div>
    </footer>
  );
}
