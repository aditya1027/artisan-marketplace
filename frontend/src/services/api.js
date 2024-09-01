import axios from 'axios';

const API_URL = 'http://localhost:7000/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProducts = (page) => api.get(`/products?page=${page}`);
export const fetchProductDetailsAPI = (id) => api.get(`/products/${id}`);

export const loginCustomer = (email, password) =>
  api.post('/customer/login', { email, password });

export const loginArtisan = (email, password) =>
  api.post('/artisan/login', { email, password });

export const registerCustomer = (name, email, password, role) =>
  api.post('/customer/register', { name, email, password, role });

export const registerArtisan = (name, email, password, role) =>
  api.post('/artisan/register', { name, email, password, role });

export const placeOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response;
};

export const fetchOrders = (customerId) => api.get(`/orders/${customerId}`);

export const fetchProductDetailsApi = (id) => api.get(`/products/${id}`);

export const fetchArtisanProductsApi = async (artisanId) => {
  const response = await axios.get(`/api/artisan/${artisanId}/products`);
  return response.data;
};

export const addProductApi = (productData) =>
  api.post('/products', productData);
export const updateProductApi = (id, productData) =>
  api.put(`/products/${id}`, productData);
export const deleteProductApi = (id) => api.delete(`/products/${id}`);

export const processPayment = (paymentData) =>
  api.post('/payments/process', paymentData);

export default api;
