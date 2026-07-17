import { useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@/components/icons/Icon'
import { useModal } from '@/context/ModalContext'
import { usePortalData } from '@/context/PortalDataContext'
import { cvScoreOf } from '@/data/mock/cvParams'
import { readinessScore } from '@/lib/readiness'
import { RaiseTicketModal } from '@/components/modals/RaiseTicketModal'

interface ChatMessage {
  who: 'me' | 'bot'
  text: string
  action?: { label: string; onClick: () => void }
}

export function ChatWidget() {
  const location = useLocation()
  const persona = location.pathname.split('/')[1]
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { me, apps, cvParams } = usePortalData()

  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { who: 'bot', text: `Hi ${me.name.split(' ')[0]}! I'm your placement assistant. Ask me about applications, interviews, drives, your CV score, or support tickets.` },
  ])

  // Only meaningful within the student portal — the assistant answers about
  // "your" application status, which only exists for the logged-in student.
  if (persona !== 'student') return null

  const intents: { keys: string[]; answer: () => string; action?: { label: string; onClick: () => void } }[] = [
    { keys: ['status', 'application'], answer: () => `You have ${apps.length} applications: ${apps.map((x) => `${x.co} (${x.outcome})`).join(', ')}.` },
    { keys: ['eligib', 'cgpa', 'criteria'], answer: () => `Eligibility is checked automatically when you apply. Most current postings need CGPA 6.0–7.5 and zero backlogs; your CGPA ${me.cgpa} qualifies for all open roles.` },
    { keys: ['interview', 'schedule'], answer: () => 'Your next interview: Amazon · Technical round · 14 Jul, 11:00 AM (virtual). Joining details are in Notifications.' },
    { keys: ['mock'], answer: () => 'You can book a mock interview from Training → Mock interviews. Want me to open it?', action: { label: 'Open mock interviews', onClick: () => navigate('/student/training') } },
    { keys: ['cv', 'resume', 'résumé'], answer: () => `Your CV score is ${cvScoreOf(cvParams)}/100. The AI CV Studio can raise it — top fix: strengthen the Certifications section.`, action: { label: 'Open CV Studio', onClick: () => navigate('/student/cv') } },
    { keys: ['offer'], answer: () => 'You have an offer from HDFC Bank (₹8.0 LPA) — respond by 15 Jul from My Applications.' },
    { keys: ['drive'], answer: () => 'Upcoming drives: TCS National Qualifier (12 Jul), Amazon SDE (14 Jul), HDFC Pool Drive (10 Jul). Registration is automatic for eligible students.' },
    { keys: ['ticket', 'help', 'issue', 'problem'], answer: () => 'You can raise a support ticket and track its SLA from Support & feedback.', action: { label: 'Raise a ticket', onClick: () => { navigate('/student/support'); setTimeout(() => openModal('Raise a support ticket', <RaiseTicketModal />), 150) } } },
    { keys: ['readiness', 'score', 'employab'], answer: () => `Your career-readiness index is ${readinessScore(me, cvParams)}/100 — above the CS branch average of 68.` },
  ]

  const reply = (msg: string): { text: string; action?: ChatMessage['action'] } => {
    const m = msg.toLowerCase()
    const hit = intents.find((it) => it.keys.some((k) => m.includes(k)))
    if (hit) return { text: hit.answer(), action: hit.action }
    return { text: 'I can help with application status, eligibility, interviews, drives, your CV score, offers, readiness, and support tickets. Try: "What is my application status?"' }
  }

  const send = (preset?: string) => {
    const msg = preset ?? input.trim()
    if (!msg) return
    if (!preset) setInput('')
    setMessages((list) => [...list, { who: 'me', text: msg }])
    setTimeout(() => {
      const r = reply(msg)
      setMessages((list) => [...list, { who: 'bot', text: r.text, action: r.action }])
    }, 350)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Placement assistant"
        className="fixed bottom-[18px] right-[18px] z-[70] grid h-[54px] w-[54px] place-items-center rounded-full border-2 border-gold bg-navy text-white shadow-[0_12px_30px_rgba(20,49,94,.45)]"
      >
        <Icon name="info" className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed bottom-[82px] right-[18px] z-[70] flex h-[440px] max-h-[70vh] w-[340px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_rgba(0,0,0,.3)]">
          <div className="flex items-center justify-between border-b-[3px] border-gold bg-navy px-[15px] py-3 text-white">
            <div>
              <b className="font-serif text-[14.5px]">Placement Assistant</b>
              <small className="block text-[10.5px] text-[#B9C4D8]">AI · answers about your placement journey</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="px-1.5 text-lg">&times;</button>
          </div>

          <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-paper p-3.5">
            {messages.map((m, i): ReactNode => (
              <div key={i}>
                <div className={`max-w-[85%] rounded-[11px] px-3 py-2.5 text-[12.5px] leading-[1.45] ${m.who === 'bot' ? 'self-start rounded-bl-[3px] border border-line bg-white' : 'ml-auto self-end rounded-br-[3px] bg-navy text-white'}`}>
                  {m.text}
                </div>
                {m.action && (
                  <div className="py-1">
                    <button onClick={() => { m.action!.onClick(); setOpen(false) }} className="rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-2">
                      {m.action.label}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-line bg-white p-2">
            {['What is my application status?', 'When is my next interview?', 'How is my CV?', 'I have an issue'].map((q) => (
              <button key={q} onClick={() => send(q)} className="rounded-full border border-line bg-paper px-2.5 py-1 text-[10.5px] font-semibold hover:border-navy">{q}</button>
            ))}
          </div>
          <div className="flex gap-2 border-t border-line bg-white p-2.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a question…"
              className="flex-1 rounded-lg border border-line px-2.5 py-2 text-[12.5px] focus:border-navy focus:outline-none"
            />
            <button onClick={() => send()} className="rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white">Send</button>
          </div>
        </div>
      )}
    </>
  )
}
