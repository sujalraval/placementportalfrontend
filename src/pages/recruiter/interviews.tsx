import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { ScheduleInterviewModal } from '@/components/modals/ScheduleInterviewModal'
import { RecordResultModal } from '@/components/modals/RecordResultModal'

export default function RecruiterInterviewsPage() {
  const { recJobs, interviews } = useRecruiterData()
  const { openModal } = useModal()
  const { showToast } = useToast()
  const jobsWithRounds = recJobs.filter((j) => j.rounds.length)

  return (
    <div>
      <PageHead
        title="Interviews & assessment"
        description="Configure rounds, schedule panels, and record results"
        actions={<Button variant="gold" onClick={() => openModal('Schedule interview', <ScheduleInterviewModal />)}><Icon name="cal" /> Schedule interview</Button>}
      />

      <Card pad className="mb-4">
        <SectionTitle title="Selection rounds by posting" />
        {jobsWithRounds.map((j) => (
          <ListRow key={j.role} icon={<b>{j.role[0]}</b>} title={j.role} subtitle={j.rounds.join(' → ')} trailing={<Chip>{j.rounds.length} rounds</Chip>} />
        ))}
      </Card>

      <Card className="overflow-x-auto">
        <div className="p-[18px] pb-0"><SectionTitle title="Scheduled interviews" /></div>
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Candidate', 'Role · Round', 'Date', 'Slot', 'Panel', 'Mode', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {interviews.map((v, i) => (
              <tr key={v.cand + v.round}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{v.cand}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{v.role} · {v.round}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{v.date}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{v.slot}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{v.panel}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={v.mode} /></td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={v.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  {v.status === 'Scheduled' ? (
                    <Button size="sm" variant="ghost" onClick={() => openModal(`Record result · ${v.cand}`, <RecordResultModal index={i} />)}>Result</Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => showToast('Scorecard opened')}>Scorecard</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
