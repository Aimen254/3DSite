// src/lib/gsap.ts
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register all plugins here once
gsap.registerPlugin(ScrollTrigger);

// Default eases used across the site
gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

export { gsap, ScrollTrigger };