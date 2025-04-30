import { IProduct } from '../../types';

export interface ProductGridProps {
  products: IProduct[];
  className?: string;
  isBranchClosed?: boolean;
  isDisabled?: boolean;
  onProductClick?: (product: IProduct) => void;
}
