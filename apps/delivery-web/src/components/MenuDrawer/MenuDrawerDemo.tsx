'use client';

import { useState } from 'react';
import { Button, Container, Text, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MenuDrawer } from './MenuDrawer';
import { IconMenu2 } from '@tabler/icons-react';

export function MenuDrawerDemo() {
  const [opened, { open, close }] = useDisclosure(false);
  const [lastNavigation, setLastNavigation] = useState<string | null>(null);

  const handleNavigate = (route: string) => {
    setLastNavigation(route);
    // In a real app, you would use router.push(route) here
    console.log(`Navigating to ${route}`);
  };

  return (
    <Container py="xl" pos="relative">
      <Box
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 900,
        }}
      >
        <Button
          onClick={open}
          variant="subtle"
          p={0}
          style={{
            background: 'transparent',
            color: '#000',
          }}
        >
          <IconMenu2 size={32} stroke={1.5} />
        </Button>
      </Box>

      <Text fz="xl" fw={700} mb="md" mt={50} ta="center">
        Demostración del Menú Lateral
      </Text>

      {lastNavigation && (
        <Text mt="lg" ta="center">
          Última navegación:{' '}
          <Text span fw={600}>
            {lastNavigation}
          </Text>
        </Text>
      )}

      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </Container>
  );
}

export default MenuDrawerDemo;
