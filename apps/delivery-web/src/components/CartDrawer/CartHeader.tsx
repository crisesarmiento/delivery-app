'use client';

import { Box, Flex, Text, Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';

interface CartHeaderProps {
  onClearCart?: () => void;
}

const CartHeader = ({ onClearCart }: CartHeaderProps) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ padding: '0 16px 8px' }}
      data-testid="cart-header"
    >
      <Text fw={600} size="sm" data-testid="cart-header-title">
        {CART_TEXTS.CART_TITLE}
      </Text>
      {onClearCart && (
        <Button
          variant="subtle"
          p={0}
          onClick={onClearCart}
          data-testid="cart-header-clear-button"
        >
          <IconTrash size={16} stroke={1.5} color="#FF385C" />
        </Button>
      )}
    </Flex>
  );
};

export default CartHeader;
