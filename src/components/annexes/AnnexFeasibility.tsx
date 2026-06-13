import { AnnexSection } from './AnnexSection'
import { useCountUp } from '../../hooks/useCountUp'
import { IconCheck, IconCross } from '../icons'

function Fig({ to, label }: { to: number; label: string }) {
  const { ref, value } = useCountUp(to)
  return (
    <div className="fig reveal">
      <span ref={ref as React.RefObject<HTMLSpanElement>} className="fig__num tabular">
        {Math.round(value)}
        <span>%</span>
      </span>
      <span className="fig__label">{label}</span>
    </div>
  )
}

const CREDIBLE = [
  'QR code + points / coupon immédiat en magasin',
  'Retour via borne, bac identifié ou RVM partenaire',
  'La canette vide devient un support de réachat',
  'Pilote en GMS / campus / festival avant déploiement',
]

const RISKY = [
  'Créer seul une « vraie consigne » nationale',
  'Promettre que chaque canette redevient une GreenBull',
  'Sous-estimer les coûts (borne, collecte, fraude)',
  'Récompense trop faible → le consommateur jette',
]

export function AnnexFeasibility() {
  return (
    <AnnexSection
      id="annexe-e"
      eyebrow="Annexe E · Faisabilité"
      pager="A5 / 9"
      panel="soft"
      title="Le modèle Return est-il réaliste ?"
      lead="Les systèmes de retour fonctionnent là où ils existent. Reste à distinguer ce qui est crédible pour une marque seule de ce qui ne l’est pas."
      source="Sources : TOMRA (Allemagne, Norvège) ; Re-turn (Irlande) ; Parlement européen — règlement PPWR ; Citeo ReUse."
    >
      <div className="figrow">
        <Fig to={98} label="retour des contenants — Allemagne (Pfand)" />
        <Fig to={92} label="retour aluminium — Norvège (Infinitum)" />
        <Fig to={90} label="objectif UE de collecte séparée à 2029" />
      </div>

      <div className="judge">
        <div className="judge__col judge__col--ok reveal">
          <p className="judge__head">Ce qui est crédible</p>
          <ul className="judge__list">
            {CREDIBLE.map((c) => (
              <li key={c}>
                <IconCheck size={18} className="judge__ic" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="judge__col judge__col--risk reveal">
          <p className="judge__head">Ce qui est risqué</p>
          <ul className="judge__list">
            {RISKY.map((r) => (
              <li key={r}>
                <IconCross size={18} className="judge__ic" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="verdict reveal">
        <span className="verdict__tag">Verdict</span>
        <p>
          Réaliste comme <strong>programme de retour récompensé</strong>, pas
          comme consigne nationale propriétaire — il rend le retour désirable.
        </p>
      </div>
    </AnnexSection>
  )
}
