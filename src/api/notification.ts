import { apiClient } from './client';
import type { NotifItem } from '../data/mock/notifications';
import type { IconName } from '../components/icons/icons';

export const notificationApi = {
  listMine: () => apiClient.get('/notifications'),
  markAllAsRead: () => apiClient.patch('/notifications/read-all'),
  markAsRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
};

export const mapBackendNotificationToFrontend = (data: any): NotifItem & { id: string } => {
  // Infer type and icon from the notification metadata/type
  let type = 'Info';
  let ic: IconName = 'info';

  if (data.type === 'NEW_JOB') {
    type = 'New job';
    ic = 'bolt';
  } else if (data.type === 'INTERVIEW') {
    type = 'Interview';
    ic = 'cal';
  } else if (data.type === 'OFFER') {
    type = 'Offer';
    ic = 'check';
  }

  return {
    id: data.id,
    ic,
    type,
    title: data.body, // The notification text is typically in 'body'
    time: new Date(data.createdAt).toLocaleDateString('en-GB'),
    unread: !data.isRead
  };
};
