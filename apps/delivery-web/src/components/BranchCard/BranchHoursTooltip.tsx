'use client';

import { Box, Text, Divider } from '@mantine/core';
import React, { useRef, useEffect, useState } from 'react';
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
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      // Position tooltip with exact 3px spacing from clock icon
      setTooltipPosition({
        top: rect.top + window.scrollY - 3, // Exactly 3px space from top
        left: rect.right - 213 - 3, // Exactly 3px space from right edge
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        zIndex: 1600, // Higher z-index for the trigger container
      }}
    >
      {/* Trigger with higher z-index to appear over tooltip */}
      <div style={{ position: 'relative', zIndex: 1600 }}>{trigger}</div>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            backgroundColor: '#FFFFFF',
            border: '1px solid #EEF2F6',
            boxShadow:
              '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
            padding: '12px 8px 9px 11px',
            zIndex: 1500, // Keep below the trigger
            width: '213px',
            height: '114px',
            boxSizing: 'border-box',
            opacity: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
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
        </div>
      )}
    </div>
  );
}
