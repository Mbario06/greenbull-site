import { IconCheck, IconCross, IconTarget } from '../icons'

interface Econ {
  num: string
  label: string
}

const ECON: Econ[] = [
  { num: '+ 11 %', label: 'prix vs Red Bull — ne couvre pas seul le dispositif' },
  { num: '0,10–0,20 €', label: 'coupon immédiat par retour — levier de réachat' },
  { num: '20–50', label: 'magasins pilotes avant tout déploiement' },
]

const VALUE = [
  'Prix premium + hausse du réachat',
  'Trafic en magasin + différenciation',
  'Données consommateurs collectées',
  'Image responsable + fidélisation',
]

const COST = [
  'QR / packaging spécifique + PLV',
  'Coupons / points + collecte',
  'Borne ou partenariat RVM',
  'Anti-fraude, maintenance, stockage',
]

const KPIS = ['Coût par retour', 'Taux de retour', 'Réachat', 'Ventes additionnelles']

export function Profitability() {
  return (
    <section className="section panel panel--green" id="rentabilite">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker kicker--light">Prix · rentabilité</p>
          <h2 className="section__title">Piloter par les coûts.</h2>
          <p className="section__lead">
            Le prix seul ne finance pas la boucle. La rentabilité se joue sur le
            réachat déclenché et la mutualisation de la collecte.
          </p>
        </header>

        <div className="econ">
          {ECON.map((e) => (
            <div className="econ__fig reveal" key={e.num}>
              <span className="econ__num tabular">{e.num}</span>
              <span className="econ__label">{e.label}</span>
            </div>
          ))}
        </div>

        <div className="ledger">
          <div className="ledger__side ledger__side--value reveal">
            <p className="ledger__head">
              <IconCheck size={16} />
              Ce qui crée de la valeur
            </p>
            <ul className="ledger__list">
              {VALUE.map((v) => (
                <li key={v}>
                  <IconCheck size={16} className="ledger__ic" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ledger__side ledger__side--cost reveal">
            <p className="ledger__head">
              <IconCross size={16} />
              Ce qui coûte
            </p>
            <ul className="ledger__list">
              {COST.map((c) => (
                <li key={c}>
                  <IconCross size={16} className="ledger__ic" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="takeaway reveal">
          <div>
            <p className="takeaway__label">À retenir</p>
            <p>
              Le modèle est crédible si la récompense{' '}
              <strong>déclenche du réachat</strong> et si la collecte est{' '}
              <strong>mutualisée</strong> avec un distributeur ou un opérateur RVM.
            </p>
          </div>
          <div className="kpi-chips">
            {KPIS.map((k) => (
              <span className="kpi-chip" key={k}>
                <IconTarget size={15} />
                {k}
              </span>
            ))}
          </div>
        </div>

        <p className="src-note reveal">
          Sources : benchmark prix GMS (relevés) ; Reichheld (1996), The Loyalty
          Effect ; Boîtes à outils Prix &amp; Distribution (S. Ruaud).
        </p>
      </div>
    </section>
  )
}
