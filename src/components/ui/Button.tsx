import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'solid' | 'gold' | 'ghost'
type Size = 'md' | 'sm'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const VARIANT_CLASSES: Record<Variant, string> = {
  solid: 'bg-navy text-white hover:bg-navy-2',
  gold: 'bg-gold text-white hover:bg-[#96671a]',
  ghost: 'bg-white text-navy border border-line hover:border-navy hover:bg-paper',
}

const SIZE_CLASSES: Record<Size, string> = {
  md: 'px-4 py-2.5 text-[13px]',
  sm: 'px-3 py-1.5 text-[12px]',
}

export function Button({
  variant = 'solid',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md font-semibold transition-colors duration-150 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
