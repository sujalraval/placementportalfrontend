import axios from 'axios';

// Get the base URL from environment variables, fallback to localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach the JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401s globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the server returns 401 Unauthorized, clear the token and redirect to login
    // Skip this behavior for auth endpoints where 401 is expected (like wrong credentials or account doesn't exist)
    const url = error.config?.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/otp/verify');
    
    if (error.response && error.response.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      // Only redirect if we are not already on the login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
