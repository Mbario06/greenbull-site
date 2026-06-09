import { AnnexSection } from './AnnexSection'

/* ---- Graphique 1 : trajectoire du marché mondial (Md$) ---- */
const MARKET = [
  { year: '2023', v: 92 },
  { year: '2025', v: 108 },
  { year: '2027', v: 124 },
  { year: '2028', v: 135 },
  { year: '2030', v: 150 },
]
const VB_W = 560
const VB_H = 280
const X0 = 10
const X1 = 540
const Y_BOTTOM = 244
const Y_TOP = 26
const VMIN = 80
const VMAX = 160

const xAt = (i: number) => X0 + (i / (MARKET.length - 1)) * (X1 - X0)
const yAt = (v: number) => Y_BOTTOM + ((v - VMIN) / (VMAX - VMIN)) * (Y_TOP - Y_BOTTOM)

const linePath = MARKET.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(p.v).toFixed(1)}`).join(' ')
const areaPath = `${linePath} L ${xAt(MARKET.length - 1).toFixed(1)} ${Y_BOTTOM} L ${xAt(0).toFixed(1)} ${Y_BOTTOM} Z`
const GRID = [90, 110, 130, 150]

/* ---- Graphique 2 : CA des principaux acteurs 2023 (Md$) ---- */
interface Leader {
  name: string
  value: number
  self?: boolean
}
const LEADERS: Leader[] = [
  { name: 'Red Bull', value: 11.4, self: true },
  { name: 'Monster', value: 7.1 },
  { name: 'Celsius', value: 1.3 },
]
const LEADER_MAX = 11.4

export function AnnexData() {
  return (
    <AnnexSection
      id="annexe-d"
      eyebrow="Annexe D · Données complémentaires"
      pager="A4 / 7"
      title="Le marché en deux graphiques"
      lead="Trajectoire mondiale à horizon 2030 et comparaison du chiffre d’affaires des principaux acteurs."
      source="Sources : Statista (2024) ; Grand View Research (2024) ; Fortune Business Insights (2024) ; Red Bull (2023) ; Monster Beverage (2023) ; Celsius (2023). Estimations 2025-2030 = consensus analystes."
    >
      <div className="charts">
        <figure className="chart reveal">
          <figcaption>
            <p className="chart__label">Évolution & projection du marché mondial</p>
            <p className="chart__unit">en milliards de dollars · +7-8 %/an</p>
          </figcaption>
          <svg
            className="chart__svg"
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="img"
            aria-label="Le marché mondial passe d'environ 92 milliards de dollars en 2023 à environ 150 milliards en 2030."
          >
            <defs>
              <linearGradient id="gbArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#436a2f" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#436a2f" stopOpacity="0" />
              </linearGradient>
            </defs>

            {GRID.map((g) => (
              <g key={g}>
                <line className="chart__grid" x1={X0} y1={yAt(g)} x2={X1} y2={yAt(g)} />
                <text className="chart__xlabel" x={X1 + 4} y={yAt(g) + 4}>
                  {g}
                </text>
              </g>
            ))}

            <path className="chart__area-fill" d={areaPath} />
            <path className="chart__line" d={linePath} />

            {MARKET.map((p, i) => (
              <g key={p.year}>
                <circle className="chart__dot" cx={xAt(i)} cy={yAt(p.v)} r={4} />
                <text className="chart__ptlabel" x={xAt(i)} y={yAt(p.v) - 12} textAnchor="middle">
                  {p.v}
                </text>
                <text className="chart__xlabel" x={xAt(i)} y={Y_BOTTOM + 22} textAnchor="middle">
                  {p.year}
                </text>
              </g>
            ))}
          </svg>
        </figure>

        <figure className="chart chart--bars reveal">
          <figcaption>
            <p className="chart__label">Chiffre d’affaires des principaux acteurs — 2023</p>
            <p className="chart__unit">en milliards de dollars</p>
          </figcaption>
          <div className="bench" role="img" aria-label="Chiffre d'affaires 2023 : Red Bull 11,4, Monster 7,1, Celsius 1,3 milliards de dollars.">
            {LEADERS.map((l) => (
              <div className={`bench__row ${l.self ? 'bench__row--self' : ''}`} key={l.name}>
                <span className="bench__name">{l.name}</span>
                <span className="bench__bar-wrap">
                  <span className="bench__bar" style={{ width: `${(l.value / LEADER_MAX) * 100}%` }} />
                </span>
                <span className="bench__price tabular">
                  {l.value.toFixed(1).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </AnnexSection>
  )
}
