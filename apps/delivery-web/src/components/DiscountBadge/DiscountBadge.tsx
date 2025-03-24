import styles from './DiscountBadge.module.css';

interface DiscountBadgeProps {
  discountPercentage?: number;
  className?: string;
}

export function DiscountBadge({
  discountPercentage = 20,
  className,
}: DiscountBadgeProps) {
  return (
    <div className={`${styles.discountBadge} ${className || ''}`}>
      {discountPercentage}% OFF
    </div>
  );
}

export default DiscountBadge;
