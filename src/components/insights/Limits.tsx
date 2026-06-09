import { IconArrowRight, IconTarget } from '../icons'

interface Objection {
  limit: string
  risk: string
  response: string
  kpi: string
}

const OBJECTIONS: Objection[] = [
  {
    limit: 'Coût logistique',
    risk: 'Bornes, collecte, fraude, maintenance',
    response: 'Pilote 20–50 magasins + mutualisation RVM',
    kpi: 'Coût par retour',
  },
  {
    limit: 'Récompense trop faible',
    risk: 'Le consommateur jette quand même',
    response: 'Coupon immédiat 0,10–0,20 € ou points lisibles',
    kpi: 'Taux de retour',
  },
  {
    limit: 'Greenwashing',
    risk: 'Promesse écologique contestée',
    response: 'KPI publics : retours, collecte, destination matière',
    kpi: 'Taux de retour publié',
  },
  {
    limit: 'Cannibalisation',
    risk: 'Déplacer des ventes Organics ou Red Bull',
    response: 'Positionner sur la boucle retour, pas sur le bio',
    kpi: 'Ventes incrémentales',
  },
  {
    limit: 'Santé / caféine',
    risk: 'Critique réglementaire',
    response: 'Cible 18+, modération, pas d’association alcool',
    kpi: 'Conformité étiquetage',
  },
]

export function Limits() {
  return (
    <section className="section panel panel--ink" id="limites">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker kicker--light">Limites &amp; réponses</p>
          <h2 className="section__title">On assume les limites.</h2>
          <p className="section__lead">
            Un concept solide se présente avec ses angles morts — chacun a une
            réponse concrète et un indicateur pour la vérifier.
          </p>
        </header>

        <div className="objections">
          {OBJECTIONS.map((o) => (
            <article className="objection reveal" key={o.limit}>
              <h3 className="objection__limit">{o.limit}</h3>
              <p className="objection__risk">{o.risk}</p>
              <p className="objection__resp">
                <IconArrowRight size={16} className="objection__resp-ic" />
                <span>{o.response}</span>
              </p>
              <span className="objection__kpi">
                <IconTarget size={13} />
                {o.kpi}
              </span>
            </article>
          ))}
        </div>

        <div className="synthese reveal">
          <span className="synthese__tag">En synthèse</span>
          <p>
            Le concept est fort s’il reste mesurable, progressif et transparent.
            GreenBull Return est crédible présenté comme un programme pilote de
            retour récompensé, pas comme une consigne nationale propriétaire : sa
            force est de rendre le retour désirable, mesurable et fidélisant.
          </p>
        </div>

        <p className="src-note reveal">
          Sources : synthèse du groupe ; benchmarks DRS Europe (annexes E &amp; F) ;
          ANSES (2022) &amp; EFSA (2023) ; Boîtes à outils (S. Ruaud).
        </p>
      </div>
    </section>
  )
}
