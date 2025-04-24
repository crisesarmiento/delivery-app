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

const MemoizedProductsHeader = memo(ProductsHeader);
const MemoizedCategoryTabs = memo(CategoryTabs);
const MemoizedCartDrawer = memo(CartDrawer);

const BranchProductsPage = () => {
  const params = useParams();
  const router = useRouter();
  const theme = useMantineTheme();
  const branchId = (params?.branchId as string) || '';
  const contentWrapperRef = useRef<HTMLDivElement>(null);
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
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [categoriesHeight, setCategoriesHeight] = useState(61);

  const headerHeight = isMobile ? 200 : 280;
  const collapsedHeaderHeight = isMobile ? 40 : 60;
  const categoriesTopOffset = isHeaderCollapsed
    ? isMobile
      ? 10
      : 25
    : isMobile
    ? 12
    : 35;

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerActualHeight, setHeaderActualHeight] = useState(headerHeight);

  // Calculate the top offset for the content to start below both header and categories
  const contentTopOffset =
    (isHeaderCollapsed ? collapsedHeaderHeight : headerHeight) +
    categoriesHeight;

  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function (...args: any[]) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  useEffect(() => {
    if (categoriesRef.current) {
      const height = categoriesRef.current.getBoundingClientRect().height;
      setCategoriesHeight(height);
    }
  }, [isHeaderCollapsed]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current && categoriesRef.current) {
        const headerHeight = headerRef.current.getBoundingClientRect().height;
        const catsHeight = categoriesRef.current.getBoundingClientRect().height;
        setHeaderActualHeight(headerHeight + catsHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isHeaderCollapsed]);

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
    const branch = branchesMock.find((b) => b.id === branchId);
    if (branch) {
      setCurrentBranch({ ...branch, isOpen: isBranchOpen(branch) });
      const intervalId = setInterval(() => {
        setCurrentBranch((prev) =>
          prev ? { ...prev, isOpen: isBranchOpen(prev) } : undefined
        );
      }, 60000);
      return () => clearInterval(intervalId);
    }
    return;
  }, [branchId]);

  const [currentBranch, setCurrentBranch] = useState<IBranch | undefined>(
    branchesMock.find((branch) => branch.id === branchId)
  );

  useEffect(() => {
    if (!currentBranch && branchId) {
      alert(COMMON_TEXTS.BRANCH_NOT_FOUND);
      router.push('/branches');
    }
  }, [currentBranch, branchId, router]);

  const branchProducts = useMemo(() => products || [], []);

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
        product: { ...product, id: String(product.id) },
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

  const categories = useMemo(() => {
    const categoryList = ['Promo'];
    branchProducts.forEach((product: IProduct) => {
      const category = product.category;
      if (category && !categoryList.includes(category))
        categoryList.push(category);
    });
    return categoryList;
  }, [branchProducts]);

  useEffect(() => {
    const initialExpandedState = categories.reduce((acc, category) => {
      acc[category.toLowerCase()] =
        category.toLowerCase() === activeTab.toLowerCase();
      return acc;
    }, {} as Record<string, boolean>);
    setExpandedSections(initialExpandedState);
  }, [activeTab, categories]);

  const scrollToCategory = (category: string) => {
    const sectionElement = document.getElementById(
      `category-section-${category.toLowerCase()}`
    );
    const isFirstCategory =
      category.toLowerCase() === categories[0].toLowerCase();
    if (isFirstCategory) {
      setIsHeaderCollapsed(false);
      setSearchQuery('');
    }
    if (sectionElement) {
      const offset = isFirstCategory ? 0 : contentTopOffset;
      const position = Math.max(0, sectionElement.offsetTop - offset);
      window.scrollTo({ top: position, behavior: 'smooth' });
    } else if (isFirstCategory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
      setExpandedSections((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((key) => {
          newState[key] = key === value.toLowerCase();
        });
        return newState;
      });
      scrollToCategory(value);
    }
  };

  const handleSectionToggle = (category: string, isExpanded: boolean) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category.toLowerCase()]: isExpanded,
    }));
    if (isExpanded && activeTab !== category.toLowerCase()) {
      setActiveTab(category.toLowerCase());
    }
  };

  const productsByCategory = categories.reduce((acc, category) => {
    const categoryProducts = branchProducts
      .filter((product: IProduct) =>
        category.toLowerCase() === 'promo'
          ? product.category?.toLowerCase().includes('promo')
          : product.category?.toLowerCase() === category.toLowerCase()
      )
      .filter((product: IProduct) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    if (categoryProducts.length > 0) acc[category] = categoryProducts;
    return acc;
  }, {} as Record<string, IProduct[]>);

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
            activeTab={activeTab}
            onTabChange={handleTabChange}
            top={
              isHeaderCollapsed
                ? collapsedHeaderHeight + categoriesTopOffset
                : headerHeight + categoriesTopOffset
            }
          />
        }
      />
      <ContentWrapper ref={contentWrapperRef} topOffset={headerActualHeight}>
        <Box
          className={styles.sectionsContainer}
          style={{
            flex: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            zIndex: 10,
          }}
        >
          {Object.keys(productsByCategory).length > 0 ? (
            Object.entries(productsByCategory).map(([category, products]) => (
              <Flex
                key={category}
                style={{ width: '100%', marginBottom: '11px' }}
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
