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
import { Flex } from '@mantine/core';
import { IProduct } from '@/types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/HeaderProducts/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import BranchesFooterWrapper from '@/components/BranchesFooterWrapper/BranchesFooterWrapper';
import { useCart } from '@/context/CartContext';
import { CartItemCustomization } from '@/context/types';
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
  const [pendingScrollCategory, setPendingScrollCategory] = useState<
    string | null
  >(null);
  const [scrollLock, setScrollLock] = useState(false); // NEW: lock scroll events during programmatic scroll

  // Compute isClosed only when activeBranch or now changes
  const isClosed = useMemo(() => {
    return activeBranch ? !isBranchOpen(activeBranch, now) : false;
  }, [activeBranch, now]);

  // Collapse header on manual scroll, but ignore during programmatic scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollLock) return; // Ignore scroll events while locked
      if (window.scrollY > 50 && !isHeaderCollapsed) {
        setIsHeaderCollapsed(true);
      } else if (window.scrollY <= 50 && isHeaderCollapsed) {
        setIsHeaderCollapsed(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderCollapsed, scrollLock]);

  const headerHeight = isMobile ? 200 : 280;
  const collapsedHeaderHeight = isMobile ? 40 : 60;

  const categoriesTopOffset = () => {
    if (isHeaderCollapsed && isMobile) {
      return isClosed ? 25 : 10;
    } else if (isHeaderCollapsed && !isMobile) {
      return isClosed ? 25 + 15 : 25;
    } else if (!isHeaderCollapsed && isMobile) {
      return isClosed ? 25 : 5;
    } else if (!isHeaderCollapsed && !isMobile) {
      return isClosed ? 25 : 25;
    }
    return 0;
  };
  const distanceWithCategories = isMobile ? 33 : 27;

  // Canonical offset: header height + top offset (do NOT add categoriesHeight)
  const totalTopOffset = isHeaderCollapsed
    ? collapsedHeaderHeight + categoriesTopOffset()
    : headerHeight + categoriesTopOffset();

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
      const cartItem: CartItemCustomization = {
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

  const cartItems = cartContextItems.map((item) => ({
    productId: String(item.product.id),
    quantity: item.quantity,
    product: item.product,
    totalPrice: item.totalPrice,
  }));

  const cartTotal = getTotalPrice();

  // Helper to wait for header transition before scrolling
  // Robust scroll logic: force header collapse before scrolling
  // Always set pendingScrollCategory and trigger scroll logic
  const scrollToCategory = (category: string) => {
    setScrollLock(true); // Lock scroll events during programmatic scroll
    setPendingScrollCategory(category);
    // If header is not collapsed, force collapse (scroll will happen after transition)
    if (!isHeaderCollapsed) {
      setIsHeaderCollapsed(true);
      return;
    }
    // If already collapsed, effect below will scroll immediately
  };

  // Effect: when header collapses and a pending scroll is set, do the scroll
  // When header is collapsed and pendingScrollCategory is set, scroll to the category
  useEffect(() => {
    if (isHeaderCollapsed && pendingScrollCategory) {
      const category = pendingScrollCategory;
      const sectionElement = document.getElementById(
        `category-section-${category.toLowerCase()}`
      );
      const isFirstCategory =
        category.toLowerCase() === categories[0]?.toLowerCase();
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const tabsHeight = categoryTabsRef.current?.offsetHeight || 0;
      const offset = headerHeight + tabsHeight;
      const doScroll = () => {
        if (isFirstCategory) {
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (sectionElement) {
          const position = Math.max(0, sectionElement.offsetTop - offset);
          window.scrollTo({ top: position, behavior: 'smooth' });
        }
        setPendingScrollCategory(null);
        // Release scrollLock after scroll completes (estimate 500ms)
        setTimeout(() => setScrollLock(false), 500);
      };
      // Wait for header transition if applicable
      const headerEl = headerRef.current;
      let scrolled = false;
      if (headerEl) {
        const onTransitionEnd = () => {
          if (!scrolled) {
            scrolled = true;
            doScroll();
          }
          headerEl.removeEventListener('transitionend', onTransitionEnd);
        };
        const computedStyle = window.getComputedStyle(headerEl);
        if (
          computedStyle.transitionDuration &&
          computedStyle.transitionDuration !== '0s'
        ) {
          headerEl.addEventListener('transitionend', onTransitionEnd);
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
    }
  }, [isHeaderCollapsed, pendingScrollCategory, categories]);

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value); // Always update, even if already active
      scrollToCategory(value); // Always trigger scroll logic
    }
  };

  if (loading) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

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
              isFiltering={searchQuery.length > 0}
              isHeaderCollapsed={isHeaderCollapsed}
              collapsedHeaderHeight={collapsedHeaderHeight}
            />
          }
          categories={
            <MemoizedCategoryTabs
              categories={categories}
              onTabChange={handleTabChange}
              top={totalTopOffset} // Use unified offset
            />
          }
        />
        {/*
          Ensure ProductsContentWrapper always starts below header+tabs area.
          Adjust topOffset dynamically based on isHeaderCollapsed.
        */}

        <ProductsContentWrapper
          ref={contentWrapperRef}
          topOffset={totalTopOffset + distanceWithCategories}
        >
          <ProductsSectionsContainer
            categories={categories}
            products={branchProducts}
            searchQuery={searchQuery}
            onProductClick={handleProductClick}
          />
        </ProductsContentWrapper>
        {/* Cart Drawer */}
        <MemoizedCartDrawerContainer
          isHeaderCollapsed={isHeaderCollapsed}
          isClosed={isClosed}
        />
      </Flex>
      <BranchesFooterWrapper onClick={handleBack} />
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
