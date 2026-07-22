import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons'
import { Button } from '@/components/ui/Button'
import { Stat } from '@/components/ui/Stat'
import { ColorPill } from '@/components/ui/Pill'
import { SectionCard } from '@/components/shared/SectionCard'
import { InfoGrid } from '@/components/shared/InfoGrid'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

const LINK_ICONS: IconName[] = ['globe', 'build', 'users', 'target', 'link', 'file']

export function OverviewTab() {
  const { me, updateAbout, updatePreferences, addLink, editLink, deleteLink } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openLinkForm = (index: number | null) => {
    const link = index !== null ? me.links[index] : undefined
    openModal(index !== null ? 'Edit link' : 'Add profile link', (
      <SimpleFormModal
        submitLabel={index !== null ? 'Save' : 'Add'}
        initial={link ? { label: link.label, url: link.url, ic: link.ic } : {}}
        fields={[
          { id: 'label', label: 'Label', full: true },
          { id: 'url', label: 'URL', full: true },
          { id: 'ic', label: 'Icon', type: 'select', options: LINK_ICONS, full: true },
        ]}
        onSubmit={(v) => {
          if (!v.label || !v.url) { showToast('Label and URL are required'); return }
          if (index !== null) editLink(index, { label: v.label, url: v.url, ic: v.ic })
          else addLink({ label: v.label, url: v.url, ic: v.ic })
          closeModal()
          showToast(index !== null ? 'Link updated' : 'Link added')
        }}
      />
    ))
  }

  const openAboutForm = () => {
    openModal('Edit summary', (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ headline: me.headline, summary: me.summary }}
        fields={[
          { id: 'headline', label: 'Headline', full: true },
          { id: 'summary', label: 'Summary', type: 'textarea', rows: 5, full: true },
        ]}
        onSubmit={(v) => { updateAbout(v.headline, v.summary); closeModal(); showToast('Summary updated') }}
      />
    ))
  }

  const openPrefsForm = () => {
    const p = me.preferences
    openModal('Edit career preferences', (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ roles: p.roles, type: p.type, ctc: p.ctc, locations: p.locations, relocate: p.relocate, avail: p.avail }}
        fields={[
          { id: 'roles', label: 'Preferred roles', full: true, placeholder: 'Software Engineer, Data Analyst' },
          { id: 'type', label: 'Job type', type: 'select', options: ['Placement', 'Internship', 'OJT', 'Placement · Internship'] },
          { id: 'ctc', label: 'Expected CTC', placeholder: 'e.g. 10 LPA' },
          { id: 'locations', label: 'Preferred locations', full: true, placeholder: 'Bangalore, Pune, Remote' },
          { id: 'relocate', label: 'Relocation', type: 'select', options: ['Open to relocate', 'Not open to relocate'] },
          { id: 'avail', label: 'Availability', type: 'select', options: ['Available', 'Not Available'] },
        ]}
        onSubmit={(v) => {
          updatePreferences({ roles: v.roles, type: v.type, ctc: v.ctc, locations: v.locations, relocate: v.relocate, avail: v.avail })
          closeModal(); showToast('Career preferences updated')
        }}
      />
    ))
  }

  return (
    <div>
      <div className="flex gap-4 max-lg:flex-col">
        <SectionCard title="About" action={<Button variant="ghost" size="sm" onClick={openAboutForm}>Edit</Button>} className="flex-[1.5]">
          <p className="text-[14.5px] leading-[1.65] text-[#33322e]">{me.summary}</p>
          <div className="mt-4 grid grid-cols-4 gap-4 max-lg:grid-cols-2">
            <Stat label="Internships" value={me.internships.length} />
            <Stat label="Projects" value={me.projects.length} />
            <Stat label="Certifications" value={me.certs.length} />
            <Stat label="Achievements" value={me.achievements.length} />
          </div>
        </SectionCard>
        <SectionCard title="Online profiles" action={<Button variant="ghost" size="sm" onClick={() => openLinkForm(null)}>Add</Button>} className="flex-1">
          <div className="flex flex-col gap-2.5">
            {me.links.map((l, i) => (
              <div key={l.label} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-white px-3.5 py-2.5">
                <button onClick={() => showToast(`Opening ${l.url}…`)} className="flex flex-1 items-center gap-3 text-left">
                  <Icon name={l.ic as IconName} className="text-navy w-6 h-6 flex-none" />
                  <div><b className="block text-[13px] font-semibold text-navy">{l.label}</b><span className="text-[11.5px] font-medium text-muted">{l.url}</span></div>
                </button>
                <div className="flex flex-none gap-1.5">
                  <IconControlButton onClick={() => openLinkForm(i)}>Edit</IconControlButton>
                  <IconControlButton danger onClick={() => { deleteLink(i); showToast('Link removed') }}>✕</IconControlButton>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Career preferences"
        className="mt-4"
        extra={<ColorPill color="navy">Used for job matching</ColorPill>}
        action={<Button variant="ghost" size="sm" onClick={openPrefsForm}>Edit</Button>}
      >
        <InfoGrid items={[
          ['Preferred roles', me.preferences.roles], ['Job type', me.preferences.type],
          ['Preferred locations', me.preferences.locations], ['Expected CTC', me.preferences.ctc],
          ['Relocation', me.preferences.relocate], ['Availability', me.preferences.avail],
        ]} />
      </SectionCard>
    </div>
  )
}
