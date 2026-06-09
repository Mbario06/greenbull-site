import { useEffect } from 'react'

/**
 * Révèle les éléments `.reveal` à l'entrée dans le viewport (ajoute `.is-in`).
 * Un seul IntersectionObserver pour toute la page. Respecte reduced-motion
 * (les éléments sont déjà visibles via la CSS).
 */
export function useReveal(): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal'))
    if (nodes.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
}
