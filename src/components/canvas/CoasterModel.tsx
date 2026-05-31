// src/components/canvas/CoasterModel.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Torus } from "@react-three/drei";
import * as THREE from "three";
import { rimGlowVertexShader, rimGlowFragmentShader } from "@/shaders";
import { useMemo } from "react";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

export default function CoasterModel({ mouseX, mouseY, scrollProgress }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);

  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader:   rimGlowVertexShader,
        fragmentShader: rimGlowFragmentShader,
        uniforms: {
          uColor:     { value: new THREE.Color("#7570BC") },
          uIntensity: { value: 1.8 },
        },
        transparent: true,
        depthWrite:  false,
        side:        THREE.BackSide,
        blending:    THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Mouse tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, mouseY * 0.45, 0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, mouseX * 0.65, 0.04
    );

    // Scroll: recede + sink
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z, -scrollProgress * 5, 0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, -scrollProgress * 2.5, 0.05
    );

    // Fade opacity on deep scroll
    const fadeTarget = Math.max(0, 1 - scrollProgress * 3);
    groupRef.current.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh && mesh.material) {
        const mat = mesh.material as THREE.Material;
        if ("opacity" in mat) {
          (mat as THREE.MeshStandardMaterial).opacity =
            THREE.MathUtils.lerp(
              (mat as THREE.MeshStandardMaterial).opacity ?? 1,
              fadeTarget, 0.05
            );
        }
      }
    });

    // Spin rings
    if (torusRef.current) torusRef.current.rotation.z += delta * 0.12;
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.25;
      innerRef.current.rotation.y += delta * 0.18;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>

        {/* Outer ring */}
        <Torus ref={torusRef} args={[1.85, 0.055, 16, 120]}>
          <meshStandardMaterial
            color="#7570BC" metalness={0.92} roughness={0.08}
            transparent opacity={1}
          />
        </Torus>

        {/* Inner ring */}
        <Torus args={[1.3, 0.035, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#9B96D4" metalness={0.96} roughness={0.04}
            transparent opacity={1}
          />
        </Torus>

        {/* Accent ring */}
        <Torus args={[1.58, 0.018, 8, 80]} rotation={[Math.PI / 5, Math.PI / 6, 0]}>
          <meshStandardMaterial
            color="#C7DBF7" metalness={1} roughness={0}
            transparent opacity={0.5}
          />
        </Torus>

        {/* Core distort sphere */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.68, 64, 64]} />
          <MeshDistortMaterial
            color="#BFC7DE" metalness={0.75} roughness={0.18}
            distort={0.22} speed={1.8} envMapIntensity={2}
            transparent opacity={1}
          />
        </mesh>

        {/* Rim glow shell */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <primitive object={rimMaterial} attach="material" />
        </mesh>

      </Float>
    </group>
  );
}