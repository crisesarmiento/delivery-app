import { useState, useEffect } from 'react';
import { Box, useMantineTheme } from '@mantine/core';
import { IProduct } from '../../types';
import ProductGrid from '../ProductGrid';
import SectionHeader from '../SectionHeader';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  title: string;
  products: IProduct[];
  onAddToCart: (product: IProduct, quantity: number) => void;
  isInitiallyExpanded?: boolean;
  onToggleExpand?: (isExpanded: boolean) => void;
  isDisabled?: boolean;
}

const CategorySection = ({
  title,
  products,
  onAddToCart,
  isInitiallyExpanded = false,
  onToggleExpand,
  isDisabled = false,
}: CategorySectionProps) => {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
  const theme = useMantineTheme();

  useEffect(() => {
    setIsExpanded(isInitiallyExpanded);
  }, [isInitiallyExpanded]);

  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onToggleExpand) {
      onToggleExpand(newExpandedState);
    }
  };

  return (
    <Box className={styles.categorySection} mb="8px">
      <Box
        py={theme.spacing.xs}
        bg={theme.colors.neutral[1]}
        w="100%"
        h="100%"
        style={{
          borderRadius: theme.radius.md,
          border: `1px solid ${theme.colors.neutral[2]}`,
          transition: 'all 0.2s ease',
          boxShadow: isExpanded ? theme.shadows.xs : 'none',
          marginBottom: '8px',
        }}
      >
        <SectionHeader
          title={title}
          isExpanded={isExpanded}
          onToggle={toggleExpand}
        />
      </Box>

      {isExpanded && (
        <Box
          mt={theme.spacing.xs}
          mb={theme.spacing.xs}
          px={theme.spacing.xs}
          pb={theme.spacing.xs}
        >
          <ProductGrid products={products} isDisabled={isDisabled} />
        </Box>
      )}
    </Box>
  );
};

export default CategorySection;
