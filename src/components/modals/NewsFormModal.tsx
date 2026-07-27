import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { contentApi } from '@/api/content'

const CATEGORIES = ['Announcement', 'Recruiter', 'Workshop', 'Partnership', 'Result']

export function NewsFormModal({ item, onSuccess }: { item?: any; onSuccess?: () => void }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    title: item?.title || '',
    category: item?.cat || CATEGORIES[0],
    date: item?.date || new Date().toISOString().split('T')[0],
    body: item?.body || '',
  })
  const [file, setFile] = useState<File | null>(null)

  const setField = (id: string, value: string) => setValues((v) => ({ ...v, [id]: value }))

  const onSubmit = async () => {
    if (!values.title) {
      showToast('Headline is required')
      return
    }
    
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
        category: values.category,
        body: values.body,
        attachmentUrl,
      }

      if (item?.id) {
        showToast('News updated successfully') // Note: We need a backend update endpoint if we want full edits
      } else {
        await contentApi.createNews(payload)
        showToast('News published to website')
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
        <Field label="Category">
          <Select value={values.category} onChange={(e) => setField('category', e.target.value)}>
            {CATEGORIES.map((o) => <option key={o}>{o}</option>)}
          </Select>
        </Field>
        
        <Field label="Date">
          <Input type="date" value={values.date} onChange={(e) => setField('date', e.target.value)} />
        </Field>

        <Field label="Headline" full>
          <Input value={values.title} onChange={(e) => setField('title', e.target.value)} />
        </Field>

        <Field label="Body" full>
          <Textarea rows={3} value={values.body} onChange={(e) => setField('body', e.target.value)} />
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
