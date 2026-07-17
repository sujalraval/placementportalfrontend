import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import type { Opening } from '@/data/mock/openings'

export function OpeningFormModal({ index, item }: { index: number; item?: Opening }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveOpening } = useAdminData()

  const [values, setValues] = useState({
    role: item?.role ?? '', co: item?.co ?? '', ctc: item?.ctc ?? '',
    dept: item?.dept ?? 'All departments', openings: item ? String(item.openings) : '',
  })
  const set = (k: keyof typeof values, v: string) => setValues((s) => ({ ...s, [k]: v }))

  const submit = (status: Opening['status']) => {
    if (!values.role) { showToast('Role is required'); return }
    saveOpening(index, { role: values.role, co: values.co, ctc: values.ctc, dept: values.dept, openings: +values.openings || 0 }, status)
    closeModal()
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Role" full><Input value={values.role} onChange={(e) => set('role', e.target.value)} /></Field>
        <Field label="Company"><Input value={values.co} onChange={(e) => set('co', e.target.value)} /></Field>
        <Field label="CTC / Stipend"><Input placeholder="₹7.0 LPA" value={values.ctc} onChange={(e) => set('ctc', e.target.value)} /></Field>
        <Field label="Eligible departments" full><Input value={values.dept} onChange={(e) => set('dept', e.target.value)} /></Field>
        <Field label="Openings"><Input placeholder="10" value={values.openings} onChange={(e) => set('openings', e.target.value)} /></Field>
      </div>
      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button onClick={() => submit('Published')}>Publish</Button>
        <Button variant="ghost" onClick={() => submit('Draft')}>Save draft</Button>
        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}
