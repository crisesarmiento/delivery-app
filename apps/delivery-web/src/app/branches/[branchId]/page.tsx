/**
 * BranchProductsPage: Robust branch context/data flow
 *
 * - Loads all branches using useBranches (mock or API).
 * - Sets activeBranch in context if it matches the branchId from the URL.
 * - If the branch does not exist, renders BranchNotFoundError.
 * - While loading branches, shows a centered Loader spinner.
 * - Passes activeBranch as the branch prop to ProductsHeader and other components.
 *
 * This ensures:
 * - Direct navigation, reloads, and bookmarks work.
 * - Users see a clear error page for invalid branch IDs.
 * - No unnecessary redirects or popups.
 */
'use client';

import { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { useParams, useRouter } from 'next/navigation';
import { Box, Flex } from '@mantine/core';
import { IProduct } from '@/types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import MobileCartButton from '@/components/MobileCartButton/MobileCartButton';
import { useCart, CartItem as CartContextItem } from '@/context/CartContext';
import CartDrawerContainer from '@/components/CartDrawer/CartDrawerContainer';
import { BRANCH_TEXTS, ERROR_TEXTS } from '@/config/constants';
import BranchNotFoundError from '@/components/ErrorScreen/BranchNotFoundError';
import { Loader, Center } from '@mantine/core';
import ProductsHeaderWrapper from '@/components/ProductsHeaderWrapper';
import ProductsContentWrapper from '@/components/ProductsContentWrapper';
import ProductsSectionsContainer from '@/components/ProductsSections/ProductsSectionsContainer';
import AddToCartModal from '@/components/AddToCartModal/AddToCartModal';
import { useNav } from '@/context/navContext';
import { useProducts } from '@/hooks/useProducts';
import { isBranchOpen } from '@/utils/branch';

const MemoizedProductsHeader = memo(ProductsHeader);
const MemoizedCategoryTabs = memo(CategoryTabs);
const MemoizedCartDrawerContainer = memo(CartDrawerContainer);

const BranchProductsPage = () => {
  // --- AddToCartModal and CartDrawer state ---
  const [addToCartModalOpened, setAddToCartModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleProductClick = (product: IProduct) => {
    setSelectedProduct(product);
    setAddToCartModalOpened(true);
  };

  const params = useParams();
  const router = useRouter();
  const { activeTab, setActiveTab, activeBranch, setActiveBranch, branches } =
    useNav();

  const branchId = Number(params?.branchId);
  const isValidBranch = branches.some((b) => b.id === branchId);

  useEffect(() => {
    if (isValidBranch) {
      const branch = branches.find((b) => b.id === branchId);
      setActiveBranch(branch);
    }
  }, [branchId, branches, setActiveBranch, isValidBranch]);

  const { branchProducts, loading, error } = useProducts(activeBranch?.id);

  const {
    items: cartContextItems,
    addToCart: addToCartContext,
    getTotalPrice,
    clearCart,
  } = useCart();

  const headerRef = useRef<HTMLDivElement>(null);
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');

  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  const categoriesHeight = 61;
  const headerHeight = isMobile ? 200 : 280;
  const collapsedHeaderHeight = isMobile ? 40 : 60;
  const categoriesTopOffset = isHeaderCollapsed
    ? isMobile
      ? 10
      : 25
    : isMobile
    ? 10
    : 35;

  const handleHeaderStateChange = useRef((event: CustomEvent) => {
    setIsHeaderCollapsed(event.detail.collapsed);
  }).current;

  useEffect(() => {
    window.addEventListener(
      'header-state-change',
      handleHeaderStateChange as EventListener
    );
    return () =>
      window.removeEventListener(
        'header-state-change',
        handleHeaderStateChange as EventListener
      );
  }, [handleHeaderStateChange]);

  const categories = useMemo(() => {
    const categoryList: string[] = [];
    branchProducts.forEach((product: IProduct) => {
      const category = product.category;
      if (category && !categoryList.includes(category))
        categoryList.push(category);
    });
    return categoryList;
  }, [branchProducts]);

  useEffect(() => {
    if (!activeTab && categories.length > 0) {
      setActiveTab(categories[0].toLowerCase());
    }
  }, [activeTab, categories, setActiveTab]);

  const handleBack = useCallback(() => {
    clearCart();
    router.push('/');
  }, [clearCart, router]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const addToCart = useCallback(
    (product: IProduct, quantity: number) => {
      if (activeBranch && !isBranchOpen(activeBranch, now)) {
        alert(BRANCH_TEXTS.BRANCH_CLOSED_ALERT);
        return;
      }
      if (!product || !product.id) {
        console.error(ERROR_TEXTS.INVALID_PRODUCT, product);
        return;
      }
      if (quantity <= 0) {
        console.error(ERROR_TEXTS.INVALID_QUANTITY, quantity);
        return;
      }
      const cartItem: CartContextItem = {
        product: { ...product, id: product.id },
        quantity,
      };
      addToCartContext(cartItem);
      setTimeout(() => setSelectedProduct(null), 200);
    },
    [activeBranch, addToCartContext, now]
  );

  const openCartDrawer = useCallback(() => {
    if (isMobile) router.push(`/branches/${branchId}/cart`);
  }, [isMobile, router, branchId]);

  // Compute isClosed only when activeBranch or now changes
  const isClosed = useMemo(() => {
    return activeBranch ? !isBranchOpen(activeBranch, now) : false;
  }, [activeBranch, now]);

  if (loading) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  const cartItems = cartContextItems.map((item) => ({
    productId: String(item.product.id),
    quantity: item.quantity,
    product: item.product,
    totalPrice: item.totalPrice,
  }));

  const cartTotal = getTotalPrice();

  // Helper to wait for header transition before scrolling
  const scrollToCategory = (category: string) => {
    // Listen for transitionend on header, then scroll
    const doScroll = () => {
      const sectionElement = document.getElementById(
        `category-section-${category.toLowerCase()}`
      );
      const isFirstCategory =
        category.toLowerCase() === categories[0].toLowerCase();
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const tabsHeight = categoryTabsRef.current?.offsetHeight || 0;
      const offset = headerHeight + tabsHeight;
      if (isFirstCategory) {
        setSearchQuery('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (sectionElement) {
        const position = Math.max(0, sectionElement.offsetTop - offset);
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    };
    // If header is transitioning, wait for transitionend
    const headerEl = headerRef.current;
    if (headerEl) {
      let scrolled = false;
      const onTransitionEnd = () => {
        if (!scrolled) {
          scrolled = true;
          doScroll();
        }
        headerEl.removeEventListener('transitionend', onTransitionEnd);
      };
      // If header is animating (has transition), wait for it
      const computedStyle = window.getComputedStyle(headerEl);
      if (
        computedStyle.transitionDuration &&
        computedStyle.transitionDuration !== '0s'
      ) {
        headerEl.addEventListener('transitionend', onTransitionEnd);
        // Fallback: scroll anyway after 400ms if transitionend doesn't fire
        setTimeout(() => {
          if (!scrolled) {
            scrolled = true;
            doScroll();
            headerEl.removeEventListener('transitionend', onTransitionEnd);
          }
        }, 400);
      } else {
        doScroll();
      }
    } else {
      doScroll();
    }
  };

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
      scrollToCategory(value);
    }
  };

  const handleOnClose = () => {
    setAddToCartModalOpened(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  return activeBranch ? (
    <>
      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          opened={addToCartModalOpened}
          onClose={handleOnClose}
          onAddToCart={(quantity) => addToCart(selectedProduct, quantity)}
        />
      )}
      <Flex direction="column" className={styles.productPageContainer}>
        <ProductsHeaderWrapper
          isHeaderCollapsed={isHeaderCollapsed}
          headerHeight={headerHeight}
          collapsedHeaderHeight={collapsedHeaderHeight}
          header={
            <MemoizedProductsHeader
              ref={headerRef}
              branch={activeBranch}
              onBackClick={handleBack}
              searchValue={searchQuery}
              onSearchChange={handleSearchChange}
              isClosed={isClosed}
              closedMessage={BRANCH_TEXTS.BRANCH_CLOSED}
              isFiltering={searchQuery.length > 0}
            />
          }
          categories={
            <MemoizedCategoryTabs
              categories={categories}
              onTabChange={handleTabChange}
              top={
                isHeaderCollapsed
                  ? collapsedHeaderHeight + categoriesTopOffset
                  : headerHeight + categoriesTopOffset
              }
            />
          }
        />
        <ProductsContentWrapper
          ref={contentWrapperRef}
          topOffset={18 + categoriesHeight}
        >
          <ProductsSectionsContainer
            categories={categories}
            products={branchProducts}
            searchQuery={searchQuery}
            onProductClick={handleProductClick}
          />
          {isMobile && (
            <Box className={styles.cartButtonContainer}>
              <MobileCartButton
                onClick={openCartDrawer}
                cartItems={cartItems}
                cartTotal={cartTotal}
              />
            </Box>
          )}
        </ProductsContentWrapper>
        {<MemoizedCartDrawerContainer isMobile={isMobile} />}
      </Flex>
    </>
  ) : loading ? (
    <Center style={{ minHeight: '50vh' }}>
      <Loader size="lg" />
    </Center>
  ) : (
    <BranchNotFoundError />
  );
};

export default BranchProductsPage;
