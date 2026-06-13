import { IconArrowRight } from '../icons'

interface TocEntry {
  letter: string
  cat: string
  title: string
  href: string
}

const TOC: TocEntry[] = [
  { letter: 'A', cat: 'Timeline', title: 'Quarante ans en huit moments', href: '#annexe-a' },
  { letter: 'B', cat: 'Positionnement', title: 'Mapping concurrentiel', href: '#annexe-b' },
  { letter: 'C', cat: 'Modèle économique', title: 'La boucle vertueuse', href: '#annexe-c' },
  { letter: 'D', cat: 'Données', title: 'Le marché en deux graphiques', href: '#annexe-d' },
  { letter: 'E', cat: 'Faisabilité', title: 'Le modèle Return est-il réaliste ?', href: '#annexe-e' },
  { letter: 'F', cat: 'Benchmark', title: 'Les systèmes de retour existants', href: '#annexe-f' },
  { letter: 'G', cat: 'Recommandation', title: 'Un pilote Return & Recharge', href: '#annexe-g' },
  { letter: 'H', cat: 'Partenariats', title: 'Carrefour, Chaque Canette Compte, Elise', href: '#annexe-h' },
  { letter: 'I', cat: 'Formule & rentabilité', title: 'La recette et l’économie d’une canette', href: '#annexe-i' },
  { letter: 'Réf', cat: 'Bibliographie', title: 'Sources mobilisées', href: '#bibliographie' },
]

/** Ouverture de la zone annexes : titre de chapitre + index cliquable. */
export function AnnexIntro() {
  return (
    <section className="section panel" id="annexes">
      <div className="container">
        <header className="section__head reveal">
          <p className="kicker">Annexes du dossier</p>
          <h2 className="section__title">Le dossier, en profondeur.</h2>
          <p className="section__lead">
            Neuf volets pour étayer l’analyse — trajectoire de la marque, données
            de marché, faisabilité, partenaires de collecte, formule et marges du
            concept Return — suivis de la bibliographie.
          </p>
        </header>

        <nav className="annex-toc" aria-label="Sommaire des annexes">
          {TOC.map((t) => (
            <a className="toc-card reveal" href={t.href} key={t.letter}>
              <span className="toc-card__letter" aria-hidden="true">
                {t.letter}
              </span>
              <IconArrowRight size={18} className="toc-card__arrow" />
              <span className="toc-card__cat">{t.cat}</span>
              <span className="toc-card__title">{t.title}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
