'use client';

import { useState } from 'react';
import {
  Box,
  Burger,
  Drawer,
  Stack,
  Text,
  UnstyledButton,
  TextInput,
  ActionIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { IconSearch } from '@tabler/icons-react';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Sucursales', href: '/' },
  { label: 'Sobre Nosotros', href: '/about' },
];

interface HeaderProps {
  showSearchBar?: boolean;
}

export function Header({ showSearchBar = true }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box
      component="header"
      style={{
        position: 'relative',
        width: '100%',
        height: '283px',
        zIndex: 100,
      }}
    >
      {/* Background image with overlay */}
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
        style={{
          position: 'absolute',
          width: '49%', // Approximating 704px out of 1440px
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
          padding: '16px',
        }}
      >
        <Burger
          opened={opened}
          onClick={toggle}
          color="white"
          aria-label="Toggle navigation"
          size="sm"
        />

        {/* SUCURSALES heading */}
        <Box
          style={{
            position: 'absolute',
            left: '5.56%',
            right: '78.47%',
            top: '10.76%',
            bottom: '86.01%',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '30px',
            lineHeight: '38px',
            display: 'flex',
            alignItems: 'center',
            color: '#FFFFFF',
          }}
        >
          SUCURSALES
        </Box>

        {showSearchBar && (
          <Box
            style={{
              position: 'absolute',
              left: '5.56%',
              right: '58.89%',
              top: '16.71%',
              bottom: '79.56%',
              filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 0,
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
                  <IconSearch size="18px" stroke={2} color="#000000" />
                </ActionIcon>
              }
              styles={{
                root: {
                  width: '512px',
                },
                wrapper: {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px 16px',
                  gap: '8px',
                  height: '44px',
                  background: '#F8FAFC',
                  border: '1px solid #F8FAFC',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.02)',
                  borderRadius: '4px',
                },
                input: {
                  width: '440px',
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
    </Box>
  );
}

export default Header;
