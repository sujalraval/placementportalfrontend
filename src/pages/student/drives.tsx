import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { Banner } from '@/components/shared/Banner'
import { PageHead } from '@/components/shared/PageHead'
import { usePortalData } from '@/context/PortalDataContext'

export default function StudentDrivesPage() {
  const { drives, myDrives, registerDrive } = usePortalData()

  return (
    <div>
      <PageHead title="Campus drives" description="Register for eligible drives — attendance is captured by QR on drive day" />

      <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
        {drives.map((d, i) => {
          const registered = myDrives.includes(d.co)
          const done = d.status === 'Completed'
          const [day, month] = d.date.split(' ')
          return (
            <div key={d.co} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
              <div className="flex items-center gap-3.5 p-4">
                <div className="flex h-[52px] w-[52px] flex-none flex-col items-center justify-center rounded-[10px] bg-navy text-white">
                  <b className="tnum font-serif text-xl">{day}</b>
                  <span className="text-[9px] uppercase tracking-[.1em] text-[#B9C4D8]">{month || ''}</span>
                </div>
                <div>
                  <h3 className="text-[16px]">{d.title}</h3>
                  <div className="text-xs text-muted">{d.depts} · {d.reg} registered</div>
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-line-2 p-4">
                <span className="text-[11.5px] text-[#46443d]">{d.rounds}</span>
                {done ? (
                  <Pill status="Completed" />
                ) : registered ? (
                  <ColorPill color="green">Registered</ColorPill>
                ) : (
                  <Button size="sm" onClick={() => registerDrive(i)}>Register</Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-[18px]">
        <Banner icon={<Icon name="cal" className="text-green" />} title="Your drive-day pass" subtitle="A QR check-in pass is issued 24 hours before each registered drive — find it in Notifications." />
      </div>
    </div>
  )
}
