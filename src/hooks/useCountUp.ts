import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/scrollState'

/**
 * Compteur animé déclenché à l'entrée dans le viewport.
 * Renvoie une ref à poser sur l'élément et la valeur courante (number).
 */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    let raf = 0
    let started = false

    const run = (t0: number) => {
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - p, 3)
        setValue(target * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true
            run(performance.now())
            io.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [target, duration])

  return { ref, value }
}
