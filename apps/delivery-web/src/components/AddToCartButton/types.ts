export interface AddToCartButtonProps {
  product: import('../../types').IProduct;
  onAddToCart: (product: import('../../types').IProduct, quantity: number) => void;
  className?: string;
}
