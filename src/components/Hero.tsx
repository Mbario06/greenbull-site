import { IconArrowDown, IconArrowRight } from './icons'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__top container">
        <p className="kicker">Return Edition · by Red Bull</p>
      </div>

      <div className="hero__meta" aria-hidden="true">
        <span>250 ML</span>
        <span>ALU&nbsp;∞</span>
        <span>+10 PTS</span>
      </div>

      <div className="hero__bottom container">
        <div className="hero__headline">
          <h1>
            <span>Bois-la.</span>
            <span>Ramène-la.</span>
            <span className="hero__accent">Gagne.</span>
          </h1>
        </div>

        <div className="hero__aside">
          <p className="hero__lead">
            La première énergie <em>premium</em> et <em>circulaire</em>. Une
            canette qui garde de la valeur après la dernière gorgée — tu la
            rapportes, tu gagnes.
          </p>
          <div className="hero__actions">
            <a href="#return" className="btn">
              Comment ça marche
              <IconArrowRight size={18} />
            </a>
            <a href="#concept" className="btn btn--ghost">
              Découvrir la canette
            </a>
          </div>
        </div>
      </div>

      <a href="#concept" className="hero__scroll" aria-label="Faire défiler">
        <span>Défiler</span>
        <IconArrowDown size={18} />
      </a>
    </section>
  )
}
