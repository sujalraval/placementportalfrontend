interface TabsProps {
  tabs: string[]
  active: number
  onChange: (i: number) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="mb-[18px] flex flex-wrap gap-1 border-b border-line">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(i)}
          className={`-mb-px border-b-2 px-3.5 py-2.5 text-[13px] font-semibold ${
            i === active ? 'border-gold text-navy' : 'border-transparent text-muted'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
