import styles from './DiscountBadge.module.css';
import { PRODUCT_TEXTS } from '../../config/constants';

interface DiscountBadgeProps {
  discountPercentage?: number;
  className?: string;
}

const DiscountBadge = ({
  discountPercentage = 20,
  className,
}: DiscountBadgeProps) => {
  return (
    <div className={`${styles.discountBadge} ${className || ''}`}>
      {discountPercentage}% {PRODUCT_TEXTS.OFF}
    </div>
  );
};

export default DiscountBadge;
