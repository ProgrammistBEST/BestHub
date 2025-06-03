import { apiClient } from './apiService';

export const createSize = async (data) => {
  const response = await apiClient.post('/api/sizes', data);
  return response.data;
};