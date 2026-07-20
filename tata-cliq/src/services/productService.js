import api from './api';

export const productService = {
  getProducts: (params) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/categories'),
  getBrands: () => api.get('/brands'),
  getHeroBanners: () => api.get('/banners/hero'),
  getPromotionBanners: () => api.get('/banners/promotions'),
  getSearchSuggestions: (q) => api.get('/search/suggestions', { params: { q } }),
};