'use client';

import { Product } from '../../types';
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Image,
  Overlay,
  Center,
} from '@mantine/core';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder pos="relative">
      {!product.isAvailable && (
        <Overlay color="#000" backgroundOpacity={0.5} blur={2}>
          <Center h="100%">
            <Badge size="lg" color="red" variant="filled">
              No Disponible
            </Badge>
          </Center>
        </Overlay>
      )}

      {product.imageUrl && (
        <Card.Section>
          <Image src={product.imageUrl} height={180} alt={product.name} />
        </Card.Section>
      )}

      <Text fw={500} size="lg" mt="md">
        {product.name}
      </Text>

      <Group mt="xs">
        <Badge color="teal" variant="outline">
          {product.category}
        </Badge>
        <Text fw={700} c="teal" ml="auto">
          ${product.price.toFixed(2)}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mt="sm" lineClamp={2}>
        {product.description}
      </Text>

      <Button
        fullWidth
        mt="md"
        color="teal"
        disabled={!product.isAvailable}
        onClick={onAddToCart}
      >
        Agregar al carrito
      </Button>
    </Card>
  );
}

export default ProductCard;
