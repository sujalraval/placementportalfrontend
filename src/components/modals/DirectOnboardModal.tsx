import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { DEPTS } from '@/data/mock/departments'

const PARTNER_TYPES = ['Direct Employer', 'Recruitment Agency', 'Individual Agent']

interface DirectOnboardModalProps {
  scope: 'dept' | 'admin'
}

export function DirectOnboardModal({ scope }: DirectOnboardModalProps) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { addCompanyDirect } = usePortalData()

  const deptScopeOptions = scope === 'dept'
    ? ['Computer Science & Applications (your department only)']
    : ['University-wide (all departments)', ...DEPTS.map((d) => d.name)]

  return (
    <SimpleFormModal
      submitLabel="Onboard directly — grant access now"
      initial={{
        deptScope: deptScopeOptions[0],
        depts: scope === 'dept' ? 'Computer Science' : 'All departments',
      }}
      fields={[
        { id: 'name', label: 'Company / Agency / Individual name', full: true },
        { id: 'type', label: 'Partner type', type: 'select', options: PARTNER_TYPES },
        { id: 'sector', label: 'Sector', placeholder: 'IT Services' },
        { id: 'deptScope', label: 'Visibility', type: 'select', options: deptScopeOptions, full: scope !== 'dept' },
        { id: 'email', label: 'Contact email', full: true },
        { id: 'phone', label: 'Contact phone', placeholder: '+91' },
        { id: 'depts', label: 'Departments to hire from', full: true },
      ]}
      onSubmit={(v) => {
        if (!v.name) { showToast('Name is required'); return }
        const tcode = v.type === 'Recruitment Agency' ? 'Agency' : v.type === 'Individual Agent' ? 'Agent' : 'Employer'
        const deptScope = scope === 'dept'
          ? 'Computer Science & Applications'
          : (v.deptScope === 'University-wide (all departments)' ? 'University-wide' : (v.deptScope || 'University-wide'))
        addCompanyDirect({
          name: v.name, sector: v.sector || '—', type: tcode as 'Employer' | 'Agency' | 'Agent',
          source: (scope === 'dept' ? 'Onboarded by Dept. Coordinator' : 'Onboarded by Admin') + ' · no registration required',
          deptScope,
        })
        closeModal()
        showToast(`${v.name} onboarded directly — ${deptScope === 'University-wide' ? 'visible university-wide' : `visible only to ${deptScope}`}, access granted immediately`)
      }}
    />
  )
}
