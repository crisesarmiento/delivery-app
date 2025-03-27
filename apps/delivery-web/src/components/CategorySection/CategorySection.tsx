import { useState, useEffect } from 'react';
import { Box } from '@mantine/core';
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
    <Box className={styles.categorySection}>
      <SectionHeader
        title={title}
        isExpanded={isExpanded}
        onToggle={toggleExpand}
      />
      {isExpanded && (
        <>
          <ProductGrid products={products} isDisabled={isDisabled} />
        </>
      )}
    </Box>
  );
};

export default CategorySection;
