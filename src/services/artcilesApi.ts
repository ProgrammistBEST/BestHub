import { apiClient } from './api';

export const createArticle = async (data) => {
  const response = await apiClient.post('/api/articles', data);
  return response.data;
};