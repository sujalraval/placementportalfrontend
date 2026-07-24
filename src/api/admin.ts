import { apiClient } from './client';
import type { AdminUser } from '../data/mock/users';
import type { Department } from '../data/mock/departments';
import type { Program } from '../data/mock/programs';
import type { Sector } from '../data/mock/sectors';

export const adminApi = {
  // Users
  listUsers: () => apiClient.get('/users?pageSize=100'),
  createUser: (data: any) => apiClient.post('/users', data),
  updateUser: (id: string, data: any) => apiClient.patch(`/users/${id}`, data),
  updateUserStatus: (id: string, status: string) => apiClient.patch(`/users/${id}/status`, { status }),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),

  // Departments
  listDepartments: () => apiClient.get('/departments'),
  createDepartment: (data: any) => apiClient.post('/departments', data),
  updateDepartment: (id: string, data: any) => apiClient.patch(`/departments/${id}`, data),
  deleteDepartment: (id: string) => apiClient.delete(`/departments/${id}`),

  // Programs
  listPrograms: () => apiClient.get('/programs'),
  createProgram: (data: any) => apiClient.post('/programs', data),
  updateProgram: (id: string, data: any) => apiClient.patch(`/programs/${id}`, data),
  deleteProgram: (id: string) => apiClient.delete(`/programs/${id}`),

  // Sectors
  listSectors: () => apiClient.get('/sectors'),
  createSector: (data: any) => apiClient.post('/sectors', data),
  updateSector: (id: string, data: any) => apiClient.patch(`/sectors/${id}`, data),
  deleteSector: (id: string) => apiClient.delete(`/sectors/${id}`),
};

  export const mapBackendUserToAdminUser = (data: any): AdminUser & { id: string } => {
    let role: AdminUser['role'] = 'Student';
    if (data.role === 'ADMIN') role = 'Admin';
    else if (data.role === 'COORDINATOR') role = 'Coordinator';
    else if (data.role === 'FACULTY') role = 'Faculty' as any;
    else if (data.role === 'PLACEMENT_OFFICER') role = 'Placement Officer' as any;
    else if (data.role === 'RECRUITER') role = 'Recruiter' as any;

  let status: AdminUser['status'] = 'Pending';
  if (data.status === 'ACTIVE') status = 'Active';
  else if (data.status === 'SUSPENDED') status = 'Suspended';

  return {
    id: data.id,
    name: data.fullName || 'Unknown',
    role,
    dept: data.department?.name || '—',
    email: data.email,
    status
  };
};

export const mapBackendDepartmentToFrontend = (data: any): Department & { id: string } => {
  return {
    id: data.id,
    name: data.name,
    code: data.code,
    total: data._count?.students || 0,
    placed: data._count?.students || 0, // Mock placed count since backend doesn't have it directly
    coord: data.contactName || '—'
  };
};

export const mapBackendProgramToFrontend = (data: any): Program & { id: string } => {
  let degree: Program['degree'] = 'Undergraduate';
  if (data.name.includes('Master') || data.name.includes('MBA') || data.name.includes('M.')) degree = 'Postgraduate';

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    dept: data.department?.name || '—',
    degree,
    seats: 120, // Mock for now
    duration: '2 Years' // Mock for now
  };
};

export const mapBackendSectorToFrontend = (data: any): Sector & { id: string } => {
  return {
    id: data.id,
    name: data.name,
    companies: data._count?.companies || 0,
    openings: 0, // Mock
    status: 'Active'
  };
};
