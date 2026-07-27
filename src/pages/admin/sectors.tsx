import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SectorFormModal } from '@/components/modals/SectorFormModal'

export default function AdminSectorsPage() {
  const { sectors, deleteSector } = useAdminData()
  const { openModal } = useModal()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-navy">Sectors</h2>
        <Button variant="gold" size="sm" onClick={() => openModal('Add sector', <SectorFormModal index={-1} />)}>Add sector</Button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Sector', 'Companies', 'Open positions', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {sectors.map((s, i) => (
              <tr key={s.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{s.name}</b></td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.companies}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.openings}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={s.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => openModal('Edit sector', <SectorFormModal index={i} item={s} />)}>Edit</IconControlButton>
                    <IconControlButton danger onClick={() => deleteSector(i)}>Delete</IconControlButton>
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
