'use client';

import { Box, Text, Flex, Button, Divider } from '@mantine/core';
import { IProduct } from '../../types';
import { useEffect, useState } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';

interface CartItem {
  productId: string;
  quantity: number;
  product: IProduct;
}

interface CartDrawerProps {
  opened: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
}

const CartDrawer = ({
  opened,
  onClose,
  cartItems,
  cartTotal,
}: CartDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(opened);
  }, [opened]);

  // For empty cart - compact floating card with specified dimensions
  if (cartItems.length === 0) {
    return (
      <Box
        style={{
          position: 'absolute',
          top: '406px',
          right: isVisible ? '40px' : '-240px',
          width: '200px',
          height: '242px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #EEF2F6',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          transition: 'right 0.3s ease',
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        <Flex
          justify="flex-start"
          align="center"
          style={{ height: '32px', padding: '10px 16px' }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              color: '#000000',
              fontWeight: 500,
              height: '18px',
            }}
          >
            Mi pedido
          </Text>
        </Flex>

        <Divider
          style={{
            width: '175px',
            borderWidth: '0.7px',
            borderStyle: 'solid',
            borderColor: '#EEF2F6',
            margin: '0 auto',
          }}
        />

        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 16px',
            gap: '16px',
          }}
        >
          <IconShoppingCart
            style={{
              width: '34px',
              height: '34px',
              color: '#939393',
            }}
          />
          <Text
            style={{
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '18px',
              color: '#939393',
              textAlign: 'center',
              maxWidth: '180px',
              margin: '0 auto',
            }}
          >
            Tu carrito está vacío. Agregá productos para comenzar tu pedido.
          </Text>
        </Flex>
      </Box>
    );
  }

  // For non-empty cart - show items and checkout option
  return (
    <Box
      style={{
        position: 'absolute',
        top: '330px',
        right: isVisible ? '40px' : '-360px',
        width: '200px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #EEF2F6',
        boxShadow:
          '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)',
        borderRadius: '4px',
        transition: 'right 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box p="md">
        <Flex justify="space-between" align="center">
          <Text fw={500} fz="md">
            Mi pedido
          </Text>
          <Button
            variant="subtle"
            size="sm"
            onClick={onClose}
            style={{ padding: 0 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Flex>
      </Box>

      <Box
        style={{ width: '100%', height: '1px', backgroundColor: '#EEF2F6' }}
      />

      <Box
        style={{ maxHeight: '130px', overflowY: 'auto', padding: '8px 16px' }}
      >
        {cartItems.map((item) => (
          <Box
            key={item.productId}
            mb="xs"
            style={{ borderBottom: '1px solid #eee', paddingBottom: '8px' }}
          >
            <Flex justify="space-between" align="center">
              <Text fw={500} fz="xs">
                {item.quantity}x {item.product.name}
              </Text>
              <Text fw={700} fz="xs">
                ${(item.product.price * item.quantity).toFixed(0)}
              </Text>
            </Flex>
          </Box>
        ))}
      </Box>

      <Box p="md" pt="xs">
        <Flex justify="space-between" align="center" mb="md">
          <Text fw={700} fz="sm">
            Total
          </Text>
          <Text fw={700} fz="sm">
            ${cartTotal.toFixed(0)}
          </Text>
        </Flex>

        <Button
          fullWidth
          style={{
            backgroundColor: '#F2FE55',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '48px',
            fontSize: '14px',
            borderRadius: '4px',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H22L19 16H6L3 6Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 21C9.10457 21 10 20.1046 10 19C10 17.8954 9.10457 17 8 17C6.89543 17 6 17.8954 6 19C6 20.1046 6.89543 21 8 21Z"
              stroke="black"
              strokeWidth="2"
            />
            <path
              d="M17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21Z"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
          Ver Carrito
        </Button>
      </Box>
    </Box>
  );
};

export default CartDrawer;
