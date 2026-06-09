// Jeu d'icônes maison — trait 1.6, viewBox 24, currentColor, bouts arrondis.
// Famille cohérente (pas d'emoji, conforme aux règles UI).

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  className,
})

export function IconBolt({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
    </svg>
  )
}

export function IconLeaf({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M20 4C9 4 4 9.5 4 17c0 1.5.4 2.7.4 2.7S10 14 20 12c0 0-7 1-12 6" />
      <path d="M4.4 19.7C3.6 18.4 4 17 4 17" />
    </svg>
  )
}

export function IconRecycle({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M7 19H4.5a2 2 0 0 1-1.7-3l2.3-4" />
      <path d="m9.8 6.2 1.4-2.4a2 2 0 0 1 3.5 0l2 3.4" />
      <path d="M14 19h5.5a2 2 0 0 0 1.7-3l-1.3-2.2" />
      <path d="m6.1 9.5-1.4-2.4 3 .2M9.5 19l1.5 2.6M19.8 13.8l.9-2.9-3 .8" />
    </svg>
  )
}

export function IconGift({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <rect x="3.5" y="9" width="17" height="4" rx="1" />
      <path d="M5 13v7.5h14V13M12 9v11.5" />
      <path d="M12 9S10.5 4 8 4.5 8.5 9 12 9Zm0 0s1.5-5 4-4.5S15.5 9 12 9Z" />
    </svg>
  )
}

export function IconScan({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M3.5 12h17" />
    </svg>
  )
}

export function IconCan({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M8 5.5h8M8.4 4.2h7.2" />
      <rect x="7" y="5.5" width="10" height="15" rx="2.4" />
      <path d="M7 9.5h10M7 16.5h10" />
    </svg>
  )
}

export function IconReturn({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4v3.5h-3.5" />
    </svg>
  )
}

export function IconTrophy({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4.5v1.5A2.5 2.5 0 0 0 7 10M17 6h2.5v1.5A2.5 2.5 0 0 1 17 10M9.5 13.5 9 20h6l-.5-6.5M7.5 20h9" />
    </svg>
  )
}

export function IconPin({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M12 21s7-5.4 7-11a7 7 0 0 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function IconTicket({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v1a2 2 0 0 0 0 5v1a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 15.5v-1a2 2 0 0 0 0-5Z" />
      <path d="M14 7v10" />
    </svg>
  )
}

export function IconArrowRight({ size = 24, className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconArrowDown({ size = 24, className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M12 4v15M6 13l6 6 6-6" />
    </svg>
  )
}

export function IconSpark({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M12 3c.4 4.5 1.5 5.6 6 6-4.5.4-5.6 1.5-6 6-.4-4.5-1.5-5.6-6-6 4.5-.4 5.6-1.5 6-6Z" />
    </svg>
  )
}

export function IconCheck({ size = 24, className, strokeWidth = 1.9 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  )
}

export function IconCross({ size = 24, className, strokeWidth = 1.9 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  )
}

export function IconTarget({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" />
    </svg>
  )
}

export function IconChart({ size = 24, className, strokeWidth = 1.6 }: IconProps) {
  return (
    <svg {...base(size, className)} strokeWidth={strokeWidth}>
      <path d="M4 4v16h16" />
      <path d="M8 14v3M12 10v7M16 6v11" />
    </svg>
  )
}
