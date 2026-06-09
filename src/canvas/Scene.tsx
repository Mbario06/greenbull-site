import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  Lightformer,
  ContactShadows,
  Float,
  AdaptiveDpr,
  Preload,
} from '@react-three/drei'
import * as THREE from 'three'
import { Can } from './Can'
import { prefersReducedMotion } from '../lib/scrollState'

export function Scene() {
  const reduced = prefersReducedMotion()

  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
      camera={{ fov: 28, near: 0.1, far: 100, position: [0, 0.05, 6.2] }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
      shadows={false}
    >
      <AdaptiveDpr pixelated />

      <Suspense fallback={null}>
        <group position={[0, -0.05, 0]}>
          {reduced ? (
            <Can idle={0} />
          ) : (
            <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.45} floatingRange={[-0.04, 0.06]}>
              <Can />
            </Float>
          )}
        </group>

        <ContactShadows
          position={[0, -1.32, 0]}
          opacity={0.5}
          scale={5}
          blur={2.8}
          far={3.2}
          resolution={512}
          color="#2a3318"
          frames={1}
        />

        {/* Rig studio : key douce + fills + rim + bandes verticales (reflets canette) */}
        <Environment resolution={512} frames={1} environmentIntensity={1.05}>
          <color attach="background" args={['#0a0c08']} />
          <Lightformer
            form="rect"
            intensity={3.2}
            color="#fffaf0"
            scale={[8, 8, 1]}
            position={[0, 6, 1]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#eaf2ff"
            scale={[5, 4, 1]}
            position={[-6, 1.5, 3]}
            rotation={[0, Math.PI / 3, 0]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#fff0d8"
            scale={[5, 4, 1]}
            position={[6, 1, 2]}
            rotation={[0, -Math.PI / 3, 0]}
          />
          {/* bandes verticales -> reflets allongés sur le métal */}
          <Lightformer
            form="rect"
            intensity={5}
            color="#ffffff"
            scale={[0.4, 7, 1]}
            position={[-1.6, 0, 4]}
          />
          <Lightformer
            form="rect"
            intensity={3.5}
            color="#ffffff"
            scale={[0.25, 6, 1]}
            position={[1.8, 0, 3.5]}
          />
          <Lightformer
            form="ring"
            intensity={2.5}
            color="#cfe0b8"
            scale={3}
            position={[3, 3, -4]}
          />
        </Environment>

        {/* léger éclairage direct pour le galbe */}
        <directionalLight position={[2, 4, 3]} intensity={0.45} color="#fff6e6" />
        <ambientLight intensity={0.12} />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
