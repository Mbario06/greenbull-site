import { AnnexSection } from './AnnexSection'

interface Row {
  market: string
  model: string
  result: string
  lesson: string
  self?: boolean
}

const ROWS: Row[] = [
  {
    market: 'Allemagne',
    model: 'Pfand — consigne nationale',
    result: '≈ 98 % de retour',
    lesson: 'Dépôt fort + habitude + réseau dense',
  },
  {
    market: 'Norvège',
    model: 'Infinitum (industrie + retail)',
    result: '92 % alu / 95 % PET',
    lesson: 'Système partagé et traçable',
  },
  {
    market: 'Irlande',
    model: 'DRS lancé en 2024',
    result: '15c / 25c, adoption progressive',
    lesson: 'Pédagogie + logo + RVM indispensables',
  },
  {
    market: 'France',
    model: 'Citeo ReUse / pilotes réemploi',
    result: '4 régions, enseignes GMS',
    lesson: 'Opportunité de partenariat retail',
  },
  {
    market: 'GreenBull',
    model: 'Programme de points / coupons',
    result: 'À tester en pilote',
    lesson: 'Commencer simple, mesurer, adapter',
    self: true,
  },
]

export function AnnexBenchmark() {
  return (
    <AnnexSection
      id="annexe-f"
      eyebrow="Annexe F · Benchmark"
      pager="A6 / 9"
      title="Les systèmes de retour existent déjà — mais collectifs"
      lead="Les dispositifs les plus performants sont nationaux et multi-marques. GreenBull ajoute une couche de gamification au-dessus d’une collecte réelle."
      source="Sources : TOMRA Allemagne ; Infinitum / TOMRA Norvège ; Re-turn (Irlande) ; Citeo / Carrefour ReUse."
    >
      <div className="dtable-wrap reveal">
        <table className="dtable">
          <thead>
            <tr>
              <th scope="col">Marché</th>
              <th scope="col">Modèle actuel</th>
              <th scope="col">Résultat clé</th>
              <th scope="col">Enseignement</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr className={r.self ? 'is-self' : ''} key={r.market}>
                <td className="dt-market" data-label="Marché">
                  {r.market}
                </td>
                <td data-label="Modèle">{r.model}</td>
                <td className="dt-key" data-label="Résultat">
                  {r.result}
                </td>
                <td data-label="Enseignement">{r.lesson}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="annex__callout">
        <div className="callout reveal" style={{ gridColumn: '1 / -1' }}>
          <p className="callout__label">Lecture critique</p>
          <p>
            Un système mono-marque est moins puissant qu’un dispositif
            national / multi-marques. GreenBull ne porte pas tout seul : il rend
            désirable une collecte qui s’appuie sur des opérateurs existants.
          </p>
        </div>
      </div>
    </AnnexSection>
  )
}
