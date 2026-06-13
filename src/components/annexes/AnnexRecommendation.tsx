import { AnnexSection } from './AnnexSection'
import { IconTarget } from '../icons'

interface Phase {
  tag: string
  title: string
  desc: string
}

const PHASES: Phase[] = [
  {
    tag: 'Phase 1',
    title: 'Pilote 20–50 magasins',
    desc: 'QR code, PLV, bac ou borne, points ou coupon 0,10–0,20 € par retour.',
  },
  {
    tag: 'Phase 2',
    title: 'Campus & festival',
    desc: 'Challenge collectif, compteur live, double points, édition limitée.',
  },
  {
    tag: 'Phase 3',
    title: 'Partenariat retail / RVM',
    desc: 'Connexion à un opérateur existant ou à un futur système multi-marques.',
  },
]

const KPIS = [
  'Taux de scan QR',
  'Taux de retour canette',
  'Coût par retour',
  'Taux de réachat après retour',
  'Récompenses utilisées',
  'Ventes additionnelles',
]

interface Score {
  name: string
  value: number
  lead?: boolean
}

const SCORES: Score[] = [
  { name: 'Globale', value: 7, lead: true },
  { name: 'Marketing', value: 8 },
  { name: 'Technique', value: 8 },
  { name: 'Logistique seule', value: 4 },
  { name: 'Avec RVM', value: 7 },
]

export function AnnexRecommendation() {
  return (
    <AnnexSection
      id="annexe-g"
      eyebrow="Annexe G · Recommandation"
      pager="A7 / 9"
      panel="green"
      title="Un pilote Return & Recharge, mesurable"
      lead="Éviter le greenwashing : un dispositif progressif, réaliste, piloté par les KPI."
      source="Sources : synthèse du groupe ; Boîtes à outils Distribution, Prix & Communication (S. Ruaud) ; benchmarks DRS Europe ; Citeo ReUse."
    >
      <div className="phases">
        {PHASES.map((p) => (
          <article className="phase reveal" key={p.tag}>
            <p className="phase__tag">{p.tag}</p>
            <h3 className="phase__title">{p.title}</h3>
            <p className="phase__desc">{p.desc}</p>
          </article>
        ))}
      </div>

      <div className="reco-grid">
        <div className="reveal">
          <p className="kpi__label">KPI de faisabilité</p>
          <div className="kpi-chips">
            {KPIS.map((k) => (
              <span className="kpi-chip" key={k}>
                <IconTarget size={15} />
                {k}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal">
          <p className="scores__label">Note de faisabilité</p>
          <div className="scores">
            {SCORES.map((s) => (
              <div className={`score ${s.lead ? 'score--lead' : ''}`} key={s.name}>
                <div className="score__top">
                  <span className="score__name">{s.name}</span>
                  <span className="score__val tabular">{s.value}/10</span>
                </div>
                <span className="score__track">
                  <span className="score__fill" style={{ width: `${s.value * 10}%` }} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="reco__quote reveal">
        « La canette vide n’est plus un déchet : elle devient un point d’entrée
        dans la fidélisation. »
      </p>
    </AnnexSection>
  )
}
