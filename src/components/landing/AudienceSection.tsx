import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'

const STUDENT_ROWS = [
  'One profile, auto-filled from your academic record',
  'AI résumé builder with instant scoring & feedback',
  'Apply in one click — eligibility checked for you',
  'Track every application from applied to offer',
]

const RECRUITER_ROWS = [
  'Post jobs to specific departments or the whole university',
  'Access a verified, searchable candidate pool',
  'Schedule on-campus, off-campus, or virtual drives',
  'Shortlist, interview, and send offers in one flow',
]

export function AudienceSection() {
  const navigate = useNavigate()

  return (
    <section className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <div className="rounded-xl border border-line bg-white p-[26px]">
          <span className="eyebrow">For students</span>
          <h3 className="mt-2 text-[22px]">Your career, organised.</h3>
          <ul className="my-4 list-none">
            {STUDENT_ROWS.map((row) => (
              <li key={row} className="flex gap-2.5 py-[7px] text-[13.5px]">
                <Icon name="check" className="mt-0.5 h-[17px] w-[17px] flex-none text-gold" />
                {row}
              </li>
            ))}
          </ul>
          <Button onClick={() => navigate('/student/dashboard')}>Open student portal <Icon name="arrow" /></Button>
        </div>
        <div className="rounded-xl border border-navy bg-navy p-[26px] text-white">
          <span className="eyebrow">For recruiters</span>
          <h3 className="mt-2 text-[22px] text-white">Hire across departments.</h3>
          <ul className="my-4 list-none">
            {RECRUITER_ROWS.map((row) => (
              <li key={row} className="flex gap-2.5 py-[7px] text-[13.5px]">
                <Icon name="check" className="mt-0.5 h-[17px] w-[17px] flex-none text-gold" />
                {row}
              </li>
            ))}
          </ul>
          <Button variant="gold" onClick={() => navigate('/recruiter/dashboard')}>
            Enter recruiter portal <Icon name="arrow" />
          </Button>
        </div>
      </div>
    </section>
  )
}
