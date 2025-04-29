'use client';

import { Box, Text } from '@mantine/core';
import Logo from '@/components/Header/Logo/Logo';
import MenuButton from '@/components/Header/MenuButton/MenuButton';
import styles from './CheckoutHeader.module.css';
import { useDisclosure } from '@mantine/hooks';
import MenuDrawer from '../../MenuDrawer/MenuDrawer';
import { useRouter } from 'next/navigation';
import { CheckoutHeaderProps } from '@/components/Header/types';
import { useNav } from '@/context/navContext';

export default function CheckoutHeader({
  isClosed = false,
  closedMessage,
}: CheckoutHeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();

  const { activeBranch } = useNav();

  const handleNavigate = (route: string) => {
    router.push(route);
    close();
  };

  return (
    <>
      {/* Closed notification banner */}
      {isClosed && (
        <Box
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#FF385C',
            color: 'white',
            textAlign: 'center',
            padding: '8px',
            zIndex: 102,
            margin: 0,
          }}
        >
          <Text size="sm">{closedMessage}</Text>
        </Box>
      )}
      <Box className={styles.headerContainer} data-testid="checkout-header">
        <Box className={styles.topHeader}>
          <Box
            className={styles.menuButtonContainer}
            data-testid="header-menu-button-container"
          >
            <MenuButton onClick={toggle} />
          </Box>

          {/* Logo */}
          <Box
            className={styles.logoContainer}
            data-testid="header-logo-container"
          >
            <Logo />
          </Box>
        </Box>
      </Box>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <Box style={{ height: isClosed ? '113px' : '70px' }} />

      {/* Menu Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );
}
