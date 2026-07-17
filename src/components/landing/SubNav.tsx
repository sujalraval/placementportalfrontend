import { Button } from '@/components/ui/Button'
import { useModal } from '@/context/ModalContext'
import { StudentRegisterModal } from '@/components/modals/StudentRegisterModal'
import { BecomePartnerModal } from '@/components/modals/BecomePartnerModal'
import { scrollToSection } from '@/lib/text'

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'News', id: 'news' },
  { label: 'Jobs', id: 'jobs' },
  { label: 'Drives', id: 'drives' },
  { label: 'Team', id: 'team' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
]

export function SubNav() {
  const { openModal } = useModal()

  return (
    <div className="sticky top-[62px] z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-1 overflow-x-auto px-[30px] py-2.5">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-[#44423b] hover:bg-white hover:text-navy"
        >
          Home
        </button>
        {LINKS.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollToSection(l.id)}
            className="whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] font-semibold text-[#44423b] hover:bg-white hover:text-navy"
          >
            {l.label}
          </button>
        ))}
        <span className="flex-1" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openModal('Partner with Gujarat University', <BecomePartnerModal />)}
        >
          Become a partner
        </Button>
        <Button
          variant="gold"
          size="sm"
          onClick={() => openModal('Student registration', <StudentRegisterModal />)}
        >
          Register
        </Button>
      </div>
    </div>
  )
}
