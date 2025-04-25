import { useState } from 'react';
import { IBranch, IApiResponse } from '@/types';
import { branchesMock } from '@/mocks/branches.mock';

export const useBranches = () => {
  const [allBranches, setAllBranches] = useState<IBranch[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchBranches = async () => {
    if (allBranches.length > 0) return;

    setLoading(true);
    setError(null);

    try {
      // Make sure the mock data is valid
      if (!Array.isArray(branchesMock)) {
        console.error('branchesMock is not an array:', branchesMock);
        setError('Error en formato de datos de sucursales');
        return;
      }

      const mockData: IBranch[] = branchesMock;

      // Debug the data source

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

       // Mock response
      const mockResponse: IApiResponse<IBranch[]> = {
        success: true,
        data: mockData,
      };

      if (mockResponse.success) {
        // Ensure we're setting an array of IBranch objects
        const validBranches = Array.isArray(mockResponse.data)
          ? mockResponse.data.filter(
              (branch) =>
                typeof branch === 'object' &&
                branch !== null &&
                'id' in branch
            )
          : [];

        setAllBranches(validBranches);
        if (!validBranches.length) {
          setError('No se pudieron cargar las sucursales');
        }
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

  return { allBranches, loading, error, refetch: fetchBranches };
};
