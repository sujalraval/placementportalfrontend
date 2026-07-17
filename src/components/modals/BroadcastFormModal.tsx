import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import type { AdminBroadcast } from '@/data/mock/adminContent'

const AUDIENCES = ['All departments', 'Batch 2026', 'Batch 2027', 'Computer Science', 'Commerce', 'MBA', 'Law']

export function BroadcastFormModal({ index, item }: { index: number; item?: AdminBroadcast }) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { saveBroadcast } = useAdminData()

  return (
    <SimpleFormModal
      submitLabel={index >= 0 ? 'Update' : 'Send broadcast'}
      initial={item ? { title: item.title, audience: item.audience, channel: item.channel } : { audience: AUDIENCES[0], channel: 'Email · Push' }}
      fields={[
        { id: 'title', label: 'Message', full: true },
        { id: 'audience', label: 'Audience', type: 'select', options: AUDIENCES },
        { id: 'channel', label: 'Channels', full: true },
      ]}
      onSubmit={(v) => {
        if (!v.title) { showToast('Message is required'); return }
        saveBroadcast(index, { title: v.title, audience: v.audience, channel: v.channel, date: index >= 0 ? item!.date : '08 Jul' })
        closeModal()
      }}
    />
  )
}
