'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Title,
  TextInput,
  ActionIcon,
  Text,
  Box,
  Tabs,
  Group,
  Drawer,
  Button,
  ScrollArea,
  Flex,
} from '@mantine/core';
import {
  IconSearch,
  IconArrowLeft,
  IconShoppingCart,
} from '@tabler/icons-react';
import { productsMock } from '../../../mocks/products.mock';
import { branchesMock } from '../../../mocks/branches.mock';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { IProduct } from '../../../types';
import styles from './page.module.css';

interface CartItem {
  productId: string;
  quantity: number;
  product: IProduct;
}

export default function BranchProductsPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = (params?.branchId as string) || '';

  useEffect(() => {
    console.log('Dynamic route params:', params);
    console.log('Branch ID:', branchId);
    console.log(
      'Available products for this branch:',
      productsMock[branchId] || []
    );
  }, [params, branchId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('promo');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpened, setCartDrawerOpened] = useState(false);

  // Find the current branch
  const currentBranch = branchesMock.find((branch) => branch.id === branchId);

  // Handle case when branch is not found
  useEffect(() => {
    if (!currentBranch && branchId) {
      console.log('Branch not found:', branchId);
      alert('Branch not found. Redirecting to branches page.');
      router.push('/branches');
    }
  }, [currentBranch, branchId, router]);

  // Get products for this branch
  const branchProducts = productsMock[branchId] || [];

  // Filter products based on search and active category
  const filteredProducts = branchProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeTab === 'promo' ||
        product.category.toLowerCase().includes(activeTab.toLowerCase()))
  );

  // Handle back navigation
  const handleBack = () => {
    router.push('/');
  };

  // Add product to cart
  const addToCart = (product: IProduct, quantity: number) => {
    // Check if product already in cart
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === product.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if already in cart
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedItems);
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          productId: product.id,
          quantity,
          product,
        },
      ]);
    }

    // Open cart drawer
    setCartDrawerOpened(true);
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Create categories for tabs from products
  const categories = ['Promo'];
  branchProducts.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  // Handle tab change
  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return (
    <Box className={styles.productPageContainer}>
      {/* Header */}
      <Box className={styles.headerContainer}>
        <Group className={styles.header}>
          <ActionIcon size="lg" onClick={handleBack}>
            <IconArrowLeft size={24} />
          </ActionIcon>
          <Title order={3}>PUNTO {currentBranch?.name || ''}</Title>
          <div></div> {/* Empty div for spacing */}
        </Group>

        <Box className={styles.branchInfo}>
          <Title order={2}>{currentBranch?.name || ''}</Title>
          <Text size="sm">{currentBranch?.address || ''}</Text>
        </Box>

        <TextInput
          className={styles.searchInput}
          placeholder="Buscar un Producto..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <ActionIcon
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#B3FF00',
                borderRadius: '7px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3px',
              }}
            >
              <IconSearch size={16} stroke={2} color="#000000" />
            </ActionIcon>
          }
          rightSectionWidth={42}
        />
      </Box>

      {/* Categories tabs */}
      <ScrollArea className={styles.categoriesContainer}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          classNames={{
            root: styles.tabsList,
            tab: styles.tab,
          }}
        >
          <Tabs.List>
            {categories.map((category) => (
              <Tabs.Tab
                key={category.toLowerCase()}
                value={category.toLowerCase()}
              >
                {category}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </ScrollArea>

      {/* Products section */}
      <Box className={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        ) : (
          <Text
            ta="center"
            fz="lg"
            c="dimmed"
            style={{ gridColumn: '1 / -1', padding: '40px 0' }}
          >
            No hay productos disponibles en esta categoría
          </Text>
        )}
      </Box>

      {/* Cart button */}
      {cartItems.length > 0 && (
        <Button
          className={styles.cartButton}
          leftSection={<IconShoppingCart size={18} />}
          onClick={() => setCartDrawerOpened(true)}
        >
          Ver Carrito (${cartTotal.toFixed(2)})
        </Button>
      )}

      {/* Cart drawer */}
      <Drawer
        opened={cartDrawerOpened}
        onClose={() => setCartDrawerOpened(false)}
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
    </Box>
  );
}
