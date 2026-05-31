// src/components/canvas/CoasterModel.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Torus } from "@react-three/drei";
import * as THREE from "three";
import { rimGlowVertexShader, rimGlowFragmentShader } from "@/shaders";

interface Props {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

export default function CoasterModel({ mouseX, mouseY, scrollProgress }: Props) {
  const groupRef  = useRef<THREE.Group>(null);
  const torusRef  = useRef<THREE.Mesh>(null);
  const innerRef  = useRef<THREE.Mesh>(null);
  const glowRef   = useRef<THREE.Mesh>(null);

  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader:   rimGlowVertexShader,
        fragmentShader: rimGlowFragmentShader,
        uniforms: {
          uColor:     { value: new THREE.Color("#c8b89a") },
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

    // Smooth mouse-driven tilt
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, mouseY * 0.45, 0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, mouseX * 0.65, 0.04
    );

    // Scroll: recede + shift down
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z, -scrollProgress * 5, 0.05
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, -scrollProgress * 2.5, 0.05
    );

    // Opacity fade on deep scroll
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material && "opacity" in mesh.material) {
          (mesh.material as THREE.Material).opacity = THREE.MathUtils.lerp(
            (mesh.material as THREE.MeshStandardMaterial).opacity ?? 1,
            Math.max(0, 1 - scrollProgress * 2.5),
            0.05
          );
        }
      }
    });

    // Continuous slow spin
    if (torusRef.current) torusRef.current.rotation.z += delta * 0.12;
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.25;
      innerRef.current.rotation.y += delta * 0.18;
    }

    // Glow pulse
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.04;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.4}>

        {/* Outer ring */}
        <Torus ref={torusRef} args={[1.85, 0.055, 16, 120]}>
          <meshStandardMaterial
            color="#c8b89a" metalness={0.92} roughness={0.08}
            transparent opacity={1}
          />
        </Torus>

        {/* Inner ring */}
        <Torus args={[1.3, 0.035, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#9a8870" metalness={0.96} roughness={0.04}
            transparent opacity={1}
          />
        </Torus>

        {/* Thin accent ring */}
        <Torus args={[1.58, 0.018, 8, 80]} rotation={[Math.PI / 5, Math.PI / 6, 0]}>
          <meshStandardMaterial
            color="#ffffff" metalness={1} roughness={0}
            transparent opacity={0.3}
          />
        </Torus>

        {/* Distort core sphere */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[0.68, 64, 64]} />
          <MeshDistortMaterial
            color="#ede0cc"
            metalness={0.75}
            roughness={0.18}
            distort={0.22}
            speed={1.8}
            envMapIntensity={2}
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