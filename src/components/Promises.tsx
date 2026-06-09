import type { ReactNode } from 'react'
import { IconBolt, IconRecycle, IconReturn, IconGift } from './icons'

interface Promise {
  icon: ReactNode
  n: string
  title: string
  desc: string
  span?: boolean
}

const PROMISES: Promise[] = [
  {
    icon: <IconBolt size={30} />,
    n: '01',
    title: 'Énergie plus clean',
    desc: 'Formule allégée, anti-crash. Le boost — sans la chute qui va avec.',
    span: true,
  },
  {
    icon: <IconRecycle size={30} />,
    n: '02',
    title: '0 plastique inutile',
    desc: 'Aluminium seul, recyclable à l’infini. Le film de regroupement disparaît.',
  },
  {
    icon: <IconReturn size={30} />,
    n: '03',
    title: 'Canette à rapporter',
    desc: 'Elle garde de la valeur après la dernière gorgée. Jeter devient ramener.',
  },
  {
    icon: <IconGift size={30} />,
    n: '04',
    title: 'Récompense',
    desc: 'Chaque retour débloque des GreenBull Points — et un impact bien réel.',
  },
]

export function Promises() {
  return (
    <section className="section panel" id="concept">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">Le concept</p>
          <h2 className="section__title">
            Une énergie qui ne finit&nbsp;pas <br />à la poubelle.
          </h2>
          <p className="section__lead">
            GreenBull Return Edition garde tout ce qui fait Red Bull — et change
            la fin de l’histoire. Quatre promesses, une boucle&nbsp;vertueuse.
          </p>
        </header>

        <div className="bento">
          {PROMISES.map((p) => (
            <article
              key={p.n}
              className={`bento__card reveal ${p.span ? 'bento__card--wide' : ''}`}
            >
              <span className="bento__icon">{p.icon}</span>
              <span className="bento__n tabular">{p.n}</span>
              <h3 className="bento__title">{p.title}</h3>
              <p className="bento__desc">{p.desc}</p>
            </article>
          ))}

          <article className="bento__card bento__quote reveal">
            <p>« Cette canette vaut encore quelque chose. »</p>
            <span className="bento__quote-by">Le territoire GreenBull</span>
          </article>
        </div>
      </div>
    </section>
  )
}
