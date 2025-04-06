'use client';

import { Box, Flex, Text, Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';

interface CartHeaderProps {
  onClearCart?: () => void;
}

const CartHeader = ({ onClearCart }: CartHeaderProps) => {
  return (
    <Box
      pos="relative"
      style={{ padding: '16px 16px 8px' }}
      data-testid="cart-header"
    >
      <Flex justify="center" align="center">
        <Text fw={600} size="md" data-testid="cart-header-title">
          {CART_TEXTS.CART_TITLE}
        </Text>
      </Flex>
      {onClearCart && (
        <Button
          variant="subtle"
          p={0}
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
          }}
          onClick={onClearCart}
          data-testid="cart-header-clear-button"
        >
          <IconTrash size={20} stroke={1.5} color="#000000" />
        </Button>
      )}
    </Box>
  );
};

export default CartHeader;
