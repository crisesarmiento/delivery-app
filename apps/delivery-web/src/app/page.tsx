'use client';

import { Box, Container, Text, useMantineTheme } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header/Header';
import ContentWrapper from '../components/ContentWrapper';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
import { updateBranchesStatus } from '../utils/branch';
import { normalizeText } from '../utils/string';
import { BRANCH_TEXTS } from '../config/constants';

export default function HomePage() {
  const router = useRouter();
  const [branches, setBranches] = useState(branchesMock);
  const [searchValue, setSearchValue] = useState('');
  const theme = useMantineTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const prevScrollPosition = useRef(0);

  // Add responsive check for mobile devices
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIsMobile();

    // Set up an event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Clean up the event listener on component unmount
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

  // Add event listener for header state change events
  useEffect(() => {
    const handleHeaderStateChange = (event: CustomEvent) => {
      setIsHeaderCollapsed(event.detail.collapsed);
    };

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
  }, []);

  // Update branch open/closed status based on current time
  useEffect(() => {
    const updatedBranches = updateBranchesStatus(branchesMock);
    setBranches(updatedBranches);

    // Set up an interval to check status every minute
    const intervalId = setInterval(() => {
      const updatedBranches = updateBranchesStatus(branchesMock);
      setBranches(updatedBranches);
    }, 60000); // 60 seconds

    return () => clearInterval(intervalId);
  }, []);

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

      <ContentWrapper
        isHeaderCollapsed={isHeaderCollapsed}
        headerHeight={0}
        collapsedHeaderHeight={0}
      >
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
                  marginBottom: theme.spacing.lg,
                  width: '100%',
                  maxWidth: '100%',
                  justifyContent: 'center',
                  paddingLeft: isMobile ? '8px' : '0',
                  paddingRight: isMobile ? '8px' : '0',
                  // Adjust top padding when filtering with collapsed header
                  paddingTop:
                    isHeaderCollapsed && isFiltering
                      ? theme.spacing.xs
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
                      // Adjust top margin based on filtering state
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
      </ContentWrapper>
    </>
  );
}
