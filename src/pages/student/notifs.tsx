import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

export default function StudentNotifsPage() {
  const { notifs, notifPrefs, markAllNotificationsRead, toggleNotifPref } = usePortalData()
  const { showToast } = useToast()
  const unread = notifs.filter((n) => n.unread).length

  return (
    <div>
      <PageHead
        title="Notifications"
        description={`${unread} unread · alerts for jobs, shortlists, interviews, offers, and drives`}
        actions={<Button variant="ghost" onClick={markAllNotificationsRead}>Mark all read</Button>}
      />

      <div className="flex gap-4 max-lg:flex-col">
        <Card className="flex-[1.5] overflow-hidden">
          {notifs.map((n, i) => (
            <div key={i} className={`flex items-start gap-3.5 border-b border-line-2 px-4 py-3.5 last:border-b-0 ${n.unread ? 'bg-[#FBFAF4]' : ''}`}>
              <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-navy-soft text-navy">
                <Icon name={n.ic} className="h-[17px] w-[17px]" />
              </div>
              <div className="flex-1">
                <b className="text-[13.5px] font-semibold">{n.title}</b>
                <small className="mt-0.5 block text-[11.5px] text-muted">{n.type} · {n.time}</small>
              </div>
              {n.unread && <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gold" />}
            </div>
          ))}
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Preferences" />
          {notifPrefs.map((p, i) => (
            <div key={p.ch} className="flex items-center justify-between border-b border-line-2 py-3.5 last:border-b-0">
              <div>
                <b className="text-[13.5px]">{p.ch}</b>
                <small className="block text-[11.5px] text-muted">{p.desc}</small>
              </div>
              <button
                onClick={() => { toggleNotifPref(i); showToast(`${p.ch} notifications updated`) }}
                className={`relative h-[23px] w-10 flex-none rounded-full transition-colors ${p.on ? 'bg-green' : 'bg-line'}`}
              >
                <i className={`absolute top-0.5 h-[19px] w-[19px] rounded-full bg-white transition-all ${p.on ? 'left-[18px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
          <p className="mt-3 text-xs text-muted">Offers and interview schedules are always sent by email and SMS regardless of preferences.</p>
        </Card>
      </div>
    </div>
  )
}
