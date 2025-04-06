'use client';

import { IBranch } from '../../types';
import { Card, Text, Box } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import BranchBadge from './Badge';
import BranchHoursTooltip from './BranchHoursTooltip';
import { useState } from 'react';

interface BranchCardProps {
  branch: IBranch;
  onClick?: () => void;
}

const BranchCard = ({ branch, onClick }: BranchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isClockHovered, setIsClockHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      onClick={handleClick}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: '240px',
        height: '242px',
        background: isHovered && !isClockHovered ? '#E3E8EF' : '#FFFFFF',
        border: `1px solid ${
          isHovered && !isClockHovered ? '#C9CDD5' : '#EEF2F6'
        }`,
        boxShadow:
          '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderRadius: '8px',
        padding: '6px 6px 8px 8px',
        transition: 'background 0.2s, border 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`branch-card-${branch.id}`}
    >
      {/* Main card image section */}
      <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '184px',
          backgroundImage: `url(${
            branch.imageUrl || '/images/branches/default.png'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
        }}
        data-testid="branch-card-image"
      >
        <BranchBadge isOpen={branch.isOpen ?? false} />
      </Box>

      {/* White box with branch name */}
      <Box
        style={{
          padding: '10px',
          position: 'relative',
        }}
        data-testid="branch-card-info"
      >
        <Box
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#000000',
              letterSpacing: '0%',
            }}
            data-testid="branch-card-description"
          >
            {branch.description}
          </Text>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <BranchHoursTooltip
            isVisible={showTooltip}
            trigger={
              <Box
                style={{
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation(); // Stop propagation to parent
                  setShowTooltip(true);
                  setIsClockHovered(true);
                  setIsHovered(false); // Reset card hover state
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation(); // Stop propagation to parent
                  setShowTooltip(false);
                  setIsClockHovered(false);
                }}
                onMouseOver={(e) => e.stopPropagation()} // Prevent mouseOver event bubbling
                onClick={(e) => {
                  // Prevent card click when clicking the icon
                  e.stopPropagation();
                }}
                data-testid="branch-card-hours-trigger"
              >
                <IconClock
                  size={18}
                  style={{
                    color: isHovered && !isClockHovered ? '#000000' : '#939393',
                    transition: 'color 0.2s',
                  }}
                />
              </Box>
            }
          />
        </div>
      </Box>
    </Card>
  );
};

export default BranchCard;
