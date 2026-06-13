import { AnnexSection } from './AnnexSection'

interface Row {
  partner: string
  profile: string
  bring: string
  phase: string
  self?: boolean
}

const ROWS: Row[] = [
  {
    partner: 'Carrefour « Act For Good »',
    profile:
      'Programme RSE de Carrefour : transition alimentaire, anti-gaspillage, réemploi (pilotes Citeo ReUse, vrac).',
    bring:
      'Hôte du pilote GMS : rayon energy + bac / borne de retour en magasin, co-branding responsable.',
    phase: 'Phase 1',
  },
  {
    partner: 'Chaque Canette Compte',
    profile:
      'Programme européen de recyclage des canettes, porté par la filière aluminium ; présent en festivals, campus, bureaux.',
    bring:
      'Collecte « nomade » + bornes événementielles + pédagogie qui protège du greenwashing.',
    phase: 'Phase 2',
  },
  {
    partner: 'Elise',
    profile:
      'Entreprise de l’ESS (entreprise adaptée) : collecte et tri des déchets de bureau et de campus, emplois solidaires.',
    bring:
      'Logistique de collecte campus / bureaux + preuve sociale (ESS) ajoutée à la preuve écologique.',
    phase: 'Phase 2',
  },
  {
    partner: 'TOMRA / Citeo ReUse',
    profile:
      'Opérateurs de consigne automatisée (RVM) et de réemploi, déjà actifs en Europe et en France.',
    bring:
      'Industrialisation : RVM partagées, traçabilité matière, mutualisation multi-marques.',
    phase: 'Phase 3',
  },
]

export function AnnexPartners() {
  return (
    <AnnexSection
      id="annexe-h"
      eyebrow="Annexe H · Partenariats"
      pager="A8 / 9"
      title="Avec qui collecter ? Trois partenaires réels"
      lead="GreenBull Return n’invente pas la collecte : il la rend désirable. La couche QR + points + récompense se branche sur des dispositifs déjà opérationnels et crédibles — chacun aligné sur une phase du déploiement."
      source="Sources : Carrefour, programme Act For Good ; Chaque Canette Compte / Every Can Counts (filière aluminium) ; Elise (ESS) ; TOMRA ; Citeo ReUse. Pistes de partenariat — non contractualisées."
    >
      <div className="dtable-wrap reveal">
        <table className="dtable">
          <thead>
            <tr>
              <th scope="col">Partenaire</th>
              <th scope="col">Profil</th>
              <th scope="col">Apport pour GreenBull Return</th>
              <th scope="col">Phase</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr className={r.self ? 'is-self' : ''} key={r.partner}>
                <td className="dt-market" data-label="Partenaire">
                  {r.partner}
                </td>
                <td data-label="Profil">{r.profile}</td>
                <td data-label="Apport">{r.bring}</td>
                <td className="dt-key" data-label="Phase">
                  {r.phase}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="annex__callout">
        <div className="callout reveal" style={{ gridColumn: '1 / -1' }}>
          <p className="callout__label">Pourquoi ça tient</p>
          <p>
            Un programme mono-marque adossé à des acteurs multi-partenaires : la
            promesse de retour ne repose pas sur Red Bull seul, mais sur une
            collecte déjà financée et rodée. C’est ce qui rend le concept
            défendable face à la critique du greenwashing.
          </p>
        </div>
      </div>

      <div className="verdict reveal">
        <span className="verdict__tag">Verdict</span>
        <p>
          Faisable, mesurable et progressif : <strong>Carrefour</strong> pour le
          retail, <strong>Chaque Canette Compte</strong> et <strong>Elise</strong>{' '}
          pour l’événementiel et les campus, un opérateur <strong>RVM</strong> pour
          l’échelle.
        </p>
      </div>
    </AnnexSection>
  )
}
