import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Stat } from '@/components/ui/Stat'
import { Select } from '@/components/ui/Field'
import { SectionCard } from '@/components/shared/SectionCard'
import { InfoGrid } from '@/components/shared/InfoGrid'
import { Banner } from '@/components/shared/Banner'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

const STATUS_OPTIONS = ['Available', 'Placed', 'Opted out', 'Higher studies']

export function PersonalTab() {
  const { me, updatePersonal, setStatus } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openPersonalForm = () => {
    openModal('Edit personal details', (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ name: me.name, dob: me.dob, gender: me.gender, category: me.category, city: me.city, email: me.email, phone: me.phone, linkedin: me.linkedin, github: me.github, address: me.address }}
        fields={[
          { id: 'name', label: 'Full name' }, { id: 'dob', label: 'Date of birth' },
          { id: 'gender', label: 'Gender' }, { id: 'category', label: 'Category' },
          { id: 'city', label: 'City' }, { id: 'email', label: 'Email' },
          { id: 'phone', label: 'Mobile' }, { id: 'linkedin', label: 'LinkedIn' },
          { id: 'github', label: 'GitHub' }, { id: 'address', label: 'Address', full: true },
        ]}
        onSubmit={(v) => { updatePersonal(v); closeModal(); showToast('Personal details updated') }}
      />
    ))
  }

  return (
    <div className="flex gap-4 max-lg:flex-col">
      <SectionCard title="Personal details" action={<Button variant="ghost" size="sm" onClick={openPersonalForm}>Edit</Button>} className="flex-1">
        <InfoGrid items={[
          ['Date of birth', me.dob], ['Gender', me.gender], ['Category', me.category], ['City', me.city],
          ['Email', me.email], ['Mobile', me.phone], ['LinkedIn', me.linkedin], ['GitHub', me.github],
        ]} />
        <div className="border-t border-line-2 pt-2.5">
          <div className="text-[10.5px] font-bold uppercase tracking-[.05em] text-muted">Address</div>
          <div className="mt-[3px] text-sm">{me.address}</div>
        </div>
      </SectionCard>
      <SectionCard title="Verification" className="flex-[.7]">
        <Banner icon={<Icon name="shield" className="text-navy" />} title="Profile verified" subtitle={`Approved by ${me.coordinator}`} />
        <div className="mb-3">
          <Stat label="Placement status" value={<span className="text-xl">{me.status}</span>} sub="You are visible to recruiters" />
        </div>
        <label className="mb-1.5 block text-xs font-semibold text-[#3a3833]">Change status</label>
        <Select value={me.status} onChange={(e) => { setStatus(e.target.value); showToast('Placement status set to ' + e.target.value) }}>
          {STATUS_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </Select>
      </SectionCard>
    </div>
  )
}
