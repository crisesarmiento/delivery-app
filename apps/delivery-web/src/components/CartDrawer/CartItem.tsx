'use client';

import { Box, Text } from '@mantine/core';
import { CartItem as CartContextItem } from '@/context/CartContext';

interface CartItemProps {
  item: CartContextItem;
}

const CartItem = ({ item }: CartItemProps) => {
  // Calculate the price to display
  const displayPrice = item.totalPrice
    ? item.totalPrice
    : item.product.price * item.quantity;

  return (
    <Box mb={12}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Text
            style={{
              color: '#939393',
              fontFamily: 'Inter',
              fontSize: '10px',
              lineHeight: '18px',
              fontWeight: 400,
              marginRight: '4px',
            }}
          >
            {item.quantity}x
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '10px',
              lineHeight: '18px',
              fontWeight: 400,
              color: '#000000',
            }}
          >
            {item.product.name}
          </Text>
        </Box>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: '10px',
            lineHeight: '18px',
            fontWeight: 400,
            color: '#000000',
            textAlign: 'right',
          }}
        >
          ${displayPrice.toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};

export default CartItem;
