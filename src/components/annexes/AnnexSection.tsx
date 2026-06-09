import type { ReactNode } from 'react'

type Panel = 'default' | 'soft' | 'green' | 'ink'

interface AnnexSectionProps {
  id: string
  eyebrow: string
  /** pagination reprise du deck, ex. « A1 / 7 » */
  pager: string
  title: ReactNode
  lead?: ReactNode
  panel?: Panel
  /** note de sources affichée en pied de volet */
  source?: ReactNode
  children: ReactNode
}

const PANEL_CLASS: Record<Panel, string> = {
  default: 'panel',
  soft: 'panel panel--soft',
  green: 'panel panel--green',
  ink: 'panel panel--ink',
}

/** Coquille commune à tous les volets d'annexe : en-tête + pagination + sources. */
export function AnnexSection({
  id,
  eyebrow,
  pager,
  title,
  lead,
  panel = 'default',
  source,
  children,
}: AnnexSectionProps) {
  const dark = panel === 'green' || panel === 'ink'
  return (
    <section className={`section ${PANEL_CLASS[panel]}`} id={id}>
      <div className="container">
        <header className="section__head reveal">
          <div className="annex__meta">
            <p className={`kicker ${dark ? 'kicker--light' : ''}`}>{eyebrow}</p>
            <span className="annex__pager">{pager}</span>
          </div>
          <h2 className="section__title">{title}</h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>

        {children}

        {source && <p className="annex__source reveal">{source}</p>}
      </div>
    </section>
  )
}
