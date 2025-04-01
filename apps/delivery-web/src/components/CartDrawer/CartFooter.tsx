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
        data-testid="cart-footer-divider"
      />

      <Box style={{ padding: '8px 16px 0' }} data-testid="cart-footer">
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
          data-testid="cart-footer-total-row"
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 500,
            }}
            data-testid="cart-footer-total-label"
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
            data-testid="cart-footer-total-value"
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
          data-testid="cart-footer-checkout-button"
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
            }}
            data-testid="cart-footer-button-content"
          >
            <IconShoppingCart size={20} color="#B3FF00" stroke={2} />
            <Text
              style={{ color: '#B3FF00', fontSize: '16px', fontWeight: 600 }}
              data-testid="cart-footer-button-text"
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
