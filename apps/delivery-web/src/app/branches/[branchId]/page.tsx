'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Text, Box, useMantineTheme, Container } from '@mantine/core';
import { products } from '../../../mocks/products.mock';
import { branchesMock } from '../../../mocks/branches.mock';
import { IBranch, IProduct } from '../../../types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import CategorySection from '@/components/CategorySection';
import BasePage from '@/components/BasePage';
import {
  COMMON_TEXTS,
  ERROR_TEXTS,
  BRANCH_TEXTS,
} from '../../../config/constants';
import {
  useCart,
  CartItem as CartContextItem,
} from '../../../context/CartContext';
import { isBranchOpen } from '@/utils/branch';

export default function BranchProductsPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useMantineTheme();
  const branchId = (params?.branchId as string) || '';
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const {
    items: cartContextItems,
    addToCart: addToCartContext,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('promo');
  const [cartDrawerOpened, setCartDrawerOpened] = useState(true);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  // Find the current branch
  const [currentBranch, setCurrentBranch] = useState<IBranch | undefined>(
    branchesMock.find((branch) => branch.id === branchId)
  );

  // Check if branch is open on component mount and every minute
  useEffect(() => {
    const branch = branchesMock.find((b) => b.id === branchId);
    if (branch) {
      setCurrentBranch({
        ...branch,
        isOpen: isBranchOpen(branch),
      });

      // Update status every minute
      const intervalId = setInterval(() => {
        setCurrentBranch((prev) =>
          prev ? { ...prev, isOpen: isBranchOpen(prev) } : undefined
        );
      }, 60000);

      return () => clearInterval(intervalId);
    }
    return undefined; // Explicit return for the path when branch is not found
  }, [branchId]);

  // Handle case when branch is not found
  useEffect(() => {
    if (!currentBranch && branchId) {
      alert(COMMON_TEXTS.BRANCH_NOT_FOUND);
      router.push('/branches');
    }
  }, [currentBranch, branchId, router]);

  // Get products for this branch
  const branchProducts = useMemo(() => products || [], []);

  // Handle back navigation
  const handleBack = (): void => {
    router.push('/');
  };

  // Handle search
  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
  };

  // Add product to cart
  const addToCart = (product: IProduct, quantity: number): void => {
    // Check if branch is closed
    if (currentBranch && !currentBranch.isOpen) {
      alert(BRANCH_TEXTS.BRANCH_CLOSED_ALERT);
      return;
    }

    // Validate product data before adding to cart
    if (!product || !product.id) {
      console.error(ERROR_TEXTS.INVALID_PRODUCT, product);
      return;
    }

    if (quantity <= 0) {
      console.error(ERROR_TEXTS.INVALID_QUANTITY, quantity);
      return;
    }

    // Use the CartContext to add item to cart
    const cartItem: CartContextItem = {
      product: {
        ...product,
        id: String(product.id),
      },
      quantity,
    };

    addToCartContext(cartItem);

    // Open cart drawer
    setCartDrawerOpened(true);
  };

  // Convert cart context items to format expected by CartDrawer
  const cartItems = cartContextItems.map((item) => ({
    productId: String(item.product.id),
    quantity: item.quantity,
    product: item.product,
    totalPrice: item.totalPrice,
  }));

  // Get cart total from context
  const cartTotal = getTotalPrice();

  // Create categories for tabs from products
  const categories = useMemo(() => {
    const categoryList = ['Promo'];
    branchProducts.forEach((product: IProduct) => {
      const category = product.category;
      if (category && !categoryList.includes(category)) {
        categoryList.push(category);
      }
    });
    return categoryList;
  }, [branchProducts]);

  // Initialize expanded sections state
  useEffect(() => {
    const initialExpandedState = categories.reduce((acc, category) => {
      acc[category.toLowerCase()] =
        category.toLowerCase() === activeTab.toLowerCase();
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedSections(initialExpandedState);
  }, [activeTab, categories]);

  // Handle tab change
  const handleTabChange = (value: string | null): void => {
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
  const handleSectionToggle = (category: string, isExpanded: boolean): void => {
    setExpandedSections((prev) => ({
      ...prev,
      [category.toLowerCase()]: isExpanded,
    }));

    if (isExpanded && activeTab !== category.toLowerCase()) {
      setActiveTab(category.toLowerCase());
    }
  };

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = branchProducts
      .filter((product: IProduct) => {
        if (category.toLowerCase() === 'promo') {
          return Boolean(product.category?.toLowerCase().includes('promo'));
        }
        return Boolean(
          product.category?.toLowerCase() === category.toLowerCase()
        );
      })
      .filter((product: IProduct) =>
        Boolean(product.name?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

    if (categoryProducts.length > 0) {
      acc[category] = categoryProducts;
    }

    return acc;
  }, {} as Record<string, IProduct[]>);

  // Add a function to handle clearing the cart
  const handleClearCart = (): void => {
    clearCart();
  };

  // Header component for the BasePage
  const Header = (
    <>
      <ProductsHeader
        branch={currentBranch as IBranch}
        onBackClick={handleBack}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        isClosed={currentBranch ? !currentBranch.isOpen : false}
        closedMessage={BRANCH_TEXTS.BRANCH_CLOSED}
      />
      <CategoryTabs
        categories={categories}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </>
  );

  return (
    <>
      <BasePage
        headerSlot={Header}
        className={styles.productPageContainer}
        style={{
          backgroundColor: theme.colors.neutral[0],
        }}
      >
        <Container
          size="xl"
          px={{ base: theme.spacing.md, md: theme.spacing.xl, lg: '80px' }}
          py={theme.spacing.xs}
          style={{ paddingBottom: 0 }}
        >
          <Box
            className={styles.sectionsContainer}
            bg={theme.colors.neutral[0]}
            style={{ borderRadius: theme.radius.md }}
          >
            {Object.keys(productsByCategory).length > 0 ? (
              Object.entries(productsByCategory).map(([category, products]) => (
                <Box
                  key={category}
                  ref={(el) => {
                    sectionRefs.current[category.toLowerCase()] = el;
                  }}
                  m={0}
                  p={0}
                  style={{ marginBottom: '8px' }}
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
                    isDisabled={currentBranch ? !currentBranch.isOpen : false}
                  />
                </Box>
              ))
            ) : (
              <Text
                ta="center"
                fz="lg"
                c={theme.colors.neutral[5]}
                py={theme.spacing.xl}
                data-variant="body"
              >
                {COMMON_TEXTS.NO_PRODUCTS_AVAILABLE}
              </Text>
            )}
          </Box>
        </Container>
      </BasePage>

      {/* Cart drawer */}
      <CartDrawer
        opened={cartDrawerOpened}
        onClose={() => setCartDrawerOpened(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onClearCart={handleClearCart}
        branchId={branchId}
      />
    </>
  );
}
