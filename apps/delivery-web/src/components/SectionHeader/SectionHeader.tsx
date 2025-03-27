'use client';

import { Flex, Text, Button } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  title: string;
  isExpanded?: boolean;
  toggleable?: boolean;
  onToggle?: () => void;
  className?: string;
}

const SectionHeader = ({
  title,
  isExpanded = false,
  toggleable = true,
  onToggle,
  className = '',
}: SectionHeaderProps) => {
  return (
    <Flex
      className={`${styles.sectionHeader} ${className}`}
      onClick={toggleable ? onToggle : undefined}
    >
      <Text className={styles.sectionTitle}>{title}</Text>
      {toggleable && (
        <Button variant="subtle" p={0} className={styles.toggleButton}>
          {isExpanded ? (
            <IconChevronUp size={20} stroke={1.5} />
          ) : (
            <IconChevronDown size={20} stroke={1.5} />
          )}
        </Button>
      )}
    </Flex>
  );
};

export default SectionHeader;
