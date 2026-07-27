import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { Program } from '@/data/mock/programs'

const DEGREES = ['Undergraduate', 'Postgraduate', 'Diploma', 'Doctoral']

export function ProgramFormModal({ index, item }: { index: number; item?: Program }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveProgram, depts, skills, sectors } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { 
        name: item.name, 
        code: item.code || '', 
        dept: item.dept, 
        degree: item.degree, 
        seats: String(item.seats), 
        duration: item.duration,
        skills: item.skills || [],
        sectors: item.sectors || [],
        subSectors: item.subSectors?.join(', ') || '',
        industry: item.industry?.join(', ') || '',
        domain: item.domain?.join(', ') || '',
        subDomain: item.subDomain?.join(', ') || ''
      } : { dept: depts[0]?.name, degree: DEGREES[0] }}
      fields={[
        { id: 'name', label: 'Program name', full: true },
        { id: 'code', label: 'Program Code (e.g. BCA)' },
        { id: 'dept', label: 'Department', type: 'select', options: depts.map((d) => d.name) },
        { id: 'degree', label: 'Level', type: 'select', options: DEGREES },
        { id: 'seats', label: 'Seats', type: 'number' },
        { id: 'duration', label: 'Duration (years)', placeholder: '3', type: 'number' },
        { id: 'skills', label: 'Skills', type: 'multiselect', options: skills.map(s => s.name), full: true },
        { id: 'sectors', label: 'Sectors', type: 'multiselect', options: sectors.map(s => s.name), full: true },
        { id: 'subSectors', label: 'Sub-Sectors (comma-separated)', full: true },
        { id: 'industry', label: 'Industry (comma-separated)', full: true },
        { id: 'domain', label: 'Domain (comma-separated)', full: true },
        { id: 'subDomain', label: 'Sub-Domain (comma-separated)', full: true },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        if (!v.code) { showToast('Code is required'); return }
        
        const splitTags = (str?: string) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : undefined;
        
        saveProgram(index, { 
          name: v.name, 
          code: v.code.toUpperCase(), 
          dept: v.dept, 
          degree: v.degree as Program['degree'], 
          seats: +v.seats || 0, 
          duration: v.duration,
          skills: v.skills,
          sectors: v.sectors,
          subSectors: splitTags(v.subSectors),
          industry: splitTags(v.industry),
          domain: splitTags(v.domain),
          subDomain: splitTags(v.subDomain),
        })
        closeModal()
      }}
    />
  )
}
