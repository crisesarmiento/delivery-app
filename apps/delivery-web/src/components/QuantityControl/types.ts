export interface QuantityControlProps {
  quantity: number;
  onChange: (quantity: number) => void;
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  onAddToCart?: () => void;
  isDisabled?: boolean;
  className?: string;
  buttonClassName?: string;
  quantityDisplayClassName?: string;
  isMobile?: boolean;
  variant?: 'default' | 'footer' | 'ingredient' | 'productCard' | 'checkout';
}
