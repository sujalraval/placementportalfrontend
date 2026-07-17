import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { InternPostModal } from '@/components/modals/InternPostModal'
import { ViewInternApplicantsModal } from '@/components/modals/ViewInternApplicantsModal'

export default function RecruiterInternPage() {
  const { internships } = usePortalData()
  const { rec } = useRecruiterData()
  const { openModal } = useModal()
  const mine = internships.filter((x) => x.co === rec.company)

  return (
    <div>
      <PageHead
        title="Internships"
        description="A separate posting & compliance flow from full-time jobs — paid/free, fixed/flexible, with-college/independent"
        actions={<Button variant="gold" onClick={() => openModal('New internship posting', <InternPostModal />)}><Icon name="grad" /> New internship posting</Button>}
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Role', 'Type', 'Mode', 'Affiliation', 'Min duration', 'Applicants', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {mine.map((x) => (
              <tr key={x.id}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{x.role}</b><small className="block text-muted">closes {x.deadline}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{x.type === 'Paid' ? x.stipend : 'Free'}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{x.mode.split('·')[0]}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{x.affiliation}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{x.minWeeks}w</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{x.applicants.length}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={x.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <IconControlButton onClick={() => openModal(`Applicants · ${x.role}`, <ViewInternApplicantsModal internship={x} />)}>Applicants</IconControlButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
