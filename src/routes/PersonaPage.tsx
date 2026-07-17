import { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { getPageComponent } from '@/pages/registry'
import { PagePlaceholder } from '@/components/shared/PagePlaceholder'

export function PersonaPage() {
  const { persona, page } = useParams<{ persona: string; page: string }>()
  const Component = persona && page ? getPageComponent(persona, page) : null

  if (!Component) {
    return <PagePlaceholder title="Not found" />
  }

  return (
    <Suspense fallback={<div className="text-[13.5px] text-muted">Loading…</div>}>
      <Component />
    </Suspense>
  )
}
