import { apiClient } from './client';
import type { UserRole } from '../store/useAuthStore';

export interface LoginCredentials {
  email: string;
  password?: string;
  authProviderId?: string; // For OAuth stubs
}

export interface RegisterPayload {
  email: string;
  password?: string;
  fullName: string;
  role: UserRole;
  authProviderId?: string;
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data.data; // { token, user }
  },

  register: async (payload: RegisterPayload) => {
    const response = await apiClient.post('/auth/register/local', payload);
    return response.data.data; // { user }
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data.data; // user object
  }
};
