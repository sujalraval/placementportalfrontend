import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { useModal } from '@/context/ModalContext'
import { useToast } from '@/context/ToastContext'
import { adminApi } from '@/api/admin'
import { SimpleFormModal } from '@/components/shared/SimpleFormModal'
import { IconControlButton } from '@/components/shared/IconControls'
import AdminDeptsPage from './depts'
import AdminSectorsPage from './sectors'
import { useAdminData } from '@/context/AdminDataContext'
import { SkillFormModal } from '@/components/modals/SkillFormModal'

const GENERIC_MASTERS = [
  { id: 'colleges', label: 'College Master' },
  { id: 'industries', label: 'Industry Master' },
  { id: 'application-areas', label: 'Application Master' },
  { id: 'industry-domains', label: 'Industry Domain(s)*' },
  { id: 'industry-sub-domains', label: 'Industry Sub-Domain(s)*' },
  { id: 'partner-types', label: 'Partner Type Master' }
]

const CUSTOM_MASTERS = [
  { id: 'departments', label: 'Department Master' },
  { id: 'programs', label: 'Programme Master' },
  { id: 'skills', label: 'Skill Master' },
  { id: 'sectors', label: 'Sector Master' }
]

function GenericMasterTable({ masterId, title }: { masterId: string, title: string }) {
  const { openModal, closeModal } = useModal()
  const { showToast } = useToast()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    setLoading(true)
    adminApi.listMaster(masterId).then(res => {
      setData(res.data?.data || [])
    }).catch(console.error).finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [masterId])

  const handleSave = (item: any) => {
    openModal(`Edit ${title}`, 
      <SimpleFormModal
        submitLabel="Save"
        initial={item}
        fields={[{ id: 'name', label: 'Name', full: true }]}
        onSubmit={(v) => {
          if (!v.name) return showToast('Name is required')
          const req = item?.id ? adminApi.updateMaster(masterId, item.id, v) : adminApi.createMaster(masterId, v)
          req.then(() => {
            showToast('Saved successfully')
            loadData()
            closeModal()
          }).catch(console.error)
        }}
      />
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      adminApi.deleteMaster(masterId, id).then(() => {
        showToast('Deleted successfully')
        loadData()
      }).catch(console.error)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle 
        title={title} 
        action={
          <button onClick={() => handleSave(null)} className="text-[12.5px] font-semibold text-navy hover:underline">
            Add New
          </button>
        } 
      />
      <Card className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="border-b border-line bg-paper px-4 py-3 text-left font-bold uppercase text-muted text-[11px] tracking-wider">Name</th>
              <th className="border-b border-line bg-paper px-4 py-3 text-right font-bold uppercase text-muted text-[11px] tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} className="p-4 text-center text-muted">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={2} className="p-4 text-center text-muted">No records found.</td></tr>
            ) : (
              data.map(item => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="border-b border-line px-4 py-3 font-medium text-navy">{item.name}</td>
                  <td className="border-b border-line px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconControlButton onClick={() => handleSave(item)}>Edit</IconControlButton>
                      <IconControlButton danger onClick={() => handleDelete(item.id)}>Delete</IconControlButton>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

function SkillMasterTable() {
  const { skills, deleteSkill } = useAdminData()
  const { openModal } = useModal()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-navy">Skills</h2>
        <button onClick={() => openModal('Add skill', <SkillFormModal index={-1} />)} className="text-[12.5px] font-semibold text-navy hover:underline">
          Add New
        </button>
      </div>
      <Card className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="border-b border-line bg-paper px-4 py-3 text-left font-bold uppercase text-muted text-[11px] tracking-wider">Competency Name</th>
              <th className="border-b border-line bg-paper px-4 py-3 text-left font-bold uppercase text-muted text-[11px] tracking-wider">Category</th>
              <th className="border-b border-line bg-paper px-4 py-3 text-right font-bold uppercase text-muted text-[11px] tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill, index) => (
              <tr key={skill.id} className="group hover:bg-slate-50 transition-colors">
                <td className="border-b border-line px-4 py-3 font-medium text-navy">{skill.name}</td>
                <td className="border-b border-line px-4 py-3 text-muted">{skill.category || '-'}</td>
                <td className="border-b border-line px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconControlButton onClick={() => openModal('Edit skill', <SkillFormModal index={index} item={skill} />)}>Edit</IconControlButton>
                    <IconControlButton danger onClick={() => deleteSkill(index)}>Delete</IconControlButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default function AdminMastersPage() {
  const [activeTab, setActiveTab] = useState(GENERIC_MASTERS[0].id)

  const activeMaster = GENERIC_MASTERS.find(m => m.id === activeTab)
  
  const renderContent = () => {
    if (activeMaster) return <GenericMasterTable key={activeMaster.id} masterId={activeMaster.id} title={activeMaster.label} />
    if (activeTab === 'departments' || activeTab === 'programs') return <AdminDeptsPage />
    if (activeTab === 'sectors') return <AdminSectorsPage />
    if (activeTab === 'skills') return <SkillMasterTable />
    return null
  }

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto min-h-screen">
      <PageHead title="Master Data" description="Manage all system lookup values and classifications." />
      
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        <div className="w-full md:w-64 shrink-0">
          <Card className="p-2 sticky top-6">
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 px-3 pt-2">Generic Masters</div>
            <div className="flex flex-col gap-1">
              {GENERIC_MASTERS.map(m => (
                <button 
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`text-left px-3 py-2 text-[13px] rounded-md transition-colors ${activeTab === m.id ? 'bg-navy text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            
            <div className="text-xs font-bold text-muted uppercase tracking-wider mb-2 mt-4 px-3 pt-2">Custom Masters</div>
            <div className="flex flex-col gap-1">
              {CUSTOM_MASTERS.map(m => (
                <button 
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`text-left px-3 py-2 text-[13px] rounded-md transition-colors ${activeTab === m.id ? 'bg-navy text-white font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="flex-1 min-w-0">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
