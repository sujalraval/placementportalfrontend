import type { StudentProfile } from '@/data/mock/me'
import type { MyInternship } from '@/data/mock/internships'

function DocSectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2.5 border-b border-line pb-1.5 font-sans text-[11.5px] font-extrabold uppercase tracking-[.14em] text-navy">
      {children}
    </h3>
  )
}

export function CollegeApprovalLetter({ mi, me }: { mi: MyInternship; me: StudentProfile }) {
  return (
    <div>
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[.14em] text-gold">Gujarat University · Training &amp; Placement Cell</div>
        <div className="mt-1.5 font-serif text-2xl font-semibold text-navy">Letter of College Approval — Internship</div>
        <div className="mt-1 text-[11.5px] text-[#666]">Ref: GU/INT/2026 · Date: 08 Jul 2026</div>
      </div>
      <div className="my-[15px] h-0.5 bg-navy" />

      <div className="mt-[19px]">
        <DocSectionTitle>Student details</DocSectionTitle>
        <div className="grid grid-cols-2 gap-x-[26px]">
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Name: {me.name}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Enrollment: {me.en}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Department: {me.dept}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Batch: {me.batch}</div>
        </div>
      </div>

      <div className="mt-[19px]">
        <DocSectionTitle>Internship details</DocSectionTitle>
        <div className="grid grid-cols-2 gap-x-[26px]">
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Organisation: {mi.co}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Role: {mi.role}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Type: {mi.type === 'Paid' ? `Paid — ${mi.stipend}` : 'Free / Unpaid'}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Mode: {mi.mode}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Affiliation: {mi.affiliation}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Minimum duration: {mi.minWeeks} weeks</div>
        </div>
      </div>

      {mi.credits && (
        <div className="mt-[19px]">
          <DocSectionTitle>Academic credit mapping</DocSectionTitle>
          <div className="grid grid-cols-2 gap-x-[26px]">
            <div className="text-[12.5px] leading-[1.55] text-[#333]">Course code: {mi.credits.course}</div>
            <div className="text-[12.5px] leading-[1.55] text-[#333]">Credits: {mi.credits.count}</div>
            <div className="text-[12.5px] leading-[1.55] text-[#333]">Evaluation basis: {mi.credits.evalBasis}</div>
          </div>
        </div>
      )}

      {mi.mentor && (
        <div className="mt-[19px]">
          <DocSectionTitle>Assigned faculty mentor</DocSectionTitle>
          <p className="text-[12.5px] text-[#333]">{mi.mentor} will supervise and evaluate this internship on behalf of the Department.</p>
        </div>
      )}

      <div className="mt-[19px]">
        <DocSectionTitle>Approval</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">
          The Department of {me.dept}, Gujarat University, has reviewed the above internship and has <b>no objection</b> to{' '}
          {me.name} undertaking it, subject to satisfactory academic standing being maintained throughout the internship
          period and submission of a completion report to the Department on conclusion.
        </p>
      </div>

      <div className="mt-9 w-[230px] border-t border-[#333] pt-1.5 text-[12.5px]">
        <b>Dr. R. Mehta</b><br />Placement Coordinator, {me.dept}
      </div>
    </div>
  )
}

export function ExperienceLetterNOC({ mi, me }: { mi: MyInternship; me: StudentProfile }) {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div className="font-serif text-2xl font-semibold text-navy">{mi.co}</div>
        <div className="text-right text-[11.5px] text-[#666]">
          Date: 08 Jul 2026<br />Ref: {mi.co.replace(/\s+/g, '').toUpperCase()}/INTERN/2026
        </div>
      </div>
      <div className="my-[15px] h-0.5 bg-navy" />

      <div className="mt-[19px]">
        <DocSectionTitle>Experience Letter &amp; No Objection Certificate</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.65] text-[#333]">
          This is to certify that <b>{me.name}</b> ({me.en}), a student of {me.dept}, Gujarat University, successfully
          completed an internship as <b>{mi.role}</b> at {mi.co}, for a duration of at least {mi.minWeeks} weeks, under the{' '}
          {mi.type === 'Paid' ? 'paid' : 'unpaid'} internship category ({mi.affiliation}).
        </p>
        <p className="mt-2 text-[12.5px] leading-[1.65] text-[#333]">
          During this period, {me.name} demonstrated strong commitment, professionalism, and technical ability, and
          contributed meaningfully to the team's ongoing work.
        </p>
        <p className="mt-2 text-[12.5px] leading-[1.65] text-[#333]">
          We have <b>no objection</b> to {me.name} pursuing further academic or professional opportunities, and we wish
          them continued success.
        </p>
      </div>

      <div className="mt-[34px] text-[12.5px]">
        <p>For {mi.co},</p>
        <div className="mt-[22px] w-[230px] border-t border-[#333] pt-1.5"><b>HR Head</b><br />{mi.co}</div>
      </div>
    </div>
  )
}

export function InternshipReportDoc({ mi, me }: { mi: MyInternship; me: StudentProfile }) {
  const r = mi.reportText
  return (
    <div>
      <div className="text-center">
        <div className="text-[11px] font-extrabold uppercase tracking-[.14em] text-gold">Gujarat University · Training &amp; Placement Cell</div>
        <div className="mt-1.5 font-serif text-[22px] font-semibold text-navy">Internship Completion Report</div>
      </div>
      <div className="my-[15px] h-0.5 bg-navy" />

      <div className="mt-[19px]">
        <DocSectionTitle>Internship</DocSectionTitle>
        <div className="grid grid-cols-2 gap-x-[26px]">
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Organisation: {mi.co}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Role: {mi.role}</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Duration: {mi.minWeeks}+ weeks</div>
          <div className="text-[12.5px] leading-[1.55] text-[#333]">Student: {me.name} ({me.en})</div>
        </div>
      </div>

      <div className="mt-[19px]">
        <DocSectionTitle>Objectives</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">{r?.objectives || '—'}</p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Work summary</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">{r?.summary || '—'}</p>
      </div>
      <div className="mt-[19px]">
        <DocSectionTitle>Key learnings</DocSectionTitle>
        <p className="text-[12.5px] leading-[1.6] text-[#333]">{r?.learnings || '—'}</p>
      </div>
    </div>
  )
}
