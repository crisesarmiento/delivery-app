import { useState, useEffect } from 'react';
import { IProduct, IApiResponse } from '@/types';
import { products as productsMock } from '@/mocks/products.mock';
import { useNav } from '@/context/navContext';

export const useProducts = () => {
  const [branchProducts, setBranchProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { activeTab, setActiveTab, setExpandedSections, activeBranch } = useNav();

  const fetchProducts = async () => {
    if (!activeBranch?.id) return;

    setLoading(true);
    setError(null);

    try {
      // Product mock data varies by branch ID
      const mockData: IProduct[] = productsMock.filter(
        (product) => product?.branchId === activeBranch?.id
      );

      // Debug the data source

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

        setBranchProducts(validProducts);
        if (!activeTab && validProducts.length > 0) {
          setActiveTab(validProducts[0].category?.toLowerCase() || '');
          setExpandedSections({
            [validProducts[0].category?.toLowerCase() || '']: true,
          });
        }
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
  }, [activeBranch?.id]);

  return { branchProducts, loading, error, refetch: fetchProducts };
};
