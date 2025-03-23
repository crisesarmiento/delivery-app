'use client';

import { Box, Text, Stack, Group } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface BranchHoursTooltipProps {
  trigger: ReactNode;
  isVisible: boolean;
}

export function BranchHoursTooltip({
  trigger,
  isVisible,
}: BranchHoursTooltipProps) {
  if (!isVisible) {
    return <>{trigger}</>;
  }

  return (
    <Box style={{ position: 'relative' }}>
      {trigger}

      <Box
        style={{
          position: 'absolute',
          bottom: '100%',
          right: '0',
          width: '290px',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: 'white',
          border: '1px solid #eee',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          marginBottom: '10px',
          fontFamily: 'Inter',
        }}
      >
        {/* Triangle pointer */}
        <Box
          style={{
            position: 'absolute',
            bottom: '-6px',
            right: '20px',
            width: '12px',
            height: '12px',
            backgroundColor: 'white',
            border: '1px solid #eee',
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'rotate(45deg)',
          }}
        />

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <IconClock
            size={18}
            style={{ color: '#101828', marginRight: '8px' }}
          />
          <Text fw={600} size="md">
            Horarios
          </Text>
        </Box>

        <Stack gap="sm">
          <Group justify="space-between" style={{ width: '100%' }}>
            <Text size="sm">Lunes a Jueves</Text>
            <Text size="sm" c="dimmed">
              19:00 hs - 00:00 hs
            </Text>
          </Group>

          <Group justify="space-between" style={{ width: '100%' }}>
            <Text size="sm">Viernes a Domingo</Text>
            <Stack gap={4} align="flex-end">
              <Text size="sm" c="dimmed">
                11:00 hs - 15:00 hs
              </Text>
              <Text size="sm" c="dimmed">
                19:00 hs - 00:00 hs
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Box>
    </Box>
  );
}

export default BranchHoursTooltip;
