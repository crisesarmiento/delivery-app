'use client';

import { Card, Text, Box } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import BranchBadge from './Badge';
import BranchHoursTooltip from './BranchHoursTooltip';
import { useState, useEffect } from 'react';
import { isBranchOpen } from '@/utils/branch';
import styles from './BranchCard.module.css';
import { BranchCardProps } from './types';

const BranchCard = ({ branch, onClick }: BranchCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClockHovered, setIsClockHovered] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <Card
      className={styles.card}
      onClick={handleClick}
      style={{
        background: isHovered && !isClockHovered ? '#E3E8EF' : '#FFFFFF',
        border: `1px solid ${
          isHovered && !isClockHovered ? '#C9CDD5' : '#EEF2F6'
        }`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`branch-card-${branch.id}`}
    >
      <Box
        className={styles.imageContainer}
        style={{
          backgroundImage: `url(${
            branch.imageUrl || '/images/branches/default.png'
          })`,
        }}
      >
        {/* Status badge */}
        <BranchBadge isOpen={isBranchOpen(branch, now)} />
      </Box>

      <Box
        className={styles.branchInfoContainer}
        data-testid="branch-card-info"
      >
        <Box
          className={styles.branchCardDescriptionContainer}
          data-testid="branch-card-description"
        >
          <Text
            className={styles.branchCardDescriptionText}
            data-testid="branch-card-description"
          >
            {branch.description}
          </Text>
        </Box>

        <Box className={styles.clockIconContainer}>
          <BranchHoursTooltip
            isVisible={isClockHovered}
            branch={branch}
            onVisibilityChange={(visible) => {
              if (!visible) setIsClockHovered(false);
            }}
            trigger={
              <Box
                className={styles.clockIconTooltipTrigger}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setIsClockHovered(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setIsClockHovered(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                data-testid="branch-card-hours-trigger"
              >
                <IconClock
                  size={18}
                  style={{
                    color: isHovered ? '#000000' : '#939393',
                    transition: 'color 0.2s',
                    zIndex: 1000,
                  }}
                />
              </Box>
            }
          />
        </Box>
      </Box>
    </Card>
  );
};

export default BranchCard;
