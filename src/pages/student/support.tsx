import { useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { Tabs } from '@/components/shared/Tabs'
import { useModal } from '@/context/ModalContext'
import { RaiseTicketModal } from '@/components/modals/RaiseTicketModal'
import { FillSurveyModal } from '@/components/modals/FillSurveyModal'
import { usePortalData } from '@/context/PortalDataContext'

const TABS = ['My tickets', 'Surveys for you']

export default function StudentSupportPage() {
  const [tab, setTab] = useState(0)
  const { tickets, surveys, me } = usePortalData()
  const { openModal } = useModal()
  const myTickets = tickets.filter((t) => t.by === me.name)

  return (
    <div>
      <PageHead
        title="Support & feedback"
        description="Raise tickets, track resolution, and share feedback — fully paperless"
        actions={<Button variant="gold" onClick={() => openModal('Raise a support ticket', <RaiseTicketModal />)}><Icon name="warn" /> Raise a ticket</Button>}
      />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 0 && (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-[13px]">
            <thead>
              <tr>
                {['Ticket', 'Category', 'Subject', 'Priority', 'Status', 'SLA'].map((h) => (
                  <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myTickets.length ? myTickets.map((t) => (
                <tr key={t.id}>
                  <td className="tnum border-b border-line-2 px-3.5 py-3 text-muted">{t.id}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">{t.cat}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">
                    <b className="block text-[13.5px]">{t.sub}</b>
                    <small className="text-muted">Raised {t.date} · assigned to {t.owner}</small>
                  </td>
                  <td className="border-b border-line-2 px-3.5 py-3"><ColorPill color={t.pri === 'High' ? 'gold' : 'navy'}>{t.pri}</ColorPill></td>
                  <td className="border-b border-line-2 px-3.5 py-3"><ColorPill color={t.status === 'Resolved' ? 'green' : 'gold'}>{t.status}</ColorPill></td>
                  <td className={`border-b border-line-2 px-3.5 py-3 text-xs ${t.sla === 'Breached' ? 'text-red' : 'text-muted'}`}>{t.sla}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="p-4 text-muted">No tickets yet.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 1 && (
        <div>
          {surveys.filter((s) => s.status === 'Open').map((s) => (
            <div key={s.name} className="mb-2.5 flex items-center gap-3.5 rounded-[10px] border border-line bg-white p-3.5">
              <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] bg-gold-soft text-[#8a6015]"><Icon name="info" className="h-[17px] w-[17px]" /></div>
              <div className="flex-1"><b className="text-[13px]">{s.name}</b><small className="block text-[11.5px] text-muted">{s.aud} · {s.resp} responses so far</small></div>
              <Button size="sm" onClick={() => openModal(`Survey · ${s.name}`, <FillSurveyModal />)}>Fill survey</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
