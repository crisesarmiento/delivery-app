'use client';

import { Container, ActionIcon, rem, Box, Text, Divider } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header';

export default function HomePage() {
  const branches = branchesMock;

  return (
    <>
      <Header showSearchBar={true} />
      <Box style={{ backgroundColor: '#fff' }}>
        <Container size="xl" py="xl">
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: rem(20),
              marginBottom: rem(40),
            }}
          >
            {branches.map((branch, index) => (
              <Container
                key={`${branch.id}-${index}`}
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '24px',
                }}
              >
                <BranchCard
                  branch={branch}
                  onClick={() => {
                    console.log(`Branch clicked: ${branch.name}`);
                  }}
                />
              </Container>
            ))}
          </Box>

          <Divider my="xl" />

          <Container style={{ padding: '20px 0' }}>
            <Box style={{ marginBottom: '20px' }}>
              <Text fw={600}>Powered by</Text>
              <Text fw={700} size="xl">
                SMARTY
              </Text>
            </Box>

            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box style={{ display: 'flex', gap: '15px' }}>
                <ActionIcon variant="subtle" color="gray" radius="xl">
                  <span style={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                    f
                  </span>
                </ActionIcon>
                <ActionIcon variant="subtle" color="gray" radius="xl">
                  <span style={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                    t
                  </span>
                </ActionIcon>
                <ActionIcon variant="subtle" color="gray" radius="xl">
                  <span style={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                    i
                  </span>
                </ActionIcon>
              </Box>

              <Container>
                <Box style={{ display: 'flex', gap: '20px' }}>
                  <Text size="sm" c="dimmed">
                    Acerca de Smarty
                  </Text>
                  <Text size="sm" c="dimmed">
                    Contacto
                  </Text>
                </Box>
              </Container>
            </Box>

            <Text size="xs" c="dimmed" ta="center" mt={20}>
              Copyright 2023 smarty.com | Todos los derechos reservados |
              Política de privacidad | Términos y Condiciones de Uso
            </Text>
          </Container>
        </Container>
      </Box>
    </>
  );
}
