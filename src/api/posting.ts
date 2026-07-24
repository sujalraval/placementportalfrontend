import { apiClient } from './client';
import type { RecJob } from '../data/mock/recruiterJobs';
import type { Drive } from '../data/mock/drives';
import type { Opening } from '../data/mock/openings';

export const mapBackendPostingToOpening = (data: any): Opening & { id: string } => {
  let status: Opening['status'] = 'Pending';
  if (data.status === 'PUBLISHED') status = 'Published';
  else if (data.status === 'CLOSED') status = 'Closed';
  else if (data.status === 'DRAFT') status = 'Draft';
  else if (data.status === 'PENDING_APPROVAL') status = 'Pending';

  return {
    id: data.id,
    role: data.title || '',
    co: data.company?.name || '',
    dept: data.department?.name || 'All',
    ctc: data.ctc ? `₹${data.ctc} LPA` : 'Not specified',
    openings: data.vacancies || 0,
    status,
    apps: data._count?.applications || 0
  };
};

export const mapBackendPostingToDrive = (data: any): Drive => {
  const isPast = data.applicationDeadline && new Date(data.applicationDeadline) < new Date();
  let status: Drive['status'] = 'Registration open';
  if (isPast) status = 'Completed';
  else if (data.status !== 'PUBLISHED') status = 'Upcoming';
  
  return {
    id: data.id,
    co: data.company?.name || '',
    title: data.title || '',
    date: data.applicationDeadline ? new Date(data.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—',
    depts: data.department?.name || 'All',
    rounds: (data.selectionRounds || []).map((r: any) => r.title).join(' · ') || '—',
    reg: data._count?.applications || 0,
    status
  };
};

export const mapBackendPostingToFrontend = (data: any): RecJob => {
  return {
    id: data.id,
    co: data.company?.name || '',
    role: data.title || '',
    type: data.employmentType ? data.employmentType.replace('_', ' ') : '',
    sector: data.company?.sector?.name || 'IT Services',
    ctc: data.ctc ? `₹${data.ctc} LPA` : 'Not specified',
    loc: data.location || '',
    openings: data.vacancies ? data.vacancies.toString() : 'TBD',
    cgpa: data.minCgpa ? data.minCgpa.toString() : '0.0',
    depts: data.department?.name || 'University-wide',
    deptTags: data.department?.name ? [data.department.name] : ['All'],
    batch: data.allowedBatches ? data.allowedBatches.join(', ') : '',
    apps: data._count?.applications || 0,
    status: data.status === 'PUBLISHED' ? 'Published' : data.status === 'CLOSED' ? 'Closed' : data.status === 'DRAFT' ? 'Draft' : 'Pending approval',
    deadline: data.applicationDeadline ? new Date(data.applicationDeadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—',
    bond: data.bondDetails || 'None',
    skills: data.skillsRequired || [],
    rounds: (data.selectionRounds || []).map((r: any) => r.title),
    jd: data.description || '',
    applicants: [] // Applications fetched separately or populated later
  };
};

export const mapFrontendPostingToBackend = (data: Partial<RecJob>): any => {
  const result: any = {};
  if (data.role) result.title = data.role;
  if (data.jd) result.description = data.jd;
  if (data.type) result.employmentType = data.type.replace(' ', '_').toUpperCase();
  if (data.loc) result.location = data.loc;
  if (data.openings && !isNaN(Number(data.openings))) result.openings = Number(data.openings);
  if (data.ctc) result.ctcMin = parseFloat(data.ctc.replace(/[^0-9.-]+/g, '')) || 0;
  if (data.cgpa && !isNaN(Number(data.cgpa))) result.minCgpa = Number(data.cgpa);
  // Default to university wide for now unless dept is specified
  result.visibilityScope = 'UNIVERSITY_WIDE';
  return result;
};

export const postingApi = {
  list: async (params?: any) => {
    const response = await apiClient.get('/postings', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/postings/${id}`);
    return response.data;
  },

  create: async (data: any) => {
    const response = await apiClient.post('/postings', data);
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await apiClient.patch(`/postings/${id}`, data);
    return response.data;
  },

  updateStatus: async (id: string, data: { status: string }) => {
    const response = await apiClient.patch(`/postings/${id}/status`, data);
    return response.data;
  },

  listRounds: async (id: string) => {
    const response = await apiClient.get(`/postings/${id}/rounds`);
    return response.data;
  },

  addRound: async (id: string, data: any) => {
    const response = await apiClient.post(`/postings/${id}/rounds`, data);
    return response.data;
  },

  updateRound: async (id: string, roundId: string, data: any) => {
    const response = await apiClient.patch(`/postings/${id}/rounds/${roundId}`, data);
    return response.data;
  },

  removeRound: async (id: string, roundId: string) => {
    const response = await apiClient.delete(`/postings/${id}/rounds/${roundId}`);
    return response.data;
  }
};
