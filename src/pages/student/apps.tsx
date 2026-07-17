import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { Stepper } from '@/components/shared/Stepper'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'
import type { Application } from '@/data/mock/applications'

const STAGES = ['Applied', 'Shortlisted', 'Interview', 'Offer']

function AppCard({ a }: { a: Application }) {
  const { showToast } = useToast()
  const { withdrawApplication, acceptOffer } = usePortalData()
  const rejected = a.outcome === 'Rejected'
  const withdrawn = a.outcome === 'Withdrawn'
  const offer = a.outcome === 'Offer'

  return (
    <div className="mb-3 rounded-[10px] border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-navy-soft font-bold text-navy">{initials(a.co)}</div>
        <div className="flex-1">
          <b className="text-[15px]">{a.role}</b>
          <div className="text-[12.5px] text-muted">{a.co} · {a.dept} · {a.ctc} · applied {a.applied}</div>
        </div>
        <Pill status={a.outcome} />
      </div>

      <Stepper stages={STAGES} currentIndex={a.reached} />

      <div className="mt-3 flex items-center justify-between border-t border-line-2 pt-3">
        <small className={`text-[12.5px] ${offer ? 'text-green' : 'text-[#46443d]'}`}>
          {a.note}
          {a.marks && <span className="mt-0.5 block font-semibold text-navy">Marks: {a.marks}</span>}
        </small>
        <div className="flex gap-2">
          {offer && <Button size="sm" onClick={() => acceptOffer(a.co)}>Accept offer</Button>}
          {!rejected && !withdrawn && !offer && (
            <Button variant="ghost" size="sm" onClick={() => withdrawApplication(a.co)}>Withdraw</Button>
          )}
          {rejected && (
            <Button variant="ghost" size="sm" onClick={() => showToast('Noted for the next cycle')}>Re-apply next cycle</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function StudentAppsPage() {
  const { apps } = usePortalData()

  const shortlisted = apps.filter((a) => a.reached >= 1 && a.outcome !== 'Rejected').length
  const interview = apps.filter((a) => a.reached >= 2 && a.outcome !== 'Rejected').length
  const offer = apps.filter((a) => a.reached >= 3).length

  return (
    <div>
      <PageHead title="My applications" description="Track every application from applied to offer, with live stage updates" />

      <div className="mb-5 grid grid-cols-4 gap-3 max-lg:grid-cols-2">
        {[
          ['a', 'Applied', apps.length, 'text-muted'],
          ['s', 'Shortlisted', shortlisted, 'text-navy'],
          ['i', 'Interview', interview, 'text-gold'],
          ['o', 'Offer', offer, 'text-green'],
        ].map(([key, label, value, color]) => (
          <div key={key as string} className="relative overflow-hidden rounded-[10px] border border-line bg-white p-[15px]">
            <span className={`absolute inset-y-0 left-0 w-[3px] bg-current ${color}`} />
            <div className="font-serif text-[27px] font-semibold text-navy">{value}</div>
            <div className="mt-0.5 text-[10.5px] font-bold uppercase tracking-[.06em] text-muted">{label}</div>
          </div>
        ))}
      </div>

      {apps.map((a) => <AppCard key={a.co} a={a} />)}
    </div>
  )
}
