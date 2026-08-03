import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { DEPTS } from '@/data/mock/departments'

export function AdminScheduleDriveModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { addDrive, companies } = usePortalData()

  // Filter out companies that don't have an ID
  const validCompanies = companies.filter(c => c.id);
  const companyOptions = validCompanies.map(c => c.name);

  return (
    <SimpleFormModal
      submitLabel="Schedule drive"
      initial={{ depts: 'All departments', companyName: companyOptions[0] || '' }}
      fields={[
        { id: 'companyName', label: 'Company', type: 'select', options: companyOptions, full: true },
        { id: 'title', label: 'Drive title', placeholder: 'SDE Hiring Drive', full: true },
        { id: 'date', label: 'Date', type: 'date' },
        { id: 'mode', label: 'Mode', type: 'select', options: ['On-campus', 'Off-campus', 'Virtual'] },
        { id: 'depts', label: 'Departments', type: 'select', options: ['All departments', ...DEPTS.map(d => d.name)], full: true },
        { id: 'rounds', label: 'Rounds', placeholder: 'Aptitude · Technical · HR', full: true },
      ]}
      onSubmit={async (v) => {
        if (!v.companyName) { showToast('Please select a company'); return; }
        if (!v.title) { showToast('Drive title is required'); return }
        if (!v.date) { showToast('Date is required'); return }

        const selectedCompany = validCompanies.find(c => c.name === v.companyName);
        if (!selectedCompany?.id) { showToast('Invalid company selected'); return; }

        await addDrive({ 
          companyId: selectedCompany.id,
          title: v.title, 
          date: v.date, 
          depts: v.depts, 
          rounds: v.rounds, 
          mode: v.mode as 'On-campus' | 'Off-campus' | 'Virtual' 
        }).then(() => {
          closeModal()
        }).catch(() => {
          // Toast handled in addDrive
        })
      }}
    />
  )
}
