import { apiClient } from './client';
import type { DeptVerifyItem } from '../data/mock/deptVerify';

export const verificationApi = {
  listMine: () => apiClient.get('/verification/me'),
  submit: (data: any) => apiClient.post('/verification', data),
  list: () => apiClient.get('/verification'),
  review: (id: string, data: { status: 'VERIFIED' | 'REJECTED' }) => apiClient.patch(`/verification/${id}`, data),
};

export const mapBackendVerificationToFrontend = (data: any): DeptVerifyItem & { id: string } => {
  return {
    id: data.id,
    name: data.student?.user?.fullName || 'Unknown',
    en: data.student?.enrollmentNo || '',
    item: data.type === 'DOCUMENT' ? 'Document' : 'Profile',
    type: data.type === 'DOCUMENT' ? 'Document' : 'Profile',
    date: new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    status: data.status === 'PENDING' ? 'Pending' : (data.status === 'VERIFIED' ? 'Approved' : 'Rejected')
  };
};
