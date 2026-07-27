import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { apiClient } from '@/api/client'
import { DEPTS } from '@/data/mock/departments'

type PartnerType = 'employer' | 'agency' | 'agent'

const TYPE_COPY: Record<PartnerType, { hrTitle: string; nameLabel: string; namePlaceholder: string; licLabel: string; clientsLabel: string; showAgencyBlock: boolean }> = {
  employer: {
    hrTitle: 'HR Head details', nameLabel: 'Company name', namePlaceholder: 'Company Pvt. Ltd.',
    licLabel: 'Registration / license no.', clientsLabel: 'Client companies you represent / hire for',
    showAgencyBlock: false,
  },
  agency: {
    hrTitle: 'Authorized signatory', nameLabel: 'Agency name', namePlaceholder: 'Agency / staffing firm name',
    licLabel: 'Registration / license no.', clientsLabel: 'Client companies you represent / hire for',
    showAgencyBlock: true,
  },
  agent: {
    hrTitle: 'Your details', nameLabel: 'Your full name', namePlaceholder: 'Individual agent / consultant name',
    licLabel: 'ID proof type & number', clientsLabel: 'Companies / sectors you place candidates into',
    showAgencyBlock: true,
  },
}

const VISIBILITY_OPTIONS = ['Wide All (University-wide)', 'Department', 'College']

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy first:mt-1 first:border-t-0 first:pt-0">
      {children}
    </div>
  )
}

interface DirectOnboardModalProps {
  scope: 'dept' | 'admin'
}

