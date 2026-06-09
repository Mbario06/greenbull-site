import { Fragment } from 'react'
import { AnnexSection } from './AnnexSection'
import { IconArrowRight, IconReturn } from '../icons'

interface LoopStep {
  n: string
  title: string
  desc: string
}

const STEPS: LoopStep[] = [
  {
    n: '1',
    title: 'Investissement marketing',
    desc: 'Estimé autour de 30 % du CA (sources sectorielles, non confirmé) : sport extrême, F1, eSport, contenu.',
  },
  {
    n: '2',
    title: 'Création de contenu',
    desc: 'Red Bull Media House : films, événements, stories, athlètes signés.',
  },
  {
    n: '3',
    title: 'Notoriété & image',
    desc: 'Présence omniprésente, narratif cohérent, capital de marque massif.',
  },
  {
    n: '4',
    title: 'Prix premium accepté',
    desc: '+20 à +40 % vs concurrents — la marque justifie l’écart.',
  },
  {
    n: '5',
    title: 'Marges élevées & cash',
    desc: 'Le cash est réinvesti massivement en marketing → retour à l’étape 1.',
  },
]

export function AnnexModel() {
  return (
    <AnnexSection
      id="annexe-c"
      eyebrow="Annexe C · Modèle économique"
      pager="A3 / 7"
      panel="green"
      title="La boucle vertueuse Red Bull"
      lead="Comment la marque-média auto-finance sa propre domination : le sponsoring n’est pas un coût, c’est le moteur."
      source="Modélisation établie à partir de Red Bull (2023), Boulocher V., Daly P. et Ruaud S. (2019) et observations de marché."
    >
      <div className="loop reveal" role="list" aria-label="Boucle vertueuse en cinq étapes">
        {STEPS.map((s, i) => (
          <Fragment key={s.n}>
            <div className="loop__step" role="listitem">
              <span className="loop__n tabular">{s.n}</span>
              <h3 className="loop__title">{s.title}</h3>
              <p className="loop__desc">{s.desc}</p>
            </div>
            {i < STEPS.length - 1 && (
              <span className="loop__arrow" aria-hidden="true">
                <IconArrowRight size={20} />
              </span>
            )}
          </Fragment>
        ))}
      </div>

      <p className="loop__back reveal">
        <span className="loop__back-glyph" aria-hidden="true">
          <IconReturn size={17} />
        </span>
        Boucle vertueuse · le cash finance le marketing qui finance la boucle suivante
      </p>

      <div className="annex__callout">
        <div className="callout reveal">
          <p className="callout__label">Lecture du mécanisme</p>
          <p>
            Le sponsoring crée du contenu, qui crée de la notoriété, qui crée du
            prix premium, qui crée du cash, qui finance plus de sponsoring.
          </p>
        </div>
        <div className="callout callout--accent reveal">
          <p className="callout__label">Défi pour un entrant</p>
          <p>
            Pour briser cette boucle, il faudrait répliquer 40 ans
            d’investissement marketing — une barrière à l’entrée quasi
            infranchissable.
          </p>
        </div>
      </div>
    </AnnexSection>
  )
}
