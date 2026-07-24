import { apiClient } from './client';
import type { RecJobApplicant } from '../data/mock/recruiterJobs';
import type { Application } from '../data/mock/applications';

export const mapBackendApplicationToFrontend = (data: any): Application => {
  let outcome: Application['outcome'] = 'Applied';
  if (data.status === 'SHORTLISTED') outcome = 'Shortlisted';
  if (data.status === 'INTERVIEW') outcome = 'Interview';
  if (data.status === 'OFFER' || data.status === 'JOINED') outcome = 'Offer';
  if (data.status === 'REJECTED') outcome = 'Rejected';
  if (data.status === 'WITHDRAWN') outcome = 'Withdrawn';

  const reachedMap: Record<Application['outcome'], number> = {
    'Applied': 0, 'Shortlisted': 1, 'Interview': 2, 'Offer': 3, 'Rejected': 0, 'Withdrawn': 0
  };

  return {
    id: data.id,
    co: data.jobPosting?.company?.name || 'Unknown',
    role: data.jobPosting?.title || 'Unknown Role',
    ctc: data.jobPosting?.ctc ? `₹${data.jobPosting.ctc} LPA` : 'Not specified',
    dept: data.jobPosting?.department?.name || 'All',
    applied: new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    reached: reachedMap[outcome],
    outcome,
    note: data.offer ? `Offer released: CTC ${data.offer.ctc} ${data.offer.ctcCurrency}` : data.rejectionReason || ''
  };
};

export const mapBackendStageToFrontend = (status: string): RecJobApplicant['stage'] => {
  switch (status) {
    case 'APPLIED': return 'Applied';
    case 'SHORTLISTED': return 'Shortlisted';
    case 'INTERVIEW': return 'Interview';
    case 'OFFER': return 'Offer';
    case 'JOINED': return 'Offer';
    case 'REJECTED': return 'Rejected';
    case 'WITHDRAWN': return 'Rejected';
    default: return 'Applied';
  }
};

export const mapFrontendStageToBackend = (stage: RecJobApplicant['stage']): string => {
  switch (stage) {
    case 'Applied': return 'APPLIED';
    case 'Shortlisted': return 'SHORTLISTED';
    case 'Interview': return 'INTERVIEW';
    case 'Offer': return 'OFFER';
    case 'Rejected': return 'REJECTED';
    default: return 'APPLIED';
  }
};

export const applicationApi = {
  // Student routes
  listMine: async () => {
    const response = await apiClient.get('/applications/me');
    return response.data;
  },
  
  apply: async (data: { postingId: string }) => {
    const response = await apiClient.post('/applications', data);
    return response.data;
  },
  
  respondToOffer: async (id: string, data: { response: 'ACCEPTED' | 'REJECTED' }) => {
    const response = await apiClient.patch(`/applications/${id}/offer/response`, data);
    return response.data;
  },

  // Recruiter/Staff routes
  list: async (params?: any) => {
    const response = await apiClient.get('/applications', { params });
    return response.data;
  },
  
  updateStatus: async (id: string, data: { status: string }) => {
    const response = await apiClient.patch(`/applications/${id}/status`, data);
    return response.data;
  },

  // Rounds
  evaluateRound: async (id: string, data: { roundId: string; score: number; status: string; feedback?: string }) => {
    const response = await apiClient.post(`/applications/${id}/rounds`, data);
    return response.data;
  },

  // Interviews
  scheduleInterview: async (id: string, data: any) => {
    const response = await apiClient.post(`/applications/${id}/interviews`, data);
    return response.data;
  },
  
  updateInterview: async (id: string, interviewId: string, data: any) => {
    const response = await apiClient.patch(`/applications/${id}/interviews/${interviewId}`, data);
    return response.data;
  },

  // Offers
  releaseOffer: async (id: string, data: any) => {
    const response = await apiClient.post(`/applications/${id}/offer`, data);
    return response.data;
  },
  
  revokeOffer: async (id: string) => {
    const response = await apiClient.post(`/applications/${id}/offer/revoke`);
    return response.data;
  }
};
