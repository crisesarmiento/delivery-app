import styles from './SummaryBox.module.css';
import { Box } from '@mantine/core';
import { Text, Divider } from '@mantine/core';
import { CHECKOUT_TEXTS } from '@/config/constants';
import { useCart } from '@/context/CartContext';

const SummaryBox = () => {
  // Get checkout and cart context data
  // Removed paymentMethod and paymentAmount as they are not used
  // const { paymentMethod, paymentAmount } = useCheckout();
  const { cartProductsTotal, cartTotal } = useCart();
  const totalDiscount = cartProductsTotal - cartTotal;
  const hasDiscount = totalDiscount > 0;

  return (
    <Box className={styles.summaryBoxContainer}>
      <Text className={styles.summaryTitle}>
        {CHECKOUT_TEXTS.ORDER_SUMMARY}
      </Text>
      <Divider className={styles.summaryDivider} />
      <Box className={styles.summaryRow}>
        <Text className={styles.summaryLabel}>{CHECKOUT_TEXTS.SUBTOTAL}</Text>
        <Text className={styles.summaryValue}>
          {cartProductsTotal.toLocaleString()}
        </Text>
      </Box>
      {hasDiscount && (
        <Box className={styles.summaryRow}>
          <Text className={styles.summaryLabel}>
            {CHECKOUT_TEXTS.PRODUCT_DISCOUNT}
          </Text>
          <Text className={styles.summaryDiscountValue}>
            - {totalDiscount.toLocaleString()}
          </Text>
        </Box>
      )}
      {/* Add more summary rows as needed, using paymentMethod/paymentAmount from context if required */}
    </Box>
  );
};

export default SummaryBox;
