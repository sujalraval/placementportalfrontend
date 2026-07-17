import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { NewsItem } from '@/data/mock/news'

const CATEGORIES = ['Announcement', 'Recruiter', 'Workshop', 'Partnership', 'Result']

export function NewsFormModal({ index, item }: { index: number; item?: NewsItem }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveNews } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel={index >= 0 ? 'Update' : 'Publish to website'}
      initial={item ? { cat: item.cat, date: item.date, title: item.title, body: item.body } : { cat: CATEGORIES[0] }}
      fields={[
        { id: 'cat', label: 'Category', type: 'select', options: CATEGORIES },
        { id: 'date', label: 'Date', placeholder: '08 Jul 2026' },
        { id: 'title', label: 'Headline', full: true },
        { id: 'body', label: 'Body', type: 'textarea', rows: 3, full: true },
      ]}
      onSubmit={(v) => {
        if (!v.title) { showToast('Headline is required'); return }
        saveNews(index, { cat: v.cat, date: v.date, title: v.title, body: v.body })
        closeModal()
      }}
    />
  )
}
