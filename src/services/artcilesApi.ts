import { apiClient } from './apiService';

export const createArticle = async (data) => {
  const response = await apiClient.post('/api/articles', data);
  return response.data;
};