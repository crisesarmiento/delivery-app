'use client';

import { Box, Text, Divider, Tooltip } from '@mantine/core';
import React, { useRef } from 'react';
import { BRANCH_HOURS_TEXTS } from '../../config/constants';

interface BranchHoursTooltipProps {
  isVisible: boolean;
  trigger: React.ReactNode;
}

export default function BranchHoursTooltip({
  isVisible,
  trigger,
}: BranchHoursTooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  // Create the tooltip content
  const tooltipContent = (
    <Box style={{ position: 'relative' }}>
      <Text
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '18px',
          color: '#000000',
          marginBottom: '9px',
          paddingRight: '20px', // Leave space for the clock
        }}
      >
        {BRANCH_HOURS_TEXTS.TITLE}
      </Text>

      <Divider
        style={{
          border: '0.7px solid #EEF2F6',
          marginBottom: '6px',
        }}
      />

      <Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '11px',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '18px',
              color: '#000000',
            }}
          >
            {BRANCH_HOURS_TEXTS.MONDAY_TO_THURSDAY}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '18px',
              color: '#6C7684',
              whiteSpace: 'nowrap',
            }}
          >
            19:00 hs - 00:00 hs
          </Text>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '18px',
              color: '#000000',
            }}
          >
            {BRANCH_HOURS_TEXTS.FRIDAY_TO_SUNDAY}
          </Text>
          <div>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '18px',
                color: '#6C7684',
                textAlign: 'right',
                whiteSpace: 'nowrap',
                marginBottom: '4px',
              }}
            >
              11:00 hs - 15:00 hs
            </Text>
            <Text
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '18px',
                color: '#6C7684',
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              19:00 hs - 00:00 hs
            </Text>
          </div>
        </div>
      </Box>
    </Box>
  );

  // Return the Mantine Tooltip component with fixed positioning
  return (
    <div ref={triggerRef} style={{ display: 'inline-block' }}>
      <Tooltip
        label={tooltipContent}
        opened={isVisible}
        position="bottom"
        withArrow
        arrowSize={6}
        color="white"
        style={{ maxWidth: '220px' }}
        styles={{
          tooltip: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #EEF2F6',
            boxShadow:
              '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
            padding: '12px 8px 9px 11px',
            width: '220px',
            color: 'initial',
            zIndex: 1500,
          },
          arrow: {
            backgroundColor: '#FFFFFF',
            border: '1px solid #EEF2F6',
          },
        }}
      >
        {trigger}
      </Tooltip>
    </div>
  );
}
