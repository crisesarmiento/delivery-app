import { useState, useEffect } from 'react';
import { IBranch, IApiResponse } from '@/types';
import { branchesMock } from '@/mocks/branches.mock';

export const useBranches = () => {
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make sure the mock data is valid
      if (!Array.isArray(branchesMock)) {
        console.error('branchesMock is not an array:', branchesMock);
        setError('Error en formato de datos de sucursales');
        return;
      }

      // Mock successful response
      const mockResponse: IApiResponse<IBranch[]> = {
        success: true,
        data: branchesMock,
      };

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (mockResponse.success && mockResponse.data) {
        // Ensure we're setting an array of IBranch objects
        const validBranches = Array.isArray(mockResponse.data)
          ? mockResponse.data.filter((branch) => {
              const isValid =
                typeof branch === 'object' && branch !== null && 'id' in branch;
              if (!isValid) {
                console.error('Invalid branch object found:', branch);
              }
              return isValid;
            })
          : [];

        setBranches(validBranches);
      } else {
        setError('No se pudieron cargar las sucursales');
      }
    } catch (err) {
      setError('Error al obtener las sucursales');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return { branches, loading, error, refetch: fetchBranches };
};
