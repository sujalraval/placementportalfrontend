import { Icon } from '@/components/icons/Icon'
import { initials } from '@/lib/text'

interface StaffCardProps {
  name: string
  role: string
  bio: string
  email?: string
}

export function StaffCard({ name, role, bio, email }: StaffCardProps) {
  return (
    <div className="rounded-xl border border-line bg-white p-5 text-center transition-transform hover:-translate-y-0.5 hover:border-navy hover:shadow-[0_14px_30px_-18px_rgba(20,49,94,.5)]">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-navy text-lg font-bold text-white">
        {initials(name)}
      </div>
      <b className="mt-2.5 block text-[14.5px] text-navy">{name}</b>
      <div className="mt-0.5 text-[11.5px] font-bold text-gold">{role}</div>
      <p className="my-2.5 text-xs leading-[1.5] text-[#46443d]">{bio}</p>
      {email && (
        <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-navy hover:text-gold">
          <Icon name="mail" className="h-[15px] w-[15px]" /> {email}
        </a>
      )}
    </div>
  )
}
