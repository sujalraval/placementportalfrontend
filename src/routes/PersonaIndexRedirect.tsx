import { Navigate, useParams } from 'react-router-dom'
import { NAV, isPersonaKey } from '@/data/nav'

export function PersonaIndexRedirect() {
  const { persona } = useParams<{ persona: string }>()
  if (!isPersonaKey(persona)) return <Navigate to="/" replace />
  return <Navigate to={`/${persona}/${NAV[persona].items[0].key}`} replace />
}
