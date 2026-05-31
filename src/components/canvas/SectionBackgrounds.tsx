// src/components/canvas/SectionBackgrounds.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

// ── Pre-computed module-level data (Math.random() out of render) ──

const _statsPos = (() => {
  const N = 1100;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const phi   = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r     = 3.6 + (Math.random() - 0.5) * 0.35;
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  return pos;
})();

const _CRYSTAL_COLORS = ["#e879f9", "#a78bfa", "#38bdf8", "#34d399", "#fb923c", "#f472b6"];
const _crystalShapes = Array.from({ length: 16 }, (_, i) => ({
  pos:   new THREE.Vector3(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    -2 - Math.random() * 3
  ),
  baseY: (Math.random() - 0.5) * 6,
  scale: 0.07 + Math.random() * 0.24,
  speed: 0.25 + Math.random() * 0.6,
  color: _CRYSTAL_COLORS[i % _CRYSTAL_COLORS.length],
  type:  i % 3,
  phase: Math.random() * Math.PI * 2,
}));

const _starPos = (() => {
  const N = 2000;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 24;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 2] = -3 - Math.random() * 7;
  }
  return pos;
})();

const _cloudPos = (() => {
  const N = 400;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 1.5 + Math.random() * 3;
    const a = Math.random() * Math.PI * 2;
    pos[i * 3]     = Math.cos(a) * r + (Math.random() - 0.5) * 2;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
    pos[i * 3 + 2] = -5 - Math.random() * 3;
  }
  return pos;
})();

// ── Fade helper ───────────────────────────────
function vis(sp: number, inAt: number, outAt: number): number {
  const f = 0.035;
  if (sp < inAt  - f) return 0;
  if (sp > outAt + f) return 0;
  const i = Math.min((sp - (inAt  - f)) / f, 1);
  const o = Math.min(((outAt + f) - sp) / f, 1);
  return Math.min(i, o);
}

// ══════════════════════════════════════════════
// STATS — Glowing particle globe
// ══════════════════════════════════════════════
function StatsGlobe({ v, mx, my }: { v: number; mx: number; my: number }) {
  const ref  = useRef<THREE.Points>(null);
  const rRef = useRef<THREE.Mesh>(null);
  const r2   = useRef<THREE.Mesh>(null);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(_statsPos, 3));
    return g;
  }, []);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.065;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, my * 0.22, 0.025);
      (ref.current.material as THREE.PointsMaterial).opacity = v * 0.55;
    }
    if (rRef.current) {
      rRef.current.rotation.y = t * 0.09;
      rRef.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.18) * 0.08;
      (rRef.current.material as THREE.MeshStandardMaterial).opacity = v * 0.18;
    }
    if (r2.current) {
      r2.current.rotation.y = -t * 0.06;
      r2.current.rotation.z = Math.PI / 3 + Math.cos(t * 0.14) * 0.06;
      (r2.current.material as THREE.MeshStandardMaterial).opacity = v * 0.12;
    }
  });

  return (
    <>
      <points ref={ref} geometry={geo}>
        <pointsMaterial
          size={0.022} color="#60a5fa" transparent opacity={v * 0.55}
          sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending}
        />
      </points>
      <mesh ref={rRef}>
        <torusGeometry args={[3.6, 0.007, 8, 128]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={v * 0.18} depthWrite={false} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[3.6, 0.005, 8, 128]} />
        <meshStandardMaterial color="#bfdbfe" transparent opacity={v * 0.12} depthWrite={false} />
      </mesh>
    </>
  );
}

// ══════════════════════════════════════════════
// TESTIMONIALS — Floating wireframe crystals
// ══════════════════════════════════════════════
function TestimonialsCrystals({ v, mx, my }: { v: number; mx: number; my: number }) {
  const shapes = _crystalShapes;

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.x += 0.005 * shapes[i].speed;
      m.rotation.y += 0.008 * shapes[i].speed;
      m.position.y  = shapes[i].baseY + Math.sin(t * 0.3 * shapes[i].speed + shapes[i].phase) * 0.4;
      m.position.x  = shapes[i].pos.x + mx * 0.18;
      (m.material as THREE.MeshStandardMaterial).opacity = v * 0.45;
    });
  });

  return (
    <>
      {shapes.map((sh, i) => (
        <mesh
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={sh.pos.clone()}
          scale={sh.scale}
        >
          {sh.type === 0 && <octahedronGeometry  args={[1, 0]} />}
          {sh.type === 1 && <icosahedronGeometry args={[1, 0]} />}
          {sh.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={sh.color} transparent opacity={v * 0.45} wireframe
          />
        </mesh>
      ))}
    </>
  );
}

