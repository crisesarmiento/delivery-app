'use client';

import { useState } from 'react';
import {
  Box,
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Sucursales', href: '/branches' },
  { label: 'Sobre Nosotros', href: '/about' },
];

interface HeaderProps {
  showSearchBar?: boolean;
}

export function Header({ showSearchBar = true }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      {/* Fixed hero header */}
      <Box
        component="header"
        style={{
          position: 'fixed',
          width: '100%',
          height: '283px',
          left: '0px',
          top: '0px',
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
          <Text
            style={{
              position: 'absolute',
              left: '71px',
              top: '29px',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 800,
              fontSize: '16px',
              lineHeight: '100%',
              color: '#FFFFFF',
            }}
          >
            PUNTO 33
          </Text>

          {/* Menu icon */}
          <Box
            style={{
              position: 'absolute',
              width: '32px',
              height: '32px',
              left: '23px',
              top: '23px',
              cursor: 'pointer',
            }}
            onClick={toggle}
          >
            <Image
              src="/images/hamburguer-menu.svg"
              width={32}
              height={32}
              alt="Menu"
            />
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
              <TextInput
                placeholder="Busca una sucursal..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                rightSection={
                  <ActionIcon
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#B3FF00',
                      borderRadius: '7px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3px',
                    }}
                  >
                    <IconSearch size={16} stroke={2} color="#000000" />
                  </ActionIcon>
                }
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
      <Drawer
        opened={opened}
        onClose={close}
        title="Menú"
        position="left"
        size="xs"
      >
        <Stack gap="md" mt="md">
          {NAV_ITEMS.map((item) => (
            <UnstyledButton
              key={item.label}
              component={Link}
              href={item.href}
              onClick={close}
              style={{
                padding: '12px 16px',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Text size="md">{item.label}</Text>
            </UnstyledButton>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}

export default Header;
