import { apiClient } from './client';
import type { TrainingCourse } from '../data/mock/training';

export const trainingApi = {
  listCourses: () => apiClient.get('/training/courses'),
  createCourse: (data: any) => apiClient.post('/training/courses', data),
  enrollInCourse: (id: string) => apiClient.post(`/training/courses/${id}/enroll`),
  updateEnrollmentProgress: (id: string, data: any) => apiClient.patch(`/training/courses/${id}/progress`, data),
  
  listInterviews: () => apiClient.get('/training/interviews'),
  bookInterview: (data: any) => apiClient.post('/training/interviews', data),
  scoreInterview: (id: string, data: any) => apiClient.patch(`/training/interviews/${id}/score`, data),
};

export const mapBackendCourseToFrontend = (data: any): TrainingCourse & { id: string } => {
  return {
    id: data.id,
    name: data.title || 'Unknown Course',
    cat: data.category || 'Technical',
    dur: data.duration || 'N/A',
    enrolled: false,
  };
};
