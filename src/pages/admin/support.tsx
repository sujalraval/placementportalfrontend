import { Card } from '@/components/ui/Card'
import { ColorPill } from '@/components/ui/Pill'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { usePortalData } from '@/context/PortalDataContext'

export default function AdminSupportPage() {
  const { tickets, resolveTicket, escalateTicket } = usePortalData()

  return (
    <div>
      <PageHead title="Support desk" description="Ticketing with SLA tracking, assignment, and escalation" />

      <div className="mb-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
        <Stat label="Open" value={tickets.filter((t) => t.status !== 'Resolved').length} />
        <Stat label="Escalated" value={tickets.filter((t) => t.status === 'Escalated').length} />
        <Stat label="SLA breached" value={tickets.filter((t) => t.sla === 'Breached').length} />
        <Stat label="Resolved (week)" value={tickets.filter((t) => t.status === 'Resolved').length} />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-[13px]">
          <thead><tr>{['Ticket', 'Raised by', 'Subject', 'Priority', 'Owner', 'Status', 'SLA', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {tickets.map((t, i) => (
              <tr key={t.id}>
                <td className="tnum border-b border-line-2 px-3.5 py-3 text-muted">{t.id}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{t.by}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{t.sub}</b><small className="block text-muted">{t.cat} · {t.date}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3">{t.pri}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{t.owner}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><ColorPill color={t.status === 'Resolved' ? 'green' : 'gold'}>{t.status}</ColorPill></td>
                <td className={`border-b border-line-2 px-3.5 py-3 text-xs ${t.sla === 'Breached' ? 'text-red' : 'text-muted'}`}>{t.sla}</td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  {t.status !== 'Resolved' && (
                    <div className="flex justify-end gap-1.5">
                      <IconControlButton onClick={() => resolveTicket(i)}>Resolve</IconControlButton>
                      <IconControlButton onClick={() => escalateTicket(i)}>Escalate</IconControlButton>
                    </div>
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
