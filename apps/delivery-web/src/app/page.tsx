'use client';

import { Box, Container, Text, useMantineTheme } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { updateBranchesStatus } from '../utils/branch';
import { BRANCH_TEXTS } from '../config/constants';
import Footer from '../components/Footer/Footer';

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

  // Filter branches based on search
  const filteredBranches = useMemo(() => {
    if (!searchValue) return branches;

    return branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchValue.toLowerCase())
    );
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
          maxWidth: '100%',
          overflowX: 'hidden',
          marginLeft: isMobile ? '0' : '80px',
          marginRight: isMobile ? '0' : '80px',
        }}
      >
        <Container
          size="xl"
          py="xl"
          px={{ base: theme.spacing.md, md: theme.spacing.xl, lg: '80px' }}
          style={{
            maxWidth: '100%',
            overflowX: 'hidden',
          }}
        >
          {filteredBranches.length > 0 ? (
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${
                  isMobile ? '230px' : '250px'
                }, 1fr))`,
                gap: theme.spacing.md,
                marginBottom: theme.spacing.lg,
                maxWidth: '100%',
                overflowX: 'hidden',
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
                    // Ensure cards don't get cut off on smaller screens
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
      <Footer />
    </>
  );
}
