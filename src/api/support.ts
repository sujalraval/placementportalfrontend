import { apiClient } from './client';
import type { Ticket, Survey } from '../data/mock/support';

export const supportApi = {
  // Tickets
  listTickets: () => apiClient.get('/support/tickets'),
  getTicketById: (id: string) => apiClient.get(`/support/tickets/${id}`),
  createTicket: (data: any) => apiClient.post('/support/tickets', data),
  updateTicketStatus: (id: string, status: string) => apiClient.patch(`/support/tickets/${id}/status`, { status }),

  // Surveys
  listSurveys: () => apiClient.get('/support/surveys'),
  createSurvey: (data: any) => apiClient.post('/support/surveys', data),
  submitSurveyResponse: (id: string, data: any) => apiClient.post(`/support/surveys/${id}/responses`, data),
};

export const mapBackendTicketToFrontend = (data: any): Ticket & { id: string } => {
  let status: Ticket['status'] = 'In progress';
  if (data.status === 'RESOLVED' || data.status === 'CLOSED') status = 'Resolved';
  else if (data.status === 'ESCALATED') status = 'Escalated';

  let pri: Ticket['pri'] = 'Low';
  if (data.priority === 'HIGH' || data.priority === 'URGENT') pri = 'High';
  else if (data.priority === 'MEDIUM') pri = 'Medium';

  return {
    id: data.id,
    by: data.createdBy?.fullName || 'Unknown',
    cat: data.category,
    sub: data.subject,
    pri,
    status,
    sla: '24h', // Mock
    owner: data.assignedTo?.fullName || 'Unassigned',
    date: new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  };
};

export const mapBackendSurveyToFrontend = (data: any): Survey & { id: string } => {
  return {
    id: data.id,
    name: data.title,
    aud: data.audience || 'All',
    resp: data._count?.responses || 0,
    score: 'N/A', // Mock
    status: new Date(data.closesAt) < new Date() ? 'Closed' : 'Open'
  };
};
