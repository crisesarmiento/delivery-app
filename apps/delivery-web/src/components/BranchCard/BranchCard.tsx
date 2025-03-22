'use client';

import { Branch } from '../../types';
import { Card, Text, Group, Badge, Stack, Image } from '@mantine/core';

interface BranchCardProps {
  branch: Branch;
  onClick?: () => void;
}

export function BranchCard({ branch, onClick }: BranchCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {branch.imageUrl && (
        <Card.Section>
          <Image src={branch.imageUrl} height={160} alt={branch.name} />
        </Card.Section>
      )}

      <Stack mt="md" mb="xs">
        <Text fw={500} size="lg">
          {branch.name}
        </Text>
        <Text size="sm" c="dimmed">
          {branch.address}
        </Text>

        <Group justify="space-between" mt="md">
          <Badge color={branch.isOpen ? 'green' : 'red'} variant="light">
            {branch.isOpen ? 'Abierto' : 'Cerrado'}
          </Badge>
          <Text size="xs" c="dimmed">
            {branch.openingHours}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}

export default BranchCard;
