import React from 'react';
import { Flex, Collapse, Checkbox, Box, Text } from '@mantine/core';
import styles from '../AddToCartModal.module.css';
import { CondimentsSectionProps } from '../../../types/addToCartModal/types';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { MODAL_TEXTS } from '../../../config/constants';

// Condiments Section Component
const CondimentsSection = ({
  showCondiments,
  setShowCondiments,
  condiments,
  handleToggleCondiment,
  maxCondimentSelections,
}: CondimentsSectionProps) => (
  <Flex className={styles.condimentsSection}>
    <Flex
      className={styles.sectionHeader}
      onClick={() => setShowCondiments(!showCondiments)}
      justify="center"
      align="center"
      w="100%"
      style={{ position: 'relative' }}
    >
      <Box className={styles.sectionHeaderContainer}>
        <Text className={styles.sectionHeaderText}>
          {MODAL_TEXTS.CONDIMENTS_SECTION_TITLE} {maxCondimentSelections}{' '}
          {MODAL_TEXTS.CONDIMENTS_SUFFIX}
        </Text>
        {showCondiments ? (
          <IconChevronUp size={24} stroke={1.5} />
        ) : (
          <IconChevronDown size={24} stroke={1.5} />
        )}
      </Box>
    </Flex>

    <Collapse in={showCondiments}>
      <Flex className={styles.condimentsSectionBody}>
        <Flex className={styles.condimentsList}>
          {condiments.map((condiment, index) => (
            <Flex key={condiment.name} className={styles.condimentItem}>
              <Text className={styles.condimentName}>{condiment.name}</Text>

              <Checkbox
                checked={condiment.selected}
                onChange={() => handleToggleCondiment(index)}
                classNames={{
                  root: styles.condimentCheckbox,
                  input: styles.condimentCheckboxInput,
                  icon: styles.condimentCheckboxIcon,
                }}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Collapse>
  </Flex>
);

export default CondimentsSection;
