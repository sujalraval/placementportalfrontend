import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { SectionTitle } from '@/components/shared/SectionCard'
import { IconControlButton } from '@/components/shared/IconControls'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { usePortalData } from '@/context/PortalDataContext'

export function ProjectsTab() {
  const { me, addProject, editProject, deleteProject, addCert, editCert, deleteCert } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openProjForm = (i: number | null) => {
    const p = i !== null ? me.projects[i] : undefined
    openModal(i !== null ? 'Edit project' : 'Add project', (
      <SimpleFormModal
        submitLabel={i !== null ? 'Save' : 'Add'}
        initial={p ? { name: p.name, stack: p.stack, desc: p.desc, repo: p.repo, demo: p.demo } : {}}
        fields={[
          { id: 'name', label: 'Project name', full: true }, { id: 'stack', label: 'Stack', full: true },
          { id: 'desc', label: 'Description', type: 'textarea', rows: 3, full: true },
          { id: 'repo', label: 'Repo URL' }, { id: 'demo', label: 'Demo URL' },
        ]}
        onSubmit={(v) => {
          if (!v.name) { showToast('Project name is required'); return }
          const proj = { name: v.name, stack: v.stack, desc: v.desc, repo: v.repo, demo: v.demo }
          if (i !== null) editProject(i, proj); else addProject(proj)
          closeModal(); showToast(i !== null ? 'Project updated' : 'Project added')
        }}
      />
    ))
  }

  const openCertForm = (i: number | null) => {
    const c = i !== null ? me.certs[i] : undefined
    openModal(i !== null ? 'Edit certification' : 'Add certification', (
      <SimpleFormModal
        submitLabel={i !== null ? 'Save' : 'Add'}
        initial={c ? { name: c.name, by: c.by, year: c.year } : {}}
        fields={[
          { id: 'name', label: 'Certification', full: true }, { id: 'by', label: 'Issued by' }, { id: 'year', label: 'Year' },
        ]}
        onSubmit={(v) => {
          if (!v.name) { showToast('Name is required'); return }
          const cert = { name: v.name, by: v.by, year: v.year }
          if (i !== null) editCert(i, cert); else addCert(cert)
          closeModal(); showToast(i !== null ? 'Certification updated' : 'Certification added')
        }}
      />
    ))
  }

  return (
    <div>
      <SectionTitle title="Projects" action={<Button variant="ghost" size="sm" onClick={() => openProjForm(null)}>Add project</Button>} />
      <div className="mb-5 grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {me.projects.map((p, i) => (
          <div key={p.name} className="rounded-[10px] border border-line bg-white p-4">
            <div className="flex justify-between gap-2.5">
              <h4 className="text-[15px] text-navy">{p.name}</h4>
              <div className="flex flex-none gap-1.5">
                <IconControlButton onClick={() => openProjForm(i)}>Edit</IconControlButton>
                <IconControlButton danger onClick={() => { deleteProject(i); showToast('Project removed') }}>Delete</IconControlButton>
              </div>
            </div>
            <div className="my-1.5 text-[11.5px] font-bold text-gold">{p.stack}</div>
            <p className="text-[13px] text-[#46443d]">{p.desc}</p>
            <div className="mt-2.5 flex gap-4 border-t border-line-2 pt-2.5">
              {p.repo && <button onClick={() => showToast(`Opening ${p.repo}…`)} className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold"><Icon name="build" className="h-[13px] w-[13px]" /> View code</button>}
              {p.demo && <button onClick={() => showToast(`Opening ${p.demo}…`)} className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold"><Icon name="link" className="h-[13px] w-[13px]" /> Live demo</button>}
              {!p.repo && !p.demo && <span className="text-[11.5px] text-muted">No links added</span>}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="Certifications" action={<Button variant="ghost" size="sm" onClick={() => openCertForm(null)}>Add</Button>} />
      <Card pad>
        {me.certs.map((c, i) => (
          <div key={c.name} className="flex items-center gap-3 border-b border-line-2 py-3 last:border-b-0">
            <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-navy-soft text-navy"><Icon name="check" className="h-4 w-4" /></div>
            <div className="flex-1"><b className="text-[13px]">{c.name}</b><small className="block text-[11.5px] text-muted">{c.by} · {c.year}</small></div>
            <Pill status="Verified" />
            <div className="ml-2.5 flex flex-none gap-1.5">
              <IconControlButton onClick={() => openCertForm(i)}>Edit</IconControlButton>
              <IconControlButton danger onClick={() => { deleteCert(i); showToast('Certification removed') }}>✕</IconControlButton>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}
