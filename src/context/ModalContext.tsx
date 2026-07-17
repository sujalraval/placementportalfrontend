import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface ModalContextValue {
  openModal: (title: ReactNode, body: ReactNode) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState<ReactNode>(null)
  const [body, setBody] = useState<ReactNode>(null)

  const openModal = useCallback((newTitle: ReactNode, newBody: ReactNode) => {
    setTitle(newTitle)
    setBody(newBody)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(20,25,40,.55)] p-5"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="max-h-[88vh] w-full max-w-[520px] overflow-auto rounded-xl border-t-4 border-gold bg-white shadow-[0_30px_80px_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between border-b border-line px-[22px] py-[18px]">
              <h3 className="text-lg">{title}</h3>
              <button
                onClick={closeModal}
                className="rounded-md px-2 py-1 text-[22px] leading-none text-muted hover:bg-paper"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="p-[22px]">{body}</div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within a ModalProvider')
  return ctx
}
