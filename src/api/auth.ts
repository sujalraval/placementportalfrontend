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
    let url = '';
    let body = { ...payload } as any;

    if (payload.role === 'STUDENT') {
      url = '/auth/register/student';
      // Mock required fields if missing from UI
      body.enrollmentNo = body.enrollmentNo || `ENR${Math.floor(Math.random() * 100000)}`;
      body.departmentId = body.departmentId || '00000000-0000-0000-0000-000000000001'; // Will fail if UUID doesn't exist, need actual department
      body.batchStartYear = body.batchStartYear || 2022;
      body.batchEndYear = body.batchEndYear || 2026;
    } else if (payload.role === 'RECRUITER') {
      url = '/auth/register/recruiter';
      body.companyName = body.companyName || 'Default Company';
      body.companyType = body.companyType || 'DIRECT_EMPLOYER';
    } else {
      throw new Error('Registration for this role is not supported via this form.');
    }

    const response = await apiClient.post(url, body);
    return response.data.data;
  },

  getMe: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data.data; // user object
  }
};
