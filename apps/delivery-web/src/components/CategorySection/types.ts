
import { IProduct } from '@/types';

export interface CategorySectionProps {
  title: string;
  products: IProduct[];
  isInitiallyExpanded?: boolean;
  onToggleExpand?: (isExpanded: boolean) => void;
  isBranchClosed?: boolean;
  isDisabled?: boolean;
  isFixed?: boolean;
  onProductClick?: (product: IProduct) => void;
}