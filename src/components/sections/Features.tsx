// src/components/sections/Features.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FEATURES = [
  {
    number: "01",
    title: "AI Crop Monitoring",
    description:
      "Satellite and drone imagery analysed in real time. Know the health of every hectare before you step outside.",
    tag: "Monitoring",
    accent: "#4ade80",
  },
  {
    number: "02",
    title: "Yield Prediction",
    description:
      "Machine learning models trained on 10 years of regional data give you harvest forecasts weeks in advance.",
    tag: "Forecasting",
    accent: "#60a5fa",
  },
  {
    number: "03",
    title: "Precision Irrigation",
    description:
      "Soil moisture sensors combined with weather data automatically schedule water delivery to the nearest litre.",
    tag: "Automation",
    accent: "#f59e0b",
  },
  {
    number: "04",
    title: "Market Intelligence",
    description:
      "Live commodity prices, buyer connections, and optimal sell-timing recommendations — all in one dashboard.",
    tag: "Insights",
    accent: "#e879f9",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const itemsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef    = useRef<HTMLDivElement>(null);
  const dotRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activateDot = (i: number) => {
      dotRefs.current.forEach((d, j) => {
        if (!d) return;
        d.style.background = j === i ? "#C7DBF7" : "rgba(117,112,188,0.4)";
        d.style.transform  = j === i ? "scale(1.5)" : "scale(1)";
      });
    };
    const deactivateDot = (i: number) => {
      if (dotRefs.current[i])
        dotRefs.current[i]!.style.background = "rgba(117,112,188,0.4)";
    };

    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    if (!section || !sticky) return;

    // Pin the sticky view
    const pin = ScrollTrigger.create({
      trigger:    section,
      start:      "top top",
      end:        "bottom bottom",
      pin:        sticky,
      pinSpacing: false,
    });

    // Fade each feature in/out
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const total = FEATURES.length;
      const start = i / total;
      const end   = (i + 1) / total;

      // Fade in
      ScrollTrigger.create({
        trigger: section,
        start: `${start * 100}% top`,
        end:   `${(start + 0.08) * 100}% top`,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(item, { opacity: self.progress, y: (1 - self.progress) * 50 });
        },
      });

      // Fade out (not last)
      if (i < total - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: `${(end - 0.08) * 100}% top`,
          end:   `${end * 100}% top`,
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(item, { opacity: 1 - self.progress, y: -self.progress * 40 });
          },
        });
      }

      // Activate dot
      ScrollTrigger.create({
        trigger: section,
        start: `${start * 100}% top`,
        end:   `${end * 100}% top`,
        onEnter:     () => activateDot(i),
        onEnterBack: () => activateDot(i),
        onLeave:     () => deactivateDot(i),
        onLeaveBack: () => deactivateDot(i),
      });
    });

    // Progress line
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end:   "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (lineRef.current)
          gsap.set(lineRef.current, { scaleY: self.progress });
      },
    });

    // Hint ring pulse
    gsap.to(hintRef.current, {
      scale: 1.06,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${FEATURES.length * 100}vh`,
        zIndex: 1,
      }}
    >
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "0 max(40px, 6vw)",
          gap: "24px",
        }}
      >
        {/* ── LEFT: progress + feature text ── */}
        <div style={{ position: "relative" }}>
          {/* Section label + vertical progress */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
          }}>
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(191,199,222,0.55)",
            }}>
              FEATURES
            </span>

            {/* Progress track */}
            <div style={{
              width: "80px", height: "1px",
              background: "rgba(117,112,188,0.2)",
              position: "relative",
              overflow: "hidden",
            }}>
              <div
                ref={lineRef}
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%", height: "100%",
                  background: "rgba(199,219,247,0.85)",
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />
            </div>

            {/* Step dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {FEATURES.map((_, i) => (
                <div
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  style={{
                    width: 5, height: 5,
                    borderRadius: "50%",
                    background: "rgba(117,112,188,0.4)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Feature cards stack */}
          <div style={{ position: "relative", minHeight: "280px" }}>
            {FEATURES.map((feature, i) => (
              <div
                key={feature.number}
                ref={(el) => { itemsRef.current[i] = el; }}
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0, left: 0, right: 0,
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? "none" : "translateY(50px)",
                }}
              >
                {/* Number + tag */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}>
                  <span style={{
                    display: "inline-block",
                    width: 28, height: "1px",
                    background: feature.accent,
                  }} />
                  <span style={{
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "rgba(191,199,222,0.55)",
                  }}>
                    {feature.number}
                  </span>
                  <span style={{
                    padding: "3px 12px",
                    borderRadius: "100px",
                    border: `1px solid ${feature.accent}50`,
                    color: feature.accent,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                  }}>
                    {feature.tag.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: "#C7DBF7",
                  marginBottom: "20px",
                }}>
                  {feature.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                  color: "rgba(191,199,222,0.78)",
                  lineHeight: 1.8,
                  maxWidth: "380px",
                }}>
                  {feature.description}
                </p>

                {/* Learn more */}
                <div style={{
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                  color: feature.accent,
                  cursor: "pointer",
                }}>
                  <span>Learn more</span>
                  <span style={{ fontSize: "16px" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: bottle container hint ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
        }}>
          {/* Subtle glow container where bottle appears */}
          <div
            ref={hintRef}
            style={{
              width: "260px",
              height: "440px",
              borderRadius: "130px",
              border: "1px solid rgba(117,112,188,0.12)",
              background:
                "radial-gradient(ellipse 60% 80% at 50% 60%, rgba(99,155,255,0.06) 0%, transparent 70%)",
              position: "relative",
            }}
          >
            {/* Faint vertical line */}
            <div style={{
              position: "absolute",
              top: "10%",
              left: "50%",
              width: "1px",
              height: "80%",
              background: "linear-gradient(to bottom, transparent, rgba(117,112,188,0.12), transparent)",
              transform: "translateX(-50%)",
            }} />
          </div>

          {/* Corner labels */}
          {["Organic", "Premium", "Traceable"].map((label, i) => (
            <div
              key={label}
              style={{
                position: "absolute",
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "rgba(191,199,222,0.45)",
                ...(i === 0 && { top: "25%",  left: "5%"  }),
                ...(i === 1 && { top: "50%",  left: "2%"  }),
                ...(i === 2 && { top: "72%",  left: "5%"  }),
              }}
            >
              {label.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}