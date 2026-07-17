import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Stat } from '@/components/ui/Stat'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { OpeningFormModal } from '@/components/modals/OpeningFormModal'

export default function AdminJobsPage() {
  const { openings, approveOpening, publishOpening, closeOpening, deleteOpening, generateOpenings } = useAdminData()
  const { openModal } = useModal()

  return (
    <div>
      <PageHead
        title="Job openings"
        description="Generate, approve, and publish openings across the university"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={generateOpenings}>Generate from requests</Button>
            <Button variant="gold" onClick={() => openModal('New opening', <OpeningFormModal index={-1} />)}>New opening</Button>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Published" value={openings.filter((o) => o.status === 'Published').length} />
        <Stat label="Pending approval" value={openings.filter((o) => o.status === 'Pending').length} />
        <Stat label="Draft" value={openings.filter((o) => o.status === 'Draft').length} />
        <Stat label="Total applicants" value={openings.reduce((a, o) => a + o.apps, 0)} />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead><tr>{['Role', 'Company', 'Departments', 'Openings', 'Applicants', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {openings.map((o, i) => (
              <tr key={o.role + o.co}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{o.role}</b><small className="block text-muted">{o.ctc}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{o.co}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{o.dept}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{o.openings}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{o.apps}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={o.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    {o.status === 'Pending' && <IconControlButton onClick={() => approveOpening(i)}>Approve</IconControlButton>}
                    {o.status === 'Draft' && <IconControlButton onClick={() => publishOpening(i)}>Publish</IconControlButton>}
                    {o.status === 'Published' && <IconControlButton onClick={() => closeOpening(i)}>Close</IconControlButton>}
                    <IconControlButton onClick={() => openModal('Edit opening', <OpeningFormModal index={i} item={o} />)}>Edit</IconControlButton>
                    <IconControlButton danger onClick={() => deleteOpening(i)}>Delete</IconControlButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
