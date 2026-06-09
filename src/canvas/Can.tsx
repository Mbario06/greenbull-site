import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createLabelTexture } from './labelTexture'
import { scrollState, prefersReducedMotion } from '../lib/scrollState'

const R = 0.5
const BODY_H = 2.0
const TOP = BODY_H / 2 // 1.0
const BOT = -BODY_H / 2 // -1.0

// Décalage de base pour que la FACE de l'étiquette regarde la caméra (+Z).
const FRONT_OFFSET = Math.PI
// Nombre de tours sur toute la page.
const TURNS = 1.8

interface CanProps {
  /** dérive d'auto-rotation au repos, en rad/s (0 = face stable au scroll 0) */
  idle?: number
}

export function Can({ idle = 0 }: CanProps) {
  const group = useRef<THREE.Group>(null)
  const [label, setLabel] = useState<THREE.CanvasTexture | null>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    let alive = true
    let created: THREE.CanvasTexture | null = null
    createLabelTexture().then((tex) => {
      created = tex
      if (alive) setLabel(tex)
      else tex.dispose()
    })
    return () => {
      alive = false
      created?.dispose()
    }
  }, [])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const spin = reduced ? 0 : state.clock.elapsedTime * idle
    const target = FRONT_OFFSET + scrollState.progress * Math.PI * 2 * TURNS + spin
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, target, 0.11)
  })

  return (
    <group ref={group} rotation={[0.05, FRONT_OFFSET, 0.02]}>
      {/* ---- corps habillé ---- */}
      <mesh castShadow>
        <cylinderGeometry args={[R, R, BODY_H, 120, 1, true]} />
        <meshPhysicalMaterial
          key={label ? 'labeled' : 'plain'}
          map={label ?? undefined}
          color={label ? '#ffffff' : '#f1ead9'}
          metalness={0}
          roughness={0.58}
          clearcoat={0.25}
          clearcoatRoughness={0.32}
          envMapIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ---- épaule (rétreint vers le col) ---- */}
      <mesh position={[0, TOP + 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.36, R, 0.18, 120, 1, true]} />
        <AluMaterial />
      </mesh>

      {/* ---- paroi de col ---- */}
      <mesh position={[0, TOP + 0.21, 0]} castShadow>
        <cylinderGeometry args={[0.355, 0.36, 0.07, 120, 1, true]} />
        <AluMaterial />
      </mesh>

      {/* ---- sertissage haut (rim) ---- */}
      <mesh position={[0, TOP + 0.245, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.35, 0.018, 18, 120]} />
        <AluMaterial bright />
      </mesh>

      {/* ---- couvercle (légèrement enfoncé) ---- */}
      <mesh position={[0, TOP + 0.235, 0]}>
        <cylinderGeometry args={[0.338, 0.338, 0.02, 120]} />
        <AluMaterial dark />
      </mesh>

      {/* ---- languette (anneau + rivet) ---- */}
      <mesh position={[0, TOP + 0.248, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.11, 0.01, 12, 48]} />
        <AluMaterial bright />
      </mesh>
      <mesh position={[0, TOP + 0.249, -0.02]}>
        <cylinderGeometry args={[0.022, 0.022, 0.012, 24]} />
        <AluMaterial bright />
      </mesh>

      {/* ---- chanfrein de base ---- */}
      <mesh position={[0, BOT - 0.03, 0]} castShadow>
        <cylinderGeometry args={[R, 0.45, 0.06, 120, 1, true]} />
        <AluMaterial />
      </mesh>

      {/* ---- creux de base ---- */}
      <mesh position={[0, BOT - 0.075, 0]}>
        <cylinderGeometry args={[0.45, 0.4, 0.07, 120, 1, true]} />
        <AluMaterial dark />
      </mesh>
      <mesh position={[0, BOT - 0.108, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.01, 120]} />
        <AluMaterial dark />
      </mesh>
    </group>
  )
}

function AluMaterial({ bright, dark }: { bright?: boolean; dark?: boolean }) {
  const color = dark ? '#a8aaac' : bright ? '#e6e7e9' : '#d2d3d6'
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={1}
      roughness={dark ? 0.46 : 0.3}
      clearcoat={0.5}
      clearcoatRoughness={0.18}
      anisotropy={0.35}
      anisotropyRotation={Math.PI / 2}
      envMapIntensity={dark ? 0.8 : 1.15}
    />
  )
}
