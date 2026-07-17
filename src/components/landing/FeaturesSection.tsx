import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons'
import { SectionHead } from '@/components/landing/SectionHead'

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'spark', title: 'AI CV Studio', body: 'Auto-build an ATS-ready résumé from your profile, score it out of 100, and fix it in one click.' },
  { icon: 'target', title: 'Smart job matching', body: 'Get matched to roles that fit your branch, skills, and CGPA — no ineligible listings.' },
  { icon: 'brief', title: 'Campus drives', body: 'Register, track rounds, and get interview schedules and results as they happen.' },
  { icon: 'chart', title: 'Live analytics', body: 'Department-wise placement rates, packages, and recruiter engagement in real time.' },
  { icon: 'book', title: 'Training & prep', body: 'Aptitude bootcamps, coding tracks, group-discussion labs, and mock interviews.' },
  { icon: 'shield', title: 'Verified & secure', body: 'Role-based access, verified recruiters, and tamper-evident certificates.' },
]

export function FeaturesSection() {
  return (
    <section className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead
        eyebrow="What the platform does"
        title="Every step of placement, in one place"
        description="From the first résumé to the final offer letter — automated, intelligent, and transparent."
      />
      <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-1">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border border-line bg-white p-[22px]">
            <div className="mb-3.5 grid h-[42px] w-[42px] place-items-center rounded-[9px] bg-navy-soft">
              <Icon name={f.icon} className="h-[21px] w-[21px] text-navy" />
            </div>
            <h3 className="text-[17px]">{f.title}</h3>
            <p className="mt-1.5 text-[13.5px] text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
