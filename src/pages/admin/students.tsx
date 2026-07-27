import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { PageHead } from '@/components/shared/PageHead'
import { useToast } from '@/context/ToastContext'
import { studentApi } from '@/api/student'

export default function AdminStudentsPage() {
  const { showToast } = useToast()
  
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await studentApi.listStudents()
      // The exact structure is what listStudents returns. Assumed { data: { data: [], total } } or similar
      const studentData = res.data?.data || res.data || []
      setStudents(studentData)
      setTotal(res.data?.total || studentData.length)
    } catch (err: any) {
      showToast(err.response?.data?.error?.message || 'Failed to fetch students')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const downloadTemplate = () => {
    const headers = ['Enrollment No', 'Full Name', 'Email', 'Department Code', 'Program Code', 'Batch Start Year', 'Batch End Year', 'CGPA', 'Active Backlogs', 'Gender', 'Category', 'Date of Birth', 'Phone']
    const row = ['210001001', 'John Doe', 'john.doe@example.com', 'CS', 'BTECH-CS', '2021', '2025', '8.5', '0', 'Male', 'General', '2003-05-15', '9876543210']
    
    const csvContent = [headers.join(','), row.join(',')].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'erp_student_import_template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const text = event.target?.result as string
      const lines = text.split('\n').map(l => l.trim()).filter(l => l)
      
      if (lines.length < 2) {
        showToast('File is empty or missing data rows')
        return
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      
      const expectedMap = {
        'enrollment no': 'enrollmentNo',
        'full name': 'fullName',
        'email': 'email',
        'department code': 'departmentCode',
        'program code': 'programCode',
        'batch start year': 'batchStartYear',
        'batch end year': 'batchEndYear',
        'cgpa': 'cgpa',
        'active backlogs': 'activeBacklogs',
        'gender': 'gender',
        'category': 'category',
        'date of birth': 'dateOfBirth',
        'phone': 'phone'
      }

      const colMap: Record<number, string> = {}
      headers.forEach((h, i) => {
        if (expectedMap[h as keyof typeof expectedMap]) {
          colMap[i] = expectedMap[h as keyof typeof expectedMap]
        }
      })

      if (Object.keys(colMap).length < 6) {
        showToast('Missing required columns in CSV')
        return
      }

      const payload: any[] = []
      for (let i = 1; i < lines.length; i++) {
        // A very rudimentary CSV parse (doesn't handle quotes well, but fine for simple template)
        const row = lines[i].split(',').map(c => c.trim())
        if (row.length < 4) continue // skip malformed

        const obj: any = {}
        for (let j = 0; j < row.length; j++) {
          if (colMap[j]) obj[colMap[j]] = row[j] || undefined
        }
        
        // Coerce types
        if (obj.batchStartYear) obj.batchStartYear = parseInt(obj.batchStartYear, 10)
        if (obj.batchEndYear) obj.batchEndYear = parseInt(obj.batchEndYear, 10)
        if (obj.cgpa) obj.cgpa = parseFloat(obj.cgpa)
        if (obj.activeBacklogs) obj.activeBacklogs = parseInt(obj.activeBacklogs, 10)
        
        if (obj.enrollmentNo && obj.fullName && obj.email) {
          payload.push(obj)
        }
      }

      if (payload.length === 0) {
        showToast('No valid rows found to import')
        return
      }

      try {
        const res = await studentApi.importStudents(payload)
        const { importedCount, skippedCount, errors } = res.data
        if (errors?.length > 0) {
          console.error('Import errors:', errors)
          showToast(`Imported ${importedCount}, Skipped ${skippedCount}. Check console for errors.`)
        } else {
          showToast(`Successfully imported ${importedCount} students!`)
        }
        fetchStudents()
      } catch (err: any) {
        showToast(err.response?.data?.error?.message || 'Import failed')
      }
    }
    
    reader.readAsText(file)
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <PageHead
        title="Students"
        description={`${total.toLocaleString('en-IN')} registered`}
        actions={
          <div className="flex gap-2">
            <input 
              type="file" 
              accept=".csv" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImportFile}
            />
            <Button variant="ghost" onClick={downloadTemplate}>Download Template</Button>
            <Button onClick={() => fileInputRef.current?.click()}>Import from ERP (CSV)</Button>
          </div>
        }
      />
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-[13px]">
          <thead>
            <tr>
              {['Enrolment', 'Name', 'Department', 'CGPA', 'Status', 'Readiness'].map((h) => (
                <th key={h} className="border-b border-line bg-paper px-3.5 py-2.5 text-left text-[10.5px] font-bold uppercase tracking-[.1em] text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-muted">No students found.</td>
              </tr>
            )}
            {students.map((s) => (
              <tr key={s.id}>
                <td className="tnum border-b border-line-2 px-3.5 py-3 text-muted">{s.enrollmentNo}</td>
                <td className="border-b border-line-2 px-3.5 py-3">
                  <b className="text-[13.5px]">{s.user?.fullName}</b>
                  <div className="text-xs text-muted">{s.user?.email}</div>
                </td>
                <td className="border-b border-line-2 px-3.5 py-3">{s.department?.name || s.department?.code}</td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">{s.cgpa}</td>
                <td className="border-b border-line-2 px-3.5 py-3">
                  <Pill status={
                    s.placementStatus === 'UNPLACED' ? 'Upcoming' : 
                    s.placementStatus === 'PLACED' ? 'Completed' : 'Draft'
                  } />
                </td>
                <td className="tnum border-b border-line-2 px-3.5 py-3">
                  {s.readinessScore ? `${s.readinessScore}%` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="mt-3 text-xs text-muted">Showing {students.length} of {total.toLocaleString('en-IN')} records.</p>
    </div>
  )
}
