interface Principle {
  k: string
  label: string
  value: string
}

const PRINCIPLES: Principle[] = [
  { k: 'Matériau', label: 'Matériau', value: 'Aluminium pur 100 %, encre végétale, sans film plastique.' },
  { k: 'Finition', label: 'Finition', value: 'Sablée mate — une différenciation qui se sent dès la prise en main.' },
  { k: 'Couleur', label: 'Couleur', value: 'Vert forêt, sauge et crème. L’accent Bull rouge, préservé.' },
  { k: 'Format', label: 'Format', value: '250 ml — le code visuel iconique, conservé à l’identique.' },
]

export function Gallery() {
  return (
    <section className="section panel panel--soft" id="gallery">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">Pack design</p>
          <h2 className="section__title">Un green premium, au premier regard.</h2>
          <p className="section__lead">
            La silhouette Red Bull, une nouvelle peau. Lisible à trois mètres en
            linéaire, premium dans la main.
          </p>
        </header>

        <div className="gallery">
          <figure className="gallery__main reveal">
            <img src={`${import.meta.env.BASE_URL}can/front-b.webp`} alt="Canette GreenBull Return Edition, face avant" loading="lazy" width={1000} height={1334} />
          </figure>
          <figure className="gallery__side gallery__side--a reveal">
            <img src={`${import.meta.env.BASE_URL}can/back.webp`} alt="Dos de la canette GreenBull, mentions et code Return" loading="lazy" width={1000} height={1334} />
          </figure>
          <figure className="gallery__side gallery__side--b reveal">
            <img src={`${import.meta.env.BASE_URL}can/q3-c.webp`} alt="Canette GreenBull vue de trois quarts" loading="lazy" width={1000} height={1334} />
          </figure>

          <dl className="principles reveal">
            {PRINCIPLES.map((p) => (
              <div className="principles__row" key={p.k}>
                <dt>{p.label}</dt>
                <dd>{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
