'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Text } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';
import { Logo, MenuButton, SearchBar } from './HeaderComponents';
import { SEARCH_TEXTS, HEADER_TEXTS } from '../../config/constants';
import styles from './Header.module.css';

interface HeaderProps {
  showSearchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showClosedNotification?: boolean;
  closedMessage?: string;
  isFiltering?: boolean;
}

const Header = ({
  showSearchBar = true,
  searchValue = '',
  onSearchChange,
  showClosedNotification = false,
  closedMessage,
  isFiltering = false,
}: HeaderProps) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);

  // Get headroom state from Mantine hook
  const pinned = useHeadroom({ fixedAt: 120 });

  // TODO: Remove this once we have a better way to handle the header state
  console.log('closedMessage', closedMessage);

  // Add a search active state to lock header state during typing
  const [isSearchActive, setIsSearchActive] = useState(false);
  // Store the latest header state before search became active
  const [lockedHeaderState, setLockedHeaderState] = useState(false);

  // Determine if header should be collapsed based on pinned state and search activity
  const isHeaderCollapsed = isSearchActive ? lockedHeaderState : !pinned;

  // Emit a custom event when the header state changes to notify ContentWrapper
  useEffect(() => {
    // Create and dispatch a custom event with the header state
    const headerStateEvent = new CustomEvent('header-state-change', {
      detail: { collapsed: isHeaderCollapsed },
      bubbles: true,
    });
    window.dispatchEvent(headerStateEvent);
  }, [isHeaderCollapsed]);

  const router = useRouter();

  // Refs for search bar components to manage focus during transitions
  const expandedSearchRef = useRef<HTMLInputElement>(null);
  const collapsedSearchRef = useRef<HTMLInputElement>(null);

  // Track previous header state to detect changes
  const prevCollapsedStateRef = useRef(isHeaderCollapsed);

  useEffect(() => {
    const checkIfMobile = () => {
      return window.innerWidth <= 768;
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

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

  // Update for the search bar placeholder
  const placeholder = SEARCH_TEXTS.BRANCH_SEARCH_PLACEHOLDER;

  const headerContainerClass = isHeaderCollapsed
    ? `${styles.headerContainer} ${styles.collapsedHeader}`
    : styles.headerContainer;

  return (
    <>
      <Box className={headerContainerClass} data-testid="header">
        {/* Top black header section */}
        <Box className={styles.topHeader} data-testid="top-header">
          {/* Content container for centered elements */}
          <Box className={styles.contentContainer}>
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
            {showSearchBar && (
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
                  placeholder={placeholder}
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
            )}
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

            {/* SUCURSALES heading */}
            <Text className={styles.branchesTitle} data-testid="header-title">
              {HEADER_TEXTS.SUCURSALES}
            </Text>

            {/* Search bar in expanded state */}
            {showSearchBar && (
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
                  placeholder={placeholder}
                  variant="white"
                  autoFocus={!isHeaderCollapsed}
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
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box
        style={{
          height:
            isHeaderCollapsed && isFiltering
              ? '80px' // Reduced height when header is collapsed and filtering
              : showClosedNotification
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
