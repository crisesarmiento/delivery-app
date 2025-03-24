'use client';

import { Container, Title, Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function BranchNotFound() {
  const router = useRouter();

  return (
    <Container size="md" py="xl" style={{ textAlign: 'center' }}>
      <Title order={1} mb="md">
        Página no encontrada
      </Title>
      <Text mb="xl">
        La sucursal que estás buscando no existe o no está disponible.
      </Text>
      <Button onClick={() => router.push('/branches')}>
        Volver a sucursales
      </Button>
    </Container>
  );
}
