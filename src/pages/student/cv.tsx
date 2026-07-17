import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Donut } from '@/components/ui/Donut'
import { ColorPill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { ListRow } from '@/components/shared/ListRow'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { CvDocument } from '@/components/shared/CvDocument'
import { usePortalData } from '@/context/PortalDataContext'
import { cvScoreOf, grade, suggestionFor } from '@/data/mock/cvParams'

const ADVANCED_TOOLS: [IconName, string, string][] = [
  ['bolt', 'One-click improvement', 'Rewrite weak bullet points into strong, quantified statements'],
  ['target', 'CV-to-job match', 'Score your CV against a specific job description'],
  ['file', 'Cover-letter generator', 'Draft a tailored cover letter for any application'],
  ['globe', 'Multilingual export', 'Produce your CV in Gujarati or Hindi'],
]

export default function StudentCvPage() {
  const { me, cvParams, setCvParam } = usePortalData()
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()

  const score = cvScoreOf(cvParams)
  const [gradeLabel, gradeColor] = grade(score)
  const weak = cvParams.filter((p) => p.v < 75).sort((a, b) => a.v - b.v).slice(0, 5)

  const previewCV = () => openDoc(`Curriculum Vitae · ${me.name}`, 'Generated from student profile', <CvDocument profile={me} />, `${me.name}_CV`)

  return (
    <div>
      <PageHead
        title="AI CV Studio"
        description="Build, score, and refine your résumé — basic evaluation runs instantly"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={previewCV}><Icon name="file" /> Preview CV</Button>
            <Button variant="gold" onClick={previewCV}><Icon name="spark" /> Generate CV</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        <Card pad>
          <SectionTitle title="Evaluation" />
          <div className="mb-2 flex items-center gap-[22px]">
            <div className="flex flex-col items-center gap-2">
              <Donut pct={score} size={140} stroke={16} color={gradeColor} label="SCORE" />
              <ColorPill color={gradeColor.includes('green') ? 'green' : gradeColor.includes('gold') ? 'gold' : 'red'}>{gradeLabel}</ColorPill>
            </div>
            <div className="flex-1">
              <p className="mb-2.5 text-[13px] text-muted">Adjust the sliders to simulate how each section affects your overall score out of 100.</p>
              <ColorPill color="navy">Weighted score</ColorPill>{' '}
              <ColorPill color="gold">Live · re-scores instantly</ColorPill>
            </div>
          </div>
          <div>
            {cvParams.map((p, i) => (
              <div key={p.n} className="flex items-center gap-3 border-b border-line-2 py-2.5 last:border-b-0">
                <div className="flex-1 text-[13px]">{p.n}<small className="block text-[11px] text-muted">{p.d} · weight {p.w}%</small></div>
                <input
                  type="range" min={0} max={100} value={p.v}
                  onChange={(e) => setCvParam(i, +e.target.value)}
                  className="w-[120px] accent-navy"
                />
                <div className="tnum w-[34px] text-right text-[12.5px] font-bold text-navy">{p.v}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card pad>
          <SectionTitle title="What to improve" />
          {weak.length === 0 ? (
            <div className="flex gap-2.5 py-2.5 text-[12.5px] text-green">
              <Icon name="check" className="mt-0.5 h-4 w-4 flex-none" />
              <span>Strong across the board — your CV is submission-ready.</span>
            </div>
          ) : weak.map((p) => (
            <div key={p.n} className="flex gap-2.5 py-2.5 text-[12.5px] text-[#8a6015]">
              <Icon name="warn" className="mt-0.5 h-4 w-4 flex-none text-gold" />
              <span><b>{p.n}</b> — scoring {p.v}/100. {suggestionFor(p.n)}</span>
            </div>
          ))}

          <div className="mt-5">
            <SectionTitle title="Advanced tools" />
            {ADVANCED_TOOLS.map(([icon, title, desc]) => (
              <ListRow
                key={title}
                icon={<Icon name={icon} />}
                title={title}
                subtitle={desc}
                trailing={<Button variant="ghost" size="sm" onClick={() => showToast(`${title} — running…`)}>Run</Button>}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
