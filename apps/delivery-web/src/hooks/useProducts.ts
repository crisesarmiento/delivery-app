import { useState, useEffect } from 'react';
import { IProduct, IApiResponse } from '@/types';
import { products as productsMock } from '@/mocks/products.mock';

export const useProducts = (branchId: string) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    if (!branchId) return;

    setLoading(true);
    setError(null);

    try {
      // Product mock data varies by branch ID
      const mockData: IProduct[] = productsMock;

      // Debug the data source
      console.log(
        `useProducts - mockData for branchId ${branchId}:`,
        mockData ? JSON.stringify(mockData.slice(0, 2)) + '...' : 'undefined'
      );

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock response
      const mockResponse: IApiResponse<IProduct[]> = {
        success: true,
        data: mockData,
      };

      if (mockResponse.success) {
        // Ensure we're setting an array of valid IProduct objects
        const validProducts = Array.isArray(mockResponse.data)
          ? mockResponse.data.filter(
              (product) =>
                typeof product === 'object' &&
                product !== null &&
                'id' in product
            )
          : [];

        console.log(
          'useProducts - setting products:',
          validProducts.length > 0
            ? JSON.stringify(validProducts.slice(0, 1)) + '...'
            : 'empty array'
        );

        setProducts(validProducts);
      } else {
        setError('No se pudieron cargar los productos');
      }
    } catch (err) {
      setError('Error al obtener los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [branchId]);

  return { products, loading, error, refetch: fetchProducts };
};
