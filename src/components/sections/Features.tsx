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
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const itemsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    if (!section || !sticky) return;

    // Pin the sticky container for the full scroll height
    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: sticky,
      pinSpacing: false,
    });

    // Animate each feature in/out as we scroll through
    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      const total = FEATURES.length;

      // Each feature occupies 1/total of the scroll range
      const start = i / total;
      const end   = (i + 1) / total;

      // Fade IN
      ScrollTrigger.create({
        trigger: section,
        start: `${start * 100}% top`,
        end:   `${(start + 0.08) * 100}% top`,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(item, {
            opacity: self.progress,
            y: (1 - self.progress) * 50,
          });
        },
      });

      // Fade OUT
      if (i < total - 1) {
        ScrollTrigger.create({
          trigger: section,
          start: `${(end - 0.08) * 100}% top`,
          end:   `${end * 100}% top`,
          scrub: 1,
          onUpdate: (self) => {
            gsap.set(item, {
              opacity: 1 - self.progress,
              y: -self.progress * 40,
            });
          },
        });
      }
    });

    // Animate progress line
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (lineRef.current) {
          gsap.set(lineRef.current, {
            scaleY: self.progress,
          });
        }
      },
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
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 max(40px, 6vw)",
        }}
      >
        {/* Left: section label + progress */}
        <div
          style={{
            position: "absolute",
            left: "max(40px, 6vw)",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.25)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              marginBottom: "12px",
            }}
          >
            FEATURES
          </span>

          {/* Progress track */}
          <div
            ref={progressRef}
            style={{
              width: "1px",
              height: "120px",
              background: "rgba(255,255,255,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              ref={lineRef}
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255,255,255,0.6)",
                transformOrigin: "top center",
                transform: "scaleY(0)",
              }}
            />
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
            {FEATURES.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 4, height: 4,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Center: feature content stack */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
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
              {/* Feature number */}
              <div
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.25)",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 24, height: "1px",
                    background: feature.accent,
                  }}
                />
                {feature.number}
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "100px",
                    border: `1px solid ${feature.accent}40`,
                    color: feature.accent,
                    fontSize: "10px",
                  }}
                >
                  {feature.tag}
                </span>
              </div>

              {/* Feature title */}
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: "#ffffff",
                  marginBottom: "24px",
                }}
              >
                {feature.title}
              </h2>

              {/* Feature description */}
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.8,
                  maxWidth: "440px",
                  margin: "0 auto",
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right: feature number large bg */}
        <div
          style={{
            position: "absolute",
            right: "max(40px, 6vw)",
            fontSize: "clamp(6rem, 14vw, 16rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.02)",
            letterSpacing: "-0.06em",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {FEATURES[0].number}
        </div>
      </div>
    </section>
  );
}