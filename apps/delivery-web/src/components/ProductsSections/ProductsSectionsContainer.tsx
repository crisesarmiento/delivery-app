import { Box } from '@mantine/core';
import styles from './ProductsSectionsContainer.module.css';
import { IProduct } from '@/types';
import ProductsSections from './ProductsSections';
import { Text } from '@mantine/core';
import { NO_PRODUCTS_AVAILABLE } from '@/constants/text';
import { useEffect } from 'react';
import { useNav } from '@/context/navContext';
import { useMantineTheme } from '@mantine/core';

interface ProductsSectionsContainerProps {
  products: IProduct[];
  categories: string[];
  isBranchClosed?: boolean;
  searchQuery: string;
  onProductClick?: (product: IProduct) => void;
}

const ProductsSectionsContainer = ({
  products,
  categories,
  isBranchClosed,
  searchQuery,
  onProductClick,
}: ProductsSectionsContainerProps) => {
  const { activeTab, setActiveTab, expandedSections, setExpandedSections } =
    useNav();

  const theme = useMantineTheme();

  useEffect(() => {
    const initialExpandedState = categories.reduce((acc, category) => {
      acc[category.toLowerCase()] =
        category.toLowerCase() === activeTab.toLowerCase();
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedSections(initialExpandedState);
  }, [activeTab, categories, setExpandedSections]);

  const handleSectionToggle = (category: string, isExpanded: boolean) => {
    if (isExpanded && activeTab !== category.toLowerCase()) {
      setActiveTab(category.toLowerCase());
      setExpandedSections({
        [category.toLowerCase()]: true,
        ...expandedSections,
      });
    } else {
      setExpandedSections({
        [category.toLowerCase()]: false,
        ...expandedSections,
      });
    }
  };

  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = products
      .filter((product: IProduct) =>
        category.toLowerCase() === 'promo'
          ? product.category?.toLowerCase().includes('promo')
          : product.category?.toLowerCase() === category.toLowerCase()
      )
      .filter((product: IProduct) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (categoryProducts.length > 0) acc[category] = categoryProducts;
    return acc;
  }, {} as Record<string, IProduct[]>);

  return (
    <Box
      className={styles.sectionsContainer}
      style={{
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        zIndex: 10,
      }}
    >
      {Object.keys(productsByCategory).length > 0 ? (
        Object.entries(productsByCategory).map(([category, products]) => (
          <ProductsSections
            key={category}
            category={category}
            products={products}
            isBranchClosed={isBranchClosed}
            handleSectionToggle={handleSectionToggle}
            onProductClick={onProductClick}
          />
        ))
      ) : (
        <Text
          ta="center"
          fz={theme.fontSizes.lg}
          c="dimmed"
          style={{ padding: '40px 0' }}
        >
          {NO_PRODUCTS_AVAILABLE}
        </Text>
      )}
    </Box>
  );
};

export default ProductsSectionsContainer;
