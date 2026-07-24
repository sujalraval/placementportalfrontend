import { apiClient } from './client';

export const internshipApi = {
  listPostings: () => apiClient.get('/internships/postings'),
  getPostingById: (id: string) => apiClient.get(`/internships/postings/${id}`),
  createPosting: (data: any) => apiClient.post('/internships/postings', data),
  
  getMyInternships: () => apiClient.get('/internships/me'),
  listInternships: () => apiClient.get('/internships'),
  apply: (data: { postingId: string }) => apiClient.post('/internships/apply', data),
  
  requestApproval: (id: string, data: any) => apiClient.post(`/internships/${id}/approval`, data),
  decideApproval: (id: string, data: { status: 'APPROVED' | 'REJECTED' }) => apiClient.patch(`/internships/${id}/approval`, data),
  
  submitReport: (id: string, data: any) => apiClient.post(`/internships/${id}/report`, data),
  evaluateInternship: (id: string, data: any) => apiClient.patch(`/internships/${id}/evaluate`, data),
};
