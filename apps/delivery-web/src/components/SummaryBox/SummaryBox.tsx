import styles from './SummaryBox.module.css';
import { Box } from '@mantine/core';
import { Text, Divider } from '@mantine/core';
import { CHECKOUT_TEXTS } from '@/config/constants';
import { useCart } from '@/context/CartContext';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { useCheckout } from '@/context/CheckoutContext';

const SummaryBox = () => {
  const { paymentMethod, paymentAmount } = useCheckout();
  const { items, cartTotal, cartProductsTotal } = useCart();

  const itemsDiscount = items.map((item) => {
    const { hasDiscount, discountPercent, originalPrice } = usePriceCalculation(
      item.product,
      item.product?.ingredients,
      item.quantity
    );
    if (hasDiscount && originalPrice) {
      return { hasDiscount, discountPercent, originalPrice };
    }
    return { hasDiscount: false, discountPercent: 0, originalPrice: 0 };
  });

  const hasDiscount = itemsDiscount.some((item) => item.hasDiscount);
  const productDiscountValue = itemsDiscount.reduce((sum, item) => {
    if (item.hasDiscount) {
      return sum + item.discountPercent * item.originalPrice;
    }
    return sum;
  }, 0);

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
            - {productDiscountValue.toLocaleString()}
          </Text>
        </Box>
      )}
      {/* Add more summary rows as needed, using paymentMethod/paymentAmount from context if required */}
    </Box>
  );
};

export default SummaryBox;
