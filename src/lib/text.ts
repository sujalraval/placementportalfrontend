export function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

// Ported from the original prototype's `mono(n)` — a 1-2 letter monogram
// for company/partner logo tiles (distinct from person `initials`).
export function monogram(name: string): string {
  const words = name.replace(/[^A-Za-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
  return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase()
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
