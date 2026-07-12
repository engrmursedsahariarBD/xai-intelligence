'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

function Globe({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));

  const nodes = useMemo(() => {
    const list: THREE.Vector3[] = [];
    const count = 140;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      list.push(new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius).multiplyScalar(2.1));
    }
    return list;
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (!groupRef.current) return;

    // Smooth pointer follow
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, delta * 4);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, delta * 4);

    const t = state.clock.getElapsedTime();

    // Idle + pointer tilt + scroll windup
    groupRef.current.rotation.y = t * 0.12 + pointer.current.x * 0.6 + progress * Math.PI * 1.4;
    groupRef.current.rotation.x = pointer.current.y * -0.35;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[2.1, 3]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.14} />
      </mesh>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65 + (i % 5) * 0.06} />
        </mesh>
      ))}

      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshPhysicalMaterial
          color="#050505"
          emissive="#ffffff"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

function canCreateWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Wireframe globe of insight-nodes.
 * - idles on its own
 * - tilts toward pointer
 * - winds up further as section scrolls into view
 * Falls back to a non-WebGL static ring if WebGL is unavailable.
 */
export default function SmartGlobe({ progress = 0 }: { progress?: number }) {
  const [supported, setSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setSupported(canCreateWebGL());
    setReducedMotion(prefersReducedMotion());
  }, []);

  if (!supported) {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: '1px solid var(--border-strong)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 24,
              borderRadius: '50%',
              border: '1px dashed var(--border)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 14,
              height: 14,
              marginLeft: -7,
              marginTop: -7,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 0 40px 8px rgba(255,255,255,0.35)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 45 }}
        gl={{ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false }}
        onError={() => setSupported(false)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <Globe progress={progress} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

