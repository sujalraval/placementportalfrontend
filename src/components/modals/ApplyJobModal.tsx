import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { cvScoreOf } from '@/data/mock/cvParams'

interface ApplyJobModalProps {
  role: string
  co: string
}

export function ApplyJobModal({ role, co }: ApplyJobModalProps) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { cvParams, me } = usePortalData()

  return (
    <div>
      <p className="mb-4 text-[13.5px] text-[#44423b]">
        You're applying to <b>{role}</b> at <b>{co}</b>. Your profile and latest CV (score {cvScoreOf(cvParams)}/100) will be shared.
      </p>
      <Field label="Attach CV">
        <Select defaultValue={`My_CV_${me.name.replace(/\s+/g, '_')}.pdf (latest)`}>
          <option>{`My_CV_${me.name.replace(/\s+/g, '_')}.pdf (latest)`}</option>
          <option>Generate a job-tailored CV</option>
        </Select>
      </Field>
      <Field label="Note to recruiter (optional)">
        <Textarea rows={3} placeholder="A line on why you're a fit…" />
      </Field>
      <div className="flex gap-2.5">
        <Button onClick={() => { closeModal(); showToast(`Application submitted to ${co}`) }}>Submit application</Button>
        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}
