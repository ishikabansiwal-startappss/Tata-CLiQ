import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id).then((res) => res.data),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories().then((res) => res.data),
    staleTime: 30 * 60 * 1000,
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => productService.getBrands().then((res) => res.data),
    staleTime: 30 * 60 * 1000,
  });
};

export const useHeroBanners = () => {
  return useQuery({
    queryKey: ['heroBanners'],
    queryFn: () => productService.getHeroBanners().then((res) => res.data),
    staleTime: 30 * 60 * 1000,
  });
};

export const usePromotionBanners = () => {
  return useQuery({
    queryKey: ['promotionBanners'],
    queryFn: () => productService.getPromotionBanners().then((res) => res.data),
    staleTime: 30 * 60 * 1000,
  });
};

export const useSearchSuggestions = (q) => {
  return useQuery({
    queryKey: ['searchSuggestions', q],
    queryFn: () => productService.getSearchSuggestions(q).then((res) => res.data),
    enabled: q?.length >= 2,
    staleTime: 60 * 1000,
  });
};

export const useFeaturedProducts = () => {
  return useProducts({ featured: 'true', limit: 8 });
};

export const useNewArrivals = () => {
  return useProducts({ isNew: 'true', limit: 8 });
};