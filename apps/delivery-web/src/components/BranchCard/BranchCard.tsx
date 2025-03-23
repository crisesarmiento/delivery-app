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

export function BranchCard({ branch, onClick }: BranchCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const clockIcon = (
    <Box
      style={{
        position: 'absolute',
        right: '8px',
        top: '3px',
        cursor: 'pointer',
        zIndex: 2,
        padding: '8px',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={(e) => {
        // Prevent card click when clicking the icon
        e.stopPropagation();
      }}
    >
      <IconClock
        size={18}
        style={{
          color: showTooltip ? '#101828' : isHovered ? '#667085' : '#939393',
          transition: 'color 0.2s',
        }}
      />
    </Box>
  );

  return (
    <Card
      onClick={onClick}
      style={{
        boxSizing: 'border-box',
        width: '200px',
        height: '242px',
        background: isHovered ? '#E3E8EF' : '#FFFFFF',
        border: `1px solid ${isHovered ? '#C9CDD5' : '#EEF2F6'}`,
        boxShadow:
          '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderRadius: '4px',
        padding: '6px 6px 8px 8px',
        transition: 'background 0.2s, border 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card image section */}
      <Box
        style={{
          position: 'relative',
          width: '184px',
          height: '184px',
          backgroundImage: `url(${branch.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      >
        <BranchBadge isOpen={branch.isOpen} />
      </Box>

      {/* White box with branch name */}
      <Box
        style={{
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          position: 'relative',
        }}
      >
        <Text
          style={{
            height: '24px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#000000',
            letterSpacing: '0%',
            textAlign: 'center',
          }}
        >
          {branch.description}
        </Text>

        <BranchHoursTooltip isVisible={showTooltip} trigger={clockIcon} />
      </Box>
    </Card>
  );
}

export default BranchCard;
