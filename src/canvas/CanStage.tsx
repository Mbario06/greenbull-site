import { Suspense, lazy, useEffect, useState } from 'react'
import { prefersReducedMotion } from '../lib/scrollState'

// Three.js (~1 Mo) chargé à la demande : seul le mode 3D (desktop) le télécharge.
const Scene = lazy(() => import('./Scene').then((m) => ({ default: m.Scene })))

type Mode = '3d' | 'static' | null

/**
 * Conteneur plein écran, fixe, derrière le contenu : la canette en fond.
 * Repli image statique sur petit écran ou reduced-motion (perf + a11y).
 */
export function CanStage() {
  const [mode, setMode] = useState<Mode>(null)

  useEffect(() => {
    const decide = () => {
      const small = window.innerWidth < 760
      setMode(small || prefersReducedMotion() ? 'static' : '3d')
    }
    decide()
    window.addEventListener('resize', decide)
    return () => window.removeEventListener('resize', decide)
  }, [])

  return (
    <div className="can-stage" aria-hidden="true">
      <div className="can-stage__halo" />
      {mode === '3d' && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      {mode === 'static' && (
        <img
          className="can-stage__static"
          src="/can/front.webp"
          width={1000}
          height={1334}
          alt=""
        />
      )}
    </div>
  )
}
