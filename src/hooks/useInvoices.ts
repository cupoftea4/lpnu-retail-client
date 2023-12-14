import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Invoice, Shop, CreateInvoiceDto, UpdateInvoiceDto } from '../types';

const useInvoices = () => {
  const { apiClient } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<Invoice[]>('/Invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
    setIsLoading(false);
  }, [apiClient]);

  const fetchShops = useCallback(async () => {
    try {
      const response = await apiClient.get<Shop[]>('/Shops');
      setShops(response.data);
    } catch (error) {
      console.error('Failed to fetch shops:', error);
    }
  }, [apiClient]);

  const createInvoice = useCallback(async (invoiceData: CreateInvoiceDto) => {
    setIsLoading(true);
    try {
      await apiClient.post('/Invoices', invoiceData);
      await fetchInvoices(); // Refresh the list after creation
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
    setIsLoading(false);
  }, [apiClient, fetchInvoices]);

  const updateInvoice = useCallback(async (id: number, invoiceData: UpdateInvoiceDto) => {
    setIsLoading(true);
    try {
      await apiClient.put(`/Invoices/${id}`, invoiceData);
      await fetchInvoices(); // Refresh the list after update
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
    setIsLoading(false);
  }, [apiClient, fetchInvoices]);

  const deleteInvoice = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      await apiClient.delete(`/Invoices/${id}`);
      await fetchInvoices(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
    setIsLoading(false);
  }, [apiClient, fetchInvoices]);

  useEffect(() => {
    fetchInvoices();
    fetchShops();
  }, [fetchInvoices, fetchShops]);

  return { invoices, shops, isLoading, createInvoice, updateInvoice, deleteInvoice };
};

export default useInvoices;
