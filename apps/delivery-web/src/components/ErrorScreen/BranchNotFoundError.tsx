import { Box, Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function BranchNotFoundError() {
  const router = useRouter();
  return (
    <Box style={{ textAlign: 'center', marginTop: 60 }}>
      <Text size="xl" fw={700} color="red">
        Sucursal no encontrada
      </Text>
      <Text mt="md">
        La sucursal que intentaste visitar no existe o fue eliminada.
      </Text>
      <Button mt="xl" onClick={() => router.push('/')}>
        Ir al inicio
      </Button>
    </Box>
  );
}
