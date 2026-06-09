import { AnnexSection } from './AnnexSection'

interface RefGroup {
  n: string
  cat: string
  refs: string
}

const GROUPS: RefGroup[] = [
  {
    n: '1',
    cat: 'Cours & outils marketing',
    refs: 'Boulocher & Ruaud (2017) · Kotler & Dubois (1980) · Kotler & Armstrong (2017) · Porter (1982) · Stoetzel (1954) · Reichheld (1996) · Petty & Cacioppo (1983) · Boîtes à outils CM5 (S. Ruaud)',
  },
  {
    n: '2',
    cat: 'Sources marché',
    refs: 'Statista · Grand View Research · Fortune Business Insights · Euromonitor (d’après) · NielsenIQ / Rayon Boissons',
  },
  {
    n: '3',
    cat: 'Sources Red Bull',
    refs: 'Red Bull, communiqué de résultats annuels (2023) · Forbes · Boulocher, Daly & Ruaud (2019)',
  },
  {
    n: '4',
    cat: 'Consigne / recyclage / faisabilité',
    refs: 'TOMRA · Infinitum · Re-turn (Irlande) · Citeo / Carrefour ReUse · International Aluminium Institute (2023)',
  },
  {
    n: '5',
    cat: 'Santé / réglementation',
    refs: 'EFSA (2023) · ANSES (2022) · CDC (2023)',
  },
]

export function Bibliography() {
  return (
    <AnnexSection
      id="bibliographie"
      eyebrow="Bibliographie"
      pager="Réf."
      panel="soft"
      title="Sources mobilisées"
      lead="Références classées par thème et mobilisées tout au long du dossier GreenBull Return."
      source="Note : les sources payantes (Euromonitor, Statista, Xerfi) sont citées « d’après » ou « cité par » lorsqu’elles n’ont pas été consultées directement ; les sources publiques (Red Bull, NielsenIQ, Citeo, EFSA, TOMRA) sont accessibles en ligne."
    >
      <div className="biblio">
        {GROUPS.map((g) => (
          <div className="ref reveal" key={g.n}>
            <span className="ref__n" aria-hidden="true">
              {g.n}
            </span>
            <div>
              <p className="ref__cat">{g.cat}</p>
              <p className="ref__list">{g.refs}</p>
            </div>
          </div>
        ))}
      </div>
    </AnnexSection>
  )
}
