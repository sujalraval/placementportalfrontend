import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { InfoGrid } from '@/components/shared/InfoGrid'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { initials } from '@/lib/text'

export default function RecruiterCompanyPage() {
  const { rec, saveCompany, saveHR, saveContact, addContact, deleteContact } = useRecruiterData()
  const { openModal, closeModal } = useModal()

  const openEditCompany = () => {
    openModal('Edit company profile', (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ sector: rec.sector, website: rec.website, address: rec.address, about: rec.about }}
        fields={[
          { id: 'sector', label: 'Sector' }, { id: 'website', label: 'Website' },
          { id: 'address', label: 'Registered address', full: true },
          { id: 'about', label: 'About', type: 'textarea', rows: 3, full: true },
        ]}
        onSubmit={(v) => { saveCompany(v as { sector: string; website: string; address: string; about: string }); closeModal() }}
      />
    ))
  }

  const openEditHR = () => {
    openModal('Edit HR Head', (
      <SimpleFormModal
        submitLabel="Save"
        initial={{ name: rec.hrHead.name, desig: rec.hrHead.desig, email: rec.hrHead.email, phone: rec.hrHead.phone }}
        fields={[{ id: 'name', label: 'Name' }, { id: 'desig', label: 'Designation' }, { id: 'email', label: 'Email' }, { id: 'phone', label: 'Phone' }]}
        onSubmit={(v) => { saveHR(v as { name: string; desig: string; email: string; phone: string }); closeModal() }}
      />
    ))
  }

  const openContactForm = (i: number | null) => {
    const c = i !== null ? rec.contacts[i] : undefined
    openModal(i !== null ? 'Edit contact' : 'Add contact', (
      <SimpleFormModal
        submitLabel="Save"
        initial={c ? { name: c.name, desig: c.desig, email: c.email, phone: c.phone } : {}}
        fields={[{ id: 'name', label: 'Name' }, { id: 'desig', label: 'Designation' }, { id: 'email', label: 'Email' }, { id: 'phone', label: 'Phone' }]}
        onSubmit={(v) => {
          if (!v.name) return
          const contact = { name: v.name, desig: v.desig, email: v.email, phone: v.phone }
          if (i !== null) saveContact(i, contact); else addContact(contact)
          closeModal()
        }}
      />
    ))
  }

  return (
    <div>
      <PageHead
        title="Company profile"
        description="Your organisation's record in the university's shared database"
        actions={<Button variant="ghost" onClick={openEditCompany}>Edit profile</Button>}
      />
      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[1.4]">
          <SectionTitle title={`About ${rec.company}`} extra={<ColorPill color="green">Verified</ColorPill>} />
          <p className="text-[13.5px] leading-[1.6] text-[#333]">{rec.about}</p>
          <div className="mt-3.5">
            <InfoGrid items={[
              ['Sector', rec.sector], ['Website', rec.website],
              ['MOU status', `Signed · valid till ${rec.mouData.valid}`], ['Rating', `⭐ ${rec.rating} / 5`],
            ]} />
          </div>
          <div className="border-t border-line-2 pt-2.5">
            <div className="text-[10.5px] font-bold uppercase tracking-[.05em] text-muted">Registered address</div>
            <div className="mt-[3px] text-sm">{rec.address}</div>
          </div>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Hiring history" />
          <table className="w-full border-collapse text-[13px]">
            <thead><tr>{['Year', 'Hires', 'Avg', 'Highest'].map((h) => <th key={h} className="border-b border-line bg-paper px-3 py-2 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
            <tbody>
              {rec.history.map((h) => (
                <tr key={h.year}>
                  <td className="tnum border-b border-line-2 px-3 py-2">{h.year}</td>
                  <td className="tnum border-b border-line-2 px-3 py-2">{h.hires}</td>
                  <td className="tnum border-b border-line-2 px-3 py-2">{h.avg}</td>
                  <td className="tnum border-b border-line-2 px-3 py-2">{h.high}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card pad className="mt-4">
        <SectionTitle title="Points of contact" action={<Button variant="ghost" size="sm" onClick={() => openContactForm(null)}>Add contact</Button>} />
        <div className="flex gap-3.5 border-b border-line-2 py-4">
          <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[9px] bg-navy-soft font-bold text-navy">{initials(rec.hrHead.name)}</div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[15px] text-navy">{rec.hrHead.name} <ColorPill color="gold">HR Head</ColorPill></h4>
            <div className="my-1 text-xs text-muted">{rec.hrHead.desig}</div>
            <p className="text-[12.5px] text-[#46443d]">{rec.hrHead.email} · {rec.hrHead.phone}</p>
          </div>
          <IconControlButton onClick={openEditHR}>Edit</IconControlButton>
        </div>
        {rec.contacts.map((c, i) => (
          <div key={c.name} className="flex gap-3.5 border-b border-line-2 py-4 last:border-b-0">
            <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[9px] bg-navy-soft font-bold text-navy">{initials(c.name)}</div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[15px] text-navy">{c.name} {c.primary && <ColorPill color="navy">Primary</ColorPill>}</h4>
              <div className="my-1 text-xs text-muted">{c.desig}</div>
              <p className="text-[12.5px] text-[#46443d]">{c.email} · {c.phone}</p>
            </div>
            <div className="flex flex-none gap-1.5">
              <IconControlButton onClick={() => openContactForm(i)}>Edit</IconControlButton>
              <IconControlButton danger onClick={() => deleteContact(i)}>Delete</IconControlButton>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
