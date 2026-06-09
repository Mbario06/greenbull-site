interface Bench {
  name: string
  price: number
  self?: boolean
}

const BENCH: Bench[] = [
  { name: 'MDD Carrefour', price: 0.75 },
  { name: 'Crazy Tiger', price: 1.15 },
  { name: 'Coca-Cola Energy', price: 1.55 },
  { name: 'Monster Energy', price: 1.6 },
  { name: 'Red Bull Original', price: 1.75 },
  { name: 'GreenBull Return', price: 1.95, self: true },
  { name: 'Red Bull Organics', price: 2.3 },
]

const MAX = 2.3

export function Pricing() {
  return (
    <section className="section panel" id="pricing">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">Prix &amp; positionnement</p>
          <h2 className="section__title">Premium, mais responsable.</h2>
          <p className="section__lead">
            Un prix psychologique optimal de <strong>1,95&nbsp;€</strong> :
            +11&nbsp;% vs Red&nbsp;Bull Original, −15&nbsp;% vs Organics. Le
            différentiel éco, sans casser la cohérence premium.
          </p>
        </header>

        <div className="pricing">
          <aside className="price-card reveal">
            <p className="price-card__tag">Prix conseillé</p>
            <p className="price-card__value tabular">
              1,95<span>€</span>
            </p>
            <p className="price-card__seg">Premium responsable</p>
            <dl className="price-card__meta">
              <div>
                <dt>Acceptation cible</dt>
                <dd className="tabular">65–70 %</dd>
              </div>
              <div>
                <dt>Cible</dt>
                <dd>Eco-performers, 18–28 ans</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Allégé · circulaire</dd>
              </div>
            </dl>
          </aside>

          <div className="bench reveal" role="img" aria-label="Comparatif de prix en grande surface, canette 250 ml">
            <p className="bench__label">Benchmark GMS · canette 250 ml</p>
            {BENCH.map((b) => (
              <div className={`bench__row ${b.self ? 'bench__row--self' : ''}`} key={b.name}>
                <span className="bench__name">{b.name}</span>
                <span className="bench__bar-wrap">
                  <span
                    className="bench__bar"
                    style={{ width: `${(b.price / MAX) * 100}%` }}
                  />
                </span>
                <span className="bench__price tabular">
                  {b.price.toFixed(2).replace('.', ',')}&nbsp;€
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
