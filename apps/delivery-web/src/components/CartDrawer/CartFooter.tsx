'use client';

import { Box, Text, Button, Divider } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';

interface CartFooterProps {
  cartTotal: number;
  onCheckout: () => void;
}

const CartFooter = ({ cartTotal, onCheckout }: CartFooterProps) => {
  return (
    <>
      <Divider
        style={{
          width: '90%',
          margin: '8px auto',
          borderWidth: '0.7px',
          borderStyle: 'solid',
          borderColor: '#EEF2F6',
        }}
      />

      <Box style={{ padding: '8px 16px 0' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 500,
            }}
          >
            {CART_TEXTS.TOTAL}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 500,
              textAlign: 'right',
            }}
          >
            ${cartTotal.toLocaleString()}
          </Text>
        </Box>

        <Button
          styles={{
            root: {
              height: '40px',
              width: '175px',
              background: '#000000',
              borderRadius: '4px',
              padding: 0,
              '&:hover': {
                background: '#222222',
              },
            },
          }}
          onClick={onCheckout}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
            }}
          >
            <IconShoppingCart size={20} color="#B3FF00" stroke={2} />
            <Text
              style={{ color: '#B3FF00', fontSize: '16px', fontWeight: 600 }}
            >
              {CART_TEXTS.VIEW_CART}
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default CartFooter;
