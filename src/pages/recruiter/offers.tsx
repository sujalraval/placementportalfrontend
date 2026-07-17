import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { Banner } from '@/components/shared/Banner'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { RollOutOfferModal } from '@/components/modals/RollOutOfferModal'
import { OfferLetterDocument } from '@/components/shared/RecruiterDocuments'

export default function RecruiterOffersPage() {
  const { rec, offers, revokeOffer } = useRecruiterData()
  const { openModal } = useModal()
  const { openDoc } = useDocViewer()

  return (
    <div>
      <PageHead
        title="Offers & selection"
        description="Roll out offers, track status, and generate offer letters"
        actions={<Button variant="gold" onClick={() => openModal('Roll out offer', <RollOutOfferModal index={-1} />)}><Icon name="check" /> Roll out offer</Button>}
      />

      <Banner
        variant="gold"
        icon={<Icon name="info" className="text-gold" />}
        title="Offer policy: one active offer per student"
        subtitle="Placement rules enforced by the University — a student's status updates automatically on acceptance."
      />

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-[13px]">
          <thead>
            <tr>{['Candidate', 'Role', 'CTC', 'Joining', 'Location', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {offers.map((o, i) => (
              <tr key={o.cand + o.role}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{o.cand}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{o.role}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{o.ctc}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{o.joining}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{o.loc}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={o.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    <IconControlButton onClick={() => openDoc(`Offer letter · ${o.cand}`, rec.company, <OfferLetterDocument offer={o} company={rec.company} address={rec.address} hrHead={rec.hrHead} />, `${o.cand}_Offer_Letter`)}>Letter</IconControlButton>
                    {o.status === 'Released' && <IconControlButton danger onClick={() => revokeOffer(i)}>Revoke</IconControlButton>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
