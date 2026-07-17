import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { SectionCard } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'

export function ExperienceTab() {
  const { me, addExperience, editExperience, deleteExperience, addAchievement, editAchievement, deleteAchievement, addPosition, editPosition, deletePosition } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openExpForm = (i: number | null) => {
    const x = i !== null ? me.internships[i] : undefined
    openModal(i !== null ? 'Edit experience' : 'Add experience', (
      <SimpleFormModal
        submitLabel={i !== null ? 'Save' : 'Add'}
        initial={x ? { role: x.role, co: x.co, dur: x.dur, loc: x.loc, desc: x.desc, tech: x.tech } : {}}
        fields={[
          { id: 'role', label: 'Role' }, { id: 'co', label: 'Company' },
          { id: 'dur', label: 'Duration', placeholder: 'May 2025 – Jul 2025' }, { id: 'loc', label: 'Location' },
          { id: 'desc', label: 'Description', type: 'textarea', rows: 3, full: true },
          { id: 'tech', label: 'Tech used', full: true },
        ]}
        onSubmit={(v) => {
          if (!v.role || !v.co) { showToast('Role and company are required'); return }
          const exp = { role: v.role, co: v.co, dur: v.dur, loc: v.loc, desc: v.desc, tech: v.tech }
          if (i !== null) editExperience(i, exp); else addExperience(exp)
          closeModal(); showToast(i !== null ? 'Experience updated' : 'Experience added')
        }}
      />
    ))
  }

  const openAchForm = (i: number | null) => {
    const a = i !== null ? me.achievements[i] : undefined
    openModal(i !== null ? 'Edit achievement' : 'Add achievement', (
      <SimpleFormModal
        submitLabel={i !== null ? 'Save' : 'Add'}
        initial={a ? { t: a.t, y: a.y, d: a.d } : {}}
        fields={[
          { id: 't', label: 'Achievement', full: true }, { id: 'y', label: 'Year' },
          { id: 'd', label: 'Details (optional)', type: 'textarea', rows: 2, full: true },
        ]}
        onSubmit={(v) => {
          if (!v.t) { showToast('Achievement is required'); return }
          const ach = { t: v.t, y: v.y, d: v.d }
          if (i !== null) editAchievement(i, ach); else addAchievement(ach)
          closeModal(); showToast(i !== null ? 'Achievement updated' : 'Achievement added')
        }}
      />
    ))
  }

  const openPosForm = (i: number | null) => {
    const p = i !== null ? me.positions[i] : undefined
    openModal(i !== null ? 'Edit position' : 'Add position', (
      <SimpleFormModal
        submitLabel={i !== null ? 'Save' : 'Add'}
        initial={p ? { role: p.role, org: p.org, dur: p.dur, d: p.d } : {}}
        fields={[
          { id: 'role', label: 'Role', full: true }, { id: 'org', label: 'Organisation', full: true },
          { id: 'dur', label: 'Duration' }, { id: 'd', label: 'Details', type: 'textarea', rows: 2, full: true },
        ]}
        onSubmit={(v) => {
          if (!v.role) { showToast('Role is required'); return }
          const pos = { role: v.role, org: v.org, dur: v.dur, d: v.d }
          if (i !== null) editPosition(i, pos); else addPosition(pos)
          closeModal(); showToast(i !== null ? 'Position updated' : 'Position added')
        }}
      />
    ))
  }

  return (
    <div>
      <SectionCard title="Internships & work experience" action={<Button variant="ghost" size="sm" onClick={() => openExpForm(null)}>Add experience</Button>}>
        {me.internships.length ? me.internships.map((x, i) => (
          <div key={x.role + x.co} className="flex gap-3.5 border-b border-line-2 py-4 last:border-b-0">
            <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[9px] bg-navy-soft font-bold text-navy">{initials(x.co)}</div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] text-navy">{x.role}</h4>
              <div className="my-1 text-xs text-muted">{x.co} · {x.dur} · {x.loc}</div>
              <p className="text-[13px] text-[#46443d]">{x.desc}</p>
              <div className="mt-1.5 text-[11.5px] font-bold text-gold">{x.tech}</div>
            </div>
            <div className="flex flex-none items-center gap-1.5">
              <IconControlButton onClick={() => openExpForm(i)}>Edit</IconControlButton>
              <IconControlButton danger onClick={() => { deleteExperience(i); showToast('Experience removed') }}>Delete</IconControlButton>
            </div>
          </div>
        )) : <p className="text-[13px] text-muted">No experience added yet. Click "Add experience" to add an internship or job.</p>}
      </SectionCard>

      <div className="mt-4 flex gap-4 max-lg:flex-col">
        <SectionCard title="Achievements & awards" action={<Button variant="ghost" size="sm" onClick={() => openAchForm(null)}>Add</Button>} className="flex-1">
          {me.achievements.map((a, i) => (
            <div key={a.t} className="flex items-start gap-3 border-b border-line-2 py-3 last:border-b-0">
              <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-gold-soft text-[#8a6015]"><Icon name="star" className="h-4 w-4" /></div>
              <div className="flex-1"><b className="text-[13.5px]">{a.t}</b>{a.d && <small className="block text-xs text-muted">{a.d}</small>}</div>
              <span className="tnum flex-none text-[11.5px] font-bold text-navy">{a.y}</span>
              <div className="flex flex-none gap-1.5">
                <IconControlButton onClick={() => openAchForm(i)}>Edit</IconControlButton>
                <IconControlButton danger onClick={() => { deleteAchievement(i); showToast('Achievement removed') }}>✕</IconControlButton>
              </div>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Positions of responsibility" action={<Button variant="ghost" size="sm" onClick={() => openPosForm(null)}>Add</Button>} className="flex-1">
          {me.positions.map((p, i) => (
            <div key={p.role} className="flex items-start gap-3 border-b border-line-2 py-3 last:border-b-0">
              <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-gold-soft text-[#8a6015]"><Icon name="users" className="h-4 w-4" /></div>
              <div className="flex-1"><b className="text-[13.5px]">{p.role}</b><small className="block text-xs text-muted">{p.org} · {p.dur} — {p.d}</small></div>
              <div className="flex flex-none gap-1.5">
                <IconControlButton onClick={() => openPosForm(i)}>Edit</IconControlButton>
                <IconControlButton danger onClick={() => { deletePosition(i); showToast('Position removed') }}>✕</IconControlButton>
              </div>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  )
}
