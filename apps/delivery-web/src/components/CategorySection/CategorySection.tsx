import { useState, useEffect, memo } from 'react';
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
  isFixed?: boolean;
}

const CategorySection = memo(
  ({
    title,
    products,
    onAddToCart,
    isInitiallyExpanded = false,
    onToggleExpand,
    isDisabled = false,
    isFixed = false,
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
      <Box className={styles.categorySection} mb={isMobile ? '16px' : '32px'}>
        <Box className={`${styles.categoriesContainer} ${headerClasses}`}>
          <SectionHeader
            title={title}
            isExpanded={isExpanded}
            onToggle={toggleExpand}
          />
        </Box>

        {isExpanded && (
          <Box className={styles.scrollableContainer}>
            <ProductGrid products={products} isDisabled={isDisabled} />
          </Box>
        )}
      </Box>
    );
  }
);

CategorySection.displayName = 'CategorySection';

export default CategorySection;
