// src/components/sections/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const buttonsRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Badge slides down
    tl.from(badgeRef.current, {
      y: -20, opacity: 0, duration: 0.8, ease: "power3.out",
    }, 0.4)

    // Buttons fade up
    .from(buttonsRef.current, {
      y: 30, opacity: 0, duration: 1, ease: "power3.out",
    }, 1.2)

    // Scroll indicator
    .from(scrollRef.current, {
      opacity: 0, duration: 0.8,
    }, 1.8);

    // Animate the scroll line infinitely
    gsap.to(lineRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 1.2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        zIndex: 1,
      }}
    >
      {/* Badge */}
      <div
        ref={badgeRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
          marginBottom: "32px",
          backdropFilter: "blur(10px)",
        }}
      >
        <span style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: "#4ade80",
          boxShadow: "0 0 8px #4ade80",
          display: "inline-block",
        }} />
        <span style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.06em",
        }}>
          NOW IN EARLY ACCESS
        </span>
      </div>

      {/* Main heading */}
      <TextReveal
        as="h1"
        delay={0.6}
        style={{
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "#ffffff",
          maxWidth: "900px",
          marginBottom: "24px",
        }}
      >
        Rice farming meets intelligence
      </TextReveal>

      {/* Sub heading */}
      <TextReveal
        as="p"
        delay={1.0}
        style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "rgba(255,255,255,0.4)",
          maxWidth: "480px",
          lineHeight: 1.75,
          marginBottom: "48px",
        }}
      >
        AI powered crop monitoring, yield prediction and precision tools for modern rice farmers.
      </TextReveal>

      {/* CTA Buttons */}
      <div
        ref={buttonsRef}
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <MagneticButton variant="primary">
          Start for free →
        </MagneticButton>
        <MagneticButton variant="outline">
          Watch demo
        </MagneticButton>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{
          fontSize: "10px",
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.25)",
        }}>
          SCROLL
        </span>
        <div style={{
          width: "1px",
          height: "48px",
          background: "rgba(255,255,255,0.15)",
          overflow: "hidden",
          position: "relative",
        }}>
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              background: "rgba(255,255,255,0.8)",
            }}
          />
        </div>
      </div>
    </section>
  );
}