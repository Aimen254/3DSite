// src/components/ui/Navbar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = ["Product", "Farmers", "Pricing", "About"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60, opacity: 0, duration: 1.2,
      delay: 0.5, ease: "power3.out",
    });

    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      if (navRef.current) {
        navRef.current.style.backdropFilter  = scrolled ? "blur(20px)" : "none";
        navRef.current.style.background      = scrolled ? "rgba(12,11,24,0.8)" : "transparent";
        navRef.current.style.borderBottom    = scrolled ? "1px solid rgba(117,112,188,0.15)" : "1px solid transparent";
        navRef.current.style.transition = "all 0.4s ease";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) {
      gsap.to(menu, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", pointerEvents: "all" });
      gsap.from(menu.querySelectorAll(".menu-link"), {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.1,
      });
    } else {
      gsap.to(menu, { y: -20, opacity: 0, duration: 0.3, pointerEvents: "none" });
    }
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: 600, color: "#C7DBF7", letterSpacing: "-0.02em" }}>
          oryzo
        </div>

        <div style={{
          display: "flex", gap: "36px",
          position: "absolute", left: "50%", transform: "translateX(-50%)",
        }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              style={{ color: "rgba(191,199,222,0.75)", fontSize: "13px", textDecoration: "none", letterSpacing: "0.03em", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C7DBF7")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(191,199,222,0.75)")}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="#" style={{ color: "rgba(191,199,222,0.75)", fontSize: "13px", textDecoration: "none" }}>
            Sign in
          </a>
          <MagneticButton variant="primary">Get started</MagneticButton>
        </div>
      </nav>

      <div
        ref={menuRef}
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(12,11,24,0.97)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: "32px", opacity: 0, pointerEvents: "none",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="menu-link"
            onClick={() => setOpen(false)}
            style={{
              color: "#C7DBF7",
              fontSize: "clamp(2rem, 8vw, 4rem)",
              fontWeight: 600, textDecoration: "none", letterSpacing: "-0.03em",
            }}
          >
            {link}
          </a>
        ))}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed", top: "20px", right: "40px", zIndex: 101,
          background: "none", border: "none", color: "#C7DBF7",
          fontSize: "22px", display: "none",
        }}
        aria-label="Toggle menu"
      >
        {open ? "✕" : "☰"}
      </button>
    </>
  );
}
