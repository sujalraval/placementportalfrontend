import type { ReactNode } from 'react'

type PillColor = 'green' | 'gold' | 'navy' | 'red' | 'grey'

// Ported from the original prototype's `pill(status)` status→color map.
const STATUS_COLOR: Record<string, PillColor> = {
  Open: 'green', Placed: 'green', Active: 'green', Today: 'gold',
  Interview: 'navy', Interviewing: 'navy', Shortlisted: 'navy', Applied: 'grey',
  Upcoming: 'navy', 'Registration open': 'gold', Verifying: 'gold',
  Rejected: 'red', Closed: 'grey', Completed: 'grey', Offer: 'green', Withdrawn: 'grey',
  Verified: 'green', Uploaded: 'gold', 'In progress': 'gold', Passed: 'green',
  Available: 'green', Scheduled: 'navy', 'Book slot': 'gold', Enrolled: 'green', Mentor: 'gold',
  Published: 'green', 'Pending approval': 'gold', Draft: 'grey', Expired: 'grey',
  Released: 'navy', Accepted: 'green', Declined: 'red', Revoked: 'grey', Selected: 'green',
  Signed: 'green', Pending: 'gold', Done: 'green', Sent: 'navy', 'On hold': 'gold', Virtual: 'navy',
  'Approval Requested': 'gold', Approved: 'green', Ongoing: 'navy', 'Report submitted': 'navy',
  Promoted: 'green', Left: 'grey', 'Higher Studies': 'navy',
}

const COLOR_CLASSES: Record<PillColor, string> = {
  green: 'bg-green-soft text-green',
  gold: 'bg-gold-soft text-[#8a6015]',
  navy: 'bg-navy-soft text-navy',
  red: 'bg-red-soft text-red',
  grey: 'bg-[#ECEAE3] text-[#6b6b6b]',
}

interface PillProps {
  status: string
}

export function Pill({ status }: PillProps) {
  const color = STATUS_COLOR[status] ?? 'grey'
  return <ColorPill color={color}>{status}</ColorPill>
}

interface ColorPillProps {
  color: PillColor
  children: ReactNode
}

// For pills whose label isn't a known status word (e.g. a computed match %).
export function ColorPill({ color, children }: ColorPillProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[.02em] ${COLOR_CLASSES[color]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}
