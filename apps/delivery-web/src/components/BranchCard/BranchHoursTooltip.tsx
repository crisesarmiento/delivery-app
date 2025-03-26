'use client';

import { Box, Text } from '@mantine/core';
import React from 'react';

interface BranchHoursTooltipProps {
  isVisible: boolean;
  trigger: React.ReactNode;
}

export default function BranchHoursTooltip({
  isVisible,
  trigger,
}: BranchHoursTooltipProps) {
  return (
    <div style={{ position: 'relative' }}>
      {trigger}

      {isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '130%',
            right: '-100px',
            marginBottom: '8px',
            backgroundColor: 'white',
            border: '1px solid #EEF2F6',
            boxShadow:
              '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '8px',
            padding: '12px',
            zIndex: 1000,
            width: '240px',
          }}
        >
          {/* Triangle pointer */}
          <div
            style={{
              position: 'absolute',
              bottom: '-6px',
              right: '110px',
              width: '12px',
              height: '12px',
              backgroundColor: 'white',
              border: '1px solid #EEF2F6',
              borderTop: 'none',
              borderLeft: 'none',
              transform: 'rotate(45deg)',
              boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.03)',
              zIndex: 999,
            }}
          />

          <Box>
            <Text
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '20px',
                color: '#101828',
                marginBottom: '8px',
              }}
            >
              Horario
            </Text>

            <Box>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#667085',
                  }}
                >
                  Lunes a Viernes
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828',
                  }}
                >
                  8:00 - 17:00
                </Text>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#667085',
                  }}
                >
                  Sábado
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828',
                  }}
                >
                  9:00 - 14:00
                </Text>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#667085',
                  }}
                >
                  Domingo
                </Text>
                <Text
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#101828',
                  }}
                >
                  Cerrado
                </Text>
              </div>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
}
