import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { DEPTS } from '@/data/mock/departments'

export function StudentRegisterModal() {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const createAccount = () => {
    closeModal()
    showToast('Account created — verification link sent to your email')
    navigate('/student/dashboard')
  }

  return (
    <div>
      <p className="mb-4 text-[13px] text-muted">
        Create your Gujarat University placement account. It takes about two minutes.
      </p>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Full name"><Input placeholder="Your name" /></Field>
        <Field label="Enrolment number"><Input placeholder="GU__CS___" /></Field>
        <Field label="Department">
          <Select defaultValue={DEPTS[0].name}>
            {DEPTS.map((d) => <option key={d.name}>{d.name}</option>)}
          </Select>
        </Field>
        <Field label="Current CGPA"><Input placeholder="8.0" /></Field>
        <Field label="University email"><Input placeholder="name@gu.ac.in" /></Field>
        <Field label="Mobile"><Input placeholder="+91" /></Field>
        <Field label="Password"><Input type="password" placeholder="••••••••" /></Field>
        <Field label="Confirm password"><Input type="password" placeholder="••••••••" /></Field>
      </div>
      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button variant="gold" onClick={createAccount}>Create account</Button>
        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}
