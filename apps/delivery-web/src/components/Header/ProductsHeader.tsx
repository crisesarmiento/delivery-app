'use client';

import { useState, useEffect } from 'react';
import { Box, Text, Flex, Title, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import { IBranch } from '@/types';
import BaseHeader from './BaseHeader';
import { HEADER_TEXTS, SEARCH_TEXTS } from '../../config/constants';

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

  const headerContent = (
    <>
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
          left: isMobile ? '16px' : '80px',
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
          onClick={onBackClick}
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
          {HEADER_TEXTS.BACK_BUTTON}
        </Text>
      </Flex>

      {/* Branch info */}
      <Flex
        direction="column"
        align="flex-start"
        gap={8}
        style={{
          position: 'absolute',
          width: isMobile ? 'calc(100% - 32px)' : 'auto',
          height: '74px',
          left: isMobile ? '16px' : '80px',
          top: '140px',
        }}
      >
        <Title
          order={1}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: isMobile ? '24px' : '30px',
            lineHeight: isMobile ? '30px' : '38px',
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
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: isMobile ? '20px' : '24px',
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
          left: isMobile ? '16px' : '80px',
          top: '231.91px',
          width: isMobile ? 'calc(100% - 32px)' : '512px',
          height: '39.54px',
          filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.1))',
        }}
      >
        <SearchBar
          value={onSearchChange ? searchValue : internalSearchValue}
          onChange={handleSearchChange}
          placeholder={
            isMobile
              ? SEARCH_TEXTS.FOOD_SEARCH_PLACEHOLDER
              : SEARCH_TEXTS.PRODUCT_SEARCH_PLACEHOLDER
          }
          variant="light-gray"
          styles={{
            root: {
              width: '100%',
            },
          }}
        />
      </Box>

      {/* Menu Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );

  return (
    <BaseHeader
      showClosedNotification={isClosed}
      closedMessage={closedMessage}
      topOffset="0px"
      headerContent={headerContent}
    />
  );
}

export default ProductsHeader;
