import { AnnexSection } from './AnnexSection'

interface Milestone {
  year: string
  title: string
  desc: string
  key?: boolean
}

const MILESTONES: Milestone[] = [
  {
    year: '1987',
    title: 'Naissance',
    desc: 'Mateschitz lance Red Bull en Autriche, à partir du Krating Daeng thaïlandais.',
    key: true,
  },
  {
    year: '1992',
    title: 'Expansion Europe',
    desc: 'Hongrie, Slovénie, Allemagne : Red Bull conquiert l’Europe centrale.',
  },
  {
    year: '1997',
    title: 'Arrivée USA',
    desc: 'Lancement aux États-Unis — déclencheur de la catégorie energy drinks.',
  },
  {
    year: '2005',
    title: 'Red Bull Racing',
    desc: 'Rachat de l’écurie F1 Jaguar : naissance de Red Bull Racing.',
  },
  {
    year: '2010-13',
    title: '4 titres F1',
    desc: 'Sebastian Vettel champion du monde quatre années consécutives.',
  },
  {
    year: '2012',
    title: 'Red Bull Stratos',
    desc: 'Saut stratosphérique de Felix Baumgartner — viralité historique.',
  },
  {
    year: '2022',
    title: 'Décès Mateschitz',
    desc: 'Disparition du fondateur. Doublé F1 Verstappen.',
  },
  {
    year: '2023',
    title: 'Record absolu',
    desc: '12,1 Md de canettes vendues — record historique de la marque.',
    key: true,
  },
]

export function AnnexTimeline() {
  return (
    <AnnexSection
      id="annexe-a"
      eyebrow="Annexe A · Timeline"
      pager="A1 / 9"
      panel="soft"
      title="Quarante ans en huit moments"
      lead="Les jalons qui ont sculpté Red Bull, de la canette autrichienne au record mondial."
      source="Source : Red Bull GmbH ; Forbes ; presse spécialisée."
    >
      <ol className="timeline">
        {MILESTONES.map((m) => (
          <li className={`tl reveal ${m.key ? 'tl--key' : ''}`} key={m.year}>
            <span className="tl__year tabular">{m.year}</span>
            <div className="tl__body">
              <h3 className="tl__title">{m.title}</h3>
              <p className="tl__desc">{m.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </AnnexSection>
  )
}
