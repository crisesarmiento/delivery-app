import { useState, useEffect } from 'react';
import { IProduct, IApiResponse } from '@/types';
import { products as productsMock } from '@/mocks/products.mock';

export const useProducts = (branchId?: number ) => {
  const [branchProducts, setBranchProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!branchId) return;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const mockData: IProduct[] = productsMock.filter(
          (product) => product.branchId === branchId
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockResponse: IApiResponse<IProduct[]> = {
          success: true,
          data: mockData,
        };

        if (mockResponse.success && mockResponse.data) {
          setBranchProducts(mockResponse.data);
        } else {
          setError('No se pudieron cargar los productos');
        }
      } catch (err) {
        setError(`Error al obtener los productos: ${err}`);
        setBranchProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [branchId]);

  return { branchProducts, loading, error };
};
