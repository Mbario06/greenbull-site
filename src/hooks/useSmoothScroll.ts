import { useEffect } from 'react'
import Lenis from 'lenis'
import { scrollState, prefersReducedMotion } from '../lib/scrollState'

/**
 * Initialise le scroll fluide Lenis et alimente `scrollState`
 * (progression + vitesse) consommé par la scène 3D.
 * En mode "reduced motion" : pas de smoothing, simple écoute du scroll natif.
 */
export function useSmoothScroll(): void {
  useEffect(() => {
    const reduced = prefersReducedMotion()

    const updateFromNative = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight
      scrollState.progress = limit > 0 ? window.scrollY / limit : 0
    }

    if (reduced) {
      updateFromNative()
      window.addEventListener('scroll', updateFromNative, { passive: true })
      window.addEventListener('resize', updateFromNative)
      return () => {
        window.removeEventListener('scroll', updateFromNative)
        window.removeEventListener('resize', updateFromNative)
      }
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      anchors: true,
    })

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      scrollState.progress = e.progress
      scrollState.velocity = e.velocity
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
