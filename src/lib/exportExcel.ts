function slugify(s: string | undefined): string {
  return String(s || 'document').trim().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'document'
}

// Ported from the original prototype's `exportReportExcel` — real client-side
// .xlsx generation via SheetJS, tied to live in-memory data.
export async function exportRowsToExcel(title: string, rows: Record<string, unknown>[]): Promise<{ ok: boolean; filename: string; rowCount: number }> {
  const XLSX = await import('xlsx')
  const data = rows.length ? rows : [{ Note: 'No structured dataset available for this report in the prototype.' }]
  const ws = XLSX.utils.json_to_sheet(data)
  const cols = Object.keys(data[0] || { Note: '' })
  ws['!cols'] = cols.map((c) => ({ wch: Math.max(12, c.length + 2) }))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, title.slice(0, 28).replace(/[\\/?*[\]:]/g, '-'))
  const filename = slugify(title) + '.xlsx'
  XLSX.writeFile(wb, filename)
  return { ok: true, filename, rowCount: data.length }
}
