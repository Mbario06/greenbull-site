import { useCountUp } from '../hooks/useCountUp'

function StatPercent({ to, label, sub }: { to: number; label: string; sub: string }) {
  const { ref, value } = useCountUp(to)
  return (
    <div className="stat reveal">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="stat__num tabular"
      >
        {Math.round(value)}
        <span className="stat__unit">%</span>
      </span>
      <span className="stat__label">{label}</span>
      <span className="stat__sub">{sub}</span>
    </div>
  )
}

export function Impact() {
  return (
    <section className="section panel panel--ink" id="impact">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker kicker--light">Impact</p>
          <h2 className="section__title">
            L’aluminium est déjà <br />le champion du recyclage.
          </h2>
          <p className="section__lead">
            On ne réinvente pas la matière — on referme sa boucle. Chaque retour
            est compté, chiffré et partagé.
          </p>
        </header>

        <div className="stats">
          <div className="stat stat--symbol reveal">
            <span className="stat__num">∞</span>
            <span className="stat__label">Recyclable à l’infini</span>
            <span className="stat__sub">Sans perte de propriétés (IAI, 2023)</span>
          </div>

          <StatPercent
            to={75}
            label="Déjà en circulation"
            sub="De l’aluminium mondial est recyclé"
          />

          <StatPercent
            to={100}
            label="Aluminium pur"
            sub="Encre végétale · zéro film plastique"
          />

          <div className="stat stat--symbol reveal">
            <span className="stat__num tabular">250</span>
            <span className="stat__label">Millilitres</span>
            <span className="stat__sub">Le format iconique, conservé</span>
          </div>
        </div>

        <div className="impact__counter reveal">
          <span className="impact__pulse" aria-hidden="true" />
          <p>
            Compteur national de canettes rapportées —{' '}
            <strong className="tabular">en temps réel dans l’app</strong>. CO₂
            évité estimé par utilisateur et collectif.
          </p>
        </div>
      </div>
    </section>
  )
}
