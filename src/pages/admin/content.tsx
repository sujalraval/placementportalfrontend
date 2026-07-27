import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { ColorPill } from '@/components/ui/Pill'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { SectionTitle } from '@/components/shared/SectionCard'
import { Tabs } from '@/components/shared/Tabs'
import { IconControlButton } from '@/components/shared/IconControls'
import { useModal } from '@/context/ModalContext'
import { useAdminData } from '@/context/AdminDataContext'
import { useToast } from '@/context/ToastContext'
import { NewsFormModal } from '@/components/modals/NewsFormModal'
import { EventFormModal } from '@/components/modals/EventFormModal'
import { BroadcastFormModal } from '@/components/modals/BroadcastFormModal'
import { contentApi, mapBackendNewsToFrontend, mapBackendEventToFrontend } from '@/api/content'

const TABS = ['News', 'Events', 'Notifications']

export default function AdminContentPage() {
  const [tab, setTab] = useState(0)
  const { adminNotifs, deleteBroadcast } = useAdminData() // Keep broadcasts mocked for now
  const { openModal } = useModal()
  const { showToast } = useToast()

  const [news, setNews] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])

  const fetchContent = async () => {
    try {
      const newsRes = await contentApi.listNews()
      setNews((newsRes.data?.data || newsRes.data).map(mapBackendNewsToFrontend))
      const eventsRes = await contentApi.listEvents()
      setEvents((eventsRes.data?.data || eventsRes.data).map(mapBackendEventToFrontend))
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Failed to fetch content')
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleDeleteNews = async (id: string) => {
    // We don't have delete endpoint yet, so we could just mark it ARCHIVED
    try {
      await contentApi.updateNewsStatus(id, 'ARCHIVED')
      showToast('News archived successfully')
      fetchContent()
    } catch (err: any) { showToast(err.response?.data?.error?.message || 'Error archiving') }
  }

  const handleDeleteEvent = async (id: string) => {
    try {
      await contentApi.updateEventStatus(id, 'ARCHIVED')
      showToast('Event archived successfully')
      fetchContent()
    } catch (err: any) { showToast(err.response?.data?.error?.message || 'Error archiving') }
  }

  return (
    <div>
      <PageHead title="Website content" description="Manage what appears on the public placement website" />
      <Tabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === 0 && (
        <div>
          <SectionTitle
            title="News & updates"
            extra={<ColorPill color="green">Live on website</ColorPill>}
            action={<button onClick={() => openModal('Add news', <NewsFormModal onSuccess={fetchContent} />)} className="text-[12.5px] font-semibold text-navy hover:underline">Add news</button>}
          />
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-[13px]">
              <thead><tr>{['Category', 'Date', 'Headline', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
              <tbody>
                {news.map((n) => (
                  <tr key={n.id}>
                    <td className="border-b border-line-2 px-3.5 py-3"><ColorPill color="gold">{n.cat}</ColorPill></td>
                    <td className="tnum border-b border-line-2 px-3.5 py-3 text-muted">{n.date}</td>
                    <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{n.title}</b><small className="block text-muted">{n.body.slice(0, 64)}?</small></td>
                    <td className="border-b border-line-2 px-3.5 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <IconControlButton onClick={() => openModal('Edit news', <NewsFormModal item={n} onSuccess={fetchContent} />)}>Edit</IconControlButton>
                        <IconControlButton danger onClick={() => handleDeleteNews(n.id)}>Delete</IconControlButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 1 && (
        <div>
          <SectionTitle title="Events" action={<button onClick={() => openModal('Add event', <EventFormModal onSuccess={fetchContent} />)} className="text-[12.5px] font-semibold text-navy hover:underline">Add event</button>} />
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-[13px]">
              <thead><tr>{['Event', 'Date', 'Mode', 'Departments', 'Status', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id}>
                    <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{e.title}</b></td>
                    <td className="tnum border-b border-line-2 px-3.5 py-3">{e.date}</td>
                    <td className="border-b border-line-2 px-3.5 py-3"><Pill status={e.mode} /></td>
                    <td className="border-b border-line-2 px-3.5 py-3">{e.dept}</td>
                    <td className="border-b border-line-2 px-3.5 py-3"><Pill status={e.status} /></td>
                    <td className="border-b border-line-2 px-3.5 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <IconControlButton onClick={() => openModal('Edit event', <EventFormModal item={e} onSuccess={fetchContent} />)}>Edit</IconControlButton>
                        <IconControlButton danger onClick={() => handleDeleteEvent(e.id)}>Delete</IconControlButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 2 && (
        <div>
          <SectionTitle title="Notifications & broadcasts" action={<button onClick={() => openModal('New broadcast', <BroadcastFormModal index={-1} />)} className="text-[12.5px] font-bold text-gold hover:underline">New broadcast</button>} />
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-[13px]">
              <thead><tr>{['Message', 'Audience', 'Channels', 'Date', ''].map((h) => <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>)}</tr></thead>
              <tbody>
                {adminNotifs.map((n, i) => (
                  <tr key={n.title}>
                    <td className="border-b border-line-2 px-3.5 py-3"><b className="text-[13.5px]">{n.title}</b></td>
                    <td className="border-b border-line-2 px-3.5 py-3">{n.audience}</td>
                    <td className="border-b border-line-2 px-3.5 py-3 text-muted">{n.channel}</td>
                    <td className="tnum border-b border-line-2 px-3.5 py-3">{n.date}</td>
                    <td className="border-b border-line-2 px-3.5 py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <IconControlButton onClick={() => openModal('Edit broadcast', <BroadcastFormModal index={i} item={n} />)}>Edit</IconControlButton>
                        <IconControlButton danger onClick={() => deleteBroadcast(i)}>Delete</IconControlButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  )
}
