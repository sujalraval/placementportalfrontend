import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'
import type { Internship } from '@/data/mock/internships'

export function ViewInternApplicantsModal({ internship }: { internship: Internship }) {
  const { closeModal } = useModal()
  const { selectApplicant, rejectApplicant, completeInternship } = usePortalData()

  if (!internship.applicants.length) {
    return <p className="text-[13px] text-muted">No applicants yet.</p>
  }

  return (
    <div>
      {internship.applicants.map((a) => (
        <div key={a.en} className="flex items-center gap-3 border-b border-line-2 py-2.5 last:border-b-0">
          <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] bg-navy-soft font-bold text-navy">{initials(a.name)}</div>
          <div className="flex-1"><b className="text-[13px]">{a.name}</b><small className="tnum block text-muted">{a.en}</small></div>
          <Pill status={a.stage} />
          <div className="ml-2.5 flex flex-none gap-1.5">
            {a.stage === 'Applied' && (
              <>
                <Button size="sm" onClick={() => { selectApplicant(internship.id, a.en); closeModal() }}>Select</Button>
                <Button size="sm" variant="ghost" onClick={() => { rejectApplicant(internship.id, a.en); closeModal() }}>Reject</Button>
              </>
            )}
            {(a.stage === 'Approved' || a.stage === 'Ongoing') && (
              <Button size="sm" onClick={() => { completeInternship(internship.id, a.en); closeModal() }}>Mark completed &amp; issue certificate</Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
