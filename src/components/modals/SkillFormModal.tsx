import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { Skill } from '@/data/mock/skills'

export function SkillFormModal({ index, item }: { index: number; item?: Skill }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveSkill } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { name: item.name, description: item.description || '', category: item.category || '' } : {}}
      fields={[
        { id: 'name', label: 'Competency Name*', full: true },
        { id: 'description', label: 'Competency Description*', type: 'textarea', full: true },
        { id: 'category', label: 'Category (Optional)', full: true },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Competency Name is required'); return }
        if (!v.description) { showToast('Competency Description is required'); return }
        saveSkill(index, { name: v.name, description: v.description, category: v.category })
        closeModal()
      }}
    />
  )
}
