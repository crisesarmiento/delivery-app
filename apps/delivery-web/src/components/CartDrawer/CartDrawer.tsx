'use client';

import { useEffect, useState } from 'react';
import {
  Drawer,
  Box,
  Text,
  Stack,
  Group,
  Button,
  ActionIcon,
  Image,
  ScrollArea,
} from '@mantine/core';
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons-react';
import { IOrderItem } from '@/types';

// Constants for text
const CART_TEXTS = {
  TITLE: 'Tu Pedido',
  EMPTY_CART: 'Tu carrito está vacío',
  EMPTY_CART_DESCRIPTION: 'Agrega productos para comenzar tu pedido',
  TOTAL: 'Total',
  CHECKOUT: 'Ir a Pagar',
  CONTINUE_SHOPPING: 'Seguir Comprando',
};

// Extended order item with imageUrl
interface CartItem extends IOrderItem {
  imageUrl?: string;
}

interface CartDrawerProps {
  opened: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateItemQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export function CartDrawer({
  opened,
  onClose,
  items = [],
  onUpdateItemQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const [total, setTotal] = useState(0);

  // Calculate total when items change
  useEffect(() => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [items]);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(0)}`;
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="md"
      scrollAreaComponent={ScrollArea.Autosize}
      title={
        <Text fz="xl" fw={700}>
          {CART_TEXTS.TITLE}
        </Text>
      }
      styles={{
        header: {
          padding: '1rem',
        },
        title: {
          width: '100%',
          textAlign: 'center',
        },
        close: {
          color: '#000000',
          '&:hover': {
            backgroundColor: '#F7F7F7',
          },
        },
        body: {
          padding: 0,
        },
      }}
    >
      {items.length === 0 ? (
        <Box p="xl" style={{ textAlign: 'center' }}>
          <Text fz="lg" fw={600} mb="md">
            {CART_TEXTS.EMPTY_CART}
          </Text>
          <Text c="dimmed" mb="xl">
            {CART_TEXTS.EMPTY_CART_DESCRIPTION}
          </Text>
          <Button
            onClick={onClose}
            variant="filled"
            color="primary"
            size="md"
            fullWidth
          >
            {CART_TEXTS.CONTINUE_SHOPPING}
          </Button>
        </Box>
      ) : (
        <>
          <ScrollArea h="calc(100vh - 200px)" offsetScrollbars>
            <Stack p="md" gap="md">
              {items.map((item) => (
                <Box
                  key={item.id}
                  p="md"
                  style={{ borderBottom: '1px solid #E5E5E5' }}
                >
                  <Group
                    justify="space-between"
                    wrap="nowrap"
                    align="flex-start"
                  >
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={60}
                        height={60}
                        radius="md"
                      />
                    )}
                    <Box style={{ flex: 1 }}>
                      <Text fw={600}>{item.name}</Text>
                      <Text fz="sm" c="dimmed">
                        {formatPrice(item.price)}
                      </Text>
                    </Box>
                    <Box>
                      <Group gap="xs">
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          color="gray"
                          onClick={() =>
                            onUpdateItemQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <IconMinus size={16} />
                        </ActionIcon>
                        <Text>{item.quantity}</Text>
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          color="gray"
                          onClick={() =>
                            onUpdateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <IconPlus size={16} />
                        </ActionIcon>
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          color="red"
                          ml="sm"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                      <Text ta="right" fw={600} mt="xs">
                        {formatPrice(item.price * item.quantity)}
                      </Text>
                    </Box>
                  </Group>
                </Box>
              ))}
            </Stack>
          </ScrollArea>

          <Box
            p="md"
            style={{
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'white',
              borderTop: '1px solid #E5E5E5',
            }}
          >
            <Group justify="space-between" mb="md">
              <Text fw={600}>{CART_TEXTS.TOTAL}</Text>
              <Text fw={700} fz="lg">
                {formatPrice(total)}
              </Text>
            </Group>
            <Button variant="filled" color="primary" size="md" fullWidth>
              {CART_TEXTS.CHECKOUT}
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}

export default CartDrawer;
