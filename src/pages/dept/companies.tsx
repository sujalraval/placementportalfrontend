import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Pill } from '@/components/ui/Pill'
import { Stat } from '@/components/ui/Stat'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { DirectOnboardModal } from '@/components/modals/DirectOnboardModal'
import { DEPTS } from '@/data/mock/departments'

export default function DeptCompaniesPage() {
  const { companies, promoteCompanyToUniversityWide, deleteCompany } = usePortalData()
  const { openModal } = useModal()
  const myDept = DEPTS[0].name
  const uniWide = companies.filter((c) => c.deptScope === 'University-wide')
  const mine = companies.filter((c) => c.deptScope === myDept)

  return (
    <div>
      <PageHead
        title="Companies & recruiters"
        description={`University-wide directory (read-only) plus recruiters you add for ${myDept} only`}
        actions={<Button variant="gold" onClick={() => openModal('Directly onboard a recruiter for your department', <DirectOnboardModal scope="dept" />)}><Icon name="bolt" /> Add department recruiter</Button>}
      />

      <div className="mb-4 grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <Stat label="University-wide (all depts)" value={uniWide.length} />
        <Stat label={`${myDept}-only`} value={mine.length} />
      </div>

      <SectionTitle title="Your department's own recruiters" extra={<Chip>Visible only to {myDept}</Chip>} />
      <Card className="mb-5">
        {mine.length ? (
          <table className="w-full min-w-[600px] border-collapse text-[13px]">
            <thead><tr>{['Company / Agency', 'Type', 'Sector', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
            <tbody>
              {mine.map((c) => {
                const i = companies.indexOf(c)
                return (
                  <tr key={c.name}>
                    <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{c.name}</b><small className="block text-muted">{c.source || ''}</small></td>
                    <td className="border-b border-line-2 px-3.5 py-3"><Chip>{c.type || 'Employer'}</Chip></td>
                    <td className="border-b border-line-2 px-3.5 py-3">{c.sector}</td>
                    <td className="border-b border-line-2 px-3.5 py-3"><Pill status={c.status} /></td>
                    <td className="border-b border-line-2 px-3.5 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <IconControlButton onClick={() => promoteCompanyToUniversityWide(i)}>Request university-wide</IconControlButton>
                        <IconControlButton danger onClick={() => deleteCompany(i)}>Remove</IconControlButton>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-[13px] text-muted">No department-specific recruiters yet. Add one to give {myDept} students access to a recruiter that isn't part of the university-wide directory.</p>
        )}
      </Card>

      <SectionTitle title="University-wide directory" extra={<span className="text-xs text-muted">Read-only — managed centrally by Admin</span>} />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-[13px]">
          <thead><tr>{['Company', 'Sector', 'Hires (season)', 'Status'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {uniWide.map((c) => (
              <tr key={c.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{c.name}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{c.sector}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{c.hires}</td>
                <td className="border-b border-line-2 px-3.5 py-3"><Pill status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
