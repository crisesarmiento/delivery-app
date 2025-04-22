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
import ProductsHeaderWrapper from '@/components/ProductsHeaderWrapper';

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
  const scrollToCategory = (category: string) => {
    // Maximum transition duration among components (in ms)
    const maxTransitionDuration = 400;

    // Special handling for first category to reset header state
    const isFirstCategory =
      category.toLowerCase() === categories[0].toLowerCase();
    if (isFirstCategory) {
      // Force header to expanded state for first category
      setIsHeaderCollapsed(false);
    }

    // Delay the scroll calculation and execution to allow animations to complete
    setTimeout(() => {
      // Find category section by ID (for all categories including first)
      const sectionElement = document.getElementById(
        `category-section-${category.toLowerCase()}`
      );

      if (sectionElement) {
        // Calculate a dynamic offset based on viewport height
        const viewportHeight = window.innerHeight;
        let headerOffsetPercent;

        if (isFirstCategory) {
          // Lower offset for first category so it appears at top
          headerOffsetPercent = isMobile ? 0.08 : 0.06; // 8% for mobile, 6% for desktop
        } else {
          // Standard offset for other categories
          headerOffsetPercent = isMobile ? 0.15 : 0.12; // 15% for mobile, 12% for desktop
        }

        const headerOffset = Math.round(viewportHeight * headerOffsetPercent);

        // Special case for first category on desktop
        if (isFirstCategory && !isMobile) {
          // For first category, first scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });

          // Then after a short delay, fine-tune the scroll position
          setTimeout(() => {
            const elementPosition = sectionElement.getBoundingClientRect().top;
            const offsetPosition = Math.max(
              0,
              elementPosition + window.pageYOffset - headerOffset
            );

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }, 100);
        } else {
          // For other categories or first category on mobile
          const elementPosition = sectionElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      } else if (isFirstCategory) {
        // Fallback for first category if element not found
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    }, maxTransitionDuration + 50); // Add 50ms buffer to be safe
  };

  // Handle tab change
  const handleTabChange = (value: string | null): void => {
    if (value) {
      // Check if this is the first category tab
      const isFirstCategory =
        value.toLowerCase() === categories[0].toLowerCase();

      // Force header to expanded state when selecting first tab
      if (isFirstCategory) {
        setIsHeaderCollapsed(false);
      }

      // Always scroll to section even if it's already the active tab
      const previousTab = activeTab;

      // Only update state if the tab has changed
      if (previousTab !== value) {
        setActiveTab(value);

        // Update expanded sections based on active tab
        setExpandedSections((prev) => {
          const newState = { ...prev };
          Object.keys(newState).forEach((key) => {
            newState[key] = key === value.toLowerCase();
          });
          return newState;
        });
      }

      // Scroll to the selected category
      scrollToCategory(value);
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
    <Flex direction="column" className={styles.productPageContainer}>
      {/* Wrap header and categories in ProductsHeaderWrapper */}
      <ProductsHeaderWrapper
        isHeaderCollapsed={isHeaderCollapsed}
        headerHeight={isMobile ? 37 : -10} // Reduced from 200/320 for better spacing
        collapsedHeaderHeight={isMobile ? -113 : -233} // Reduced from 115/115
        header={
          <MemoizedProductsHeader
            branch={currentBranch as IBranch}
            onBackClick={handleBack}
            searchValue={searchQuery}
            onSearchChange={handleSearchChange}
            isClosed={currentBranch ? !currentBranch.isOpen : false}
            closedMessage={BRANCH_TEXTS.BRANCH_CLOSED}
            isFiltering={searchQuery.length > 0}
          />
        }
        categories={
          <MemoizedCategoryTabs
            categories={categories}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        }
      />

      {/* Content wrapper for everything below the header and category tabs */}
      <ContentWrapper
        ref={contentWrapperRef}
        isHeaderCollapsed={isHeaderCollapsed}
        headerHeight={isMobile ? 145 : 45} // Reduced from 200/320 for better spacing
        collapsedHeaderHeight={isMobile ? 115 : 45} // Reduced from 115/115
      >
        <Box
          className={styles.sectionsContainer}
          style={{
            flex: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative',
            zIndex: 10,
            paddingTop: '25px', // Reduced to account for ProductsHeaderWrapper
            paddingBottom: '0',
            marginTop: '0',
          }}
        >
          {Object.keys(productsByCategory).length > 0 ? (
            Object.entries(productsByCategory).map(([category, products]) => (
              <Flex
                key={category}
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
