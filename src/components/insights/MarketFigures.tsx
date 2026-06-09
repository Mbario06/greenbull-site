interface Figure {
  value: string
  unit: string
  label: string
  meta: string
  source: string
  wide?: boolean
}

const FIGURES: Figure[] = [
  {
    value: '12,1',
    unit: 'Md',
    label: 'Canettes Red Bull vendues',
    meta: '2023 · Monde',
    source: 'Red Bull',
  },
  {
    value: '10,55',
    unit: 'Md€',
    label: 'Chiffre d’affaires Red Bull',
    meta: '2023 · Monde',
    source: 'Red Bull',
  },
  {
    value: '≈ 40',
    unit: '%',
    label: 'Part de marché Red Bull en valeur — leader',
    meta: 'Monde · selon périmètre',
    source: 'Euromonitor · Statista',
  },
  {
    value: '86–92 → 150',
    unit: 'Md$',
    label: 'Marché energy mondial',
    meta: '2023 → 2030 · +7-8 %/an',
    source: 'Statista · GVR · FBI',
    wide: true,
  },
  {
    value: '685',
    unit: 'M€',
    label: 'Marché France (GMS)',
    meta: '12 mois',
    source: 'NielsenIQ · Rayon Boissons',
  },
]

export function MarketFigures() {
  return (
    <section className="section panel panel--soft" id="marche">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">Le marché · source de vérité</p>
          <h2 className="section__title">Le terrain de jeu, en cinq chiffres.</h2>
          <p className="section__lead">
            Avant de parler produit, on cadre le marché. Voici les valeurs
            retenues tout au long du dossier — le socle chiffré de GreenBull.
          </p>
        </header>

        <div className="kfigs">
          {FIGURES.map((f) => (
            <article
              className={`kfig reveal ${f.wide ? 'kfig--wide' : ''}`}
              key={f.label}
            >
              <p className="kfig__num tabular">
                {f.value}
                <span>{f.unit}</span>
              </p>
              <p className="kfig__label">{f.label}</p>
              <p className="kfig__meta">{f.meta}</p>
              <p className="kfig__src">{f.source}</p>
            </article>
          ))}
        </div>

        <div className="kfig__note reveal">
          <span className="kfig__note-tag">À noter</span>
          <p>
            Ces valeurs sont celles retenues dans tout le dossier. Le marketing
            et le sponsoring de Red Bull sont souvent estimés autour de 30 % du
            CA par des sources sectorielles, mais ce niveau n’est pas confirmé
            officiellement par la marque.
          </p>
        </div>

        <p className="src-note reveal">
          Sources : Red Bull, communiqué de résultats annuels (2023) ; NielsenIQ /
          Rayon Boissons ; Statista ; Grand View Research ; Fortune Business
          Insights ; Euromonitor.
        </p>
      </div>
    </section>
  )
}
