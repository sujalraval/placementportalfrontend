import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { MetaRow, MetaTag } from '@/components/shared/MetaTag'
import { PageHead } from '@/components/shared/PageHead'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { CompanyProfileModal } from '@/components/modals/CompanyProfileModal'
import { usePortalData } from '@/context/PortalDataContext'
import { CO_X } from '@/data/mock/companies'
import { JOBS } from '@/data/mock/jobs'
import { initials } from '@/lib/text'

export default function StudentCompaniesPage() {
  const { me, companies } = usePortalData()
  const { openModal } = useModal()
  const { showToast } = useToast()
  const visible = companies.filter((c) => c.deptScope === 'University-wide' || c.deptScope === me.dept)

  return (
    <div>
      <PageHead
        title="Companies"
        description={`Every recruiting partner visible to you — university-wide plus ${me.dept}-specific — complete profiles, links, and live openings`}
      />
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {visible.map((c) => {
          const x = CO_X[c.name]
          const open = JOBS.filter((j) => j.co === c.name && j.status === 'Open').length
          return (
            <Card key={c.name} pad>
              <div className="flex items-center gap-3.5">
                <div className="grid h-[46px] w-[46px] flex-none place-items-center rounded-[10px] bg-navy text-base font-bold text-white">{initials(c.name)}</div>
                <div className="flex-1">
                  <b className="text-[15.5px]">{c.name}</b>
                  <div className="text-xs text-muted">{c.sector} · {x?.hq || ''}</div>
                </div>
                {c.deptScope !== 'University-wide' ? <ColorPill color="gold">Dept-only</ColorPill> : <Pill status={c.status} />}
              </div>
              <p className="my-2.5 text-[12.5px] leading-[1.5] text-[#46443d]">{(x?.about || '').slice(0, 110)}…</p>
              <MetaRow>
                <MetaTag>{c.hires} hires</MetaTag>
                <MetaTag>Avg {c.pkg} LPA</MetaTag>
                <span className="rounded-md px-2.5 py-1 text-[11.5px] font-bold text-green">{open} open roles</span>
              </MetaRow>
              <div className="mt-2.5 flex gap-2">
                <Button size="sm" onClick={() => openModal(`${c.name} · ${c.sector}`, <CompanyProfileModal company={c} />)}>View profile</Button>
                <Button size="sm" variant="ghost" onClick={() => showToast(`Opening ${x?.web || c.name}…`)}>
                  <Icon name="globe" className="h-4 w-4" /> Website
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
