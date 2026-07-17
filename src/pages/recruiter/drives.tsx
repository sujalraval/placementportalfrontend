import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { useModal } from '@/context/ModalContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { ScheduleDriveModal } from '@/components/modals/ScheduleDriveModal'

export default function RecruiterDrivesPage() {
  const { recDrives } = useRecruiterData()
  const { openModal } = useModal()

  return (
    <div>
      <PageHead
        title="Campus drives"
        description="Schedule and run on-campus, off-campus, and virtual drives"
        actions={<Button variant="gold" onClick={() => openModal('Schedule campus drive', <ScheduleDriveModal />)}><Icon name="target" /> Schedule drive</Button>}
      />
      <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
        {recDrives.map((d) => {
          const [day, month] = d.date.split(' ')
          return (
            <div key={d.title} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex items-center gap-3.5 p-4">
                <div className="flex h-[52px] w-[52px] flex-none flex-col items-center justify-center rounded-[10px] bg-navy text-white">
                  <b className="tnum font-serif text-xl">{day}</b>
                  <span className="text-[9px] uppercase tracking-[.1em] text-[#B9C4D8]">{month || ''}</span>
                </div>
                <div><h3 className="text-[16px]">{d.title}</h3><div className="text-xs text-muted">{d.depts} · {d.reg} registered</div></div>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-line-2 p-4">
                <span className="text-[11.5px] text-[#46443d]">{d.rounds} · {d.mode}</span>
                <Pill status={d.status} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
