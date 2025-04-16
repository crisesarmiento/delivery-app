'use client';

import { Box, Text } from '@mantine/core';
import { IBranch } from '@/types';
import { Logo, MenuButton } from './HeaderComponents';
import styles from './CheckoutHeader.module.css';
import { useDisclosure } from '@mantine/hooks';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import { useRouter } from 'next/navigation';
import { HEADER_TEXTS } from '@/config/constants';
interface CheckoutHeaderProps {
  branch: IBranch;
  isClosed: boolean;
  closedMessage: string;
}

export default function CheckoutHeader({
  branch,
  isClosed = false,
  closedMessage,
}: CheckoutHeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();

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
