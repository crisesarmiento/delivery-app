'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Text, Box } from '@mantine/core';
import { products } from '../../../mocks/products.mock';
import { branchesMock } from '../../../mocks/branches.mock';
import { IBranch, IProduct } from '../../../types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import CategorySection from '@/components/CategorySection';

interface CartItem {
  productId: string;
  quantity: number;
  product: IProduct;
}

export default function BranchProductsPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = (params?.branchId as string) || '';
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    console.log('Dynamic route params:', params);
    console.log('Branch ID:', branchId);
    console.log('Available products for this branch:', products || []);
  }, [params, branchId]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('promo');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpened, setCartDrawerOpened] = useState(true);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

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
  const branchProducts = products || [];

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
      (item) => item.productId === String(product.id)
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
          productId: String(product.id),
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
  branchProducts.forEach((product: IProduct) => {
    const category = product.category;
    if (category && !categories.includes(category)) {
      categories.push(category);
    }
  });

  // Initialize expanded sections state
  useEffect(() => {
    const initialExpandedState = categories.reduce((acc, category) => {
      acc[category.toLowerCase()] =
        category.toLowerCase() === activeTab.toLowerCase();
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedSections(initialExpandedState);
  }, []);

  // Handle tab change
  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);

      // Update expanded sections based on active tab
      setExpandedSections((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((key) => {
          newState[key] = key === value.toLowerCase();
        });
        return newState;
      });

      // Scroll to the selected category section
      const sectionElement = sectionRefs.current[value.toLowerCase()];
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Handle section toggle
  const handleSectionToggle = (category: string, isExpanded: boolean) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category.toLowerCase()]: isExpanded,
    }));

    if (isExpanded) {
      setActiveTab(category.toLowerCase());
    }
  };

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = branchProducts
      .filter((product: IProduct) =>
        category.toLowerCase() === 'promo'
          ? product.category?.toLowerCase().includes('promo') ?? false
          : product.category?.toLowerCase() === category.toLowerCase()
      )
      .filter(
        (product: IProduct) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false
      );

    if (categoryProducts.length > 0) {
      acc[category] = categoryProducts;
    }

    return acc;
  }, {} as Record<string, IProduct[]>);

  return (
    <Box className={styles.productPageContainer}>
      {/* Use the reusable Header component with product page configuration */}
      <ProductsHeader
        branch={currentBranch as IBranch}
        onBackClick={handleBack}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Categories tabs */}
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Category sections */}
      <Box className={styles.sectionsContainer}>
        {Object.keys(productsByCategory).length > 0 ? (
          Object.entries(productsByCategory).map(([category, products]) => (
            <div
              key={category}
              ref={(el) => {
                sectionRefs.current[category.toLowerCase()] = el;
              }}
              style={{ margin: 0, padding: 0 }}
            >
              <CategorySection
                title={category}
                products={products}
                onAddToCart={addToCart}
                isInitiallyExpanded={
                  expandedSections[category.toLowerCase()] || false
                }
                onToggleExpand={(isExpanded) =>
                  handleSectionToggle(category, isExpanded)
                }
              />
            </div>
          ))
        ) : (
          <Text ta="center" fz="lg" c="dimmed" style={{ padding: '40px 0' }}>
            No hay productos disponibles
          </Text>
        )}
      </Box>

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
