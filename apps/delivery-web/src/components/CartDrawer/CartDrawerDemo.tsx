'use client';

import { useState } from 'react';
import { Button, Container, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CartDrawer } from './CartDrawer';

// Demo mock data
const mockCartItems = [
  {
    id: '1',
    productId: 'p1',
    quantity: 2,
    price: 8500,
    name: 'Hamburguesa Clásica',
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '2',
    productId: 'p2',
    quantity: 1,
    price: 4500,
    name: 'Papas Fritas Grandes',
    imageUrl:
      'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: '3',
    productId: 'p3',
    quantity: 1,
    price: 3500,
    name: 'Refresco Cola',
    imageUrl:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

export function CartDrawerDemo() {
  const [opened, { open, close }] = useDisclosure(false);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [emptyCart, setEmptyCart] = useState(false);

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const toggleEmptyCart = () => {
    setEmptyCart(!emptyCart);
  };

  return (
    <Container py="xl">
      <Text fz="xl" fw={700} mb="md">
        Demostración del Carrito
      </Text>

      <Group gap="md">
        <Button onClick={open} color="primary">
          Abrir Carrito
        </Button>

        <Button onClick={toggleEmptyCart} variant="outline" color="gray">
          {emptyCart ? 'Mostrar Productos' : 'Vaciar Carrito'}
        </Button>
      </Group>

      <CartDrawer
        opened={opened}
        onClose={close}
        items={emptyCart ? [] : cartItems}
        onUpdateItemQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </Container>
  );
}

export default CartDrawerDemo;
