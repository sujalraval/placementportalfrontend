import { Icon } from '@/components/icons/Icon'
import { SectionHead } from '@/components/landing/SectionHead'
import { useToast } from '@/context/ToastContext'
import { useAdminData } from '@/context/AdminDataContext'

export function NewsSection() {
  const { showToast } = useToast()
  const { news } = useAdminData()

  return (
    <section id="news" className="px-[30px] py-[52px] max-lg:px-4 max-lg:py-[38px]">
      <SectionHead
        eyebrow="Newsroom"
        title="News & updates"
        description="Announcements, recruiter news, and events from the Placement Cell."
      />
      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {news.map((n) => (
          <div
            key={n.title}
            className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-gold hover:shadow-[0_14px_30px_-22px_rgba(20,49,94,.6)]"
          >
            <div className="flex items-center gap-2.5 text-[11px] text-muted">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold text-[#8a6015]">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {n.cat}
              </span>
              <span>{n.date}</span>
            </div>
            <h3 className="text-[18px] leading-[1.25]">{n.title}</h3>
            <p className="text-[13.5px] text-[#46443d]">{n.body}</p>
            <button
              onClick={() => showToast('Opening article…')}
              className="mt-auto inline-flex items-center gap-1.5 self-start text-xs font-bold text-gold"
            >
              Read more <Icon name="arrow" className="h-[13px] w-[13px]" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
