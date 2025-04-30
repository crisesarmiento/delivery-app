import { useState, useEffect, memo } from 'react';
import { Box } from '@mantine/core';
import { IProduct } from '../../types';
import ProductGrid from '../ProductGrid';
import SectionHeader from '../SectionHeader';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  title: string;
  products: IProduct[];
  isInitiallyExpanded?: boolean;
  onToggleExpand?: (isExpanded: boolean) => void;
  isBranchClosed?: boolean;
  isDisabled?: boolean;
  isFixed?: boolean;
  onProductClick?: (product: IProduct) => void;
}

const CategorySection = memo(
  ({
    title,
    products,
    isInitiallyExpanded = false,
    onToggleExpand,
    isBranchClosed,
    isDisabled = false,
    isFixed = false,
    onProductClick,
  }: CategorySectionProps) => {
    const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
    const [isMobile, setIsMobile] = useState(false);

    // Only update the expanded state when the prop changes
    useEffect(() => {
      if (isExpanded !== isInitiallyExpanded) {
        setIsExpanded(isInitiallyExpanded);
      }
    }, [isInitiallyExpanded, isExpanded]);

    useEffect(() => {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      // Check on initial load
      checkIfMobile();

      // Add event listener for window resize
      window.addEventListener('resize', checkIfMobile);

      // Cleanup
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }, []);

    const toggleExpand = () => {
      const newExpandedState = !isExpanded;
      setIsExpanded(newExpandedState);
      if (onToggleExpand) {
        onToggleExpand(newExpandedState);
      }
    };

    const headerClasses = `${isFixed ? styles.categoriesFixed : ''}`;

    return (
      <Box
        id={`category-section-${title.toLowerCase()}`}
        className={styles.categorySection}
        mb={isMobile ? '16px' : '32px'}
      >
        <Box className={`${styles.categoriesContainer} ${headerClasses}`}>
          <SectionHeader
            title={title}
            isExpanded={isExpanded}
            onToggle={toggleExpand}
          />
        </Box>

        {isExpanded && (
          <Box className={styles.scrollableContainer}>
            <ProductGrid
              products={products}
              isBranchClosed={isBranchClosed}
              isDisabled={isDisabled}
              onProductClick={onProductClick}
            />
          </Box>
        )}
      </Box>
    );
  }
);

CategorySection.displayName = 'CategorySection';

export default CategorySection;
