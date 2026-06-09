interface InterludeProps {
  eyebrow: string
  title: string
  note?: string
  align?: 'left' | 'right'
}

/** Section transparente : la canette 3D occupe le centre, le texte se loge sur un côté. */
export function Interlude({ eyebrow, title, note, align = 'left' }: InterludeProps) {
  return (
    <section className={`interlude interlude--${align}`} aria-hidden={false}>
      <div className="container interlude__inner">
        <div className="interlude__text reveal">
          <p className="kicker">{eyebrow}</p>
          <p className="interlude__title">{title}</p>
          {note && <p className="interlude__note">{note}</p>}
        </div>
      </div>
    </section>
  )
}
