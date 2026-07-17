import { useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'
import { useRecruiterData } from '@/context/RecruiterDataContext'
import { useAdminData } from '@/context/AdminDataContext'
import { runIntegrityChecks } from '@/lib/integrityChecks'

export default function AdminIntegrityPage() {
  const portal = usePortalData()
  const recruiter = useRecruiterData()
  const admin = useAdminData()
  const { showToast } = useToast()
  const [, forceRerun] = useState(0)

  const results = runIntegrityChecks({
    companies: portal.companies, depts: admin.depts, drives: portal.drives, internships: portal.internships,
    myInterns: portal.myInterns, recJobs: recruiter.recJobs, recCands: recruiter.recCands, interviews: recruiter.interviews,
    offers: recruiter.offers, programs: admin.programs, users: admin.users, dverify: portal.dverify,
    internApprovals: portal.internApprovals, meEn: portal.me.en,
  })
  const passed = results.filter((r) => r.ok).length
  const all = results.length
  const healthy = passed === all

  return (
    <div>
      <PageHead
        title="Data integrity"
        description="Live referential-integrity self-check across every cross-entity relationship"
        actions={<Button variant="gold" onClick={() => { forceRerun((t) => t + 1); showToast('Checks re-run') }}><Icon name="check" /> Re-run checks</Button>}
      />

      <div className={`mb-[18px] flex items-center gap-3.5 rounded-[10px] border px-4 py-3.5 ${healthy ? 'border-[#BFE0CE] bg-green-soft' : 'border-[#E4CFA0] bg-gold-soft'}`}>
        <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[9px] bg-white">
          <Icon name={healthy ? 'check' : 'warn'} className={healthy ? 'text-green' : 'text-gold'} />
        </div>
        <div>
          <b className="text-sm">{passed} of {all} checks passing</b>
          <small className="block text-xs text-[#46443d]">
            {healthy ? 'Every cross-entity relationship currently resolves correctly — same discipline as the Data Dictionary audit, run live.' : 'Review the flagged relationship(s) below.'}
          </small>
        </div>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead><tr>{['Check', 'Status', 'Detail'].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.name}>
                <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{r.name}</b></td>
                <td className="border-b border-line-2 px-3.5 py-3">{r.ok ? <ColorPill color="green">Verified</ColorPill> : <ColorPill color="gold">On hold</ColorPill>}</td>
                <td className={`border-b border-line-2 px-3.5 py-3 text-[12.5px] ${r.ok ? 'text-[#46443d]' : 'text-red'}`}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">
        This page runs the same referential-integrity logic documented in the Data Dictionary &amp; Relationship Map,
        live against the current in-memory data. Add a new check here whenever a new cross-entity relationship is
        introduced elsewhere in the system.
      </p>
    </div>
  )
}
