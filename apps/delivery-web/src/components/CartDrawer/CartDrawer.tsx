'use client';

import { Box, Text, Flex, Button, Divider } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IProduct } from '../../types';
import { useEffect, useState } from 'react';
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';

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
  onClearCart?: () => void;
  branchId?: string;
}

const CartDrawer = ({
  opened,
  onClose,
  cartItems,
  cartTotal,
  onClearCart,
  branchId,
}: CartDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(opened);
  }, [opened]);

  // Debug log to check if cartItems data is being received
  useEffect(() => {
    console.log('CartDrawer received cartItems:', cartItems);
    console.log('CartDrawer is visible:', isVisible);
    console.log('onClearCart function provided:', !!onClearCart);
  }, [cartItems, isVisible, onClearCart]);

  const handleClearCart = () => {
    console.log('Trash icon clicked, attempting to clear cart');
    if (onClearCart) {
      console.log('onClearCart function exists, calling it');
      onClearCart();
    } else {
      console.log('onClearCart function is not provided');
      // Fallback implementation if onClearCart is not provided
      alert('Please implement onClearCart function in the parent component');
    }
  };

  const handleGoToCheckout = () => {
    if (branchId) {
      router.push(`/branches/${branchId}/cart`);
    } else {
      console.error('Branch ID not provided to CartDrawer');
      alert('No se puede acceder al carrito sin una sucursal seleccionada');
    }
  };

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
        top: '406px',
        right: isVisible ? '40px' : '-240px',
        width: '200px',
        maxHeight: '242px',
        background: '#FFFFFF',
        border: '1px solid #EEF2F6',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        transition: 'right 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '12px 0',
      }}
    >
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
          Mi pedido
        </Text>
        <Box style={{ position: 'absolute', top: 0, right: 16 }}>
          <IconTrash
            size={18}
            stroke={1.5}
            style={{ cursor: 'pointer' }}
            onClick={handleClearCart}
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

      <Box
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '4px 16px 8px',
        }}
      >
        {cartItems.map((item, index) => (
          <Box key={item.productId} mb={12}>
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
                ${(item.product.price * item.quantity).toLocaleString()}
              </Text>
            </Box>
          </Box>
        ))}
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
            Total
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
          fullWidth
          onClick={handleGoToCheckout}
          style={{
            backgroundColor: '#000000',
            color: '#B3FF00',
            height: '40px',
            fontSize: '16px',
            lineHeight: '20px',
            borderRadius: '4px',
            fontFamily: 'Inter',
            fontWeight: 600,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <IconShoppingCart size={20} color="#B3FF00" stroke={2} />
            <Text
              style={{ color: '#B3FF00', fontSize: '16px', fontWeight: 600 }}
            >
              Ver Carrito
            </Text>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default CartDrawer;
