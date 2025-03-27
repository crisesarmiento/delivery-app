'use client';

import { useState } from 'react';
import { Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import ClosedNotification from '../ClosedNotification';

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
  const router = useRouter();

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
          height: '283px',
          left: '0px',
          top: showClosedNotification ? '34px' : '0px',
          zIndex: 100,
        }}
      >
        {/* Background image */}
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '283px',
            left: 0,
            top: 0,
            backgroundImage: 'url(/images/hero-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Solid black rectangle on the left */}
        <Box
          className="left-black-rectangle"
          style={{
            position: 'absolute',
            width: '50%',
            height: '283px',
            left: 0,
            top: 0,
            backgroundColor: '#000000',
          }}
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
        />

        {/* Content container - positioned above the backgrounds */}
        <Box
          style={{
            position: 'relative',
            zIndex: 5,
            height: '100%',
          }}
        >
          {/* Logo */}
          <Box
            style={{
              position: 'absolute',
              left: '71px',
              top: '29px',
            }}
          >
            <Logo />
          </Box>

          {/* Menu icon */}
          <Box
            style={{
              position: 'absolute',
              left: '23px',
              top: '23px',
              cursor: 'pointer',
            }}
          >
            <MenuButton onClick={toggle} />
          </Box>

          {/* SUCURSALES heading */}
          <Text
            style={{
              position: 'absolute',
              left: '80px',
              top: '114px',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '36px',
              lineHeight: '38px',
              display: 'flex',
              alignItems: 'center',
              color: '#FFFFFF',
            }}
          >
            SUCURSALES
          </Text>

          {showSearchBar && (
            <Box
              className="search-container"
              style={{
                position: 'absolute',
                left: '80px',
                top: '176.91px',
                width: '512px',
                filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))',
              }}
            >
              <SearchBar
                value={onSearchChange ? searchValue : internalSearchValue}
                onChange={handleSearchChange}
                placeholder="Busca una sucursal..."
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
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box style={{ height: '283px' }} />

      {/* Mobile Navigation Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );
};

export default Header;
