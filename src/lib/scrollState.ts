// État de scroll partagé entre Lenis (DOM) et la boucle de rendu R3F (useFrame).
// Mutable volontairement : lu chaque frame sans déclencher de re-render React.

export interface ScrollState {
  /** progression 0 → 1 sur toute la hauteur de page */
  progress: number
  /** vitesse instantanée (px/frame, signée) */
  velocity: number
}

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
