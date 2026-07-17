import { Button } from '@/components/ui/Button'
import { Stat } from '@/components/ui/Stat'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { SectionTitle } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

export function AcademicsTab() {
  const { me, updateAcademicMeta, updateSemester } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()
  const totalCredits = me.semesters.reduce((a, s) => a + s.cr, 0)

  const openAcadMetaForm = () => {
    openModal('Edit academic summary', (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ cgpa: me.cgpa, backlogs: String(me.backlogs) }}
        fields={[{ id: 'cgpa', label: 'CGPA' }, { id: 'backlogs', label: 'Live backlogs', type: 'number' }]}
        onSubmit={(v) => { updateAcademicMeta(v.cgpa, +v.backlogs || 0); closeModal(); showToast('Academic summary updated') }}
      />
    ))
  }

  const openSemesterForm = (i: number) => {
    const s = me.semesters[i]
    openModal(`Edit ${s.s}`, (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ sgpa: s.sgpa, cr: String(s.cr), res: s.res }}
        fields={[
          { id: 'sgpa', label: 'SGPA' }, { id: 'cr', label: 'Credits', type: 'number' },
          { id: 'res', label: 'Result', type: 'select', options: ['Passed', 'In progress', 'Backlog'] },
        ]}
        onSubmit={(v) => {
          updateSemester(i, { sgpa: v.sgpa, cr: +v.cr || s.cr, res: v.res as typeof s.res })
          closeModal(); showToast('Semester updated')
        }}
      />
    ))
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        <Stat label="CGPA" value={me.cgpa} sub="of 10.0" />
        <Stat label="Live backlogs" value={me.backlogs} sub="Clean record" />
        <Stat label="Credits earned" value={totalCredits} sub={`Across ${me.semesters.length} semesters`} />
      </div>
      <Card>
        <div className="p-[18px] pb-0">
          <SectionTitle title="Semester-wise record" action={<Button variant="ghost" size="sm" onClick={openAcadMetaForm}>Edit summary</Button>} />
        </div>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {['Semester', 'SGPA', 'Credits', 'Result', ''].map((h) => (
                <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {me.semesters.map((s, i) => (
              <tr key={s.s}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{s.s}</b></td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.sgpa}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.cr}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={s.res} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right"><IconControlButton onClick={() => openSemesterForm(i)}>Edit</IconControlButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
