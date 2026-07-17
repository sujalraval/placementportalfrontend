import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { DirectOnboardModal } from '@/components/modals/DirectOnboardModal'

export default function AdminCompaniesPage() {
  const { companies, promoteCompanyToUniversityWide } = usePortalData()
  const { openModal } = useModal()
  const { showToast } = useToast()

  return (
    <div>
      <PageHead
        title="Companies & recruiters"
        description="Centralized, university-wide directory plus department-specific recruiters — employers, agencies & individual agents"
        actions={<Button variant="gold" onClick={() => openModal('Directly onboard a recruiter', <DirectOnboardModal scope="admin" />)}><Icon name="bolt" /> Onboard recruiter directly</Button>}
      />
      <p className="-mt-3.5 mb-3.5 text-[12.5px] text-muted">
        Direct onboarding skips the public registration queue — access is granted immediately for recruiters you already know and trust. Department-scoped recruiters can be promoted to university-wide visibility here.
      </p>
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-[13px]">
          <thead>
            <tr>{['Company / Agency', 'Type', 'Scope', 'Sector', 'Hires (season)', 'Avg package', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr>
          </thead>
          <tbody>
            {companies.map((c, i) => (
              <tr key={c.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{c.name}</b><small className="block text-muted">{c.source || ''}</small></td>
                <td className="border-b border-line-2 px-3.5 py-3"><Chip>{c.type || 'Employer'}</Chip></td>
                <td className="border-b border-line-2 px-3.5 py-3">{c.deptScope === 'University-wide' ? <ColorPill color="navy">University-wide</ColorPill> : <ColorPill color="gold">{c.deptScope}</ColorPill>}</td>
                <td className="border-b border-line-2 px-3.5 py-3">{c.sector}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{c.hires}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{c.pkg} LPA</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={c.status} /></td>
                <td className="border-b border-line-2 px-3.5 py-3 text-right">
                  <div className="flex justify-end gap-1.5">
                    {c.status === 'Verifying' && <IconControlButton onClick={() => showToast(`${c.name} verified`)}>Verify</IconControlButton>}
                    {c.deptScope !== 'University-wide' && <IconControlButton onClick={() => promoteCompanyToUniversityWide(i)}>Promote</IconControlButton>}
                    <IconControlButton onClick={() => showToast(`Opening ${c.name}…`)}>View</IconControlButton>
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
