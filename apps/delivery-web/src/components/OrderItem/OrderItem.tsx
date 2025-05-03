import styles from './OrderItem.module.css';
import { Box, Button, Image, Text } from '@mantine/core';
import QuantityControl from '@/components/QuantityControl/QuantityControl';
import DiscountBadge from '@/components/DiscountBadge';
import { OrderItemProps } from './types';
import { useCart } from '@/context/CartContext';

import AddToCartModal from '@/components/AddToCartModal/AddToCartModal';
import { useState } from 'react';

const OrderItem = ({ item }: OrderItemProps) => {
  const { updateCartItemQuantity, updateCartItem } = useCart();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const discountPercentage = item.hasDiscount
    ? item.discountPercentage
    : undefined;

  const hasDiscount = discountPercentage !== undefined;
  return (
    <Box className={styles.productRow}>
      {item.product.imageUrl && (
        <Image
          src={item.product.imageUrl}
          alt={item.product.name}
          className={styles.productImage}
        />
      )}
      <Box className={styles.productDetails}>
        <Text className={styles.productName}>{item.product.name}</Text>
        {hasDiscount && (
          <DiscountBadge discountPercentage={discountPercentage} />
        )}
        <Text className={styles.productPrice}>
          {item.product.price.toLocaleString()}
        </Text>
        {hasDiscount && (
          <Text className={styles.priceLabel}>
            {item.originalPrice?.toLocaleString()}
          </Text>
        )}
        <Box className={styles.quantityControls}>
          <QuantityControl
            quantity={item.quantity}
            onChange={(newQuantity: number) => {
              updateCartItemQuantity(item.uniqueId, newQuantity);
            }}
          />
          <Button
            className={styles.editLink}
            size="xs"
            variant="outline"
            onClick={() => setEditModalOpen(true)}
          >
            Editar
          </Button>
        </Box>
      </Box>
      <AddToCartModal
        product={item.product}
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onAddToCart={(editedItem) => {
          updateCartItem(
            {
              ...editedItem,
              quantity: editedItem.quantity,
              ingredients: editedItem.ingredients,
              condiments: editedItem.condiments,
              comments: editedItem.comments,
              totalPrice: editedItem.totalPrice,
            },
            item.uniqueId
          );
          setEditModalOpen(false);
        }}
        initialQuantity={item.quantity}
        initialIngredients={item.ingredients}
        initialCondiments={item.condiments}
        initialComments={item.comments}
      />
    </Box>
  );
};

export default OrderItem;
