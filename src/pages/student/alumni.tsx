import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { Tabs } from '@/components/shared/Tabs'
import { useToast } from '@/context/ToastContext'
import { ALUMNI, REFERRALS, AL_EVENTS, STORIES } from '@/data/mock/alumni'
import { initials } from '@/lib/text'

const TABS = ['Directory & mentors', 'Referrals & jobs', 'Events', 'Success stories']

export default function StudentAlumniPage() {
  const [tab, setTab] = useState(0)
  const { showToast } = useToast()

  return (
    <div>
      <PageHead title="Alumni & network" description="Connect with graduates, get referrals, and learn from those who came before you" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 0 && (
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {ALUMNI.map((a) => (
            <div key={a.name} className="flex flex-col gap-3 rounded-[10px] border border-line bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-full bg-navy font-bold text-white">{initials(a.name)}</div>
                <div className="flex-1"><b>{a.name}</b><div className="text-xs text-muted">Batch {a.batch}</div></div>
                {a.mentor && <Pill status="Mentor" />}
              </div>
              <div className="text-[12.5px]"><b className="text-navy">{a.role}</b> · {a.co}<br /><span className="text-muted">{a.loc}</span></div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => showToast(`Connection request sent to ${a.name}`)}>Connect</Button>
                {a.mentor && <Button size="sm" onClick={() => showToast(`Mentorship request sent to ${a.name}`)}>Request mentorship</Button>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 1 && (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-[13px]">
            <thead>
              <tr>
                {['Role', 'Company', 'Referred by', 'Status', ''].map((h) => (
                  <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REFERRALS.map((r) => (
                <tr key={r.role}>
                  <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{r.role}</b></td>
                  <td className="border-b border-line-2 px-3.5 py-3">{r.co}</td>
                  <td className="border-b border-line-2 px-3.5 py-3 text-muted">{r.by}</td>
                  <td className="border-b border-line-2 px-3.5 py-3"><ColorPill color={r.status === 'Open' ? 'green' : 'navy'}>{r.status === 'Open' ? 'Open' : 'Active'}</ColorPill></td>
                  <td className="border-b border-line-2 px-3.5 py-3 text-right">
                    <Button size="sm" onClick={() => showToast(`Referral request sent for ${r.role}`)}>Request referral</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 2 && (
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {AL_EVENTS.map((e) => (
            <div key={e.title} className="flex flex-col gap-2 rounded-[10px] border border-line bg-white p-4">
              <div className="flex justify-between"><Chip>{e.mode}</Chip><span className="tnum text-xs text-muted">{e.date}</span></div>
              <h3 className="mt-1.5 text-base">{e.title}</h3>
              <small className="text-muted">{e.by}</small>
              <Button variant="ghost" size="sm" className="self-start" onClick={() => showToast(`Registered for ${e.title}`)}>Register</Button>
            </div>
          ))}
        </div>
      )}

      {tab === 3 && (
        <div>
          <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
            {STORIES.map((s) => (
              <div key={s.name} className="rounded-xl bg-navy p-5 text-white [background-image:radial-gradient(circle_at_100%_0,rgba(176,122,30,.25),transparent_50%)]">
                <div className="font-serif text-[15.5px] leading-[1.45]">"{s.quote}"</div>
                <div className="mt-4 flex items-center gap-2.5 border-t border-white/15 pt-3.5">
                  <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-full bg-gold font-bold text-white">{initials(s.name)}</div>
                  <div><b className="text-[13px] text-white">{s.name} · {s.batch}</b><small className="block text-[11.5px] text-[#C9D4E6]">{s.co} · {s.pkg}</small></div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3.5 text-[12.5px] text-muted">Placement outcomes are tracked across graduating batches to keep these stories current.</p>
        </div>
      )}
    </div>
  )
}
