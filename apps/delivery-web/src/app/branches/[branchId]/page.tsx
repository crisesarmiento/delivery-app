'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Text, Box, Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { productsMock } from '../../../mocks/products.mock';
import { branchesMock } from '../../../mocks/branches.mock';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { IBranch, IProduct } from '../../../types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import CartDrawer from '@/components/CartDrawer';

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

  // Handle search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
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
      {/* Use the reusable Header component with product page configuration */}
      <ProductsHeader
        branch={currentBranch as IBranch}
        onBackClick={handleBack}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onCartClick={() => setCartDrawerOpened(true)}
      />

      {/* Categories tabs */}
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

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
      <CartDrawer
        opened={cartDrawerOpened}
        onClose={() => setCartDrawerOpened(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
      />
    </Box>
  );
}
