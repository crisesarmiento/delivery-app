import { Flex } from '@mantine/core';
import CategorySection from '@/components/CategorySection';
import { useNav } from '@/context/navContext';
import { ProductsSectionsProps } from './types';

const ProductsSections = ({
  category,
  products,
  isBranchClosed,
  handleSectionToggle,
  onProductClick,
}: ProductsSectionsProps) => {
  const { expandedSections } = useNav();
  return (
    <Flex key={category} style={{ width: '100%', marginBottom: '11px' }}>
      <CategorySection
        title={category}
        products={products}
        isBranchClosed={isBranchClosed}
        isInitiallyExpanded={expandedSections[category.toLowerCase()] || false}
        onToggleExpand={(isExpanded) =>
          handleSectionToggle(category, isExpanded)
        }
        onProductClick={onProductClick}
      />
    </Flex>
  );
};

export default ProductsSections;
