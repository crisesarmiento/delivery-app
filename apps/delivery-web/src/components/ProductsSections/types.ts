
import { IProduct } from '@/types';

export interface ProductsSectionsProps {
  category: string;
  products: IProduct[];
  isBranchClosed?: boolean;
  handleSectionToggle: (category: string, isExpanded: boolean) => void;
  onProductClick?: (product: IProduct) => void;
}

export interface ProductsSectionsContainerProps {
  products: IProduct[];
  categories: string[];
  isBranchClosed?: boolean;
  searchQuery: string;
  onProductClick?: (product: IProduct) => void;
}