'use client';

import { Box, Container, Text, useMantineTheme } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import Header from '../components/Header/Header';
import ContentWrapper from '../components/ContentWrapper';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
import { normalizeText } from '../utils/string';
import { BRANCH_TEXTS } from '../config/constants';
import { useNav } from '@/context/navContext';
import AppLoader from '@/components/Loader/AppLoader';

export default function HomePage() {
  const router = useRouter();
  const { branches, setActiveBranch, loading } = useNav();
  const [searchValue, setSearchValue] = useState('');
  const theme = useMantineTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const prevScrollPosition = useRef(0);

  const headerRef = useRef<HTMLDivElement>(null);

  const headerHeight = isMobile ? 200 : 280;
  const collapsedHeaderHeight = isMobile ? 40 : 70;

  const topOffset = isHeaderCollapsed ? collapsedHeaderHeight : headerHeight;

  const [headerActualHeight, setHeaderActualHeight] = useState(topOffset);

  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function (...args: any[]) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  useEffect(() => {
    const checkIsMobile = debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 100);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Track scroll position to detect header collapse state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderCollapsed(currentScrollPos > 50);
      prevScrollPosition.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderActualHeight(height);
      }
    };

    updateHeaderHeight(); // Initial measurement
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isHeaderCollapsed]);

  const handleHeaderStateChange = useRef((event: CustomEvent) => {
    setIsHeaderCollapsed(event.detail.collapsed);
  }).current;

  // Check if any branches are closed
  const hasClosedBranches = useMemo(() => {
    return branches.some((branch) => !branch.isOpen);
  }, [branches]);

  // Filter branches based on search with accent-insensitive comparison
  const filteredBranches = useMemo(() => {
    if (!searchValue) return branches;

    const normalizedSearch = normalizeText(searchValue);

    return branches.filter((branch) => {
      const normalizedName = normalizeText(branch.name);
      const normalizedAddress = normalizeText(branch.address);
      const normalizedDescription = normalizeText(branch.description);

      return (
        normalizedName.includes(normalizedSearch) ||
        normalizedAddress.includes(normalizedSearch) ||
        normalizedDescription.includes(normalizedSearch)
      );
    });
  }, [searchValue, branches]);

  // Calculate if filtering is active and has results
  const isFiltering = useMemo(() => {
    return searchValue.length > 0 && filteredBranches.length < branches.length;
  }, [searchValue, filteredBranches.length, branches.length]);

  // Add event listener for header state change events
  useEffect(() => {
    window.addEventListener(
      'header-state-change',
      handleHeaderStateChange as EventListener
    );
    return () => {
      window.removeEventListener(
        'header-state-change',
        handleHeaderStateChange as EventListener
      );
    };
  }, [handleHeaderStateChange]);

  // Show loader while loading branches
  if (loading) {
    return <AppLoader message="Cargando sucursales..." size="lg" />;
  }

  return (
    <>
      <Header
        showSearchBar={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        showClosedNotification={hasClosedBranches}
        closedMessage={BRANCH_TEXTS.SOME_BRANCHES_CLOSED}
        isFiltering={isFiltering}
      />

      <ContentWrapper topOffset={headerActualHeight}>
        {loading && <AppLoader message="Cargando sucursales..." size="lg" />}
        {!loading && (
          <Container
            fluid
            px={0}
            style={{
              backgroundColor: theme.colors.neutral[0],
              width: '100%',
              maxWidth: '100%',
              overflowX: 'hidden',
              overflowY: 'visible',
              display: 'flex',
              justifyContent: 'center',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          >
            <Container
              size="xl"
              py="xl"
              px={{ base: theme.spacing.md, md: theme.spacing.xl, lg: '80px' }}
              style={{
                width: '100%',
                maxWidth: '1440px',
                overflowX: 'hidden',
                overflowY: 'visible',
                marginTop: isHeaderCollapsed && isFiltering ? 0 : 0,
              }}
            >
              {filteredBranches.length > 0 ? (
                <Box
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, minmax(${
                      isMobile ? '230px' : '240px'
                    }, 1fr))`,
                    gap: theme.spacing.md,
                    marginTop:
                      isHeaderCollapsed && isFiltering
                        ? 0 - headerActualHeight
                        : 0,
                    width: '100%',
                    maxWidth: '100%',
                    justifyContent: 'center',
                    paddingLeft: isMobile ? '8px' : '0',
                    paddingRight: isMobile ? '8px' : '0',
                    // Adjust top padding when filtering with collapsed header
                    paddingTop:
                      isHeaderCollapsed && isFiltering
                        ? 0 - headerActualHeight
                        : theme.spacing.md,
                  }}
                >
                  {filteredBranches.map((branch) => (
                    <Box
                      key={branch.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop:
                          isHeaderCollapsed && isFiltering
                            ? theme.spacing.xs
                            : theme.spacing.xl,
                        maxWidth: '100%',
                      }}
                    >
                      <BranchCard
                        branch={branch}
                        onClick={() => {
                          setActiveBranch(branch);
                          router.push(`/branches/${branch.id}`);
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box style={{ textAlign: 'center', padding: theme.spacing.xl }}>
                  <Text variant="body">{BRANCH_TEXTS.NO_BRANCHES_FOUND}</Text>
                </Box>
              )}
            </Container>
          </Container>
        )}
      </ContentWrapper>
    </>
  );
}
