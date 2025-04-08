'use client';

import { useState, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import BaseHeader from './BaseHeader';
import { SEARCH_TEXTS, BRANCH_TEXTS } from '../../config/constants';

interface HeaderProps {
  showSearchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showClosedNotification?: boolean;
  closedMessage?: string;
}

const Header = ({
  showSearchBar = true,
  searchValue = '',
  onSearchChange,
  showClosedNotification = false,
  closedMessage,
}: HeaderProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleNavigate = (route: string) => {
    router.push(route);
    close();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setInternalSearchValue(newValue);
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };

  // Update for the search bar placeholder
  const placeholder = SEARCH_TEXTS.BRANCH_SEARCH_PLACEHOLDER;

  const headerContent = (
    <>
      {/* Logo */}
      <Box
        style={{
          position: 'absolute',
          left: isMobile ? '71px' : '5%',
          top: '22px',
        }}
        data-testid="header-logo-container"
      >
        <Logo />
      </Box>

      {/* Menu icon */}
      <Box
        style={{
          position: 'absolute',
          left: isMobile ? '23px' : '2%',
          top: '22px',
          cursor: 'pointer',
        }}
        data-testid="header-menu-button-container"
      >
        <MenuButton onClick={toggle} />
      </Box>

      {/* SUCURSALES heading */}
      <Text
        style={{
          position: 'absolute',
          left: isMobile ? '80px' : '5%',
          top: '80px',
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: isMobile ? '28px' : '36px',
          lineHeight: isMobile ? '32px' : '38px',
          display: 'flex',
          alignItems: 'center',
          color: '#FFFFFF',
        }}
        data-testid="header-title"
      >
        {BRANCH_TEXTS.BRANCHES_TITLE}
      </Text>

      {showSearchBar && (
        <Box
          className="search-container"
          style={{
            position: 'absolute',
            top: '140px',
            filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: isMobile ? 'calc(100% - 32px)' : '480px',
            margin: '0 auto',
            left: isMobile ? '16px' : '50%',
            transform: isMobile ? 'none' : 'translateX(-50%)',
          }}
          data-testid="header-search-container"
        >
          <SearchBar
            value={onSearchChange ? searchValue : internalSearchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            variant="white"
            styles={{
              root: {
                width: '100%',
              },
            }}
            data-testid="header-search-bar"
          />
        </Box>
      )}

      {/* Mobile Navigation Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );

  return (
    <BaseHeader
      showClosedNotification={showClosedNotification}
      closedMessage={closedMessage}
      headerContent={headerContent}
    />
  );
};

export default Header;
