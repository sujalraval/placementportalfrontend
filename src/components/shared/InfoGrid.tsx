interface InfoGridProps {
  items: [string, string][]
}

export function InfoGrid({ items }: InfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-[26px] max-lg:grid-cols-1">
      {items.map(([k, v]) => (
        <div key={k} className="border-b border-line-2 py-2.5 last:border-b-0">
          <div className="text-[10.5px] font-bold uppercase tracking-[.05em] text-muted">{k}</div>
          <div className="mt-[3px] text-sm">{v}</div>
        </div>
      ))}
    </div>
  )
}
