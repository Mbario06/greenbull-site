import { IconSpark } from './icons'

interface MarqueeProps {
  text: string
  variant?: 'green' | 'cream'
}

export function Marquee({ text, variant = 'green' }: MarqueeProps) {
  const items = Array.from({ length: 4 })
  return (
    <div className={`marquee marquee--${variant}`} aria-hidden="true">
      <div className="marquee__track">
        {items.concat(items).map((_, i) => (
          <span className="marquee__item" key={i}>
            {text}
            <IconSpark size={22} className="marquee__spark" />
          </span>
        ))}
      </div>
    </div>
  )
}
