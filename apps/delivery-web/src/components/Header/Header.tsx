'use client';

import { useState, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import {
  SEARCH_TEXTS,
  BRANCH_TEXTS,
  HEADER_TEXTS,
} from '../../config/constants';
import styles from './Header.module.css';

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
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Handle scroll event to collapse/expand header
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderCollapsed(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
    };
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

  const headerContainerClass = isHeaderCollapsed
    ? `${styles.headerContainer} ${styles.collapsedHeader}`
    : styles.headerContainer;

  return (
    <>
      {/* Closed notification banner */}
      {/* {showClosedNotification && (
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
          <Text size="sm">
            {closedMessage || BRANCH_TEXTS.BRANCH_CLOSED_ALERT}
          </Text>
        </Box>
      )} */}

      <Box className={headerContainerClass} data-testid="header">
        {/* Top black header section */}
        <Box className={styles.topHeader} data-testid="top-header">
          {/* Menu button */}
          <Box
            className={styles.menuButtonContainer}
            data-testid="header-menu-button-container"
          >
            <MenuButton onClick={toggle} />
          </Box>

          {/* Logo */}
          <Box
            className={styles.logoContainer}
            data-testid="header-logo-container"
          >
            <Logo />
          </Box>

          {/* Search bar in collapsed state */}
          {showSearchBar && isHeaderCollapsed && (
            <Box
              className={styles.searchContainer}
              data-testid="header-search-container-collapsed"
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
        </Box>

        {/* Bottom header section with background image */}
        <Box className={styles.bottomHeader} data-testid="bottom-header">
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
          <Box className={styles.headerOverlay} data-testid="header-overlay" />

          {/* SUCURSALES heading */}
          <Text className={styles.branchesTitle} data-testid="header-title">
            {HEADER_TEXTS.SUCURSALES}
          </Text>

          {/* Search bar in expanded state */}
          {showSearchBar && !isHeaderCollapsed && (
            <Box
              className={styles.searchContainer}
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
        </Box>
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box
        style={{
          height: showClosedNotification
            ? '323px' // 70px top header + 210px bottom header + 43px notification
            : '280px', // 70px top header + 210px bottom header
          transition: 'height 0.3s ease',
        }}
        data-testid="header-spacer"
      />

      {/* Mobile Navigation Drawer */}
      <MenuDrawer opened={opened} onClose={close} onNavigate={handleNavigate} />
    </>
  );
};

export default Header;
