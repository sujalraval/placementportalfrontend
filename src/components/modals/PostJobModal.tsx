import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import type { RecJob } from '@/data/mock/recruiterJobs'

const TYPE_OPTIONS = ['Full-time (Placement)', 'Internship', 'Internship + PPO', 'OJT (On-Job Training)']
const SECTOR_OPTIONS = ['IT Services', 'Analytics', 'Banking', 'Consulting', 'Pharma', 'Engineering', 'Core / Manufacturing', 'FMCG', 'Other']
const KNOWN_DEPT_TAGS = ['CS', 'IT', 'Stats', 'Commerce', 'MBA', 'Law', 'Science', 'Arts']

interface PostJobModalProps {
  index: number
  job?: RecJob
}

export function PostJobModal({ index, job }: PostJobModalProps) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveJob } = useRecruiterData()

  const [values, setValues] = useState({
    role: job?.role ?? '',
    type: job?.type ?? TYPE_OPTIONS[0],
    sector: job?.sector ?? SECTOR_OPTIONS[0],
    ctc: job?.ctc ?? '',
    loc: job?.loc ?? '',
    openings: job?.openings ?? '',
    cgpa: job?.cgpa ?? '6.0',
    batch: job?.batch ?? '2026',
    depts: job?.depts ?? 'All departments',
    skills: (job?.skills ?? []).join(', '),
    rounds: (job?.rounds ?? []).join(', '),
    bond: job?.bond ?? '',
    deadline: job?.deadline ?? '',
    jd: job?.jd ?? '',
  })

  const set = (k: keyof typeof values, v: string) => setValues((s) => ({ ...s, [k]: v }))

  const submit = (status: RecJob['status']) => {
    if (!values.role) { showToast('Role title is required'); return }
    const tags = KNOWN_DEPT_TAGS.filter((t) => values.depts.toLowerCase().includes(t.toLowerCase()))
    saveJob(index, {
      role: values.role, type: values.type, sector: values.sector, ctc: values.ctc, loc: values.loc,
      openings: values.openings, cgpa: values.cgpa, batch: values.batch, depts: values.depts,
      deptTags: /all/i.test(values.depts) ? ['All'] : (tags.length ? tags : ['All']),
      skills: values.skills ? values.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
      rounds: values.rounds ? values.rounds.split(',').map((s) => s.trim()).filter(Boolean) : [],
      bond: values.bond || 'None', deadline: values.deadline || '—', jd: values.jd, status,
    })
    closeModal()
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Role title" full><Input value={values.role} onChange={(e) => set('role', e.target.value)} /></Field>
        <Field label="Type">
          <Select value={values.type} onChange={(e) => set('type', e.target.value)}>
            {TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </Select>
        </Field>
        <Field label="Sector">
          <Select value={values.sector} onChange={(e) => set('sector', e.target.value)}>
            {SECTOR_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </Select>
        </Field>
        <Field label="CTC / Stipend"><Input placeholder="₹7.0 LPA" value={values.ctc} onChange={(e) => set('ctc', e.target.value)} /></Field>
        <Field label="Location"><Input placeholder="Ahmedabad" value={values.loc} onChange={(e) => set('loc', e.target.value)} /></Field>
        <Field label="Number of openings"><Input placeholder="10" value={values.openings} onChange={(e) => set('openings', e.target.value)} /></Field>
        <Field label="Minimum CGPA"><Input value={values.cgpa} onChange={(e) => set('cgpa', e.target.value)} /></Field>
        <Field label="Batch"><Input value={values.batch} onChange={(e) => set('batch', e.target.value)} /></Field>
        <Field label="Eligible departments" full><Input value={values.depts} onChange={(e) => set('depts', e.target.value)} /></Field>
        <Field label="Required skills (comma-separated)" full><Input placeholder="Java, SQL, Data Structures" value={values.skills} onChange={(e) => set('skills', e.target.value)} /></Field>
        <Field label="Selection rounds (comma-separated)" full><Input placeholder="Aptitude, Technical, HR" value={values.rounds} onChange={(e) => set('rounds', e.target.value)} /></Field>
        <Field label="Service agreement / bond"><Input placeholder="None / 1 year" value={values.bond} onChange={(e) => set('bond', e.target.value)} /></Field>
        <Field label="Application deadline"><Input placeholder="12 Jul" value={values.deadline} onChange={(e) => set('deadline', e.target.value)} /></Field>
        <Field label="Job description" full><Textarea rows={3} value={values.jd} onChange={(e) => set('jd', e.target.value)} /></Field>
      </div>
      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button onClick={() => submit('Published')}>Publish</Button>
        <Button variant="ghost" onClick={() => submit('Draft')}>Save as draft</Button>
        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}
