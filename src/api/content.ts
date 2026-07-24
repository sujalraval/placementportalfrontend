import { apiClient } from './client';
import type { NewsItem } from '../data/mock/news';
import type { AdminEvent, AdminBroadcast } from '../data/mock/adminContent';

export const contentApi = {
  // News
  listNews: () => apiClient.get('/content/news'),
  getNews: (slug: string) => apiClient.get(`/content/news/${slug}`),
  createNews: (data: any) => apiClient.post('/content/news', data),
  updateNewsStatus: (id: string, status: string) => apiClient.patch(`/content/news/${id}/status`, { status }),

  // Events
  listEvents: () => apiClient.get('/content/events'),
  getEvent: (slug: string) => apiClient.get(`/content/events/${slug}`),
  createEvent: (data: any) => apiClient.post('/content/events', data),
  updateEventStatus: (id: string, status: string) => apiClient.patch(`/content/events/${id}/status`, { status }),

  // Broadcasts
  listBroadcasts: () => apiClient.get('/content/broadcasts'),
  sendBroadcast: (data: any) => apiClient.post('/content/broadcasts', data),
};

export const mapBackendNewsToFrontend = (data: any): NewsItem & { id: string } => {
  return {
    id: data.id,
    date: new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    cat: data.category || 'Announcement',
    title: data.title,
    body: data.body || data.excerpt || ''
  };
};

export const mapBackendEventToFrontend = (data: any): AdminEvent & { id: string } => {
  return {
    id: data.id,
    title: data.title,
    date: new Date(data.startsAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    mode: data.venue?.toLowerCase().includes('webinar') ? 'Webinar' : 'On-campus',
    dept: 'All departments', // Mock for now
    status: new Date(data.startsAt) > new Date() ? 'Upcoming' : 'Completed'
  };
};

export const mapBackendBroadcastToFrontend = (data: any): AdminBroadcast & { id: string } => {
  return {
    id: data.id,
    title: data.title,
    audience: data.audience || 'All',
    channel: 'Email', // Mock for now
    date: new Date(data.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  };
};
