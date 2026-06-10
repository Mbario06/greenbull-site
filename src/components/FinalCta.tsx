import { IconArrowRight } from './icons'

export function FinalCta() {
  return (
    <section className="final" id="join">
      <div className="container final__inner reveal">
        <p className="kicker kicker--light">Bois-la. Ramène-la. Gagne.</p>
        <h2 className="final__title">
          Rejoins la boucle.
        </h2>
        <p className="final__lead">
          Une canette ne devrait pas finir sa vie en déchet. Avec GreenBull
          Return, chaque retour te rapporte — et nous rapproche d'une énergie
          vraiment circulaire.
        </p>
        <div className="final__actions">
          <a href="#return" className="btn btn--red">
            Comment ça marche
            <IconArrowRight size={18} />
          </a>
          <a href="#annexes" className="btn btn--ghost btn--on-dark">
            Explorer les annexes
            <IconArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
