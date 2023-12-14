import { useState, useCallback, useEffect } from 'react';
import { CreateProductDto, Product, ProductCategory, UpdateProductDto } from '../types';
import { useAuth } from '../context/AuthContext';


const useProducts = () => {
  const { apiClient } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Product[]>(`/Products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to refresh products:', error);
    }
    setIsLoading(false);
  }, []);

  // Initial load of products and product categories
  useEffect(() => {
    refresh();
    fetchProductCategories();
  }, []);

  const createProduct = useCallback(async (productData: CreateProductDto) => {
    setIsLoading(true);
    try {
      await apiClient.post(`/Products`, productData);
      await refresh(); // Refresh the list after creation
    } catch (error) {
      console.error('Failed to create product:', error);
    }
    setIsLoading(false);
  }, [refresh]);

  const updateProduct = useCallback(async (id: number, productData: UpdateProductDto) => {
    setIsLoading(true);
    try {
      await apiClient.patch(`/Products/${id}`, productData);
      await refresh(); // Refresh the list after update
    } catch (error) {
      console.error('Failed to update product:', error);
    }
    setIsLoading(false);
  }, [refresh]);

  const deleteProduct = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      await apiClient.delete(`/Products/${id}`);
      await refresh(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
    setIsLoading(false);
  }, [refresh]);

  const fetchProductCategories = useCallback(async () => {
    try {
      const response = await apiClient.get<ProductCategory[]>(`/product-categories`);
      setProductCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch product categories:', error);
    }
  }, []);

  return { products, isLoading, createProduct, updateProduct, deleteProduct, refresh, productCategories };
};

export default useProducts;
