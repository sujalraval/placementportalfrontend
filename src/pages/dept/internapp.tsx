import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { CreditsModal } from '@/components/modals/CreditsModal'

export default function DeptInternappPage() {
  const { internApprovals, finalizeInternApproval, rejectInternRequest } = usePortalData()
  const { openModal } = useModal()

  const approve = (i: number, affiliation: string, name: string) => {
    if (affiliation === 'With College') {
      openModal(`Map academic credits · ${name}`, <CreditsModal index={i} />)
    } else {
      finalizeInternApproval(i, null)
    }
  }

  return (
    <div>
      <PageHead title="Internship approvals" description="Issue the College Approval Letter (NOC to join) for student internship requests" />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Student', 'Organisation · Role', 'Type', 'Affiliation', 'Min duration', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {internApprovals.map((r, i) => (
              <tr key={r.en + r.co}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{r.name}</b><small className="tnum block text-muted">{r.en}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{r.co} · {r.role}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{r.type}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{r.affiliation}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{r.minWeeks}w</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={r.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  {r.status === 'Pending' && (
                    <div className="flex justify-end gap-1.5">
                      <IconControlButton onClick={() => approve(i, r.affiliation, r.name)}>Approve</IconControlButton>
                      <IconControlButton danger onClick={() => rejectInternRequest(i)}>Reject</IconControlButton>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Approval generates the Letter of College Approval and assigns a faculty mentor — required before the student can start a with-college or independent internship.</p>
    </div>
  )
}
