'use client';

import { useState, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import ClosedNotification from '../ClosedNotification';
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

  // Home page header
  return (
    <>
      {/* Closed notification banner */}
      {showClosedNotification && <ClosedNotification message={closedMessage} />}

      {/* Fixed hero header */}
      <Box
        component="header"
        style={{
          position: 'fixed',
          width: '100%',
          maxWidth: '100%',
          height: '283px',
          left: '0',
          top: showClosedNotification ? '34px' : '0',
          zIndex: 100,
          overflow: 'hidden',
        }}
        data-testid="header"
      >
        {/* Background image */}
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            maxWidth: '100%',
            height: '283px',
            left: 0,
            top: 0,
            backgroundImage: 'url(/images/hero-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflowX: 'hidden',
          }}
          data-testid="header-background"
        />

        {/* Solid black rectangle on the left */}
        <Box
          className="left-black-rectangle"
          style={{
            position: 'absolute',
            height: '283px',
            left: 0,
            top: 0,
            backgroundColor: '#000000',
            width: '50%',
            maxWidth: '1440px',
          }}
          data-testid="header-left-rectangle"
        />

        {/* Overlay covering the entire header */}
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '283px',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
          data-testid="header-overlay"
        />

        {/* Content container - positioned above the backgrounds */}
        <Box
          style={{
            position: 'relative',
            zIndex: 5,
            height: '100%',
            width: '100%',
            padding: '0 20px',
          }}
          data-testid="header-content"
        >
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
        </Box>
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box style={{ height: '283px' }} data-testid="header-spacer" />

      {/* Mobile Navigation Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );
};

export default Header;
