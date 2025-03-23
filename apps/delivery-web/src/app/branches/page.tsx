'use client';

import { useState } from 'react';
import { Container, Title, TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconClock } from '@tabler/icons-react';
import BranchCard from '../../components/BranchCard';
import { branchesMock } from '../../mocks/branches.mock';
import styles from './page.module.css';

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBranches = branchesMock.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container size="xl" py="xl">
      <Title order={1} className={styles.title}>
        SUCURSALES
      </Title>

      <div className={styles.searchContainer}>
        <TextInput
          className={styles.searchInput}
          placeholder="Busca una sucursal..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#B3FF00',
                borderRadius: '7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px',
              }}
            >
              <IconSearch size={16} stroke={2} color="#000000" />
            </ActionIcon>
          }
          rightSectionWidth={42}
        />
      </div>

      {/* Example of using the clock icon */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          color: '#939393',
        }}
      >
        <IconClock size={18} stroke={2} style={{ marginRight: '8px' }} />
        <span>Horario de atención</span>
      </div>

      <div className={styles.cardGrid}>
        {filteredBranches.map((branch, index) => (
          <BranchCard
            key={`${branch.id}-${index}`}
            branch={branch}
            onClick={() => {
              console.log(`Branch clicked: ${branch.name}`);
              // TODO: Navigate to branch detail page
            }}
          />
        ))}
      </div>
    </Container>
  );
}
