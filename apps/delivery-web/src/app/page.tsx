'use client';

import { useMantineTheme } from '@mantine/core';
import Header from '@/components/Header/Header';
import ContentWrapper from '../components/ContentWrapper';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, useRef } from 'react';
import { normalizeText } from '@/utils/string';
import { BRANCH_TEXTS } from '@/config/constants';
import { useNav } from '@/context/navContext';
import AppLoader from '@/components/Loader/AppLoader';
import BranchesContainer from '@/components/BranchesContainer/BranchesContainer';
import useIsMobile from '@/hooks/useIsMobile';

export default function HomePage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { branches, setActiveBranch, loading } = useNav();
  const [searchValue, setSearchValue] = useState('');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const prevScrollPosition = useRef(0);

  const headerRef = useRef<HTMLDivElement>(null);

  const headerHeight = isMobile ? 200 : 280;
  const collapsedHeaderHeight = isMobile ? 40 : 70;

  const topOffset = isHeaderCollapsed ? collapsedHeaderHeight : headerHeight;

  const [headerActualHeight, setHeaderActualHeight] = useState(topOffset);

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
        {loading ? (
          <AppLoader message="Cargando sucursales..." size="lg" />
        ) : (
          <BranchesContainer
            branches={filteredBranches}
            onBranchClick={(branch) => {
              setActiveBranch(branch);
              router.push(`/branches/${branch.id}`);
            }}
            isMobile={isMobile}
          />
        )}
      </ContentWrapper>
    </>
  );
}
