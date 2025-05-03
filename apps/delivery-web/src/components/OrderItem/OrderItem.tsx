import styles from './OrderItem.module.css';
import { Box } from '@mantine/core';

import { Text, Button } from '@mantine/core';
import QuantityControl from '@/components/QuantityControl/QuantityControl';
import DiscountBadge from '@/components/DiscountBadge';
import { OrderItemProps } from './types';

const OrderItem = ({
  item,
  onEditProduct,
  onQuantityUpdate,
}: OrderItemProps) => {
  const hasDiscount = item.hasDiscount && item.originalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(
        100 -
          ((item.totalPrice || item.product.price) / item.originalPrice) * 100
      ) : 0;
    : 0;

  return (
    <Box className={styles.productRow}>
      {item.product.image && (
        <img
          src={item.product.image}
          alt={item.product.name}
          className={styles.productImage}
        />
      )}
      <Box className={styles.productDetails}>
        <Text className={styles.productName}>{item.product.name}</Text>
        {hasDiscount && <DiscountBadge percentage={discountPercentage} />}
        <Text className={styles.productPrice}>
          {(item.totalPrice || item.product.price).toLocaleString()}
        </Text>
        {hasDiscount && (
          <Text className={styles.priceLabel}>
            {item.originalPrice.toLocaleString()}
          </Text>
        )}
        <Box className={styles.quantityControls}>
          <QuantityControl quantity={item.quantity} onChange={onQuantityUpdate} />
          <Button
            className={styles.editLink}
            size="xs"
            variant="outline"
            onClick={onEditProduct}
          >
            Editar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItem;
