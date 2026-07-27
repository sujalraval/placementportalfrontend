import { apiClient } from './client';
import type { NewsItem } from '../data/mock/news';
import type { AdminEvent, AdminBroadcast } from '../data/mock/adminContent';

export const contentApi = {
  // News
  listNews: () => apiClient.get('/content/news'),
  getNews: (slug: string) => apiClient.get(`/content/news/${slug}`),
  createNews: (data: any) => apiClient.post('/content/news', data),
  updateNewsStatus: (id: string, status: string) => apiClient.patch(`/content/news/${id}/status`, { status }),

  // Uploads
  uploadContentFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post('/content/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data; // should return { url: '...' }
  },

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
    body: data.body || data.excerpt || '',
    attachmentUrl: data.attachmentUrl || undefined
  };
};

export const mapBackendEventToFrontend = (data: any): AdminEvent & { id: string } => {
  return {
    id: data.id,
    title: data.title,
    date: new Date(data.startsAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    mode: data.venue?.toLowerCase().includes('webinar') ? 'Webinar' : 'On-campus',
    dept: data.departments?.length ? data.departments.map((d: any) => d.name).join(', ') : 'All departments',
    status: new Date(data.startsAt) > new Date() ? 'Upcoming' : 'Completed',
    attachmentUrl: data.attachmentUrl || undefined
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
