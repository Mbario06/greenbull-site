import { IconArrowRight, IconScan } from './icons'

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
          Return, chaque retour te rapporte — et nous rapproche d’une énergie
          vraiment circulaire.
        </p>
        <div className="final__actions">
          <a href="#join" className="btn btn--red">
            <IconScan size={18} />
            Télécharger l’app GreenBull
          </a>
          <a href="#rewards" className="btn btn--ghost btn--on-dark">
            Trouver un point Return
            <IconArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
