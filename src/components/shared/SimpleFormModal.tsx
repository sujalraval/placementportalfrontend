import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'

export interface FieldConfig {
  id: string
  label: string
  type?: 'text' | 'select' | 'textarea' | 'password' | 'number' | 'range'
  options?: string[]
  full?: boolean
  rows?: number
  placeholder?: string
}

interface SimpleFormModalProps {
  fields: FieldConfig[]
  initial?: Record<string, string>
  onSubmit: (values: Record<string, string>) => void
  submitLabel?: string
}

export function SimpleFormModal({ fields, initial = {}, onSubmit, submitLabel = 'Save' }: SimpleFormModalProps) {
  const { closeModal } = useModal()
  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {}
    for (const f of fields) v[f.id] = initial[f.id] ?? (f.options ? f.options[0] : '')
    return v
  })

  const setField = (id: string, value: string) => setValues((v) => ({ ...v, [id]: value }))

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        {fields.map((f) => (
          <Field key={f.id} label={f.label} full={f.full}>
            {f.type === 'select' ? (
              <Select value={values[f.id]} onChange={(e) => setField(f.id, e.target.value)}>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </Select>
            ) : f.type === 'textarea' ? (
              <Textarea rows={f.rows ?? 3} value={values[f.id]} placeholder={f.placeholder} onChange={(e) => setField(f.id, e.target.value)} />
            ) : f.type === 'range' ? (
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={values[f.id] || '0'} onChange={(e) => setField(f.id, e.target.value)} className="w-full accent-navy" />
                <div className="tnum w-8 text-right text-xs font-bold text-navy">{values[f.id]}</div>
              </div>
            ) : (
              <Input
                type={f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : 'text'}
                value={values[f.id]}
                placeholder={f.placeholder}
                onChange={(e) => setField(f.id, e.target.value)}
              />
            )}
          </Field>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button onClick={() => onSubmit(values)}>{submitLabel}</Button>
        <Button variant="ghost" onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  )
}
