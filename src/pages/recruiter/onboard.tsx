import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { Banner } from '@/components/shared/Banner'
import { useToast } from '@/context/ToastContext'
import { ONBOARD, REC_DOCS } from '@/data/mock/recruiter'

export default function RecruiterOnboardPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  return (
    <div>
      <PageHead title="Onboarding & verification" description="Your registration and verification status with the Placement Cell" />

      <Banner
        icon={<Icon name="check" className="text-green" />}
        title="Onboarding complete — you are a verified recruiter"
        subtitle="Completed 14 May 2026 · all checks passed"
        action={<Pill status="Verified" />}
      />

      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-[1.3]">
          <SectionTitle title="Onboarding steps" />
          {ONBOARD.map((s) => (
            <div key={s.step} className="flex items-center gap-3 border-b border-line-2 py-3 last:border-b-0">
              <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] bg-green-soft text-green"><Icon name="check" className="h-4 w-4" /></div>
              <div className="flex-1"><b className="text-[13px]">{s.step}</b><small className="block text-[11.5px] text-muted">{s.note}</small></div>
              <Pill status={s.status} />
            </div>
          ))}
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="Verification documents" action={<Button variant="ghost" size="sm" onClick={() => showToast('Upload a document')}>Upload</Button>} />
          {REC_DOCS.map((d) => (
            <div key={d.name} className="flex items-center gap-3 border-b border-line-2 py-3 last:border-b-0">
              <div className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[7px] bg-navy-soft text-navy"><Icon name="file" className="h-4 w-4" /></div>
              <div className="flex-1"><b className="text-[13px]">{d.name}</b></div>
              <Pill status={d.status} />
            </div>
          ))}
          <p className="mt-3 text-xs text-muted">Documents are verified once by the Placement Cell. Re-verification is only needed at MOU renewal.</p>
        </Card>
      </div>

      <Card pad className="mt-4">
        <SectionTitle title="Next step" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[13px] text-[#46443d]">Your MOU is active. Review or renew it anytime.</span>
          <Button onClick={() => navigate('/recruiter/mou')}>Go to MOU <Icon name="arrow" /></Button>
        </div>
      </Card>
    </div>
  )
}
