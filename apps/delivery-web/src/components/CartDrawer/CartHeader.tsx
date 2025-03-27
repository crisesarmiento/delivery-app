'use client';

import { Box, Text, Divider } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';

interface CartHeaderProps {
  onClearCart: () => void;
}

const CartHeader = ({ onClearCart }: CartHeaderProps) => {
  return (
    <>
      <Box style={{ position: 'relative', padding: '0 16px 8px' }}>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: '12px',
            lineHeight: '18px',
            fontWeight: 500,
            color: '#000000',
          }}
        >
          {CART_TEXTS.CART_TITLE}
        </Text>
        <Box style={{ position: 'absolute', top: 0, right: 16 }}>
          <IconTrash
            size={18}
            stroke={1.5}
            style={{ cursor: 'pointer' }}
            onClick={onClearCart}
          />
        </Box>
      </Box>

      <Divider
        style={{
          width: '90%',
          margin: '0 auto 8px',
          borderWidth: '0.7px',
          borderStyle: 'solid',
          borderColor: '#EEF2F6',
        }}
      />
    </>
  );
};

export default CartHeader;
