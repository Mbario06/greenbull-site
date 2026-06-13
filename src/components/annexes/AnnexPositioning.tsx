import { AnnexSection } from './AnnexSection'

interface Bubble {
  name: string
  share?: string
  /** position dans le plan : x = gauche %, y = haut % (haut = prix élevé) */
  x: number
  y: number
  size: number
  variant?: 'lead' | 'chall'
}

const BUBBLES: Bubble[] = [
  { name: 'Red Bull', share: '≈ 40 %', x: 78, y: 21, size: 138, variant: 'lead' },
  { name: 'Monster', share: '≈ 30 %', x: 61, y: 37, size: 116, variant: 'chall' },
  { name: 'Rockstar', share: '≈ 5 %', x: 46, y: 53, size: 74 },
  { name: 'Burn', share: 'niche', x: 35, y: 46, size: 62 },
  { name: 'Crazy Tiger', share: 'niche', x: 27, y: 67, size: 62 },
  { name: 'MDD', share: '< 10 %', x: 15, y: 80, size: 78 },
]

export function AnnexPositioning() {
  return (
    <AnnexSection
      id="annexe-b"
      eyebrow="Annexe B · Positionnement"
      pager="A2 / 9"
      title="Mapping concurrentiel"
      lead="Où chaque acteur se situe sur les axes prix et puissance de marque. La taille des bulles est proportionnelle à la part de marché."
      source="Mapping établi à partir de Euromonitor (2024), Statista (2024), NielsenIQ (2024) et observations de marché."
    >
      <div className="mapping">
        <div
          className="plot reveal"
          role="img"
          aria-label="Mapping prix / puissance de marque : Red Bull occupe seul le quadrant premium-leader, Monster s'en rapproche, le reste se concentre sur le prix-promesse."
        >
          <div className="plot__area" aria-hidden="true" />
          <span className="plot__quad plot__quad--tl">Premium-niche</span>
          <span className="plot__quad plot__quad--tr">Premium-leader</span>
          <span className="plot__quad plot__quad--bl">Low-cost</span>
          <span className="plot__quad plot__quad--br">Prix-promesse</span>
          <span className="plot__axis-x" aria-hidden="true">
            Puissance de marque →
          </span>
          <span className="plot__axis-y" aria-hidden="true">
            Prix →
          </span>

          {BUBBLES.map((b, i) => (
            <span
              key={b.name}
              className={`bubble ${b.variant ? `bubble--${b.variant}` : ''} ${
                b.size < 80 ? 'bubble--sm' : ''
              }`}
              style={{
                '--x': `${b.x}%`,
                '--y': `${b.y}%`,
                '--size': `${b.size}px`,
                transitionDelay: `${i * 70}ms`,
              } as React.CSSProperties}
            >
              <span className="bubble__name">{b.name}</span>
              {b.share && <span className="bubble__share tabular">{b.share}</span>}
            </span>
          ))}
        </div>

        <div className="mapping__read">
          <div className="read-block reveal">
            <p className="read-block__label">Lecture</p>
            <p>
              <strong>Red Bull</strong> occupe seul le quadrant premium-leader.
              Monster s’en rapproche mais sans atteindre le même niveau d’image.
              Le reste du marché se concentre dans le quadrant prix-promesse et la
              concurrence me-too.
            </p>
          </div>
          <div className="read-block read-block--insight reveal">
            <p className="read-block__label">Insight</p>
            <p>
              L’« océan bleu » de Red Bull n’est pas vide — c’est un océan défendu
              par une dépense marketing massive et 40 ans de cohérence narrative.
            </p>
          </div>
        </div>
      </div>
    </AnnexSection>
  )
}
