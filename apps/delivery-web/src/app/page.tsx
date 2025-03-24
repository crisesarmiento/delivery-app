'use client';

import { Box } from '@mantine/core';
import BranchCard from '../components/BranchCard/BranchCard';
import { branchesMock } from '../mocks/branches.mock';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const branches = branchesMock;

  return (
    <>
      <Header showSearchBar={true} />
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
            {branches.map((branch, index) => (
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
                    console.log(`Branch clicked: ${branch.name}`);
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
