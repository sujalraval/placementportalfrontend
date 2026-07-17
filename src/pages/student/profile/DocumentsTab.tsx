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

export function DocumentsTab() {
  const { me, addDocument, deleteDocument } = usePortalData()
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()

  const openUploadForm = () => {
    openModal('Upload document', (
      <SimpleFormModal
        submitLabel="Upload"
        initial={{ type: 'Academic' }}
        fields={[
          { id: 'name', label: 'Document name', full: true },
          { id: 'type', label: 'Type', type: 'select', options: ['Academic', 'Certification', 'Identity', 'Other'] },
        ]}
        onSubmit={(v) => {
          if (!v.name) { showToast('Name is required'); return }
          addDocument({ name: v.name, type: v.type, status: 'Uploaded' })
          closeModal(); showToast('Document uploaded — pending verification')
        }}
      />
    ))
  }

  return (
    <div>
      <SectionTitle title="Documents" action={<Button variant="gold" size="sm" onClick={openUploadForm}>Upload</Button>} />
      <Card pad>
        {me.docs.map((d, i) => (
          <div key={d.name} className="flex items-center gap-3 border-b border-line-2 py-3 last:border-b-0">
            <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-navy-soft text-navy"><Icon name="file" className="h-4 w-4" /></div>
            <div className="flex-1"><b className="text-[13px]">{d.name}</b><small className="block text-[11.5px] text-muted">{d.type}</small></div>
            <Pill status={d.status} />
            <div className="ml-2.5 flex flex-none gap-1.5">
              <IconControlButton onClick={() => showToast(`Opening ${d.name}…`)}>View</IconControlButton>
              <IconControlButton danger onClick={() => { deleteDocument(i); showToast('Document removed') }}>Delete</IconControlButton>
            </div>
          </div>
        ))}
      </Card>
      <p className="mt-3 text-[12.5px] text-muted">Verified documents are checked by your department coordinator. Only verified profiles are shared with recruiters.</p>
    </div>
  )
}