export function DirectOnboardModal({ scope }: DirectOnboardModalProps) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { addCompanyDirect } = usePortalData()
  
  const [ptype, setPtype] = useState<PartnerType>('employer')
  const [sectors, setSectors] = useState<{id: string, name: string}[]>([])
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [visibility, setVisibility] = useState<string[]>(['Wide All (University-wide)'])
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const copy = TYPE_COPY[ptype]

  useEffect(() => {
    apiClient.get('/sectors').then(res => {
      const data = res.data?.data || res.data || []
      setSectors(data)
    }).catch(console.error)
  }, [])

  const submit = () => {
    if (!name) { showToast('Name is required'); return }
    setIsSubmitting(true)
    
    const tcode = ptype === 'agency' ? 'Agency' : ptype === 'agent' ? 'Agent' : 'Employer'
    
    // Map visibilityOptions back to backend enums
    const scopes: string[] = []
    if (visibility.includes('Wide All (University-wide)')) scopes.push('UNIVERSITY_WIDE')
    if (visibility.includes('Department')) scopes.push('DEPARTMENT_ONLY')
    if (visibility.includes('College')) scopes.push('COLLEGE')

    // Map sector names to ids
    const sectorIds = sectors.filter(s => selectedSectors.includes(s.name)).map(s => s.id)
    
    addCompanyDirect({
      name: name, 
      sectorIds,
      visibilityScopes: scopes.length ? scopes : undefined,
      type: tcode as 'Employer' | 'Agency' | 'Agent',
      source: (scope === 'dept' ? 'Onboarded by Dept. Coordinator' : 'Onboarded by Admin') + ' — no registration required',
      deptScope: 'Mapped separately', // keep for mock compat
      sector: selectedSectors.join(', '), // keep for mock compat
    }).then(() => {
      closeModal()
      showToast(`${name} onboarded directly — access granted immediately`)
    }).catch(() => {
      setIsSubmitting(false)
    })
  }

  const toggleSector = (sName: string) => {
    setSelectedSectors(prev => prev.includes(sName) ? prev.filter(s => s !== sName) : [...prev, sName])
  }

  const toggleVisibility = (opt: string) => {
    setVisibility(prev => prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt])
  }

  return (
    <div>
      <p className="mb-1.5 text-[13px] text-muted">
        Instantly onboard a recruiter without requiring them to register.
      </p>

      <SectionLabel>Partner type</SectionLabel>
      <Field label="How will they work with us?" full>
        <Select value={ptype} onChange={(e) => setPtype(e.target.value as PartnerType)}>
          <option value="employer">Direct Employer — hiring for our own company</option>
          <option value="agency">Recruitment / Staffing Agency — hiring on behalf of client companies</option>
          <option value="agent">Individual Agent / Consultant — independent recruiter</option>
        </Select>
      </Field>

      <SectionLabel>Company details</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label={copy.nameLabel}>
          <Input placeholder={copy.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        
        <Field label="Partner as">
          <Select defaultValue="Full-time hiring">
            <option>Full-time hiring</option>
            <option>Internships</option>
            <option>Both — jobs &amp; internships</option>
          </Select>
        </Field>
      </div>

      <Field label="Sector / industry (Multi-select)" full>
        <div className="max-h-32 overflow-y-auto border border-line rounded-md p-2 bg-paper flex flex-col gap-1.5">
          {sectors.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded">
              <input 
                type="checkbox" 
                checked={selectedSectors.includes(s.name)}
                onChange={() => toggleSector(s.name)}
                className="rounded border-slate-300 text-navy focus:ring-navy"
              />
              {s.name}
            </label>
          ))}
        </div>
      </Field>

      {scope !== 'dept' && (
        <Field label="Visibility (Multi-select)" full>
          <div className="max-h-32 overflow-y-auto border border-line rounded-md p-2 bg-paper flex flex-col gap-1.5">
            {VISIBILITY_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={visibility.includes(opt)}
                  onChange={() => toggleVisibility(opt)}
                  className="rounded border-slate-300 text-navy focus:ring-navy"
                />
                {opt}
              </label>
            ))}
          </div>
        </Field>
      )}

      {copy.showAgencyBlock && (
        <>
          <SectionLabel>Agency / manpower supply details</SectionLabel>
          <div className="grid grid-cols-2 gap-x-4">
            <Field label={copy.licLabel}><Input placeholder="e.g. RGE/1234/2024" /></Field>
            <Field label="Years in operation"><Input placeholder="5" /></Field>
          </div>
          <Field label={copy.clientsLabel} full>
            <Textarea rows={2} placeholder="List companies or sectors you recruit for" />
          </Field>
          <Field label="Manpower categories supplied" full>
            <Input placeholder="IT staffing, industrial, back-office, contractual…" />
          </Field>
        </>
      )}

      <SectionLabel>Company address</SectionLabel>
      <Field label="Address line" full><Input placeholder="Building, street, area" /></Field>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="City"><Input placeholder="Ahmedabad" /></Field>
        <Field label="State"><Input placeholder="Gujarat" /></Field>
        <Field label="PIN code"><Input placeholder="380009" /></Field>
        <Field label="Country"><Input defaultValue="India" /></Field>
      </div>

      <SectionLabel>{copy.hrTitle}</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Full name"><Input placeholder="Name of HR Head" /></Field>
        <Field label="Designation"><Input placeholder="Head of Human Resources" /></Field>
        <Field label="Email"><Input placeholder="hrhead@company.com" /></Field>
        <Field label="Phone"><Input placeholder="+91" /></Field>
      </div>

      <SectionLabel>Primary contact person</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Full name"><Input placeholder="Point of contact" /></Field>
        <Field label="Designation"><Input placeholder="Campus Recruitment Lead" /></Field>
        <Field label="Work email"><Input placeholder="contact@company.com" /></Field>
        <Field label="Phone"><Input placeholder="+91" /></Field>
      </div>

      <SectionLabel>Hiring requirements</SectionLabel>
      <Field label="Departments you want to hire from" full>
        <Select defaultValue={scope === 'dept' ? 'Computer Science & Applications' : 'All departments'}>
          {scope !== 'dept' && <option>All departments</option>}
          {DEPTS.map((d) => <option key={d.name}>{d.name}</option>)}
        </Select>
      </Field>
      <Field label="Anything else? (optional)" full>
        <Textarea rows={3} placeholder="Roles, timelines, expected headcount…" />
      </Field>

      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button onClick={submit} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Onboard directly — grant access now'}
        </Button>
        <Button variant="ghost" onClick={closeModal} disabled={isSubmitting}>Cancel</Button>
      </div>
    </div>
  )
}
