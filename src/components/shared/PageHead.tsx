import type { ReactNode } from 'react'

interface PageHeadProps {
  title: string
  description?: ReactNode
  actions?: ReactNode
}

export function PageHead({ title, description, actions }: PageHeadProps) {
  return (
    <div className="mb-[22px] flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[26px]">{title}</h1>
        {description && <p className="mt-[3px] text-[13.5px] text-muted">{description}</p>}
      </div>
      {actions}
    </div>
  )
}
