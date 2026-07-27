import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { Sector } from '@/data/mock/sectors'

export function SectorFormModal({ index, item }: { index: number; item?: Sector }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveSector } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel="Save"
      initial={item ? { 
        name: item.name, 
        companies: String(item.companies), 
        openings: String(item.openings), 
        status: item.status,
        industryRelevance: item.industryRelevance?.join(', ') || '',
        industryDomains: item.industryDomains?.join(', ') || '',
        industrySubDomains: item.industrySubDomains?.join(', ') || '',
        applicationAreas: item.applicationAreas?.join(', ') || ''
      } : { status: 'Active' }}
      fields={[
        { id: 'name', label: 'Sector name', full: true },
        { id: 'industryRelevance', label: 'Industry Relevance List (comma-separated)', full: true },
        { id: 'industryDomains', label: 'Industry Domain(s)* (comma-separated)', full: true },
        { id: 'industrySubDomains', label: 'Industry Sub-Domain(s)* (comma-separated)', full: true },
        { id: 'applicationAreas', label: 'Application Areas / Use Cases* (comma-separated)', full: true },
        { id: 'companies', label: 'Companies', type: 'number' },
        { id: 'openings', label: 'Open positions', type: 'number' },
        { id: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        const splitTags = (str?: string) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : undefined;
        
        saveSector(index, { 
          name: v.name, 
          companies: +v.companies || 0, 
          openings: +v.openings || 0, 
          status: v.status as Sector['status'],
          industryRelevance: splitTags(v.industryRelevance),
          industryDomains: splitTags(v.industryDomains),
          industrySubDomains: splitTags(v.industrySubDomains),
          applicationAreas: splitTags(v.applicationAreas)
        })
        closeModal()
      }}
    />
  )
}
