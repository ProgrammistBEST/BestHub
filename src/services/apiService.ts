import axios from 'axios';

export const fetchModels = async () => {
  try {
    const response = await axios.get('http://localhost:8001/api/models');
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return [];
  }
};

export const updateModel = async (modelId, updatedData) => {
  try {
    await axios.put(`/api/models/${modelId}`, updatedData);
    return true; // Успешное обновление
  } catch (error) {
    console.error('Ошибка при обновлении модели:', error);
    return false; // Ошибка обновления
  }
};

export const fetchArticles = async (page, rowsPerPage) => {
  try {
    const response = await axios.get("http://localhost:8001/api/articles");
    return response.data; // Возвращает массив всех артикулов
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    await axios.post("http://localhost:8001/api/articles", articleData);
  } catch (error) {
    if (error.response?.status === 409) {
      throw new Error("Артикул уже существует. Дубликаты запрещены.");
    }
    throw error;
  }
};

export const updateArticle = async (articleId, articleData) => {
  try {
    await axios.put(`http://localhost:8001/api/articles/${articleId}`, articleData);
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await axios.delete(`http://localhost:8001/api/articles/${articleId}`);
  } catch (error) {
    throw error;
  }
};

export const fetchSizes = async () => {
  try {
    const response = await axios.get("http://localhost:8001/api/sizes");
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке размеров:", error);
    throw error;
  }
};

export const fetchBrands = async () => {
  try {
    const response = await axios.get("http://localhost:8001/api/brands");
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке брендов:", error);
    throw error;
  }
};

export const createModel = async (modelData) => {
  try {
    const response = await axios.post("/api/models", modelData);
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании модели:", error);
    throw error;
  }
};