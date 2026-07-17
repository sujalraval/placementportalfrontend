import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

// Every persona page lives at src/pages/<persona>/<pageKey>.tsx. This glob
// auto-registers them by path, so adding a new page file is enough to wire
// it into routing — no manual registry edits needed as later phases land.
const modules = import.meta.glob<{ default: ComponentType }>('./{student,recruiter,dept,faculty,admin}/*.tsx')

const lazyCache = new Map<string, LazyExoticComponent<ComponentType>>()

export function getPageComponent(persona: string, page: string): LazyExoticComponent<ComponentType> | null {
  const path = `./${persona}/${page}.tsx`
  const loader = modules[path]
  if (!loader) return null

  let cached = lazyCache.get(path)
  if (!cached) {
    cached = lazy(loader as () => Promise<{ default: ComponentType }>)
    lazyCache.set(path, cached)
  }
  return cached
}
