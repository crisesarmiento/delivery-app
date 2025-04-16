'use client';

import { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Text, Box, Flex, useMantineTheme } from '@mantine/core';
import { products } from '../../../mocks/products.mock';
import { branchesMock } from '../../../mocks/branches.mock';
import { IBranch, IProduct } from '../../../types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import MobileCartButton from '@/components/MobileCartButton/MobileCartButton';
import CategorySection from '@/components/CategorySection';
import ContentWrapper from '@/components/ContentWrapper';
import { NO_PRODUCTS_AVAILABLE } from '@/constants/text';
import {
  useCart,
  CartItem as CartContextItem,
} from '../../../context/CartContext';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import { BRANCH_TEXTS, COMMON_TEXTS, ERROR_TEXTS } from '@/config/constants';
import { isBranchOpen } from '@/utils/branch';

// Memoize the ProductsHeader component to prevent unnecessary re-renders
const MemoizedProductsHeader = memo(ProductsHeader);
MemoizedProductsHeader.displayName = 'MemoizedProductsHeader';

// Memoize the CategoryTabs component to prevent unnecessary re-renders
const MemoizedCategoryTabs = memo(CategoryTabs);
MemoizedCategoryTabs.displayName = 'MemoizedCategoryTabs';

// Memoize the CartDrawer component to prevent unnecessary re-renders
const MemoizedCartDrawer = memo(CartDrawer);
MemoizedCartDrawer.displayName = 'MemoizedCartDrawer';

