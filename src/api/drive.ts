import { apiClient } from './client';
import type { Drive } from '../data/mock/drives';

export const driveApi = {
  list: () => apiClient.get('/drives'),
  getById: (id: string) => apiClient.get(`/drives/${id}`),
  register: (id: string) => apiClient.post(`/drives/${id}/register`),
  
  create: (data: any) => apiClient.post('/drives', data),
  updateStatus: (id: string, data: { status: string }) => apiClient.patch(`/drives/${id}/status`, data),
  listRegistrations: (id: string) => apiClient.get(`/drives/${id}/registrations`),
};

export const mapBackendDriveToFrontend = (data: any): Drive & { id: string } => {
  return {
    id: data.id,
    co: data.company?.name || 'Unknown',
    title: data.roles ? data.roles.join(', ') : 'Various roles',
    date: new Date(data.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    depts: data.eligibleDepartments ? data.eligibleDepartments.join(' · ') : 'All departments',
    status: data.status === 'COMPLETED' ? 'Completed' : 'Upcoming',
    reg: data._count?.registrations || 0,
    rounds: data.rounds || 3
  };
};
