import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { stageRank } from '@/data/mock/candidates'
import type { Offer } from '@/data/mock/offers'

interface RollOutOfferModalProps {
  index: number
  offer?: Offer
}

export function RollOutOfferModal({ index, offer }: RollOutOfferModalProps) {
  const { closeModal } = useModal()
  const { showToast } = useToast()
  const { recCands, recJobs, saveOffer } = useRecruiterData()
  const eligibleCands = recCands.filter((c) => stageRank[c.stage] >= 2)

  return (
    <SimpleFormModal
      submitLabel="Release offer"
      initial={offer ? { cand: offer.cand, role: offer.role, ctc: offer.ctc, joining: offer.joining, loc: offer.loc } : {}}
      fields={[
        { id: 'cand', label: 'Candidate', type: index >= 0 ? undefined : 'select', options: eligibleCands.map((c) => c.name), full: true },
        { id: 'role', label: 'Role', type: 'select', options: recJobs.map((j) => j.role) },
        { id: 'ctc', label: 'CTC', placeholder: '₹7.0 LPA' },
        { id: 'joining', label: 'Joining', placeholder: 'Jul 2026' },
        { id: 'loc', label: 'Location', placeholder: 'Ahmedabad', full: true },
      ]}
      onSubmit={(v) => {
        if (!v.cand) { showToast('Candidate is required'); return }
        saveOffer(index, { cand: v.cand, role: v.role, ctc: v.ctc, joining: v.joining, loc: v.loc })
        closeModal()
      }}
    />
  )
}
