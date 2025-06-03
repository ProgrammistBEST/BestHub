import { apiClient } from './apiService';

export const createModel = async (data) => {
  const response = await apiClient.post('/api/models', data);
  return response.data;
};

export const createModelFromPlatform = async (platform, data) => {
  const response = await apiClient.post(`/api/models/${platform}`, data);
  return response.data;
};