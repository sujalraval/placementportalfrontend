import { Button } from '@/components/ui/Button'
import { SectionCard } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

// TagList removed due to lack of backend support

export function SkillsTab() {
  const { me, addSkill, editSkill, deleteSkill } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openSkillForm = (i: number | null) => {
    const s = i !== null ? me.skills[i] : undefined
    openModal(i !== null ? 'Edit skill' : 'Add skill', (
      <SimpleFormModal
        submitLabel={i !== null ? 'Save' : 'Add'}
        initial={s ? { n: s.n, lv: String(s.lv) } : { lv: '70' }}
        fields={[
          { id: 'n', label: 'Skill', full: true },
          { id: 'lv', label: 'Proficiency', type: 'range', full: true },
        ]}
        onSubmit={(v) => {
          if (!v.n) { showToast('Skill name is required'); return }
          const skill = { n: v.n, lv: +v.lv || 0 }
          if (i !== null) editSkill(i, skill); else addSkill(skill)
          closeModal(); showToast(i !== null ? 'Skill updated' : 'Skill added')
        }}
      />
    ))
  }

  return (
    <div className="flex gap-4 max-lg:flex-col">
      <SectionCard title="Technical skills" action={<Button variant="ghost" size="sm" onClick={() => openSkillForm(null)}>Add</Button>} className="flex-1">
        {me.skills.map((s, i) => (
          <div key={s.n} className="my-2.5 flex items-center gap-3">
            <div className="w-[160px] flex-none text-[13px]">{s.n}</div>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-navy" style={{ width: `${s.lv}%` }} /></div>
            <div className="tnum w-[38px] text-right text-xs font-bold text-navy">{s.lv}</div>
            <div className="flex flex-none gap-1.5">
              <IconControlButton onClick={() => openSkillForm(i)}>Edit</IconControlButton>
              <IconControlButton danger onClick={() => { deleteSkill(i); showToast('Skill removed') }}>✕</IconControlButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  )
}
