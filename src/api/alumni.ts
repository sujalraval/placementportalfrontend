import { apiClient } from './client';
import type { AlumniMember } from '../data/mock/alumni';

export const alumniApi = {
  listProfiles: () => apiClient.get('/alumni/profiles'),
  requestMentorship: (data: any) => apiClient.post('/alumni/requests/mentorship', data),
  requestReferral: (data: any) => apiClient.post('/alumni/requests/referral', data),
};

export const mapBackendAlumniToFrontend = (data: any): AlumniMember & { id: string } => {
  return {
    id: data.id,
    name: data.fullName || data.name,
    batch: data.batch || 'Unknown',
    co: data.company || 'Unknown',
    role: data.role || 'Alumni',
    loc: data.location || 'Unknown',
    mentor: data.isMentor || false
  };
};
