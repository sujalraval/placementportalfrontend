import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { usePortalData } from '@/context/PortalDataContext'
import { FacultyEvalModal } from '@/components/modals/FacultyEvalModal'
import { InternshipReportDoc } from '@/components/shared/InternshipDocuments'

export default function FacultyMenteesPage() {
  const { mentees, myInterns, me } = usePortalData()
  const { openModal } = useModal()
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()

  const total = mentees.length
  const pending = mentees.filter((m) => !m.reportSubmitted).length
  const readyToEval = mentees.filter((m) => m.reportSubmitted && !m.evaluation).length
  const evaluated = mentees.filter((m) => m.evaluation).length

  const viewReport = (en: string, name: string, co: string, role: string) => {
    const mi = myInterns.find((x) => x.co === co && x.role === role && (en === me.en))
    if (mi?.reportText) {
      openDoc(`Internship Completion Report · ${role}`, co, <InternshipReportDoc mi={mi} me={me} />, `${name}_Internship_Report`)
    } else {
      showToast(`Report submitted by ${name} — summary not available for other students in this prototype`)
    }
  }

  return (
    <div>
      <PageHead title="My mentees" description="Faculty mentorship monitoring — track progress and submit evaluations for your assigned interns" />

      <div className="mb-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Assigned mentees" value={total} />
        <Stat label="Report pending" value={pending} />
        <Stat label="Ready to evaluate" value={readyToEval} />
        <Stat label="Evaluated" value={evaluated} />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Student', 'Internship', 'Duration', 'Report', 'Evaluation', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {mentees.map((m, i) => (
              <tr key={m.en}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{m.name}</b><small className="tnum block text-muted">{m.en}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{m.co} · {m.role}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{m.minWeeks}w min</td>
                <td className="border-b border-line-2 px-3.5 py-3">{m.reportSubmitted ? <Pill status="Report submitted" /> : <Pill status="Pending" />}</td>
                <td className="border-b border-line-2 px-3.5 py-3">
                  {m.evaluation ? <b className="tnum text-green">{m.evaluation.grade} · {m.evaluation.marks}/100</b> : <span className="text-muted">—</span>}
                </td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    {m.reportSubmitted && <IconControlButton onClick={() => viewReport(m.en, m.name, m.co, m.role)}>View report</IconControlButton>}
                    {m.reportSubmitted && !m.evaluation && <IconControlButton onClick={() => openModal(`Faculty evaluation · ${m.name}`, <FacultyEvalModal index={i} />)}>Evaluate</IconControlButton>}
                    {m.evaluation && <IconControlButton onClick={() => openModal(`Faculty evaluation · ${m.name}`, <FacultyEvalModal index={i} />)}>Edit evaluation</IconControlButton>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Evaluation marks feed the academic-credit sign-off for 'With College' internships and are visible to the student on their internship tracker.</p>
    </div>
  )
}
