import { useEffect, useRef } from 'react'
import { scrollState, prefersReducedMotion } from '../lib/scrollState'

// Turntable par fondu enchaîné de VRAIS rendus alignés (face → 3/4 → dos).
// Aucune déformation : chaque frame est une photo nette de la canette.
const FRAMES = ['/can/turn-0.webp', '/can/turn-1.webp', '/can/turn-2.webp', '/can/turn-3.webp']

/**
 * Canette en fond (fixe) : la rotation est simulée en croisant les rendus réels
 * selon la progression du scroll. Flottement et parallaxe légers en sus.
 */
export function CanStage() {
  const wrap = useRef<HTMLDivElement>(null)
  const frames = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    let raf = 0

    // La canette n'est visible que dans le haut de page (hero + interludes,
    // ~26 % du scroll) ; on y concentre la rotation complète face → dos.
    const ROT_END = 0.26

    const loop = () => {
      const p = scrollState.progress
      const pos = Math.min(1, p / ROT_END) * (FRAMES.length - 1)
      const idx = Math.min(FRAMES.length - 2, Math.floor(pos))
      const frac = pos - idx

      for (let i = 0; i < frames.current.length; i++) {
        const el = frames.current[i]
        if (!el) continue
        const o = i === idx ? 1 - frac : i === idx + 1 ? frac : 0
        el.style.opacity = o.toFixed(3)
      }

      if (wrap.current) {
        const floatY = reduced ? 0 : Math.sin(performance.now() / 1000 * 0.9) * 8
        const lift = reduced ? 0 : -p * 26
        const scale = 1 + (reduced ? 0 : p * 0.02)
        wrap.current.style.transform =
          `translate(-50%, calc(-50% + ${(floatY + lift).toFixed(1)}px)) scale(${scale.toFixed(3)})`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="can-stage" aria-hidden="true">
      <div className="can-stage__halo" />
      <div className="can-stage__turn" ref={wrap}>
        {FRAMES.map((src, i) => (
          <img
            key={src}
            ref={(el) => {
              frames.current[i] = el
            }}
            className="can-stage__frame"
            src={src}
            style={{ opacity: i === 0 ? 1 : 0 }}
            width={880}
            height={1340}
            alt=""
            loading="eager"
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        ))}
      </div>
    </div>
  )
}
