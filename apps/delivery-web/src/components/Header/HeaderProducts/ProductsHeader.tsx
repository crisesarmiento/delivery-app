'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { Box, Text, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../../MenuDrawer/MenuDrawer';
import SearchBar from '@/components/Header/SearchBar/SearchBar';
import Logo from '@/components/Header/Logo/Logo';
import MenuButton from '@/components/Header/MenuButton/MenuButton';
import BackButton from '@/components/Header/BackButton/BackButton';
import { SEARCH_TEXTS } from '@/config/constants';
import styles from './ProductsHeader.module.css';
import { ProductsHeaderProps } from '@/components/Header/types';
import ClosedNotificationBanner from '../ClosedNotificationBanner';

const ProductsHeader = forwardRef<HTMLDivElement, ProductsHeaderProps>(
  (
    {
      branch,
      onBackClick,
      searchValue = '',
      onSearchChange,
      isClosed = false,
      isFiltering = false,
      isHeaderCollapsed,
      collapsedHeaderHeight,
    },
    ref
  ) => {
    const { name, address, phoneNumber } = branch;
    const [opened, { toggle, close }] = useDisclosure(false);
    const [internalSearchValue, setInternalSearchValue] = useState(searchValue);
    const isMobile = useIsMobile();
    const router = useRouter();

    // Add a search active state to lock header state during typing
    const [isSearchActive, setIsSearchActive] = useState(false);
    // Store the latest header state before search became active
    const [lockedHeaderState, setLockedHeaderState] = useState(false);

    // Refs for search bar components to manage focus during transitions
    const expandedSearchRef = useRef<HTMLInputElement>(null);
    const collapsedSearchRef = useRef<HTMLInputElement>(null);

    // Track previous header state to detect changes
    const prevCollapsedStateRef = useRef(isHeaderCollapsed);

    // Handle autofocus when header state changes
    useEffect(() => {
      let cleanup: (() => void) | undefined;
      // Only run when the collapsed state changes
      if (prevCollapsedStateRef.current !== isHeaderCollapsed) {
        prevCollapsedStateRef.current = isHeaderCollapsed;

        // Small delay to let the animation complete
        const focusTimeout = setTimeout(() => {
          if (isHeaderCollapsed && collapsedSearchRef.current) {
            collapsedSearchRef.current.focus();
          } else if (!isHeaderCollapsed && expandedSearchRef.current) {
            expandedSearchRef.current.focus();
          }
        }, 400); // Match transition duration

        return () => clearTimeout(focusTimeout);
      }
      return cleanup;
    }, [isHeaderCollapsed]);

    const handleNavigate = (route: string) => {
      router.push(route);
      close();
    };

    const handleBackClick = () => {
      if (onBackClick) {
        onBackClick();
      } else {
        // Default behavior: go back in history
        router.back();
      }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      // If this is the first keystroke, lock the current header state
      if (!isSearchActive && newValue.length === 1) {
        setIsSearchActive(true);
        setLockedHeaderState(isHeaderCollapsed);
      }

      // If search is being cleared, unlock the header state
      if (isSearchActive && newValue.length === 0) {
        setIsSearchActive(false);
      }

      setInternalSearchValue(newValue);
      if (onSearchChange) {
        onSearchChange(newValue);
      }
    };

    const headerContainerClass = isHeaderCollapsed
      ? `${styles.headerContainer} ${styles.collapsedHeader}`
      : styles.headerContainer;

    return (
      <>
        <Box className={headerContainerClass} data-testid="header" ref={ref}>
          {/* Top black header section */}
          <Box className={styles.topHeader} data-testid="top-header">
            {/* Content container for centered elements */}
            <Box className={styles.contentContainer}>
              {/* Logo - always visible on mobile */}
              {isMobile && (
                <Box
                  className={styles.logoContainer}
                  data-testid="header-logo-container"
                >
                  <Logo />
                </Box>
              )}
              {isClosed && (
                <ClosedNotificationBanner
                  collapsedHeaderHeight={collapsedHeaderHeight}
                />
              )}
              {/* Menu button */}
              <Box
                className={styles.menuButtonContainer}
                data-testid="header-menu-button-container"
              >
                <MenuButton onClick={toggle} />
              </Box>

              {/* Logo - only visible on desktop */}
              {!isMobile && (
                <Box
                  className={styles.logoContainer}
                  data-testid="header-logo-container"
                >
                  <Logo />
                </Box>
              )}

              {/* Search bar in collapsed state */}
              <Box
                className={`${styles.searchContainer} ${
                  !isHeaderCollapsed ? styles.hiddenSearch : ''
                }`}
                data-testid="header-search-container-collapsed"
                style={{
                  opacity: isHeaderCollapsed ? 1 : 0,
                  pointerEvents: isHeaderCollapsed ? 'all' : 'none',
                }}
              >
                <SearchBar
                  ref={collapsedSearchRef}
                  value={onSearchChange ? searchValue : internalSearchValue}
                  onChange={handleSearchChange}
                  placeholder={
                    isMobile
                      ? SEARCH_TEXTS.FOOD_SEARCH_PLACEHOLDER
                      : SEARCH_TEXTS.PRODUCT_SEARCH_PLACEHOLDER
                  }
                  variant="white"
                  autoFocus={isHeaderCollapsed}
                  styles={{
                    root: {
                      width: '100%',
                    },
                  }}
                  data-testid="header-search-bar-collapsed"
                />
              </Box>
            </Box>
          </Box>

          {/* Bottom header section with background image */}
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

              {/* Back button for mobile */}
              {isMobile && (
                <Box
                  className={styles.backButtonWrapper}
                  data-testid="back-button-wrapper"
                >
                  <BackButton onClick={handleBackClick} />
                </Box>
              )}

              {/* Branch info */}
              <Flex
                direction="column"
                align="flex-start"
                gap={isMobile ? 4 : 8}
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

              {/* Search bar in expanded state */}
              <Box
                className={`${styles.searchContainer} ${
                  isHeaderCollapsed ? styles.hiddenSearch : ''
                }`}
                data-testid="header-search-container"
                style={{
                  opacity: isHeaderCollapsed ? 0 : 1,
                  pointerEvents: isHeaderCollapsed ? 'none' : 'all',
                }}
              >
                <SearchBar
                  ref={expandedSearchRef}
                  value={onSearchChange ? searchValue : internalSearchValue}
                  onChange={handleSearchChange}
                  placeholder={
                    isMobile
                      ? SEARCH_TEXTS.FOOD_SEARCH_PLACEHOLDER
                      : SEARCH_TEXTS.PRODUCT_SEARCH_PLACEHOLDER
                  }
                  variant="light-gray"
                  autoFocus={!isHeaderCollapsed}
                  styles={{
                    root: {
                      width: '100%',
                    },
                  }}
                  data-testid="header-search-bar"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Empty space to push content below fixed header */}
        <Box className={styles.headerSpacer} data-testid="header-spacer" />

        {/* Menu Drawer */}
        <MenuDrawer
          opened={opened}
          onClose={close}
          onNavigate={handleNavigate}
        />
      </>
    );
  }
);

ProductsHeader.displayName = 'ProductsHeader';

export default ProductsHeader;
