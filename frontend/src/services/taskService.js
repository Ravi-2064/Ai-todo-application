import axios from 'axios';

// Uses the deployed backend URL from environment variable set in Vercel
const API_BASE_URL = "https://ai-todo-application.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token authentication
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

// Add response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, clear it
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const taskService = {
  async getTasks() {
    try {
      const response = await api.get('/api/tasks/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  async getTask(id) {
    try {
      const response = await api.get(`/api/tasks/${id}/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task');
    }
  },

  async createTask(taskData) {
    try {
      const response = await api.post('/api/tasks/', taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/api/tasks/${id}/`, taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  async deleteTask(id) {
    try {
      await api.delete(`/api/tasks/${id}/`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },

  async toggleTask(id) {
    try {
      const response = await api.patch(`/api/tasks/${id}/toggle/`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to toggle task');
    }
  },

  async getTaskSuggestions() {
    try {
      const response = await api.get('/api/tasks/suggestions/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get suggestions');
    }
  },
}; 