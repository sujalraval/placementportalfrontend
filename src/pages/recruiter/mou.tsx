import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { InfoGrid } from '@/components/shared/InfoGrid'
import { Banner } from '@/components/shared/Banner'
import { useModal } from '@/context/ModalContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { CreateMouModal } from '@/components/modals/CreateMouModal'
import { MouDocument } from '@/components/shared/RecruiterDocuments'

const SCOPE_ITEMS = [
  'On-campus, off-campus, and virtual recruitment drives',
  'Access to verified candidate pools across departments',
  'Coordinated scheduling around the academic calendar',
  'Internships and pre-placement offers',
]

export default function RecruiterMouPage() {
  const { rec } = useRecruiterData()
  const { openModal } = useModal()
  const { openDoc } = useDocViewer()
  const d = rec.mouData

  return (
    <div>
      <PageHead
        title="Memorandum of Understanding"
        description={`The formal agreement between ${rec.company} and Gujarat University`}
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => openDoc(`Memorandum of Understanding · ${rec.company}`, 'Gujarat University · Training & Placement Cell', <MouDocument mou={d} />, `${rec.company}_MOU`)}>
              <Icon name="file" /> View MOU
            </Button>
            <Button variant="gold" onClick={() => openModal('Create / renew MOU', <CreateMouModal />)}><Icon name="spark" /> Create / renew MOU</Button>
          </div>
        }
      />

      <Banner
        icon={<Icon name="check" className="text-green" />}
        title="MOU signed & active"
        subtitle={`Valid till ${d.valid} · indicative hiring ${d.commit} positions / year`}
        action={<Pill status="Signed" />}
      />

      <Card pad>
        <SectionTitle title="Key terms" />
        <InfoGrid items={[
          ['Parties', `${rec.company} & Gujarat University`], ['Validity', `Till ${d.valid}`],
          ['Hiring commitment', `${d.commit} positions / year`], ['Signatory', d.signatory],
        ]} />
        <div className="border-t border-line-2 pt-2.5">
          <div className="text-[10.5px] font-bold uppercase tracking-[.05em] text-muted">Terms</div>
          <div className="mt-[3px] text-[13px]">{d.terms}</div>
        </div>
      </Card>

      <Card pad className="mt-4">
        <SectionTitle title="Scope of collaboration" />
        {SCOPE_ITEMS.map((t) => (
          <div key={t} className="flex items-center gap-3 border-b border-line-2 py-3 last:border-b-0">
            <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-gold-soft text-[#8a6015]"><Icon name="check" className="h-4 w-4" /></div>
            <b className="text-sm font-medium">{t}</b>
          </div>
        ))}
      </Card>
    </div>
  )
}
