import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { DeptFormModal } from '@/components/modals/DeptFormModal'
import { ProgramFormModal } from '@/components/modals/ProgramFormModal'

export default function AdminDeptsPage() {
  const { depts, programs, deleteDept, deleteProgram } = useAdminData()
  const { openModal } = useModal()

  return (
    <div>
      <PageHead
        title="Departments & programs"
        description="Manage departments, coordinators, and academic programs"
        actions={<Button variant="gold" onClick={() => openModal('Add department', <DeptFormModal index={-1} />)}>Add department</Button>}
      />

      <Card className="mb-[18px] overflow-x-auto">
        <div className="p-[18px] pb-0"><SectionTitle title="Departments" /></div>
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Department', 'Coordinator', 'Students', 'Placed', 'Rate', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {depts.map((d, i) => {
              const p = Math.round((d.placed / d.total) * 100)
              return (
                <tr key={d.name}>
                  <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{d.name}</b></td>
                  <td className="border-b border-line-2 px-3.5 py-3">{d.coord}</td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{d.total}</td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{d.placed}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-[7px] w-[70px] overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${p}%` }} /></div>
                      <b className="tnum text-xs text-navy">{p}%</b>
                    </div>
                  </td>
                  <td className="border-b border-line-2 px-3.5 py-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <IconControlButton onClick={() => openModal('Edit department', <DeptFormModal index={i} item={d} />)}>Edit</IconControlButton>
                      <IconControlButton danger onClick={() => deleteDept(i)}>Delete</IconControlButton>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      <SectionTitle title="Academic programs" action={<button onClick={() => openModal('Add program', <ProgramFormModal index={-1} />)} className="text-[12.5px] font-semibold text-navy hover:underline">Add program</button>} />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Program', 'Department', 'Level', 'Seats', 'Duration', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {programs.map((p, i) => (
              <tr key={p.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{p.name}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{p.dept}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{p.degree}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{p.seats}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{p.duration}</td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => openModal('Edit program', <ProgramFormModal index={i} item={p} />)}>Edit</IconControlButton>
                    <IconControlButton danger onClick={() => deleteProgram(i)}>Delete</IconControlButton>
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
