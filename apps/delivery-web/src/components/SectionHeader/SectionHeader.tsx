'use client';

import { Flex, Text, Button, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import styles from './SectionHeader.module.css';
import { UI_CONSTANTS } from '../../config/constants';
import { SectionHeaderProps } from './types';

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
      data-testid="section-header"
    >
      <Text className={styles.sectionTitle} data-testid="section-header-title">
        {title}
      </Text>
      {toggleable && (
        <Button
          variant={UI_CONSTANTS.BUTTON_VARIANTS.SUBTLE}
          p={0}
          className={styles.toggleButton}
          data-testid="section-header-toggle-button"
        >
          {isExpanded ? (
            <IconChevronUp
              size={24}
              stroke={2}
              data-testid="section-header-icon-up"
            />
          ) : (
            <IconChevronDown
              size={24}
              stroke={2}
              data-testid="section-header-icon-down"
            />
          )}
        </Button>
      )}
    </Flex>
  );
};

export default SectionHeader;
