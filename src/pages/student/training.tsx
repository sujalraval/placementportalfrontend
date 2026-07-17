import { useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { Tabs } from '@/components/shared/Tabs'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SKILLGAP, PRACTICE, RESOURCES, MOCKS } from '@/data/mock/training'

const TABS = ['My learning', 'Catalogue', 'Skill gap', 'Mock interviews', 'Practice & resources']

export default function StudentTrainingPage() {
  const [tab, setTab] = useState(0)
  const { train } = usePortalData()
  const { showToast } = useToast()
  const enrolled = train.filter((t) => t.enrolled)
  const available = train.filter((t) => !t.enrolled)

  return (
    <div>
      <PageHead title="Training & skill development" description="Build the skills recruiters are asking for" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 0 && (
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          {enrolled.map((t) => (
            <div key={t.name} className="flex flex-col gap-2 rounded-[10px] border border-line bg-white p-4">
              <div className="flex justify-between"><Chip>{t.cat}</Chip><Pill status="Enrolled" /></div>
              <h3 className="mt-1.5 text-base">{t.name}</h3>
              <small className="text-muted">{t.dur} · attendance {t.att}%</small>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${t.prog}%` }} /></div>
                <div className="tnum text-xs font-bold text-navy">{t.prog}%</div>
              </div>
              <Button variant="ghost" size="sm" className="self-start" onClick={() => showToast(`Opening ${t.name}…`)}>Continue</Button>
            </div>
          ))}
        </div>
      )}

      {tab === 1 && (
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          {available.map((t) => (
            <div key={t.name} className="flex flex-col gap-2 rounded-[10px] border border-line bg-white p-4">
              <Chip>{t.cat}</Chip>
              <h3 className="mt-1.5 text-base">{t.name}</h3>
              <small className="text-muted">{t.dur}</small>
              <Button size="sm" className="mt-1.5 self-start" onClick={() => showToast(`Enrolled in ${t.name}`)}>Enrol</Button>
            </div>
          ))}
        </div>
      )}

      {tab === 2 && (
        <Card pad>
          <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
            <h3 className="text-base">Skill-gap analysis</h3>
            <div className="h-px flex-1 bg-line" />
            <ColorPill color="navy">You</ColorPill>
            <ColorPill color="gold">Recruiter demand</ColorPill>
          </div>
          {SKILLGAP.map((g) => (
            <div key={g.skill} className="my-3.5">
              <div className="mb-1.5 flex justify-between text-[12.5px]">
                <b>{g.skill}</b><span className="tnum">{g.have}% vs {g.demand}% in demand</span>
              </div>
              <div className="relative h-[9px] rounded-full bg-line">
                <div className="absolute inset-y-0 left-0 rounded-full bg-navy" style={{ width: `${g.have}%` }} />
                <div className="absolute -top-1 -bottom-1 w-[3px] rounded-sm bg-gold" style={{ left: `${g.demand}%` }} />
              </div>
            </div>
          ))}
          <p className="mt-3.5 text-[12.5px] text-muted">
            The gold marker shows current recruiter demand. Focus first on <b>System Design</b> and <b>Cloud (AWS)</b>, where your gap is widest.
          </p>
        </Card>
      )}

      {tab === 3 && (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-[13px]">
            <thead>
              <tr>
                {['Mock interview', 'Date', 'Slot', 'Panel', 'Status', ''].map((h) => (
                  <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCKS.map((m) => (
                <tr key={m.type}>
                  <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{m.type}</b></td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{m.date}</td>
                  <td className="tnum border-b border-line-2 px-3.5 py-3">{m.slot}</td>
                  <td className="border-b border-line-2 px-3.5 py-3">{m.panel}</td>
                  <td className="border-b border-line-2 px-3.5 py-3"><Pill status={m.status} /></td>
                  <td className="border-b border-line-2 px-3.5 py-3 text-right">
                    {m.status === 'Book slot' ? (
                      <Button size="sm" onClick={() => showToast('Mock interview slot request sent to the placement cell')}>Book</Button>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => showToast('Joining details sent by email')}>Details</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 4 && (
        <div className="flex gap-4 max-lg:flex-col">
          <Card pad className="flex-1">
            <SectionTitle title="Practice tests" />
            {PRACTICE.map((p) => (
              <ListRow
                key={p.name}
                icon={<Icon name="target" />}
                title={p.name}
                subtitle={`${p.q} questions · best score ${p.best}`}
                trailing={<Button variant="ghost" size="sm" onClick={() => showToast(`Starting ${p.name}…`)}>Start</Button>}
              />
            ))}
          </Card>
          <Card pad className="flex-1">
            <SectionTitle title="Learning resources" />
            {RESOURCES.map((r) => (
              <ListRow
                key={r.name}
                icon={<Icon name="book" />}
                title={r.name}
                subtitle={r.cat}
                trailing={<Button variant="ghost" size="sm" onClick={() => showToast('Opening resource…')}>Open</Button>}
              />
            ))}
          </Card>
        </div>
      )}
    </div>
  )
}
