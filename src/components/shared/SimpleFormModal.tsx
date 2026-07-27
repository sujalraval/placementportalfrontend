import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'

export interface FieldConfig {
  id: string
  label: string
  type?: 'text' | 'select' | 'multiselect' | 'textarea' | 'password' | 'number' | 'range' | 'date'
  options?: string[]
  full?: boolean
  rows?: number
  placeholder?: string
}

interface SimpleFormModalProps {
  fields: FieldConfig[]
  initial?: Record<string, any>
  onSubmit: (values: Record<string, any>) => void
  submitLabel?: string
}

export function SimpleFormModal({ fields, initial = {}, onSubmit, submitLabel = 'Save' }: SimpleFormModalProps) {
  const { closeModal } = useModal()
  const [values, setValues] = useState<Record<string, any>>(() => {
    const v: Record<string, any> = {}
    for (const f of fields) v[f.id] = initial[f.id] || (f.options && f.type !== 'multiselect' ? f.options[0] : (f.type === 'multiselect' ? [] : ''))
    return v
  })

  const setField = (id: string, value: any) => setValues((v) => ({ ...v, [id]: value }))

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        {fields.map((f) => (
          <Field key={f.id} label={f.label} full={f.full}>
            {f.type === 'multiselect' ? (
              <div className="max-h-32 overflow-y-auto border border-line rounded-md p-2 bg-paper flex flex-col gap-1.5">
                {f.options?.map((o) => (
                  <label key={o} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded">
                    <input 
                      type="checkbox" 
                      checked={(values[f.id] || []).includes(o)}
                      onChange={() => {
                        const current = values[f.id] || [];
                        if (current.includes(o)) {
                          setField(f.id, current.filter((x: string) => x !== o));
                        } else {
                          setField(f.id, [...current, o]);
                        }
                      }}
                      className="rounded border-slate-300 text-navy focus:ring-navy"
                    />
                    {o}
                  </label>
                ))}
              </div>
            ) : f.type === 'select' ? (
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
                type={f.type === 'password' ? 'password' : f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
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
