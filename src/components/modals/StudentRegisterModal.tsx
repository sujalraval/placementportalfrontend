import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Field'
import { useModal } from '@/context/ModalContext'
import { authApi } from '@/api/auth'
import { adminApi } from '@/api/admin'
import { Loader2 } from 'lucide-react'

export function StudentRegisterModal() {
  const { closeModal } = useModal()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    enrollmentNo: '',
    departmentId: '', 
    cgpa: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const [departments, setDepartments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    adminApi.listDepartments()
      .then(res => {
        const depts = res.data?.data || res.data || [];
        setDepartments(Array.isArray(depts) ? depts : []);
      })
      .catch(err => console.error('Failed to fetch departments:', err));
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const createAccount = async () => {
    setError('')
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.enrollmentNo || !formData.departmentId) {
      setError('Please fill in all required fields.')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)
    try {
      // 1. Request OTP
      await authApi.requestOtp(formData.email)
      
      // 2. Prepare payload for next step
      const registrationPayload = {
        fullName: formData.fullName,
        enrollmentNo: formData.enrollmentNo,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        cgpa: parseFloat(formData.cgpa) || 0,
        departmentId: formData.departmentId,
        role: 'STUDENT'
      }
      
      closeModal()
      
      // 3. Navigate to OTP screen
      navigate('/verify-otp', { 
        state: { 
          email: formData.email, 
          isLogin: false, 
          role: 'student',
          registrationPayload
        } 
      })
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to send verification code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <p className="mb-4 text-[13px] text-muted">
        Create your Gujarat University placement account. It takes about two minutes.
      </p>
      
      {error && (
        <div className="mb-4 rounded bg-red-soft p-3 text-sm text-red border border-red/20">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="Full name">
          <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your name" />
        </Field>
        <Field label="Enrolment number">
          <Input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} placeholder="GU__CS___" />
        </Field>
        <Field label="Department">
          <Select name="departmentId" value={formData.departmentId} onChange={handleChange}>
            <option value="">Select Department...</option>
            {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </Select>
        </Field>
        <Field label="Current CGPA">
          <Input name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="8.0" />
        </Field>
        <Field label="University email">
          <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@gu.ac.in" />
        </Field>
        <Field label="Mobile">
          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" />
        </Field>
        <Field label="Password">
          <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
        </Field>
        <Field label="Confirm password">
          <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
        </Field>
      </div>
      <div className="mt-1 flex flex-wrap gap-2.5">
        <Button variant="gold" onClick={createAccount} disabled={isLoading}>
          {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin inline" /> Sending code...</> : 'Create account'}
        </Button>
        <Button variant="ghost" onClick={closeModal} disabled={isLoading}>Cancel</Button>
      </div>
    </div>
  )
}


