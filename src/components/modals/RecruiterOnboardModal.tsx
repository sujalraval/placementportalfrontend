import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
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

const SUBMIT_MESSAGE: Record<PartnerType, string> = {
  employer: 'Submitted — the Placement Cell will verify your company shortly',
  agency: 'Submitted — your agency registration will be verified shortly',
  agent: 'Submitted — your registration as an individual agent will be verified shortly',
}

interface RecruiterOnboardModalProps {
  kind: 'Full-time hiring' | 'Internships'
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy first:mt-1 first:border-t-0 first:pt-0">
      {children}
    </div>
  )
}

export function RecruiterOnboardModal({ kind }: RecruiterOnboardModalProps) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const [ptype, setPtype] = useState<PartnerType>('employer')
  const copy = TYPE_COPY[ptype]

  const submit = () => {
    closeModal()
    showToast(SUBMIT_MESSAGE[ptype])
  }

  return (
    <div>
      <p className="mb-1.5 text-[13px] text-muted">
        Tell us about your organisation and who we should coordinate with. The Placement Cell verifies new
        recruiters within one working day.
      </p>

      <SectionLabel>Partner type</SectionLabel>
      <Field label="How will you work with us?" full>
        <Select value={ptype} onChange={(e) => setPtype(e.target.value as PartnerType)}>
          <option value="employer">Direct Employer — hiring for our own company</option>
          <option value="agency">Recruitment / Staffing Agency — hiring on behalf of client companies</option>
          <option value="agent">Individual Agent / Consultant — independent recruiter</option>
        </Select>
      </Field>

      <SectionLabel>Company details</SectionLabel>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label={copy.nameLabel}><Input placeholder={copy.namePlaceholder} /></Field>
        <Field label="Sector / industry"><Input placeholder="IT Services / Banking / Pharma…" /></Field>
        <Field label="Website"><Input placeholder="https://" /></Field>
        <Field label="Partner as">
          <Select defaultValue={kind}>
            <option>Full-time hiring</option>
            <option>Internships</option>
            <option>Both — jobs &amp; internships</option>
          </Select>
        </Field>
      </div>

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
        <Select defaultValue="All departments">
          <option>All departments</option>
          {DEPTS.map((d) => <option key={d.name}>{d.name}</option>)}
        </Select>
      </Field>
      <Field label="Anything else? (optional)" full>
        <Textarea rows={3} placeholder="Roles, timelines, expected headcount…" />
      </Field>

      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button onClick={submit}>Submit for verification</Button>
        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}
