'use client';

import { useState } from 'react';
import { IProduct } from '../../types';
import {
  Card,
  Text,
  Badge,
  Image,
  Overlay,
  Box,
  ActionIcon,
  Flex,
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';

interface ProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct, quantity: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (onAddToCart && product.isAvailable) {
      onAddToCart(product, quantity);
    }
  };

  const increaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Card
      shadow="sm"
      p="xs"
      radius="md"
      withBorder
      style={{
        boxSizing: 'border-box',
        width: '100%',
        background: isHovered ? '#E3E8EF' : '#FFFFFF',
        border: `1px solid ${isHovered ? '#C9CDD5' : '#EEF2F6'}`,
        borderRadius: '8px',
        transition: 'background 0.2s, border 0.2s',
        cursor: 'pointer',
        overflow: 'visible',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={addToCart}
    >
      {!product.isAvailable && (
        <Overlay color="#000" backgroundOpacity={0.6} blur={1} radius="md">
          <Badge
            size="xl"
            color="red"
            variant="filled"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            No Disponible
          </Badge>
        </Overlay>
      )}

      <Badge
        size="sm"
        color="green"
        variant="filled"
        className="discount-badge"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: '#B3FF00',
          color: '#000000',
          zIndex: 2,
        }}
      >
        -20% OFF
      </Badge>

      {product.imageUrl && (
        <Box
          style={{
            width: '100%',
            height: '140px',
            overflow: 'hidden',
            borderRadius: '4px',
            marginBottom: '8px',
          }}
        >
          <Image
            src={product.imageUrl}
            height={140}
            fit="cover"
            alt={product.name}
          />
        </Box>
      )}

      <Text fw={600} size="md" mt="xs" lineClamp={1}>
        {product.name}
      </Text>

      <Text size="sm" c="dimmed" lineClamp={2} mb="xs">
        {product.description}
      </Text>

      <Flex justify="space-between" align="center" mt="auto">
        <Text fw={700} size="lg" c="#101828">
          ${product.price.toFixed(2)}
        </Text>

        {isHovered && product.isAvailable && (
          <Flex gap="sm" align="center">
            <ActionIcon size="sm" variant="subtle" onClick={decreaseQuantity}>
              <IconMinus size={14} />
            </ActionIcon>

            <Text fw={500}>{quantity}</Text>

            <ActionIcon
              size="sm"
              variant="filled"
              style={{ backgroundColor: '#B3FF00', color: 'black' }}
              onClick={increaseQuantity}
            >
              <IconPlus size={14} />
            </ActionIcon>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}

export default ProductCard;
