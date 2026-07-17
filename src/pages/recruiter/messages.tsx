import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { useModal } from '@/context/ModalContext'
import { ComposeMessageModal } from '@/components/modals/ComposeMessageModal'
import { REC_MSGS } from '@/data/mock/recruiter'

export default function RecruiterMessagesPage() {
  const { openModal } = useModal()

  return (
    <div>
      <PageHead
        title="Messages"
        description="Your communication log with the Placement Cell and coordinators"
        actions={<Button variant="gold" onClick={() => openModal('Compose message', <ComposeMessageModal />)}><Icon name="info" /> Compose</Button>}
      />
      <Card>
        {REC_MSGS.map((m, i) => (
          <div key={i} className={`flex items-start gap-3.5 border-b border-line-2 px-4 py-3.5 last:border-b-0 ${m.unread ? 'bg-[#FBFAF4]' : ''}`}>
            <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-navy-soft text-navy"><Icon name="info" className="h-[17px] w-[17px]" /></div>
            <div className="flex-1"><b className="text-[13.5px] font-semibold">{m.subject}</b><small className="mt-0.5 block text-[11.5px] text-muted">{m.from} · {m.time}</small></div>
            {m.unread && <div className="mt-1.5 h-2 w-2 flex-none rounded-full bg-gold" />}
          </div>
        ))}
      </Card>
    </div>
  )
}
