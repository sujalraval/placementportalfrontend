import { useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Donut } from '@/components/ui/Donut'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { Chip } from '@/components/ui/Chip'
import { PageHead } from '@/components/shared/PageHead'
import { Tabs } from '@/components/shared/Tabs'
import { useToast } from '@/context/ToastContext'
import { useDocViewer } from '@/context/DocViewerContext'
import { CvDocument } from '@/components/shared/CvDocument'
import { usePortalData } from '@/context/PortalDataContext'
import { initials } from '@/lib/text'
import { OverviewTab } from '@/pages/student/profile/OverviewTab'
import { PersonalTab } from '@/pages/student/profile/PersonalTab'
import { AcademicsTab } from '@/pages/student/profile/AcademicsTab'
import { ExperienceTab } from '@/pages/student/profile/ExperienceTab'
import { SkillsTab } from '@/pages/student/profile/SkillsTab'
import { ProjectsTab } from '@/pages/student/profile/ProjectsTab'
import { DocumentsTab } from '@/pages/student/profile/DocumentsTab'

const TABS = ['Overview', 'Personal', 'Academics', 'Experience', 'Skills', 'Projects', 'Documents']

export default function StudentProfilePage() {
  const [tab, setTab] = useState(0)
  const { me } = usePortalData()
  const { showToast } = useToast()
  const { openDoc } = useDocViewer()

  return (
    <div>
      <PageHead
        title="My profile"
        description="Your recruiter-facing bio · add, edit, and update your details anytime"
        actions={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => openDoc(`Curriculum Vitae · ${me.name}`, 'Generated from student profile', <CvDocument profile={me} />, `${me.name}_CV`)}>
              <Icon name="file" /> Preview CV
            </Button>
            <Button onClick={() => showToast('All changes are saved')}>Save changes</Button>
          </div>
        }
      />

      <div className="flex items-center gap-5 rounded-xl border border-line bg-white p-5 max-lg:flex-col max-lg:items-start">
        <div className="grid h-[74px] w-[74px] flex-none place-items-center rounded-2xl bg-navy font-serif text-[27px] font-semibold text-white">{initials(me.name)}</div>
        <div className="min-w-0 flex-1">
          <h1 className="text-[23px]">{me.name}</h1>
          <div className="mt-0.5 text-[13.5px] font-semibold text-gold">{me.headline}</div>
          <div className="mt-[3px] text-[13px] text-muted">{me.dept} · {me.batch} · {me.en}</div>
          <div className="mt-[11px] flex flex-wrap gap-1.5">
            <Pill status={me.status} />
            {me.verified && <ColorPill color="green">Verified</ColorPill>}
            <Chip>CGPA {me.cgpa}</Chip>
            <Chip>{me.internships.length} internships</Chip>
            <Chip>{me.projects.length} projects</Chip>
          </div>
        </div>
        <div className="flex flex-none flex-col items-center gap-1">
          <Donut pct={me.completeness} size={104} stroke={12} label="COMPLETE" />
          <small className="text-[10px] font-bold uppercase tracking-[.08em] text-muted">Profile complete</small>
        </div>
      </div>

      <div className="mt-[18px]">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        {tab === 0 && <OverviewTab />}
        {tab === 1 && <PersonalTab />}
        {tab === 2 && <AcademicsTab />}
        {tab === 3 && <ExperienceTab />}
        {tab === 4 && <SkillsTab />}
        {tab === 5 && <ProjectsTab />}
        {tab === 6 && <DocumentsTab />}
      </div>
    </div>
  )
}
