function DocSectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2.5 border-b border-line pb-1.5 font-sans text-[11.5px] font-extrabold uppercase tracking-[.14em] text-navy">
      {children}
    </h3>
  )
}

export function ReportDocument({ title, desc }: { title: string; desc: string }) {
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  return (
    <div>
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[.14em] text-gold">Gujarat University · Training &amp; Placement Cell</div>
        <div className="mt-1.5 font-serif text-2xl font-semibold text-navy">{title}</div>
        <div className="mt-1 text-[11.5px] text-[#666]">Generated on {today}</div>
      </div>
      <div className="my-[15px] h-0.5 bg-navy" />
      <div className="mt-[19px]">
        <DocSectionTitle>Summary</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">{desc}</p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Season</DocSectionTitle>
        <p className="text-[12.5px] text-[#333]">Academic year 2025–26 · University-wide placement season</p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Prepared by</DocSectionTitle>
        <p className="text-[12.5px] text-[#333]">Training &amp; Placement Cell, Gujarat University</p>
      </div>
      <p className="mt-[30px] text-[11px] text-[#999]">This is a system-generated document from the Placement ERP. Figures reflect live portal data at the time of generation.</p>
    </div>
  )
}
