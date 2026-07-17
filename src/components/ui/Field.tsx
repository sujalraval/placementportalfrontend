import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

const CONTROL_CLASSES =
  'w-full rounded-md border border-line bg-white px-2.5 py-2 text-[13.5px] text-ink focus:border-navy focus:outline-none focus:ring-3 focus:ring-navy-soft'

interface FieldProps {
  label: string
  children: ReactNode
  full?: boolean
}

export function Field({ label, children, full = false }: FieldProps) {
  return (
    <div className={`mb-3.5 ${full ? 'col-span-2' : ''}`}>
      <label className="mb-1.5 block text-xs font-semibold text-[#3a3833]">{label}</label>
      {children}
    </div>
  )
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${CONTROL_CLASSES} ${props.className ?? ''}`} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${CONTROL_CLASSES} ${props.className ?? ''}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${CONTROL_CLASSES} ${props.className ?? ''}`} />
}
