import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { SubHead } from '@/components/landing/SectionHead'
import { Banner } from '@/components/shared/Banner'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { ScheduleInterviewModal } from '@/components/modals/ScheduleInterviewModal'

interface CalEvent {
  date: string
  type: 'Interview' | 'Drive'
  t: string
  time: string
  mode: string
}

export default function RecruiterCalendarPage() {
  const { interviews, recDrives } = useRecruiterData()
  const { openModal } = useModal()
  const { showToast } = useToast()

  const events: CalEvent[] = [
    ...interviews.filter((i) => i.status === 'Scheduled').map((i) => ({ date: i.date, type: 'Interview' as const, t: `${i.cand} · ${i.round}`, time: i.slot, mode: i.mode })),
    ...recDrives.filter((d) => d.status === 'Upcoming').map((d) => ({ date: d.date, type: 'Drive' as const, t: d.title, time: 'All day', mode: d.mode })),
  ]
  const byDate = new Map<string, CalEvent[]>()
  events.forEach((e) => byDate.set(e.date, [...(byDate.get(e.date) || []), e]))
  const dates = [...byDate.keys()].sort((a, b) => +a.split(' ')[0] - +b.split(' ')[0])
  const clashes = dates.filter((d) => (byDate.get(d)?.length ?? 0) > 1)

  return (
    <div>
      <PageHead title="Calendar & scheduling" description="Unified schedule with clash detection and academic-calendar awareness" />

      {clashes.length > 0 && (
        <Banner
          variant="gold"
          icon={<Icon name="warn" className="text-gold" />}
          title={`Clash detected on ${clashes.join(', ')}`}
          subtitle="Multiple events on the same day — consider spacing slots or venues. Exam period 06–08 Jul is blocked automatically."
        />
      )}

      {dates.map((d) => {
        const dayEvents = byDate.get(d) ?? []
        return (
          <div key={d}>
            <SubHead title={`${d} 2026`} tag={`${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}`} />
            <Card>
              {dayEvents.map((e, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-line-2 px-4 py-3 last:border-b-0">
                  <div className={`grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] font-bold text-white ${e.type === 'Drive' ? 'bg-gold' : 'bg-navy'}`}>{e.type[0]}</div>
                  <div className="flex-1"><b className="text-[13px]">{e.t}</b><small className="block text-[11.5px] text-muted">{e.type} · {e.time} · {e.mode}</small></div>
                  <Button variant="ghost" size="sm" onClick={() => showToast(`Opening ${e.type.toLowerCase()}…`)}>Open</Button>
                </div>
              ))}
            </Card>
          </div>
        )
      })}

      <Card pad className="mt-4">
        <div className="mb-3.5"><h3 className="text-base">Book an interview slot</h3></div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] text-[#46443d]">Panels sync with Google / Outlook. Slots that clash with the academic calendar are blocked.</span>
          <Button onClick={() => openModal('Schedule interview', <ScheduleInterviewModal />)}>Book a slot <Icon name="arrow" /></Button>
        </div>
      </Card>
    </div>
  )
}
