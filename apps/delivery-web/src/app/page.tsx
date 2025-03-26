'use client';

import { Box } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const branches = branchesMock;
  const [searchValue, setSearchValue] = useState('');

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
                key={`${branch.id}-${index}`}
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
