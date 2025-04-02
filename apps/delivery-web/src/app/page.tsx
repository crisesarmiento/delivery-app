'use client';

import { Box, Container, Text, useMantineTheme } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { updateBranchesStatus } from '../utils/branch';
import { BRANCH_TEXTS } from '../config/constants';

export default function HomePage() {
  const router = useRouter();
  const [branches, setBranches] = useState(branchesMock);
  const [searchValue, setSearchValue] = useState('');
  const theme = useMantineTheme();

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
  const filteredBranches = searchValue
    ? branches.filter(
        (branch) =>
          branch.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          branch.address.toLowerCase().includes(searchValue.toLowerCase())
      )
    : branches;

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
          marginLeft: '80px',
          marginRight: '80px',
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: theme.spacing.xs,
                marginBottom: theme.spacing.lg,
                maxWidth: '100%',
                overflowX: 'hidden',
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
