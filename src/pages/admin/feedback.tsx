import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SurveyFormModal } from '@/components/modals/SurveyFormModal'

const CLOSED_LOOP_ACTIONS = [
  { title: 'Improve drive-day seating at Convention Hall', source: 'From Deloitte drive feedback', owner: 'Dr. K. Patel', status: 'In progress' },
  { title: 'Add advanced aptitude batch', source: 'From bootcamp survey', owner: 'Cell Desk', status: 'Done' },
]

export default function AdminFeedbackPage() {
  const { surveys, closeSurvey, deleteSurvey } = usePortalData()
  const { openModal } = useModal()
  const { showToast } = useToast()

  return (
    <div>
      <PageHead
        title="Feedback & surveys"
        description="Configurable surveys with response analytics and closed-loop actions"
        actions={<Button variant="gold" onClick={() => openModal('Create survey', <SurveyFormModal />)}>Create survey</Button>}
      />

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Survey', 'Audience', 'Responses', 'Score', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {surveys.map((s, i) => (
              <tr key={s.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{s.name}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{s.aud}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.resp}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3 font-bold text-navy">{s.score}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={s.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => showToast('Opening response analytics…')}>Analytics</IconControlButton>
                    {s.status === 'Open' && <IconControlButton onClick={() => closeSurvey(i)}>Close</IconControlButton>}
                    <IconControlButton danger onClick={() => deleteSurvey(i)}>Delete</IconControlButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card pad className="mt-4">
        <SectionTitle title="Closed-loop actions" />
        {CLOSED_LOOP_ACTIONS.map((a) => (
          <div key={a.title} className="flex items-start gap-3 border-b border-line-2 py-3 last:border-b-0">
            <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-gold-soft text-[#8a6015]"><Icon name="target" className="h-4 w-4" /></div>
            <div className="flex-1"><b className="text-[13.5px]">{a.title}</b><small className="block text-xs text-muted">{a.source} · owner: {a.owner}</small></div>
            <Pill status={a.status} />
          </div>
        ))}
      </Card>
    </div>
  )
}
