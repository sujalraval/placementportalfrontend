import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { Chip } from '@/components/ui/Chip'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useDocViewer } from '@/context/DocViewerContext'
import { usePortalData } from '@/context/PortalDataContext'
import { CvDocument } from '@/components/shared/CvDocument'
import { getCand } from '@/data/mock/candidates'

export default function DeptVerifyPage() {
  const { dverify, me, approveVerification, rejectVerification } = usePortalData()
  const { openDoc } = useDocViewer()

  const viewCV = (en: string, name: string) => {
    const cand = getCand(en)
    const doc = { ...me, name, en, dept: cand?.dept ?? me.dept, cgpa: cand ? String(cand.cgpa) : me.cgpa }
    openDoc(`Curriculum Vitae · ${name}`, 'Generated from student profile', <CvDocument profile={doc} />, `${name}_CV`)
  }

  return (
    <div>
      <PageHead title="Verification queue" description="Approve student profiles, documents, and status changes — verified items become visible to recruiters" />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Student', 'Item', 'Type', 'Submitted', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {dverify.map((v, i) => (
              <tr key={v.en + v.item}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{v.name}</b><small className="tnum block text-muted">{v.en}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{v.item}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Chip>{v.type}</Chip></td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{v.date}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={v.status === 'Pending' ? 'Pending' : v.status === 'Approved' ? 'Verified' : 'Rejected'} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => viewCV(v.en, v.name)}>View</IconControlButton>
                    {v.status === 'Pending' && (
                      <>
                        <IconControlButton onClick={() => approveVerification(i)}>Approve</IconControlButton>
                        <IconControlButton danger onClick={() => rejectVerification(i)}>Reject</IconControlButton>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Approvals notify the student instantly and unlock the item for recruiter view.</p>
    </div>
  )
}
