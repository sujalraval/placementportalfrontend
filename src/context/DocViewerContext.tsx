import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { useToast } from '@/context/ToastContext'

function slugify(s: string | undefined): string {
  return String(s || 'document').trim().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'document'
}

interface DocViewerContextValue {
  openDoc: (title: string, note: string, content: ReactNode, filename: string) => void
  closeDoc: () => void
}

const DocViewerContext = createContext<DocViewerContextValue | null>(null)

export function DocViewerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [content, setContent] = useState<ReactNode>(null)
  const [filename, setFilename] = useState('document')
  const [generating, setGenerating] = useState(false)
  const paperRef = useRef<HTMLDivElement>(null)
  const { showToast } = useToast()

  const openDoc = useCallback((t: string, n: string, c: ReactNode, f: string) => {
    setTitle(t); setNote(n); setContent(c); setFilename(slugify(f)); setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeDoc = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [])

  const downloadPDF = async () => {
    const el = paperRef.current
    if (!el) return
    setGenerating(true)
    showToast('Generating PDF — ' + filename + '.pdf')
    try {
      const html2pdf = (await import('html2pdf.js')).default
      // `pagebreak` is supported at runtime but missing from html2pdf.js's shipped types.
      const options = {
        margin: [8, 8, 8, 8],
        filename: filename + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await html2pdf().set(options as any).from(el).save()
      showToast(filename + '.pdf downloaded')
    } catch {
      showToast('Could not generate PDF — falling back to Print dialog')
      window.print()
    } finally {
      setGenerating(false)
    }
  }

  return (
    <DocViewerContext.Provider value={{ openDoc, closeDoc }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[95] flex flex-col bg-[rgba(16,22,38,.62)] print:static print:block print:bg-white">
          <div className="flex flex-none flex-wrap items-center justify-between gap-3 bg-navy px-5 py-3 text-white print:hidden">
            <div>
              <span className="font-serif text-[15px]">{title}</span>
              {note && <span className="ml-2.5 text-[11px] text-[#B9C4D8] max-lg:hidden">{note}</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={closeDoc} className="rounded-md border border-white/35 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10">Close</button>
              <button onClick={() => window.print()} className="rounded-md border border-white/35 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10">Print</button>
              <button onClick={downloadPDF} disabled={generating} className="rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
                {generating ? 'Generating…' : 'Download PDF'}
              </button>
            </div>
          </div>
          <div className="flex flex-1 justify-center overflow-auto p-4 print:block print:overflow-visible print:p-0">
            <div ref={paperRef} className="h-fit min-h-[1040px] w-full max-w-[820px] bg-white p-[46px_52px] shadow-[0_24px_70px_rgba(0,0,0,.45)] print:min-h-0 print:max-w-full print:p-0 print:shadow-none">
              {content}
            </div>
          </div>
        </div>
      )}
    </DocViewerContext.Provider>
  )
}

export function useDocViewer() {
  const ctx = useContext(DocViewerContext)
  if (!ctx) throw new Error('useDocViewer must be used within a DocViewerProvider')
  return ctx
}
