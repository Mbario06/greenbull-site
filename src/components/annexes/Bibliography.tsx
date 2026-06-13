import { AnnexSection } from './AnnexSection'

interface RefGroup {
  n: string
  cat: string
  refs: string[]
}

const GROUPS: RefGroup[] = [
  {
    n: '1',
    cat: 'Ouvrages & cours (marketing)',
    refs: [
      'Boulocher, V. & Ruaud, S. (2017). Analyse de marché : de la stratégie au plan d’action. Vuibert.',
      'Kotler, P. & Dubois, B. (1980). Marketing Management. Publi-Union.',
      'Kotler, P. & Armstrong, G. (2017). Principles of Marketing. Pearson.',
      'Porter, M. E. (1982). Choix stratégiques et concurrence. Economica.',
      'Reichheld, F. (1996). The Loyalty Effect. Harvard Business School Press.',
      'Petty, R. E. & Cacioppo, J. T. (1983). Central and peripheral routes to advertising effectiveness (ELM).',
      'Stoetzel, J. (1954). Le prix d’acceptabilité. Méthode du prix psychologique.',
      'Boîtes à outils CM5 — Prix, Distribution, Communication (S. Ruaud).',
    ],
  },
  {
    n: '2',
    cat: 'Données de marché',
    refs: [
      'Statista (2024). Energy drinks — market data.',
      'Grand View Research (2024). Energy drinks market report.',
      'Fortune Business Insights (2024). Energy drinks market.',
      'NielsenIQ / Rayon Boissons (2024). Marché des boissons énergisantes, France.',
      'Euromonitor International (cité d’après Statista, 2024).',
    ],
  },
  {
    n: '3',
    cat: 'Revues professionnelles à consulter (veille marché & distribution)',
    refs: [
      'LSA — Libre Service Actualités (grande conso & distribution).',
      'Rayon Boissons (marché des boissons, France).',
      'Linéaires (merchandising & distribution alimentaire).',
      'Points de Vente (retail & GMS).',
      'Marketing Magazine ; Stratégies (marketing & communication).',
      'CB News (publicité & médias).',
      'Cosmétique Mag (FMCG, veille tendances).',
      'L’Usine Nouvelle (industrie & production).',
    ],
  },
  {
    n: '4',
    cat: 'Entreprise (Red Bull)',
    refs: [
      'Red Bull GmbH (2023). Company figures. https://www.redbull.com/int-en/energydrink/company-figures',
      'Forbes (2023). The world’s most valuable brands.',
      'Boulocher, V., Daly, P. & Ruaud, S. (2019). International Journal of Entrepreneurship and Innovation.',
    ],
  },
  {
    n: '5',
    cat: 'Recyclage, consigne & partenaires (web)',
    refs: [
      'International Aluminium Institute (2023). Recycling. https://international-aluminium.org (consulté en juin 2026)',
      'Chaque Canette Compte / Every Can Counts. https://www.chaquecanettecompte.fr (consulté en juin 2026)',
      'Carrefour. Programme « Act For Good ». https://www.carrefour.com (consulté en juin 2026)',
      'Citeo. Réemploi / ReUse. https://www.citeo.com (consulté en juin 2026)',
      'TOMRA. Deposit return systems. https://www.tomra.com (consulté en juin 2026)',
      'Elise. Collecte et recyclage solidaires (ESS). https://www.elise.com.fr (consulté en juin 2026)',
    ],
  },
  {
    n: '6',
    cat: 'Santé & réglementation',
    refs: [
      'EFSA (2015). Scientific opinion on the safety of caffeine.',
      'ANSES (2022). Boissons dites « énergisantes ».',
      'CDC (2023). Sleep and sleep disorders.',
      'Union européenne (2024). Règlement sur les emballages (PPWR).',
    ],
  },
]

interface Reli {
  type: string
  ex: string
  level: string
  self?: boolean
}

const LEGEND: Reli[] = [
  { type: 'Donnée officielle (entreprise / institution)', ex: 'CA & canettes Red Bull, EFSA, ANSES, Citeo', level: 'Élevée' },
  { type: 'Cabinet / presse professionnelle', ex: 'Statista, NielsenIQ, GVR, Forbes, LSA, Rayon Boissons', level: 'Moyenne à élevée' },
  { type: 'Estimation sectorielle', ex: 'Budget marketing ~30 % du CA, COGS canette', level: 'À manier avec prudence' },
  { type: 'Hypothèse du groupe', ex: 'Taux de retour, marge Return, partenariats', level: 'À tester', self: true },
]

export function Bibliography() {
  return (
    <AnnexSection
      id="bibliographie"
      eyebrow="Bibliographie"
      pager="Réf."
      panel="soft"
      title="Sources mobilisées (APA)"
      lead="Références au format APA, classées par type, avec URL et date de consultation pour les sources web. Suivies d’une légende de fiabilité des données."
      source="Note : les sources payantes (Euromonitor, Statista, Xerfi) sont citées « d’après » lorsqu’elles n’ont pas été consultées directement ; les sources publiques (Red Bull, NielsenIQ, Citeo, EFSA, TOMRA, Chaque Canette Compte) sont accessibles en ligne."
    >
      <div className="biblio">
        {GROUPS.map((g) => (
          <div className="ref reveal" key={g.n}>
            <span className="ref__n" aria-hidden="true">
              {g.n}
            </span>
            <div>
              <p className="ref__cat">{g.cat}</p>
              <p className="ref__list">
                {g.refs.map((r, i) => (
                  <span key={i} style={{ display: 'block', marginBottom: '0.3em' }}>
                    {r}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="kpi__label reveal" style={{ marginTop: '2.4rem' }}>
        Fiabilité des données — comment lire nos chiffres
      </p>
      <div className="dtable-wrap reveal">
        <table className="dtable">
          <thead>
            <tr>
              <th scope="col">Type de donnée</th>
              <th scope="col">Exemple dans le dossier</th>
              <th scope="col">Fiabilité</th>
            </tr>
          </thead>
          <tbody>
            {LEGEND.map((l) => (
              <tr className={l.self ? 'is-self' : ''} key={l.type}>
                <td className="dt-market" data-label="Type">
                  {l.type}
                </td>
                <td data-label="Exemple">{l.ex}</td>
                <td className="dt-key" data-label="Fiabilité">
                  {l.level}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnnexSection>
  )
}
