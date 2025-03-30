'use client';

import { Flex, Text, Button, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import styles from './SectionHeader.module.css';
import { UI_CONSTANTS } from '../../config/constants';

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
}: SectionHeaderProps) => {
  const theme = useMantineTheme();

  return (
    <Flex
      className={`${styles.sectionHeader}`}
      onClick={toggleable ? onToggle : undefined}
      mr={theme.spacing.xs}
    >
      <Text className={styles.sectionTitle}>{title}</Text>
      {toggleable && (
        <Button
          variant={UI_CONSTANTS.BUTTON_VARIANTS.SUBTLE}
          p={0}
          className={styles.toggleButton}
        >
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
