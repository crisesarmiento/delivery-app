'use client';

import { useState, useEffect, useRef, useMemo, memo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Flex } from '@mantine/core';
import { IBranch, IProduct } from '../../../types';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import CategoryTabs from '@/components/CategoryTabs/CategoryTabs';
import MobileCartButton from '@/components/MobileCartButton/MobileCartButton';
import {
  useCart,
  CartItem as CartContextItem,
} from '../../../context/CartContext';
import CartDrawer from '@/components/CartDrawer/CartDrawer';
import { BRANCH_TEXTS, COMMON_TEXTS, ERROR_TEXTS } from '@/config/constants';
import { isBranchOpen } from '@/utils/branch';
import ProductsHeaderWrapper from '@/components/ProductsHeaderWrapper';
import ProductsContentWrapper from '@/components/ProductsContentWrapper';
import ProductsSectionsContainer from '@/components/ProductsSections/ProductsSectionsContainer';
import { useNav } from '@/context/navContext';

const MemoizedProductsHeader = memo(ProductsHeader);
const MemoizedCategoryTabs = memo(CategoryTabs);
const MemoizedCartDrawer = memo(CartDrawer);

const BranchProductsPage = () => {
  // --- Guarantee activeBranch is set ---
  const params = useParams();
  const router = useRouter();
  const branchId = (params?.branchId as string) || '';
  const headerRef = useRef<HTMLDivElement>(null);
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const {
    items: cartContextItems,
    addToCart: addToCartContext,
    getTotalPrice,
    clearCart,
    setBranchId,
  } = useCart();

  const { activeTab, setActiveTab, products, activeBranch } = useNav();

  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartDrawerOpened, setCartDrawerOpened] = useState(true);
  const [currentBranch, setCurrentBranch] = useState<IBranch | undefined>(
    activeBranch?.id === branchId ? activeBranch : undefined
  );

  useEffect(() => {
    if (products.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentBranch((prev) =>
          prev ? { ...prev, isOpen: isBranchOpen(prev) } : undefined
        );
      }, 60000);
      return () => clearInterval(intervalId);
    }
    return;
  }, [branchId, products]);

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

  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function (...args: any[]) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const handleHeaderStateChange = useRef((event: CustomEvent) => {
    setIsHeaderCollapsed(event.detail.collapsed);
  }).current;

  useEffect(() => {
    const checkIsMobile = debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 100);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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

  useEffect(() => {
    if (!currentBranch && branchId) {
      alert(COMMON_TEXTS.BRANCH_NOT_FOUND);
      router.push('/branches');
    }
  }, [currentBranch, branchId, router]);

  // allBranchProducts now comes from the useProducts hook above

  const categories = useMemo(() => {
    const categoryList: string[] = [];
    products.forEach((product: IProduct) => {
      const category = product.category;
      if (category && !categoryList.includes(category))
        categoryList.push(category);
    });
    return categoryList;
  }, [products]);

  useEffect(() => {
    if (!activeTab && categories.length > 0) {
      setActiveTab(categories[0].toLowerCase());
    }
  }, [activeTab, categories, setActiveTab]);

  useEffect(() => {
    if (branchId) setBranchId(branchId);
  }, [branchId, setBranchId]);

  const handleBack = useCallback(() => {
    clearCart();
    router.push('/');
  }, [clearCart, router]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const addToCart = useCallback(
    (product: IProduct, quantity: number) => {
      if (currentBranch && !currentBranch.isOpen) {
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
      setCartDrawerOpened(true);
    },
    [currentBranch, addToCartContext]
  );

  const cartItems = cartContextItems.map((item) => ({
    productId: String(item.product.id),
    quantity: item.quantity,
    product: item.product,
    totalPrice: item.totalPrice,
  }));

  const cartTotal = getTotalPrice();

  const scrollToCategory = (category: string) => {
    setTimeout(() => {
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
    }, 0);
  };

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
      scrollToCategory(value);
    }
  };

  const openCartDrawer = useCallback(() => {
    if (isMobile) router.push(`/branches/${branchId}/cart`);
    else setCartDrawerOpened(true);
  }, [isMobile, router, branchId]);

  const handleCloseCartDrawer = useCallback(() => {
    setCartDrawerOpened(false);
  }, []);

  return (
    <Flex direction="column" className={styles.productPageContainer}>
      <ProductsHeaderWrapper
        isHeaderCollapsed={isHeaderCollapsed}
        headerHeight={headerHeight}
        collapsedHeaderHeight={collapsedHeaderHeight}
        header={
          <MemoizedProductsHeader
            ref={headerRef}
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
          products={products}
          searchQuery={searchQuery}
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
};

export default BranchProductsPage;
