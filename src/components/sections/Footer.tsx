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
  const footerRef   = useRef<HTMLElement>(null);
  const bigTextRef  = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLInputElement>(null);
  const btnRef      = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Big text parallax
    gsap.to(bigTextRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Footer content fade in
    gsap.from(footerRef.current?.querySelectorAll(".footer-col") ?? [], {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
      },
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Newsletter strip */}
      <div style={{
        padding: "80px max(40px, 6vw)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "32px",
      }}>
        <div>
          <h3 style={{
            fontSize: "clamp(1.3rem, 3vw, 2rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "8px",
          }}>
            Stay ahead of the season
          </h3>
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.35)",
          }}>
            Agronomy insights, product updates, and farmer stories.
          </p>
        </div>

        {/* Email input */}
        <div style={{
          display: "flex",
          gap: "0",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          background: "rgba(255,255,255,0.03)",
          flexShrink: 0,
        }}>
          <input
            ref={inputRef}
            type="email"
            placeholder="your@email.com"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "12px 20px",
              color: "#ffffff",
              fontSize: "14px",
              width: "220px",
              fontFamily: "inherit",
            }}
          />
          <button
            ref={btnRef}
            style={{
              padding: "12px 24px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              fontSize: "13px",
              fontWeight: 500,
              fontFamily: "inherit",
              borderRadius: "100px",
              margin: "3px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.85")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Main footer links */}
      <div style={{
        padding: "64px max(40px, 6vw)",
        display: "grid",
        gridTemplateColumns: "2fr repeat(4, 1fr)",
        gap: "48px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {/* Brand col */}
        <div className="footer-col">
          <div style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}>
            oryzo
          </div>
          <p style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.3)",
            lineHeight: 1.75,
            maxWidth: "220px",
            marginBottom: "24px",
          }}>
            AI-powered tools for the world&apos;s most important crop.
          </p>
          {/* Socials */}
          <div style={{ display: "flex", gap: "12px" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  width: 32, height: 32,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.3)";
                  el.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([group, links]) => (
          <div key={group} className="footer-col">
            <p style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.25)",
              marginBottom: "20px",
            }}>
              {group.toUpperCase()}
            </p>
            <ul style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#fff")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "rgba(255,255,255,0.4)")
                    }
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <p style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.2)",
        }}>
          © {new Date().getFullYear()} Oryzo Inc. All rights reserved.
        </p>
        <p style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.15)",
        }}>
          Built with ♥ for rice farmers worldwide
        </p>
      </div>

      {/* Big background text */}
      <div
        ref={bigTextRef}
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "clamp(5rem, 20vw, 18rem)",
          fontWeight: 700,
          color: "rgba(255,255,255,0.018)",
          letterSpacing: "-0.06em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
        }}
      >
        oryzo
      </div>
    </footer>
  );
}