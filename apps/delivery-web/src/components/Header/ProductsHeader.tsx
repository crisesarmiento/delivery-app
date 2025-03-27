'use client';

import { useState } from 'react';
import { Box, Text, Flex, Title, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import { IBranch } from '@/types';
import ClosedNotification from '../ClosedNotification';

interface ProductsHeaderProps {
  branch: IBranch;
  onBackClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isClosed?: boolean;
  closedMessage?: string;
}

export function ProductsHeader({
  branch,
  onBackClick,
  searchValue = '',
  onSearchChange,
  isClosed = false,
  closedMessage,
}: ProductsHeaderProps) {
  const { name, address, phoneNumber } = branch;
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

  return (
    <>
      {/* Closed notification banner */}
      {isClosed && <ClosedNotification message={closedMessage} />}

      {/* Fixed hero header */}
      <Box
        component="header"
        style={{
          position: 'fixed',
          width: '100%',
          height: '283px',
          left: '0px',
          top: isClosed ? '34px' : '0px',
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

          {/* Back button */}
          <Flex
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              position: 'absolute',
              left: '80px',
              top: '93px',
            }}
          >
            <Box
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActionIcon
                variant="transparent"
                onClick={onBackClick}
                style={{
                  width: '100%',
                  height: '100%',
                  background: '#000000',
                }}
              >
                <IconChevronLeft
                  width={12}
                  height={12}
                  color="#FFFFFF"
                  stroke={2}
                />
              </ActionIcon>
            </Box>
            <Text
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
                display: 'flex',
                alignItems: 'center',
                color: '#FFFFFF',
                letterSpacing: '0px',
              }}
            >
              Atrás
            </Text>
          </Flex>

          {/* Branch info */}
          <Flex
            direction="column"
            align="flex-start"
            gap={8}
            style={{
              position: 'absolute',
              width: '100%',
              height: '74px',
              left: '80px',
              top: '140px',
            }}
          >
            <Title
              order={1}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '30px',
                lineHeight: '38px',
                display: 'flex',
                alignItems: 'center',
                color: '#FFFFFF',
                letterSpacing: '0px',
                marginBottom: '8px',
              }}
            >
              {name}
            </Title>
            <Text
              style={{
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '24px',
                display: 'flex',
                alignItems: 'center',
                color: '#FFFFFF',
              }}
            >
              {address} | {phoneNumber}
            </Text>
          </Flex>

          {/* Search bar */}
          <Box
            style={{
              position: 'absolute',
              left: '80px',
              top: '231.91px',
              width: '512px',
              height: '39.54px',
              filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))',
            }}
          >
            <SearchBar
              value={onSearchChange ? searchValue : internalSearchValue}
              onChange={handleSearchChange}
              placeholder="Buscar un Producto..."
              styles={{
                root: {
                  width: '512px',
                },
                wrapper: {
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '0px 16px',
                  gap: '8px',
                  width: '100%',
                  height: '44px',
                  background: '#F8FAFC',
                  border: '1px solid #F8FAFC',
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
        </Box>

        {/* Menu Drawer */}
        <MenuDrawer
          opened={opened}
          onClose={close}
          onNavigate={handleNavigate}
        />
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box style={{ height: '283px' }} />
    </>
  );
}

export default ProductsHeader;
