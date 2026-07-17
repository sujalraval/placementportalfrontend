import type { ReactNode } from 'react'
import type { StudentProfile } from '@/data/mock/me'

function CvSectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2.5 border-b border-line pb-1.5 font-sans text-[11.5px] font-extrabold uppercase tracking-[.14em] text-navy">
      {children}
    </h3>
  )
}

function CvBullet({ children }: { children: ReactNode }) {
  return <div className="relative my-0.5 pl-[15px] text-[12.5px] leading-[1.55] text-[#333] before:absolute before:left-0 before:text-gold before:content-['▸']">{children}</div>
}

export function CvDocument({ profile: m }: { profile: StudentProfile }) {
  return (
    <div>
      <div className="font-serif text-[32px] font-semibold tracking-[-.3px] text-navy">{m.name}</div>
      <div className="mt-0.5 text-sm font-semibold text-gold">{m.headline}</div>
      <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[11.5px] text-[#444]">
        <span>{m.email}</span><span>{m.phone}</span><span>{m.city}, India</span>
        {m.links.map((l) => <span key={l.label}>{l.url}</span>)}
      </div>
      <div className="mt-[15px] h-0.5 bg-navy" />

      <div className="mt-[19px]">
        <CvSectionTitle>Summary</CvSectionTitle>
        <p className="text-[12.5px] leading-[1.55] text-[#333]">{m.summary}</p>
      </div>

      <div className="mt-[19px]">
        <CvSectionTitle>Education</CvSectionTitle>
        <div className="mb-3">
          <div className="flex justify-between gap-3"><b className="text-[13.5px] text-[#1c1c1c]">{m.dept}</b><span className="whitespace-nowrap text-[11.5px] text-[#666]">{m.batch}</span></div>
          <div className="mt-0.5 text-xs font-semibold text-gold">Gujarat University, Ahmedabad</div>
          <p className="text-[12.5px] leading-[1.5] text-[#333]">
            CGPA {m.cgpa} / 10 &nbsp;·&nbsp; {m.backlogs} active backlogs &nbsp;·&nbsp; consistent first-class performance across {m.semesters.length} semesters.
          </p>
        </div>
      </div>

      <div className="mt-[19px]">
        <CvSectionTitle>Experience</CvSectionTitle>
        {m.internships.map((x) => (
          <div key={x.role + x.co} className="mb-3">
            <div className="flex justify-between gap-3"><b className="text-[13.5px] text-[#1c1c1c]">{x.role} — {x.co}</b><span className="whitespace-nowrap text-[11.5px] text-[#666]">{x.dur}</span></div>
            <div className="mt-0.5 text-xs font-semibold text-gold">{x.loc}</div>
            <CvBullet>{x.desc}</CvBullet>
            <div className="mt-[3px] text-[11px] text-navy">Tech: {x.tech}</div>
          </div>
        ))}
      </div>

      <div className="mt-[19px]">
        <CvSectionTitle>Projects</CvSectionTitle>
        {m.projects.map((p) => (
          <div key={p.name} className="mb-3">
            <div className="flex justify-between gap-3"><b className="text-[13.5px] text-[#1c1c1c]">{p.name}</b><span className="whitespace-nowrap text-[11.5px] text-[#666]">{p.stack}</span></div>
            <p className="text-[12.5px] leading-[1.5] text-[#333]">{p.desc}</p>
            <div className="mt-[3px] text-[11px] text-navy">
              {[p.repo ? 'Code: ' + p.repo : '', p.demo ? 'Demo: ' + p.demo : ''].filter(Boolean).join('  ·  ')}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[19px]">
        <CvSectionTitle>Technical skills</CvSectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {m.skills.map((s) => <span key={s.n} className="rounded-[5px] border border-line bg-paper px-2.5 py-1 text-[11.5px] text-[#333]">{s.n}</span>)}
        </div>
        <p className="mt-2 text-xs text-[#555]"><b>Soft skills:</b> {m.soft.join(', ')}</p>
        <p className="mt-0.5 text-xs text-[#555]"><b>Languages:</b> {m.languages.join(', ')}</p>
      </div>

      <div className="mt-[19px] grid grid-cols-2 gap-x-[26px]">
        <div>
          <CvSectionTitle>Achievements</CvSectionTitle>
          {m.achievements.map((a) => <CvBullet key={a.t}>{a.t} <span className="text-[#888]">({a.y})</span></CvBullet>)}
        </div>
        <div>
          <CvSectionTitle>Certifications</CvSectionTitle>
          {m.certs.map((c) => <CvBullet key={c.name}>{c.name} — {c.by}, {c.year}</CvBullet>)}
        </div>
      </div>

      <div className="mt-[19px]">
        <CvSectionTitle>Positions of responsibility</CvSectionTitle>
        {m.positions.map((p) => (
          <div key={p.role} className="mb-3">
            <div className="flex justify-between gap-3"><b className="text-[13.5px] text-[#1c1c1c]">{p.role}</b><span className="whitespace-nowrap text-[11.5px] text-[#666]">{p.dur}</span></div>
            <div className="mt-0.5 text-xs font-semibold text-gold">{p.org}</div>
            <p className="text-[12.5px] leading-[1.5] text-[#333]">{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
