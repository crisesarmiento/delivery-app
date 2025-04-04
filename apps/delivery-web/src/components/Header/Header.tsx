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
  const placeholder = isMobile
    ? SEARCH_TEXTS.FOOD_SEARCH_PLACEHOLDER
    : SEARCH_TEXTS.BRANCH_SEARCH_PLACEHOLDER;

  const headerContent = (
    <>
      {/* Logo */}
      <Box
        style={{
          position: 'absolute',
          left: isMobile ? '71px' : '5%',
          top: '29px',
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
          top: '23px',
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
          top: '114px',
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
            top: '176.91px',
            filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))',
          }}
          data-testid="header-search-container"
        >
          <SearchBar
            value={onSearchChange ? searchValue : internalSearchValue}
            onChange={handleSearchChange}
            placeholder={placeholder}
            styles={{
              root: {
                width: '100%',
              },
              wrapper: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px 16px',
                gap: '8px',
                height: '44px',
                background: '#FFFFFF',
                border: '1px solid #FFFFFF',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.02)',
                borderRadius: '4px',
              },
              input: {
                width: 'calc(100% - 40px)',
                height: '24px',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#6C7684',
                background: 'transparent',
                border: 'none',
                '&::placeholder': {
                  color: '#6C7684',
                },
                '&:focus': {
                  border: 'none',
                },
              },
              section: {
                paddingRight: 0,
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
