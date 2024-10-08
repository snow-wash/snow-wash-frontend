import apiInstance from './authInterceptor';
import { clearTokens } from './authService';

class ApiService {
  constructor() {
    this.api = apiInstance;
  }

  setToken(token) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearToken() {
    delete this.api.defaults.headers.common['Authorization'];
  }

  async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async get(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    if(error?.status === 403){
      clearTokens()
    }
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw error.response.data;
    } else {
      console.error('API Error:', error.message);
      throw error.message;
    }
  }
}

export default new ApiService();
