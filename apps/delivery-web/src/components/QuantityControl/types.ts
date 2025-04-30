export interface QuantityControlProps {
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onChange?: (quantity: number) => void;
  onAddToCart?: () => void;
  isDisabled?: boolean;
  className?: string;
  buttonClassName?: string;
  quantityDisplayClassName?: string;
  isMobile?: boolean;
  variant?: 'default' | 'footer' | 'ingredient' | 'productCard' | 'checkout';
}
