// src/services/authInterceptor.js
import axios from 'axios';
import { getToken, getRefreshToken, setToken } from './authService';
import apiService from './apiService'; // Import the API service

const apiInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your API base URL
});

// Request Interceptor
apiInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor
apiInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const response = await apiService.post('/auth/refresh-token', {
            refreshToken,
          });
          setToken(response.data.token);
          apiInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.token}`;
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${response.data.token}`;
          return apiInstance(originalRequest);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
