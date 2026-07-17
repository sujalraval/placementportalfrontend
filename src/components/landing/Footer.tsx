import { useNavigate } from 'react-router-dom'
import { useModal } from '@/context/ModalContext'
import { StudentRegisterModal } from '@/components/modals/StudentRegisterModal'
import { RecruiterOnboardModal } from '@/components/modals/RecruiterOnboardModal'
import { CONTACT } from '@/data/mock/about'
import { scrollToSection } from '@/lib/text'

export function Footer() {
  const navigate = useNavigate()
  const { openModal } = useModal()

  return (
    <footer className="bg-[#101d33] px-[30px] pb-[26px] pt-10 text-[#B9C4D8] max-lg:px-4">
      <div className="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-[30px]">
        <div>
          <b className="font-serif text-white">Gujarat University</b>
          <br />
          <span className="text-[13px]">
            Placement Cell Office<br />
            B K School of Business Management<br />
            Gujarat University Campus, Navarangpura<br />
            Ahmedabad – 380009, Gujarat, INDIA
          </span>
          <br />
          <a href={`mailto:${CONTACT.email}`} className="mt-2 inline-block text-[13px] text-gold-soft">
            {CONTACT.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-[54px]">
          <div className="flex flex-col">
            <b className="text-xs uppercase tracking-[.1em]">Students</b>
            <button onClick={() => openModal('Student registration', <StudentRegisterModal />)} className="py-1 text-left text-[13px] hover:text-white">Register</button>
            <button onClick={() => scrollToSection('jobs')} className="py-1 text-left text-[13px] hover:text-white">Job openings</button>
            <button onClick={() => navigate('/student/dashboard')} className="py-1 text-left text-[13px] hover:text-white">Student portal</button>
          </div>
          <div className="flex flex-col">
            <b className="text-xs uppercase tracking-[.1em]">Recruiters</b>
            <button onClick={() => openModal('Partner with Gujarat University', <RecruiterOnboardModal kind="Full-time hiring" />)} className="py-1 text-left text-[13px] hover:text-white">Onboard company</button>
            <button onClick={() => scrollToSection('partners')} className="py-1 text-left text-[13px] hover:text-white">Our partners</button>
            <button onClick={() => navigate('/recruiter/dashboard')} className="py-1 text-left text-[13px] hover:text-white">Recruiter portal</button>
          </div>
          <div className="flex flex-col">
            <b className="text-xs uppercase tracking-[.1em]">About</b>
            <button onClick={() => scrollToSection('about')} className="py-1 text-left text-[13px] hover:text-white">Placement cell</button>
            <button onClick={() => scrollToSection('contact')} className="py-1 text-left text-[13px] hover:text-white">Contact us</button>
            <button onClick={() => navigate('/admin/dashboard')} className="py-1 text-left text-[13px] hover:text-white">Admin / ERP</button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[26px] max-w-[1180px] border-t border-[#26344d] pt-[18px] text-xs">
        © 2026 Gujarat University · Placement Portal. A demonstration build. Partner names shown for illustration.
      </div>
    </footer>
  )
}