export default function BranchProductsPage() {
  const params = useParams();
  const router = useRouter();
  const theme = useMantineTheme();
  const branchId = (params?.branchId as string) || '';
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contentWrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    items: cartContextItems,
    addToCart: addToCartContext,
    getTotalPrice,
    clearCart,
    setBranchId,
  } = useCart();

  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('promo');
  const [cartDrawerOpened, setCartDrawerOpened] = useState(true);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const prevScrollPosition = useRef(0);

  // Find the current branch
  const [currentBranch, setCurrentBranch] = useState<IBranch | undefined>(
    branchesMock.find((branch) => branch.id === branchId)
  );

  // Add debounce utility function
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function executedFunction(...args: any[]) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Define header state change handler once
  const handleHeaderStateChange = useRef((event: CustomEvent) => {
    setIsHeaderCollapsed(event.detail.collapsed);
  }).current;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIsMobile();

    // Set up an event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Add event listener for header state change events
  useEffect(() => {
    window.addEventListener(
      'header-state-change',
      handleHeaderStateChange as EventListener
    );
    return () => {
      window.removeEventListener(
        'header-state-change',
        handleHeaderStateChange as EventListener
      );
    };
  }, [handleHeaderStateChange]);

  // Track scroll position to detect header collapse state
  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.scrollY;
      setIsHeaderCollapsed(currentScrollPos > 50);
      prevScrollPosition.current = currentScrollPos;
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  // Set branch ID when component mounts or branchId changes
  useEffect(() => {
    if (branchId) {
      setBranchId(branchId);
    }
  }, [branchId, setBranchId]);

  // Handle back navigation
  const handleBack = useCallback((): void => {
    clearCart(); // Clear cart when navigating back
    router.push('/');
  }, [clearCart, router]);

  // Handle search
  const handleSearchChange = useCallback((value: string): void => {
    setSearchQuery(value);
  }, []);

  // Add product to cart
  const addToCart = useCallback(
    (product: IProduct, quantity: number): void => {
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
    },
    [currentBranch, addToCartContext]
  );

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

      // If selecting the first category, reset scroll position to the top
      if (value.toLowerCase() === categories[0].toLowerCase()) {
        // First try to use the contentWrapperRef method if available
        if (
          contentWrapperRef.current &&
          (contentWrapperRef.current as any).scrollToTop
        ) {
          (contentWrapperRef.current as any).scrollToTop();
        } else {
          // Fallback to window scroll
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
        return;
      }

      // For all other categories, scroll to the selected category section
      const sectionElement = sectionRefs.current[value.toLowerCase()];
      if (sectionElement) {
        // Find the header element inside the section
        const headerElement = sectionElement.querySelector(
          'div[style*="border-radius"]'
        );

        if (headerElement) {
          // Get the position of the header element
          const rect = headerElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset + rect.top;

          // Scroll to position the header at the top with a small buffer
          window.scrollTo({
            top: scrollTop - 120,
            behavior: 'smooth',
          });
        } else {
          // Fallback to the previous method if header can't be found
          const rect = sectionElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset + rect.top;

          window.scrollTo({
            top: scrollTop - 200,
            behavior: 'smooth',
          });
        }
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

  // Open cart drawer or navigate to cart page
  const openCartDrawer = useCallback(() => {
    if (isMobile) {
      // On mobile, navigate directly to the cart page
      router.push(`/branches/${branchId}/cart`);
    } else {
      // On desktop, just open the cart drawer
      setCartDrawerOpened(true);
    }
  }, [isMobile, router, branchId]);

  const handleCloseCartDrawer = useCallback(() => {
    setCartDrawerOpened(false);
  }, []);

  return (
    <Flex
      direction="column"
      className={styles.productPageContainer}
      style={{ minHeight: '100vh' }}
    >
      {/* Use the reusable Header component with product page configuration */}
      <MemoizedProductsHeader
        branch={currentBranch as IBranch}
        onBackClick={handleBack}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        isClosed={currentBranch ? !currentBranch.isOpen : false}
        closedMessage={BRANCH_TEXTS.BRANCH_CLOSED}
      />

      {/* Content wrapper for everything below the header */}
      <ContentWrapper
        ref={contentWrapperRef}
        isHeaderCollapsed={isHeaderCollapsed}
        isMobile={isMobile}
        headerHeight={0}
        collapsedHeaderHeight={0}
      >
        <Box
          className={styles.categoriesContainer}
          style={{
            position: 'sticky',
            top: isMobile && isHeaderCollapsed ? '70px' : '0', // Match the collapsed header height exactly
            left: 0,
            right: 0,
            zIndex: 20, // Increased z-index to be higher than sections
            backgroundColor: '#ffffff',
            overflowX: 'visible',
            overflowY: 'hidden',
            height: '75px',
            minHeight: '75px',
          }}
        >
          <MemoizedCategoryTabs
            categories={categories}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </Box>
        <Box
          className={styles.sectionsContainer}
          style={{
            flex: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative', // Added explicit position
            zIndex: 10, // Ensure proper stacking context
            paddingTop: '16px', // Simplified padding logic
            paddingBottom: '0',
            marginTop: '0', // Ensure clear spacing from categories
          }}
        >
          {Object.keys(productsByCategory).length > 0 ? (
            Object.entries(productsByCategory).map(([category, products]) => (
              <Flex
                key={category}
                ref={(el) => {
                  sectionRefs.current[category.toLowerCase()] = el;
                }}
                style={{
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  marginBottom: '11px',
                }}
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
              </Flex>
            ))
          ) : (
            <Text
              ta="center"
              fz={theme.fontSizes.lg}
              c="dimmed"
              style={{ padding: '40px 0' }}
            >
              {NO_PRODUCTS_AVAILABLE}
            </Text>
          )}
        </Box>

        {/* Cart button - now placed between sections and footer */}
        {isMobile && (
          <Box className={styles.cartButtonContainer}>
            <MobileCartButton
              onClick={openCartDrawer}
              cartItems={cartItems}
              cartTotal={cartTotal}
            />
          </Box>
        )}
      </ContentWrapper>

      {/* Only show CartDrawer in desktop view */}
      {!isMobile && (
        <MemoizedCartDrawer
          opened={cartDrawerOpened}
          onClose={handleCloseCartDrawer}
          cartItems={cartItems}
          cartTotal={cartTotal}
          isMobile={false}
        />
      )}
    </Flex>
  );
}
