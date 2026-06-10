import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { CanModel } from './CanModel'

/** Invalide le canvas toutes les 50 ms → float animation visible en frameloop="demand" */
function Invalidator() {
  const { invalidate } = useThree()
  useEffect(() => {
    const id = setInterval(invalidate, 50)
    return () => clearInterval(id)
  }, [invalidate])
  return null
}

export function CanStage() {
  return (
    <div className="can-stage" aria-hidden="true">
      <div className="can-stage__halo" />
      <Canvas
        frameloop="demand"
        camera={{ position: [-1.62, 0.08, 6.0], fov: 40 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Invalidator />

        {/* Lumières — hors Suspense (pas de texture) */}
        <ambientLight intensity={0.25} />
        <directionalLight position={[2, 4, 3]}  intensity={0.6} />
        <directionalLight position={[-3, 1, 2]} intensity={0.3} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <CanModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