// ══════════════════════════════════════════════
// PRICING — Wireframe torus knot + orbit rings
// ══════════════════════════════════════════════
function PricingKnot({ v, mx, my }: { v: number; mx: number; my: number }) {
  const kRef = useRef<THREE.Mesh>(null);
  const rings = useMemo(() => [
    { r: 3.3, tube: 0.006, color: "#a855f7", speed:  0.07, rx: Math.PI / 2, rz: 0 },
    { r: 4.2, tube: 0.004, color: "#7c3aed", speed: -0.05, rx: Math.PI / 3, rz: 0.3 },
    { r: 2.7, tube: 0.008, color: "#c084fc", speed:  0.11, rx: 0.4,         rz: 0.6 },
  ], []);
  const rRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (kRef.current) {
      kRef.current.rotation.x = t * 0.065 + my * 0.45;
      kRef.current.rotation.y = t * 0.10  + mx * 0.45;
      (kRef.current.material as THREE.MeshStandardMaterial).opacity = v * 0.28;
    }
    rRefs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.y = t * rings[i].speed;
      (m.material as THREE.MeshStandardMaterial).opacity = v * 0.22;
    });
  });

  return (
    <>
      <mesh ref={kRef} scale={1.9}>
        <torusKnotGeometry args={[1, 0.28, 140, 20, 2, 3]} />
        <meshStandardMaterial color="#c084fc" transparent opacity={v * 0.28} wireframe />
      </mesh>
      {rings.map((r, i) => (
        <mesh
          key={i}
          ref={(el) => (rRefs.current[i] = el)}
          rotation={[r.rx, 0, r.rz]}
        >
          <torusGeometry args={[r.r, r.tube, 8, 110]} />
          <meshStandardMaterial
            color={r.color} transparent opacity={v * 0.22} depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

// ══════════════════════════════════════════════
// FOOTER — Starfield + nebula clouds
// ══════════════════════════════════════════════
function FooterStars({ v }: { v: number }) {
  const starRef  = useRef<THREE.Points>(null);
  const cloudRef = useRef<THREE.Points>(null);

  const starGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(_starPos, 3));
    return g;
  }, []);

  const cloudGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(_cloudPos, 3));
    return g;
  }, []);

  useFrame((s) => {
    if (starRef.current) {
      starRef.current.rotation.z = s.clock.elapsedTime * 0.007;
      (starRef.current.material as THREE.PointsMaterial).opacity = v * 0.7;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = s.clock.elapsedTime * 0.04;
      (cloudRef.current.material as THREE.PointsMaterial).opacity = v * 0.3;
    }
  });

  return (
    <>
      <points ref={starRef} geometry={starGeo}>
        <pointsMaterial size={0.011} color="#ffffff" transparent
          opacity={v * 0.7} sizeAttenuation depthWrite={false} />
      </points>
      <points ref={cloudRef} geometry={cloudGeo}>
        <pointsMaterial size={0.035} color="#a78bfa" transparent
          opacity={v * 0.3} sizeAttenuation depthWrite={false}
          blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

// ══════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════
export default function SectionBackgrounds({ mouseX, mouseY, scrollProgress }: Props) {
  const sp = scrollProgress;

  // ── Adjust these if sections don't match ──
  const statsV  = vis(sp, 0.40, 0.57);
  const testimV = vis(sp, 0.55, 0.74);
  const priceV  = vis(sp, 0.72, 0.89);
  const footV   = vis(sp, 0.87, 1.00);

  return (
    <>
      {statsV  > 0.01 && <StatsGlobe           v={statsV}  mx={mouseX} my={mouseY} />}
      {testimV > 0.01 && <TestimonialsCrystals  v={testimV} mx={mouseX} my={mouseY} />}
      {priceV  > 0.01 && <PricingKnot           v={priceV}  mx={mouseX} my={mouseY} />}
      {footV   > 0.01 && <FooterStars           v={footV} />}
    </>
  );
}