import { Flex } from '@mantine/core';
import CategorySection from '@/components/CategorySection';
import { IProduct } from '@/types';
import { useNav } from '@/context/navContext';

interface ProductsSectionsProps {
  category: string;
  products: IProduct[];
  handleSectionToggle: (category: string, isExpanded: boolean) => void;
  onProductClick?: (product: IProduct) => void;
}

const ProductsSections = ({
  category,
  products,
  handleSectionToggle,
  onProductClick,
}: ProductsSectionsProps) => {
  const { expandedSections } = useNav();
  return (
    <Flex key={category} style={{ width: '100%', marginBottom: '11px' }}>
      <CategorySection
        title={category}
        products={products}
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
