'use client';

import { Drawer, Box, Text, Flex, Button } from '@mantine/core';
import { IProduct } from '../../types';

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
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Mi Pedido"
      padding="xl"
      size="sm"
      position="right"
    >
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <Box
              key={item.productId}
              mb="md"
              p="xs"
              style={{ borderBottom: '1px solid #eee' }}
            >
              <Flex justify="space-between" align="center">
                <Text fw={500}>{item.product.name}</Text>
                <Text fw={700}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
              </Flex>
              <Flex justify="space-between" align="center" mt="xs">
                <Text size="sm" c="dimmed">
                  Cantidad: {item.quantity}
                </Text>
                <Text size="sm">${item.product.price.toFixed(2)} c/u</Text>
              </Flex>
            </Box>
          ))}

          <Box mt="xl">
            <Flex justify="space-between" align="center" mb="md">
              <Text fw={700} size="lg">
                Total:
              </Text>
              <Text fw={700} size="lg">
                ${cartTotal.toFixed(2)}
              </Text>
            </Flex>

            <Button
              fullWidth
              size="md"
              style={{ backgroundColor: '#B3FF00', color: '#000' }}
            >
              Finalizar Pedido
            </Button>
          </Box>
        </>
      ) : (
        <Text ta="center" fz="lg" c="dimmed" my="xl">
          No hay productos en el carrito
        </Text>
      )}
    </Drawer>
  );
};

export default CartDrawer;
