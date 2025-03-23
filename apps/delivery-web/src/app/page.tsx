'use client';

import { useState, useEffect } from 'react';
import { IBranch } from '../types';
import { branchesApi } from '../services/api';
import BranchCard from '../components/BranchCard/BranchCard';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Loader,
  Alert,
  Box,
  Divider,
} from '@mantine/core';

export default function HomePage() {
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBranches() {
      try {
        const response = await branchesApi.getBranches();
        if (response.success && response.data) {
          setBranches(response.data);
        } else {
          setError(response.message || 'Failed to fetch branches');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBranches();
  }, []);

  const handleBranchClick = (branchId: string) => {
    // This will be implemented in the future to navigate to branch details
    console.log(`Branch clicked: ${branchId}`);
    // Future implementation will use Next.js router to navigate to the branch page
  };

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">
        Smarty Delivery
      </Title>

      <Box mb="xl">
        <Title order={2} mb="lg">
          Selecciona un Restaurante
        </Title>

        {loading && (
          <Box ta="center" py="xl">
            <Loader size="md" />
          </Box>
        )}

        {error && (
          <Alert color="red" title="Error" mb="lg">
            {error}
          </Alert>
        )}

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          {branches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onClick={() => handleBranchClick(branch.id)}
            />
          ))}
        </SimpleGrid>

        {branches.length === 0 && !loading && !error && (
          <Text ta="center" c="dimmed" py="xl">
            No hay restaurantes disponibles en este momento.
          </Text>
        )}
      </Box>

      <Divider my="xl" />

      <Box component="footer" ta="center" c="dimmed" py="md" fz="sm">
        <Text>© 2023 Smarty Delivery. Todos los derechos reservados.</Text>
      </Box>
    </Container>
  );
}
