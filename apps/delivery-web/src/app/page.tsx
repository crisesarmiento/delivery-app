'use client';

import { Box, Container, Text, useMantineTheme } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { updateBranchesStatus } from '../utils/branch';
import { normalizeText } from '../utils/string';
import { BRANCH_TEXTS } from '../config/constants';

export default function HomePage() {
  const router = useRouter();
  const [branches, setBranches] = useState(branchesMock);
  const [searchValue, setSearchValue] = useState('');
  const theme = useMantineTheme();
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <>
      <Header
        showSearchBar={true}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        showClosedNotification={hasClosedBranches}
        closedMessage={BRANCH_TEXTS.SOME_BRANCHES_CLOSED}
      />

      <Container
        fluid
        px={0}
        style={{
          backgroundColor: theme.colors.neutral[0],
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'center',
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
              }}
            >
              {filteredBranches.map((branch) => (
                <Box
                  key={branch.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: theme.spacing.xl,
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
    </>
  );
}
