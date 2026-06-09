import { IconCan, IconScan, IconReturn, IconTrophy } from './icons'
import type { ReactNode } from 'react'

interface Step {
  verb: string
  icon: ReactNode
  desc: string
}

const STEPS: Step[] = [
  {
    verb: 'Bois',
    icon: <IconCan size={28} />,
    desc: 'Tu achètes et tu bois ta GreenBull. Formule allégée, anti-crash.',
  },
  {
    verb: 'Scanne',
    icon: <IconScan size={28} />,
    desc: 'Tu scannes le QR « Return » de la canette via l’app GreenBull.',
  },
  {
    verb: 'Ramène',
    icon: <IconReturn size={28} />,
    desc: 'Tu déposes la canette dans un point GreenBull Return près de chez toi.',
  },
  {
    verb: 'Gagne',
    icon: <IconTrophy size={28} />,
    desc: 'Tu débloques des points. L’impact CO₂ collectif s’affiche en direct.',
  },
]

export function ReturnRecharge() {
  return (
    <section className="section panel panel--green" id="return">
      <div className="container">
        <header className="section__head section__head--center reveal">
          <p className="kicker kicker--light">Return &amp; Recharge</p>
          <h2 className="section__title">
            Quatre gestes.<br />Une boucle qui&nbsp;tourne.
          </h2>
          <p className="section__lead">
            Un parcours gamifié, pensé comme une mécanique de fidélité. Plus tu
            rends, plus tu gagnes — et plus l’aluminium reste en circulation.
          </p>
        </header>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step reveal" key={s.verb}>
              <div className="step__top">
                <span className="step__n tabular">{i + 1}</span>
                <span className="step__icon">{s.icon}</span>
              </div>
              <h3 className="step__verb">{s.verb}.</h3>
              <p className="step__desc">{s.desc}</p>
              {i < STEPS.length - 1 && <span className="step__line" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
