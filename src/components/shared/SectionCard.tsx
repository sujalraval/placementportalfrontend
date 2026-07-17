import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

interface SectionCardProps {
  title: string
  action?: ReactNode
  extra?: ReactNode
  children: ReactNode
  className?: string
}

export function SectionTitle({ title, action, extra }: { title: string; action?: ReactNode; extra?: ReactNode }) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <h3 className="text-base">{title}</h3>
      <div className="h-px flex-1 bg-line" />
      {extra}
      {action}
    </div>
  )
}

export function SectionCard({ title, action, extra, children, className = '' }: SectionCardProps) {
  return (
    <Card pad className={className}>
      <SectionTitle title={title} action={action} extra={extra} />
      {children}
    </Card>
  )
}
