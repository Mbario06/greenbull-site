import { useEffect, useState } from 'react'
import { IconArrowRight } from './icons'

const LINKS = [
  { href: '#concept', label: 'Le concept' },
  { href: '#return', label: 'Return & Recharge' },
  { href: '#rewards', label: 'Récompenses' },
  { href: '#impact', label: 'Impact' },
  { href: '#annexes', label: 'Annexes' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" aria-label="GreenBull, accueil">
          <span className="nav__word">GreenBull</span>
          <span className="nav__pill">Return Edition</span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="nav__price tabular" aria-label="Prix conseillé 1 euro 95">
            1,95&nbsp;€
          </span>
          <a href="#rewards" className="btn nav__cta">
            Rejoindre la boucle
            <IconArrowRight size={18} />
          </a>
        </div>
      </div>
    </header>
  )
}
