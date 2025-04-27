import { Box, Text } from '@mantine/core';
import styles from '../AddToCartModal.module.css';
import { ModalHeaderProps } from '../../../types/addToCartModal/types';
import { MODAL_TEXTS } from '../../../config/constants';

// Modal Header Component
const ModalHeader: React.FC<ModalHeaderProps> = ({
  hasDiscount,
  originalPrice,
  discountedPrice,
}: ModalHeaderProps) => (
  <Box className={styles.modalHeader}>
    {hasDiscount && (
      <Box className={styles.discountBadge}>{MODAL_TEXTS.DISCOUNT_BADGE}</Box>
    )}
    <Text className={styles.modalTitle}>{MODAL_TEXTS.MODAL_TITLE}</Text>
    <Box className={styles.priceContainer}>
      <Text className={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
      {hasDiscount && originalPrice && (
        <Text className={styles.originalPrice}>
          ${originalPrice.toFixed(2)}
        </Text>
      )}
    </Box>
  </Box>
);

export default ModalHeader;
