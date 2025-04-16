'use client';

import { Box, Text, Divider } from '@mantine/core';
import React, { useRef, useEffect } from 'react';
import { BRANCH_HOURS_TEXTS } from '../../config/constants';
import { IBranch } from '@/types';

interface BranchHoursTooltipProps {
  isVisible: boolean;
  trigger: React.ReactNode;
  branch: IBranch;
  onVisibilityChange?: (visible: boolean) => void;
}

export default function BranchHoursTooltip({
  isVisible,
  trigger,
  branch,
  onVisibilityChange,
}: BranchHoursTooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { openingHoursStructured } = branch;

  const { mondayToThursday, fridayToSunday } = openingHoursStructured ?? {};
  const { firstShift, secondShift } = fridayToSunday ?? {};
  const { open: firstShiftOpen, close: firstShiftClose } = firstShift ?? {};
  const { open: secondShiftOpen, close: secondShiftClose } = secondShift ?? {};

  // Handle scroll to close tooltip
  useEffect(() => {
    const handleScroll = () => {
      if (isVisible && onVisibilityChange) {
        onVisibilityChange(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, onVisibilityChange]);

  const getHoursText = (day: string) => {
    if (day === 'mondayToThursday') {
      return `${mondayToThursday?.open} - ${mondayToThursday?.close}`;
    } else if (day === 'fridayToSunday') {
      return `${firstShiftOpen} - ${firstShiftClose} / ${secondShiftOpen} - ${secondShiftClose}`;
    }
    return '';
  };

  return (
    <div
      ref={triggerRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        zIndex: 1600,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1600 }}>{trigger}</div>

      {isVisible && (
        <div
          style={{
            position: 'absolute',
            top: '0', // Aligns tooltip vertically with the clock icon
            left: '0',
            transform: 'translateX(-85%) translateX(-3px)', // Positions to the left with 3px offset
            backgroundColor: '#FFFFFF',
            border: '1px solid #EEF2F6',
            boxShadow:
              '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)',
            borderRadius: '4px',
            padding: '12px 8px 9px 11px',
            zIndex: 1500,
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
                paddingRight: '20px',
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
                  {getHoursText('mondayToThursday')}
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
                    {firstShiftOpen && firstShiftClose
                      ? `${firstShiftOpen} - ${firstShiftClose}`
                      : ''}
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
                    {secondShiftOpen && secondShiftClose
                      ? `${secondShiftOpen} - ${secondShiftClose}`
                      : ''}
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
