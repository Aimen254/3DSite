// src/components/canvas/GlassJar.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

// ── Scroll zones ──────────────────────────────
const S = {
  HERO_END:     0.08,
  MOVE_END:     0.15,
  FEATURES_END: 0.42,
  FADE_END:     0.54,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GlassJar({ mouseX, mouseY, scrollProgress }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef   = useRef<THREE.Group>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const sp = scrollProgress;

  // ── Scroll-driven position ────────────────
  let tx = 2.0, ty = -0.2, tz = 1.2, ts = 1.0;

  if (sp < S.HERO_END) {
    // Hero: forward + right — feels like a popup product
    tx = 2.0; ty = -0.2; tz = 1.2; ts = 1.0;

  } else if (sp < S.MOVE_END) {
    // Slide right into features column
    const p = (sp - S.HERO_END) / (S.MOVE_END - S.HERO_END);
    tx = lerp(2.0,  2.6, p);
    ty = lerp(-0.2, 0.1, p);
    tz = lerp(1.2,  0.2, p);
    ts = lerp(1.0,  0.82, p);

  } else if (sp < S.FEATURES_END) {
    // Pinned in features section — right column
    tx = 2.6; ty = 0.1; tz = 0.2; ts = 0.82;

  } else if (sp < S.FADE_END) {
    // Exit: drift away
    const p = (sp - S.FEATURES_END) / (S.FADE_END - S.FEATURES_END);
    tx = lerp(2.6, 5.5, p);
    ty = lerp(0.1, -2.5, p);
    ts = lerp(0.82, 0.0, p);
  } else {
    ts = 0;
  }

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;

    // Smooth lerp to target transform
    g.position.x = THREE.MathUtils.lerp(g.position.x, tx,  0.055);
    g.position.y = THREE.MathUtils.lerp(g.position.y, ty,  0.055);
    g.position.z = THREE.MathUtils.lerp(g.position.z, tz,  0.055);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x,  ts,  0.055));

    // Mouse-driven tilt
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouseY * 0.28, 0.04);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mouseX * 0.38, 0.04);

    // Lid subtle breathing wobble
    if (lidRef.current) {
      lidRef.current.rotation.z =
        -0.38 + Math.sin(state.clock.elapsedTime * 0.9) * 0.025;
      lidRef.current.rotation.x =
        0.18 + Math.cos(state.clock.elapsedTime * 0.7) * 0.015;
    }

    // Glow halo pulse
    if (glowRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
      glowRef.current.scale.setScalar(s);
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.12 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    }
  });

  // Glass material preset
  const glass = {
    color:               "#f5f0ea" as const,
    transmission:        0.96,
    roughness:           0.03,
    ior:                 1.50,
    chromaticAberration: 0.022,
    samples:             4,
    backside:            true  as const,
    envMapIntensity:     2.2,
  };

  return (
    <group ref={groupRef} position={[2.0, -0.2, 1.2]}>
      <Float speed={1.5} rotationIntensity={0.09} floatIntensity={0.32}>

        {/* ── Popup glow disc behind jar ───── */}
        <mesh ref={glowRef} position={[0, 0, -0.15]} rotation={[0, 0, 0]}>
          <circleGeometry args={[1.2, 48]} />
          <meshStandardMaterial
            color="#f5a623"
            emissive="#f5a623"
            emissiveIntensity={0.15}
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* ── Outer glow ring ──────────────── */}
        <mesh position={[0, 0, -0.14]}>
          <ringGeometry args={[1.05, 1.25, 64]} />
          <meshStandardMaterial
            color="#f5a623"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* ── Jar bottom (thick base glass) ── */}
        <mesh position={[0, -0.34, 0]}>
          <cylinderGeometry args={[0.60, 0.57, 0.07, 48]} />
          <MeshTransmissionMaterial {...glass} thickness={0.55} />
        </mesh>

        {/* ── Jar body ─────────────────────── */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.63, 0.60, 0.56, 48]} />
          <MeshTransmissionMaterial {...glass} thickness={0.22} />
        </mesh>

        {/* ── Jar top rim ring ─────────────── */}
        <mesh position={[0, 0.24, 0]}>
          <torusGeometry args={[0.615, 0.022, 8, 64]} />
          <meshStandardMaterial
            color="#c8c8c8" metalness={0.4} roughness={0.25}
          />
        </mesh>

        {/* ── Cream fill (visible through glass) */}
        <mesh position={[0, 0.10, 0]}>
          <cylinderGeometry args={[0.57, 0.57, 0.24, 32]} />
          <meshStandardMaterial
            color="#edddd4" roughness={0.88} metalness={0}
            transparent opacity={0.96}
          />
        </mesh>

        {/* ── Cream top surface ──────────────── */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.565, 0.565, 0.012, 32]} />
          <meshStandardMaterial color="#f0e0d6" roughness={0.95} />
        </mesh>

        {/* ── Cream surface swirl bump ─────── */}
        <mesh position={[0.12, 0.232, 0.12]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#f5e8e2" roughness={0.96} />
        </mesh>

        {/* ══════════════════════════════════ */}
        {/* LID GROUP — open/tilted like image */}
        {/* ══════════════════════════════════ */}
        <group
          ref={lidRef}
          position={[0.22, 0.58, 0.05]}
          rotation={[0.18, 0, -0.38]}
        >
          {/* Lid outer body (orange) */}
          <mesh>
            <cylinderGeometry args={[0.68, 0.66, 0.24, 48]} />
            <meshStandardMaterial
              color="#f0920a"
              metalness={0.05}
              roughness={0.42}
            />
          </mesh>

          {/* Lid top flat face */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.68, 0.68, 0.02, 48]} />
            <meshStandardMaterial
              color="#f5a020"
              metalness={0.08}
              roughness={0.38}
            />
          </mesh>

          {/* Lid inner white liner */}
          <mesh position={[0, -0.03, 0]}>
            <cylinderGeometry args={[0.60, 0.60, 0.16, 40]} />
            <meshStandardMaterial color="#f8f5f2" roughness={0.55} />
          </mesh>

          {/* Lid bottom rim detail */}
          <mesh position={[0, -0.12, 0]}>
            <torusGeometry args={[0.655, 0.016, 8, 64]} />
            <meshStandardMaterial
              color="#d07800" metalness={0.2} roughness={0.3}
            />
          </mesh>

          {/* Lid top rim detail */}
          <mesh position={[0, 0.135, 0]}>
            <torusGeometry args={[0.655, 0.012, 8, 64]} />
            <meshStandardMaterial
              color="#e08810" metalness={0.15} roughness={0.35}
            />
          </mesh>

          {/* Lid inner groove ring */}
          <mesh position={[0, -0.01, 0]}>
            <torusGeometry args={[0.58, 0.01, 6, 48]} />
            <meshStandardMaterial color="#e0ddd8" roughness={0.5} />
          </mesh>
        </group>

      </Float>
    </group>
  );
}