
import { IProduct } from '@/types';

export interface ProductCardProps {
  product: IProduct;
  isBranchClosed?: boolean;
  isDisabled?: boolean;
  onProductClick?: (product: IProduct) => void;
}