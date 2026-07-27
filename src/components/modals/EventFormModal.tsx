import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { contentApi } from '@/api/content'

export function EventFormModal({ item, onSuccess }: { item?: any; onSuccess?: () => void }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { depts } = useAdminData()
  
  const [loading, setLoading] = useState(false)
  
  // Format initial dates (YYYY-MM-DDTHH:mm for datetime-local)
  const formatForDatetimeLocal = (d?: string | Date) => {
    if (!d) return ''
    try {
      const dt = new Date(d)
      dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset())
      return dt.toISOString().slice(0, 16)
    } catch { return '' }
  }

  const [values, setValues] = useState({
    title: item?.title || '',
    startsAt: formatForDatetimeLocal(item?.startsAt || new Date()),
    endsAt: formatForDatetimeLocal(item?.endsAt),
    venue: item?.mode || 'On-campus',
    description: item?.description || '',
    audience: item?.audience || 'PUBLIC',
  })
  const [selectedDepts, setSelectedDepts] = useState<string[]>(item?.departments?.map((d: any) => d.id) || [])
  const [file, setFile] = useState<File | null>(null)

  const setField = (id: string, value: string) => setValues((v) => ({ ...v, [id]: value }))

  const toggleDept = (id: string) => {
    setSelectedDepts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const onSubmit = async () => {
    if (!values.title) { showToast('Title is required'); return }
    if (!values.startsAt) { showToast('Start Date/Time is required'); return }
    
    setLoading(true)
    try {
      let attachmentUrl = item?.attachmentUrl
      if (file) {
        const uploadRes = await contentApi.uploadContentFile(file)
        attachmentUrl = uploadRes.data?.url
      }

      const slug = item?.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

      const payload = {
        title: values.title,
        slug,
        description: values.description,
        audience: values.audience,
        startsAt: new Date(values.startsAt).toISOString(),
        endsAt: values.endsAt ? new Date(values.endsAt).toISOString() : null,
        venue: values.venue,
        attachmentUrl,
        departmentIds: selectedDepts.length > 0 ? selectedDepts : undefined,
      }

      if (item?.id) {
        showToast('Event updated successfully') 
      } else {
        await contentApi.createEvent(payload)
        showToast('Event published to website')
      }
      
      onSuccess?.()
      closeModal()
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Event title" full>
          <Input value={values.title} onChange={(e) => setField('title', e.target.value)} />
        </Field>

        <Field label="Starts At">
          <Input type="datetime-local" value={values.startsAt} onChange={(e) => setField('startsAt', e.target.value)} />
        </Field>
        
        <Field label="Ends At (Optional)">
          <Input type="datetime-local" value={values.endsAt} onChange={(e) => setField('endsAt', e.target.value)} />
        </Field>

        <Field label="Venue / Mode">
          <Input placeholder="e.g. Auditorium or Zoom Link" value={values.venue} onChange={(e) => setField('venue', e.target.value)} />
        </Field>
        
        <Field label="Audience">
          <Select value={values.audience} onChange={(e) => setField('audience', e.target.value)}>
            <option value="PUBLIC">Public</option>
            <option value="ALUMNI">Alumni Only</option>
          </Select>
        </Field>

        <Field label="Description" full>
          <Textarea rows={2} value={values.description} onChange={(e) => setField('description', e.target.value)} />
        </Field>
        
        <Field label="Departments (Multi-select)" full>
          <div className="max-h-32 overflow-y-auto border border-line rounded-md p-2 bg-paper flex flex-col gap-1.5">
            {depts.map((d: any) => (
              <label key={d.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1 rounded">
                <input 
                  type="checkbox" 
                  checked={selectedDepts.includes(d.id)}
                  onChange={() => toggleDept(d.id)}
                  className="rounded border-slate-300 text-navy focus:ring-navy"
                />
                <span>{d.name} ({d.code})</span>
              </label>
            ))}
            {depts.length === 0 && <span className="text-muted text-xs p-1">No departments available</span>}
          </div>
        </Field>

        <Field label="Attachment (PDF only)" full>
          <input 
            type="file" 
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-navy/10 file:text-navy hover:file:bg-navy/20"
          />
          {item?.attachmentUrl && !file && (
            <div className="text-xs text-muted mt-1">Current: <a href={item.attachmentUrl} target="_blank" rel="noreferrer" className="text-navy underline">View PDF</a></div>
          )}
        </Field>
      </div>

      <div className="mt-4 flex flex-wrap gap-2.5">
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? 'Saving...' : (item ? 'Update' : 'Publish to website')}
        </Button>
        <Button variant="ghost" onClick={closeModal} disabled={loading}>Cancel</Button>
      </div>
    </div>
  )
}
