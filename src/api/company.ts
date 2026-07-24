import { apiClient } from './client';
import type { Company } from '../data/mock/companies';

export const companyApi = {
  list: () => apiClient.get('/companies'),
  getById: (id: string) => apiClient.get(`/companies/${id}`),
  create: (data: any) => apiClient.post('/companies', data),
  update: (id: string, data: any) => apiClient.patch(`/companies/${id}`, data),
  verify: (id: string, data: { status: 'VERIFIED' | 'REJECTED' }) => apiClient.patch(`/companies/${id}/verification`, data),
  
  addContact: (id: string, data: any) => apiClient.post(`/companies/${id}/contacts`, data),
  getMou: (id: string) => apiClient.get(`/companies/${id}/mou`),
};

export const mapBackendCompanyToFrontend = (data: any): Company & { id: string } => {
  return {
    id: data.id,
    name: data.name,
    sector: data.sector?.name || 'Unknown',
    hires: 0,
    pkg: '—',
    type: data.type === 'DIRECT' ? 'Employer' : 'Agency',
    status: data.verificationStatus === 'VERIFIED' ? 'Active' : 'Verifying',
    source: 'Onboarded by System',
    deptScope: data.visibilityScope === 'UNIVERSITY' ? 'University-wide' : 'Department-only',
  };
};
