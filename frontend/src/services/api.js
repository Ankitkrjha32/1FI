import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';
 const API_URL='https://onefi-backend-ydff.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product APIs
export const productAPI = {
  getAll: () => api.get('/products'),
  getBySlug: (slug) => api.get(`/products/${slug}`),
  create: (formData) => api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, formData) => api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(`/products/${id}`),
};

export default api;
