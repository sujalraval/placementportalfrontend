import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons'
import { Button } from '@/components/ui/Button'
import { ListRow } from '@/components/shared/ListRow'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { ApplyJobModal } from '@/components/modals/ApplyJobModal'
import { CO_X, type Company } from '@/data/mock/companies'
import { JOBS, kindOf } from '@/data/mock/jobs'
import { initials } from '@/lib/text'

export function CompanyProfileModal({ company }: { company: Company }) {
  const { closeModal, openModal } = useModal()
  const { showToast } = useToast()
  const x = CO_X[company.name]
  const open = JOBS.filter((j) => j.co === company.name && j.status === 'Open')

  const socials: [IconName, string | undefined][] = [
    ['globe', x?.web], ['users', x?.li], ['bolt', x?.x], ['star', x?.ig],
  ]

  return (
    <div>
      <p className="mb-3.5 text-[13.5px] leading-[1.6] text-[#333]">{x?.about}</p>

      <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy first:mt-1 first:border-t-0 first:pt-0">
        Company facts
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13.5px]">
        <div><div className="mb-1 text-xs font-semibold text-[#3a3833]">Headquarters</div>{x?.hq || '—'}</div>
        <div><div className="mb-1 text-xs font-semibold text-[#3a3833]">Employees</div>{x?.size || '—'}</div>
        <div><div className="mb-1 text-xs font-semibold text-[#3a3833]">Founded</div>{x?.founded || '—'}</div>
        <div><div className="mb-1 text-xs font-semibold text-[#3a3833]">Campus hires (season)</div>{company.hires}</div>
        <div><div className="mb-1 text-xs font-semibold text-[#3a3833]">Average package</div>{company.pkg} LPA</div>
        <div><div className="mb-1 text-xs font-semibold text-[#3a3833]">Status</div>{company.status}</div>
      </div>

      <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy">
        Website &amp; social media
      </div>
      <div className="mb-1.5 flex flex-wrap gap-2">
        {socials.filter(([, v]) => v).map(([icon, v]) => (
          <button
            key={icon}
            onClick={() => showToast(`Opening ${v}…`)}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[12.5px] font-semibold text-navy hover:border-navy hover:bg-paper"
          >
            <Icon name={icon} className="h-[15px] w-[15px]" /><b>{v}</b>
          </button>
        ))}
      </div>

      <div className="mb-2.5 mt-4 border-t border-line pt-3.5 text-[11px] font-extrabold uppercase tracking-[.1em] text-navy">
        Open opportunities ({open.length})
      </div>
      {open.length ? open.map((j) => (
        <ListRow
          key={j.id}
          icon={<b>{initials(j.co)}</b>}
          title={j.role}
          subtitle={`${kindOf(j)} · ${j.ctc} · closes ${j.deadline}`}
          trailing={<Button size="sm" onClick={() => { closeModal(); openModal(`Apply — ${j.role}`, <ApplyJobModal role={j.role} co={j.co} />) }}>Apply</Button>}
        />
      )) : <p className="text-[13px] text-muted">No open roles right now — follow this company for alerts.</p>}

      <div className="mt-3.5 flex gap-2.5">
        <Button variant="ghost" onClick={() => { closeModal(); showToast(`Following ${company.name} — you'll be alerted on new postings`) }}>Follow company</Button>
        <Button variant="ghost" onClick={closeModal}>Close</Button>
      </div>
    </div>
  )
}
