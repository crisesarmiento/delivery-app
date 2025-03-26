import { useState, useEffect } from 'react';
import { Box, Button, Text, Flex } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { IProduct } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  title: string;
  products: IProduct[];
  onAddToCart: (product: IProduct, quantity: number) => void;
  isInitiallyExpanded?: boolean;
  onToggleExpand?: (isExpanded: boolean) => void;
}

const CategorySection = ({
  title,
  products,
  onAddToCart,
  isInitiallyExpanded = false,
  onToggleExpand,
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
      <Flex className={styles.sectionHeader} onClick={toggleExpand}>
        <Text className={styles.sectionTitle}>{title}</Text>
        <Button variant="subtle" p={0} className={styles.toggleButton}>
          {isExpanded ? (
            <IconChevronUp size={20} stroke={1.5} />
          ) : (
            <IconChevronDown size={20} stroke={1.5} />
          )}
        </Button>
      </Flex>

      {isExpanded && (
        <Box className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CategorySection;
