'use client';

import { useState, useEffect } from 'react';
import { Box, Text, Flex, Title, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import { IBranch } from '@/types';
import { HEADER_TEXTS, SEARCH_TEXTS } from '../../config/constants';
import styles from './ProductsHeader.module.css';

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
          }}
        >
          <Text size="sm">{closedMessage}</Text>
        </Box>
      )}

      <Box className={styles.headerContainer} data-testid="header">
        {/* Top black header section */}
        <Box className={styles.topHeader} data-testid="top-header">
          {/* Content container for centered elements */}
          <Box className={styles.contentContainer}>
            {/* Logo */}
            <Box className={styles.logoContainer}>
              <Logo />
            </Box>

            {/* Menu icon */}
            <Box className={styles.menuButtonContainer}>
              <MenuButton onClick={toggle} />
            </Box>

            {/* Back button - moved to top header */}
            <Flex className={styles.backButtonContainer}>
              <Box className={styles.backIconContainer}>
                <ActionIcon
                  variant="transparent"
                  onClick={onBackClick}
                  className={styles.backIcon}
                >
                  <IconChevronLeft
                    width={12}
                    height={12}
                    color="#FFFFFF"
                    stroke={2}
                  />
                </ActionIcon>
              </Box>
              <Text onClick={onBackClick} className={styles.backText}>
                {HEADER_TEXTS.BACK_BUTTON}
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* Bottom header section with image background */}
        <Box className={styles.bottomHeader} data-testid="bottom-header">
          <Box className={styles.bottomHeaderContent}>
            {/* Background image */}
            <Box
              className={styles.headerBackground}
              data-testid="header-background"
            />

            {/* Black overlay on the left side */}
            <Box
              className={styles.leftBlackOverlay}
              data-testid="header-left-overlay"
            />

            {/* Dark overlay */}
            <Box
              className={styles.headerOverlay}
              data-testid="header-overlay"
            />

            {/* Branch info */}
            <Flex
              direction="column"
              align="flex-start"
              gap={8}
              className={styles.branchInfoContainer}
            >
              <Title
                order={1}
                className={styles.branchName}
                style={{
                  fontSize: isMobile ? '24px' : '30px',
                  lineHeight: isMobile ? '30px' : '38px',
                }}
              >
                {name}
              </Title>
              <Text
                className={styles.branchDetails}
                style={{
                  fontSize: isMobile ? '14px' : '16px',
                  lineHeight: isMobile ? '20px' : '24px',
                }}
              >
                {address} | {phoneNumber}
              </Text>
            </Flex>

            {/* Search bar */}
            <Box className={styles.searchContainer}>
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
          </Box>
        </Box>
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box
        style={{
          height: isClosed
            ? '323px' // 70px top header + 210px bottom header + 43px notification
            : '280px', // 70px top header + 210px bottom header
          transition: 'height 0.3s ease',
        }}
        data-testid="header-spacer"
      />

      {/* Menu Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );
}

export default ProductsHeader;
