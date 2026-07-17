import { Card } from '@/components/ui/Card'
import { PageHead } from '@/components/shared/PageHead'

interface PagePlaceholderProps {
  title: string
}

export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <div>
      <PageHead title={title} description="This page is scheduled for a later build phase." />
      <Card pad className="text-[13.5px] text-muted">
        Coming soon.
      </Card>
    </div>
  )
}
