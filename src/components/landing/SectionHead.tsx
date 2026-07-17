interface SectionHeadProps {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHead({ eyebrow, title, description }: SectionHeadProps) {
  return (
    <div className="mx-auto mb-[34px] max-w-[640px] text-center">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-2 text-[32px]">{title}</h2>
      {description && <p className="mt-2.5 text-muted">{description}</p>}
    </div>
  )
}

export function SubHead({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="my-[26px] flex items-baseline gap-3">
      <h3 className="text-[18px]">{title}</h3>
      <div className="h-px flex-1 bg-line" />
      <span className="text-xs text-muted">{tag}</span>
    </div>
  )
}
