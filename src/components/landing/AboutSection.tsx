import { Icon } from '@/components/icons/Icon'
import { Card } from '@/components/ui/Card'
import { SectionHead, SubHead } from '@/components/landing/SectionHead'
import { StaffCard } from '@/components/landing/StaffCard'
import { ABOUT } from '@/data/mock/about'
import { LEADERSHIP, DEPT_OFFICERS } from '@/data/mock/team'

export function AboutSection() {
  return (
    <section id="about" className="px-[30px] py-[52px] max-lg:px-4 max-lg:py-[38px]">
      <SectionHead
        eyebrow="About"
        title="Placement Cell — mission & vision"
        description="Gujarat University's Training & Placement Cell, operating from the B K School of Business Management campus."
      />

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <Card pad>
          <h3 className="text-[15px] text-navy">Mission</h3>
          <p className="mt-1.5 text-[13px] leading-[1.6] text-[#46443d]">{ABOUT.mission}</p>
        </Card>
        <Card pad>
          <h3 className="text-[15px] text-navy">Vision</h3>
          <p className="mt-1.5 text-[13px] leading-[1.6] text-[#46443d]">{ABOUT.vision}</p>
        </Card>
        <Card pad>
          <h3 className="text-[15px] text-navy">Objective</h3>
          <p className="mt-1.5 text-[13px] leading-[1.6] text-[#46443d]">{ABOUT.objective}</p>
        </Card>
        <Card pad className="bg-navy text-white">
          <h3 className="text-[15px] text-white">Our motto</h3>
          <p className="mt-2.5 font-serif text-xl text-gold-soft">"{ABOUT.motto}"</p>
        </Card>
      </div>

      <Card pad className="mt-4">
        <h3 className="mb-2.5 text-[15px] text-navy">Best practices</h3>
        <div className="grid grid-cols-2 gap-2.5 max-lg:grid-cols-1">
          {ABOUT.bestPractices.map((bp) => (
            <div key={bp} className="flex items-start gap-2.5 text-[12.5px] text-[#46443d]">
              <Icon name="check" className="mt-0.5 h-[17px] w-[17px] flex-none text-gold" />
              <span>{bp}</span>
            </div>
          ))}
        </div>
      </Card>

      <SubHead title="About Gujarat University" tag="Est. 1949" />
      <Card pad>
        <p className="text-[13px] leading-[1.65] text-[#46443d]">
          Established in 1949, Gujarat University is one of India's largest affiliating universities, serving
          lakhs of students across its departments and affiliated colleges in Ahmedabad. Its Training & Placement
          Cell works across every department to connect students with recruiters, internships, and
          career-readiness programmes.
        </p>
      </Card>

      <SubHead title="Leadership" tag="University" />
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-1">
        {LEADERSHIP.map((l) => (
          <StaffCard key={l.name} name={l.name} role={l.role} bio={l.bio} />
        ))}
      </div>

      <SubHead title="Our department-wise placement officers" tag="Every department" />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">Department</th>
              <th className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">Placement Officer</th>
              <th className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">Email</th>
            </tr>
          </thead>
          <tbody>
            {DEPT_OFFICERS.map((d) => (
              <tr key={d.dept}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{d.dept}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{d.name}</td>
                <td className="border-b border-line-2 px-3.5 py-3">
                  <a href={`mailto:${d.email}`} className="text-navy">{d.email}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  )
}
