import { IconPin, IconTicket, IconBolt, IconLeaf } from './icons'
import type { ReactNode } from 'react'

interface Tier {
  qty: string
  unit: string
  reward: string
  highlight?: boolean
}

const TIERS: Tier[] = [
  { qty: '1', unit: 'canette', reward: '+10 GreenBull Points' },
  { qty: '5', unit: 'canettes', reward: '−20 % sur le prochain pack' },
  { qty: '10', unit: 'canettes', reward: '1 GreenBull offerte', highlight: true },
  { qty: '25', unit: 'canettes', reward: 'Édition limitée collector' },
  { qty: '50', unit: 'canettes', reward: 'Accès event / drop exclusif' },
]

interface Spot {
  icon: ReactNode
  title: string
  desc: string
}

const NETWORK: Spot[] = [
  {
    icon: <IconPin size={22} />,
    title: 'RVM en grande surface',
    desc: 'Machines Tomra à l’entrée des Carrefour, Leclerc et Auchan.',
  },
  {
    icon: <IconTicket size={22} />,
    title: 'Festivals & événements',
    desc: 'Le réseau d’événements Red Bull devient un point de collecte.',
  },
  {
    icon: <IconBolt size={22} />,
    title: 'Campus & salles de sport',
    desc: 'Kiosques de consigne type Yoyo / Lemon Tri là où tu performes.',
  },
  {
    icon: <IconLeaf size={22} />,
    title: 'Sortie de magasin',
    desc: 'Partenaire CITEO pour intégrer le retour au tri urbain.',
  },
]

export function Rewards() {
  return (
    <section className="section panel" id="rewards">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">GreenBull Points</p>
          <h2 className="section__title">Plus tu rends, plus tu gagnes.</h2>
          <p className="section__lead">
            Un barème simple et une boucle sociale : compteur national en temps
            réel, classement entre amis, badges à débloquer.
          </p>
        </header>

        <div className="rewards">
          <ol className="ladder reveal">
            {TIERS.map((t) => (
              <li
                key={t.qty}
                className={`ladder__row ${t.highlight ? 'ladder__row--hl' : ''}`}
              >
                <span className="ladder__qty tabular">
                  <strong>{t.qty}</strong> {t.unit}
                </span>
                <span className="ladder__arrow" aria-hidden="true" />
                <span className="ladder__reward">{t.reward}</span>
              </li>
            ))}
          </ol>

          <div className="network">
            <p className="network__label">Où la rapporter</p>
            <div className="network__grid">
              {NETWORK.map((s) => (
                <article className="spot reveal" key={s.title}>
                  <span className="spot__icon">{s.icon}</span>
                  <h3 className="spot__title">{s.title}</h3>
                  <p className="spot__desc">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
