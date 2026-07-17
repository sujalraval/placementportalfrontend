import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionCard, SectionTitle } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

const TAG_LABEL = { soft: 'soft skill', lang: 'language', intr: 'interest' } as const
type TagKind = keyof typeof TAG_LABEL

function TagList({ title, kind, values, onAdd, onDelete }: {
  title: string; kind: TagKind; values: string[]
  onAdd: (kind: TagKind, value: string) => void
  onDelete: (kind: TagKind, i: number) => void
}) {
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openAddForm = () => {
    openModal(`Add ${TAG_LABEL[kind]}`, (
      <SimpleFormModal
        submitLabel="Add"
        fields={[{ id: 't', label: 'Value', full: true }]}
        onSubmit={(v) => {
          if (!v.t) { showToast('Value is required'); return }
          onAdd(kind, v.t); closeModal(); showToast('Added')
        }}
      />
    ))
  }

  return (
    <div>
      <SectionTitle title={title} />
      <div className="flex flex-wrap items-center gap-2">
        {values.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-0 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-[#3a3833]">
            {s}
            <button onClick={() => { onDelete(kind, i); showToast('Removed') }} className="ml-1.5 text-sm font-extrabold text-muted hover:text-red">×</button>
          </span>
        ))}
        <button onClick={openAddForm} className="rounded-full border border-dashed border-[#c9c2b0] px-3.5 py-1.5 text-xs font-bold text-navy hover:border-navy hover:bg-paper">+ Add</button>
      </div>
    </div>
  )
}

export function SkillsTab() {
  const { me, addSkill, editSkill, deleteSkill, addTag, deleteTag } = usePortalData()
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
      <Card pad className="flex-[.8]">
        <div className="flex flex-col gap-5">
          <TagList title="Soft skills" kind="soft" values={me.soft} onAdd={addTag} onDelete={deleteTag} />
          <TagList title="Languages" kind="lang" values={me.languages} onAdd={addTag} onDelete={deleteTag} />
          <TagList title="Areas of interest" kind="intr" values={me.interests} onAdd={addTag} onDelete={deleteTag} />
        </div>
      </Card>
    </div>
  )
}
