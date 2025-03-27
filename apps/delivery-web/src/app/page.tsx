'use client';

import { Box } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { updateBranchesStatus } from '../utils/branch';

export default function HomePage() {
  const router = useRouter();
  const [branches, setBranches] = useState(branchesMock);
  const [searchValue, setSearchValue] = useState('');

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
        showClosedNotification={false}
        closedMessage="Una o más sucursales se encuentran cerradas en este momento."
      />

      <Box style={{ backgroundColor: '#fff', padding: '0 80px' }}>
        <Box py="xl">
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '23px',
            }}
          >
            {filteredBranches.map((branch, index) => (
              <Box
                key={branch.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '24px',
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
        </Box>
      </Box>
    </>
  );
}
