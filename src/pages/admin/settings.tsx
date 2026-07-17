import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill, ColorPill } from '@/components/ui/Pill'
import { Field, Input, Select } from '@/components/ui/Field'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { useToast } from '@/context/ToastContext'

const INTEGRATIONS = [
  { name: 'Student Information System', status: 'Connected' },
  { name: 'Examination / Academics', status: 'Connected' },
  { name: 'Identity / Single Sign-On', status: 'Connected' },
  { name: 'Email & SMS gateway', status: 'Connected' },
  { name: 'Finance / Fees', status: 'Not connected' },
]

export default function AdminSettingsPage() {
  const { showToast } = useToast()

  return (
    <div>
      <PageHead title="Settings" description="System configuration & integrations" />
      <div className="flex gap-4 max-lg:flex-col">
        <Card pad className="flex-1">
          <SectionTitle title="Placement policy" />
          <Field label="Offer policy">
            <Select defaultValue="One offer per student (dream-offer cap)">
              <option>One offer per student (dream-offer cap)</option>
              <option>Multiple offers allowed</option>
            </Select>
          </Field>
          <Field label="Default minimum CGPA"><Input defaultValue="6.0" /></Field>
          <Field label="Academic year"><Input defaultValue="2025–26" /></Field>
          <Button onClick={() => showToast('Settings saved')}>Save</Button>
        </Card>
        <Card pad className="flex-1">
          <SectionTitle title="ERP integrations" />
          {INTEGRATIONS.map((x) => (
            <div key={x.name} className="flex items-center gap-3 border-b border-line-2 py-2.5 last:border-b-0">
              <div className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${x.status === 'Connected' ? 'bg-green-soft text-green' : 'bg-[#ECEAE3] text-[#888]'}`}>
                <Icon name={x.status === 'Connected' ? 'check' : 'cog'} className="h-4 w-4" />
              </div>
              <div className="flex-1"><b className="text-[13px]">{x.name}</b></div>
              {x.status === 'Connected' ? <Pill status="Active" /> : <ColorPill color="gold">Connect</ColorPill>}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
