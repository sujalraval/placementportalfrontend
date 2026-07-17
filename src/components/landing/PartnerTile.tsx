import { useToast } from '@/context/ToastContext'
import type { Partner } from '@/data/mock/partners'
import { monogram } from '@/lib/text'

export function PartnerTile({ partner }: { partner: Partner }) {
  const { showToast } = useToast()

  return (
    <button
      onClick={() => showToast(`${partner.n} — placement partner`)}
      className="flex items-center gap-3 rounded-[10px] border border-line bg-white p-3.5 text-left transition-transform hover:-translate-y-px hover:border-navy hover:shadow-[0_10px_22px_-16px_rgba(20,49,94,.6)]"
    >
      <span
        className="grid h-[42px] w-[42px] flex-none place-items-center rounded-[9px] text-base font-extrabold"
        style={{ background: `${partner.c}1a`, color: partner.c }}
      >
        {monogram(partner.n)}
      </span>
      <div>
        <b className="block text-[13.5px] leading-tight text-[#26251f]">{partner.n}</b>
        <small className="block text-[10.5px] font-semibold text-muted">{partner.s}</small>
      </div>
    </button>
  )
}
