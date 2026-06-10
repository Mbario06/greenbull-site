import { useEffect, useState, useCallback } from 'react'
import { IconArrowRight } from './icons'

const LINKS = [
  { href: '#concept', label: 'Le concept' },
  { href: '#return', label: 'Return & Recharge' },
  { href: '#rewards', label: 'Récompenses' },
  { href: '#impact', label: 'Impact' },
  { href: '#marche', label: 'Marché' },
  { href: '#annexes', label: 'Annexes' },
]

const MOBILE_EXTRA = [
  { href: '#realiste', label: 'Faisabilité' },
  { href: '#pricing', label: 'Prix' },
  { href: '#rentabilite', label: 'Rentabilité' },
  { href: '#limites', label: 'Limites' },
]

const ALL_LINKS = [...LINKS, ...MOBILE_EXTRA]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Indicateur de section active
  useEffect(() => {
    const sections = ALL_LINKS
      .map(l => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter(e => e.isIntersecting)
        if (entering.length > 0) setActive('#' + entering[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Fermeture par Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = useCallback(() => setOpen(false), [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__brand" aria-label="GreenBull, accueil" onClick={close}>
          <span className="nav__word">GreenBull</span>
          <span className="nav__pill">Return Edition</span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <span className="nav__price tabular" aria-label="Prix conseillé 1 euro 95">
            1,95&nbsp;€
          </span>
          <a href="#rewards" className="btn nav__cta" onClick={close}>
            Rejoindre la boucle
            <IconArrowRight size={18} />
          </a>
          <button
            className="nav__burger"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Panneau mobile — visible uniquement quand .is-open */}
      <div className="nav__panel" aria-hidden={!open}>
        <nav className="nav__panel-links" aria-label="Menu mobile">
          {ALL_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'is-active' : ''}
              tabIndex={open ? 0 : -1}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#rewards"
          className="btn nav__panel-cta"
          tabIndex={open ? 0 : -1}
          onClick={close}
        >
          Rejoindre la boucle
          <IconArrowRight size={18} />
        </a>
      </div>
    </header>
  )
}
