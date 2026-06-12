import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { CanModel } from './CanModel'

export function CanStage() {
  return (
    <div className="can-stage" aria-hidden="true">
      <div className="can-stage__halo" />
      <Canvas
        camera={{ position: [-1.7, 0.5, 6.1], fov: 40 }}
        style={{ position: 'absolute', inset: 0 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={0.6} />
        <directionalLight position={[-4, 2, 2]} intensity={0.32} color="#eef2e2" />

        <Suspense fallback={null}>
          {/* Studio sur mesure : bandes verticales → longs reflets métal */}
          <Environment resolution={512} frames={1}>
            <Lightformer form="rect" color="#ffffff" intensity={3.6}
              position={[-3.2, 0.8, 3.0]} rotation-y={Math.atan2(-3.2, 3.0)} scale={[0.9, 7.5, 1]} />
            <Lightformer form="rect" color="#fdf3e3" intensity={1.5}
              position={[3.2, 0.2, 2.4]} rotation-y={Math.atan2(3.2, 2.4)} scale={[0.9, 7, 1]} />
            <Lightformer form="rect" color="#ffffff" intensity={1.6}
              position={[2.8, 1.4, -2.8]} rotation-y={Math.atan2(2.8, -2.8)} scale={[0.8, 6, 1]} />
            <Lightformer form="ring" color="#ffffff" intensity={0.9}
              position={[0, 5, 1]} rotation-x={-Math.PI / 2} scale={[4, 4, 1]} />
            <Lightformer form="rect" color="#b2c191" intensity={0.5}
              position={[0, -4.5, 1]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
            <Lightformer form="rect" color="#f3efe2" intensity={0.3}
              position={[0, 0, -6]} scale={[14, 10, 1]} />
            <Lightformer form="rect" color="#efece0" intensity={0.25}
              position={[0, 0.5, 6]} rotation-y={Math.PI} scale={[12, 8, 1]} />
          </Environment>
          <CanModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
