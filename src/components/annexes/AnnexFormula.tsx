import { AnnexSection } from './AnnexSection'

interface Spec {
  comp: string
  rb: string
  gb: string
  stance: string
  self?: boolean
}

const RECIPE: Spec[] = [
  {
    comp: 'Caféine',
    rb: '80 mg (≈ 1 espresso)',
    gb: '80 mg — option café vert / guarana',
    stance: 'Énergie maintenue, affichage clair, réservé aux 18+',
  },
  {
    comp: 'Sucres',
    rb: '≈ 27,5 g (11 g / 100 ml)',
    gb: '≈ 12,5 g (5 g / 100 ml) + version Zéro stévia',
    stance: '−55 % : « allégé », pas « light chimique »',
    self: true,
  },
  {
    comp: 'Taurine',
    rb: '1000 mg',
    gb: '1000 mg (dose encadrée)',
    stance: 'Formule reconnue, communication sobre',
  },
  {
    comp: 'Vitamines & arômes',
    rb: 'B3 · B5 · B6 · B12',
    gb: 'Vitamines B + arômes naturels',
    stance: 'Naturalité affichée, sans sur-promesse',
  },
  {
    comp: 'Emballage',
    rb: 'Canette aluminium',
    gb: 'Alu 100 % recyclable · 0 film plastique',
    stance: 'Cœur de la promesse Return',
    self: true,
  },
]

interface PnL {
  line: string
  amount: string
  note: string
  kind?: 'in' | 'out' | 'sum'
}

const PNL: PnL[] = [
  { line: 'Prix consommateur TTC', amount: '1,95 €', note: 'GMS France', kind: 'in' },
  { line: '− TVA (20 %)', amount: '−0,33 €', note: '→ 1,62 € HT', kind: 'out' },
  { line: '− Marge distributeur (~28 %)', amount: '−0,45 €', note: 'prix de cession ≈ 1,17 € HT', kind: 'out' },
  { line: '− COGS (canette, liquide, remplissage, logistique)', amount: '≈ −0,28 €', note: 'sucre réduit ≈ compensé par alu + arômes naturels', kind: 'out' },
  { line: '− Dispositif Return (QR, PLV, récompense × taux de retour)', amount: '≈ −0,09 €', note: 'coupon 0,15 € × ~30 % de retour + amortissement', kind: 'out' },
  { line: '= Marge brute contributive', amount: '≈ 0,80 €', note: 'avant marketing & structure', kind: 'sum' },
]

export function AnnexFormula() {
  return (
    <AnnexSection
      id="annexe-i"
      eyebrow="Annexe I · Formule & rentabilité"
      pager="A9 / 9"
      panel="soft"
      title="La recette et l’économie d’une canette"
      lead="Trois partis pris produit — caféine maîtrisée, sucres allégés, taurine maintenue — et une lecture transparente de la marge, poste par poste."
      source="Recette et coûts = hypothèses de travail (ordres de grandeur du secteur), non auditées. Repères caféine / taurine / sucres d’après valeurs publiques Red Bull et seuils EFSA (2015) & ANSES (2022)."
    >
      <div className="dtable-wrap reveal">
        <table className="dtable">
          <thead>
            <tr>
              <th scope="col">Composant</th>
              <th scope="col">Red Bull (250 ml, réf.)</th>
              <th scope="col">GreenBull Return</th>
              <th scope="col">Parti pris</th>
            </tr>
          </thead>
          <tbody>
            {RECIPE.map((r) => (
              <tr className={r.self ? 'is-self' : ''} key={r.comp}>
                <td className="dt-market" data-label="Composant">
                  {r.comp}
                </td>
                <td data-label="Red Bull">{r.rb}</td>
                <td className="dt-key" data-label="GreenBull">
                  {r.gb}
                </td>
                <td data-label="Parti pris">{r.stance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="kpi__label reveal" style={{ marginTop: '2rem' }}>
        Compte de résultat par canette — hypothèse
      </p>
      <div className="dtable-wrap reveal">
        <table className="dtable">
          <thead>
            <tr>
              <th scope="col">Poste</th>
              <th scope="col">Par canette</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {PNL.map((p) => (
              <tr className={p.kind === 'sum' ? 'is-self' : ''} key={p.line}>
                <td className="dt-market" data-label="Poste">
                  {p.line}
                </td>
                <td className="dt-key" data-label="Montant">
                  {p.amount}
                </td>
                <td data-label="Note">{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="verdict reveal">
        <span className="verdict__tag">Lecture</span>
        <p>
          Le premium de <strong>+0,20 €</strong> vs Red Bull (≈ +11 %) couvre le
          surcoût du dispositif Return (~0,09 €). Mais la rentabilité réelle vient
          du <strong>réachat incrémental</strong> déclenché par la récompense — et
          d’une collecte mutualisée avec un distributeur ou un opérateur RVM — pas
          du premium seul.
        </p>
      </div>
    </AnnexSection>
  )
}
