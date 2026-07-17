import { ICON_PATHS, type IconName } from './icons'

interface IconProps {
  name: IconName
  className?: string
}

// Icon paths are static internal constants (not user input), so injecting
// them via dangerouslySetInnerHTML carries no XSS risk here.
export function Icon({ name, className = 'w-[17px] h-[17px]' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] ?? '' }}
    />
  )
}
