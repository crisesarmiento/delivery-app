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
import BasePage from '@/components/BasePage';
import { COMMON_TEXTS, ERROR_TEXTS } from '../../../config/constants';
import {
  useCart,
  CartItem as CartContextItem,
} from '../../../context/CartContext';
import { isBranchOpen } from '@/utils/branch';

export default function BranchProductsPage() {
  const params = useParams();
  const router = useRouter();
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
  }, [branchId]);

  // Handle case when branch is not found
  useEffect(() => {
    if (!currentBranch && branchId) {
      alert(COMMON_TEXTS.BRANCH_NOT_FOUND);
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
    // Check if branch is closed
    if (currentBranch && !currentBranch.isOpen) {
      alert('Lo sentimos, esta sucursal está cerrada en este momento.');
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

  // Add a function to handle clearing the cart
  const handleClearCart = () => {
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
        closedMessage="La sucursal se encuentra cerrada en este momento."
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
      <BasePage headerSlot={Header} className={styles.productPageContainer}>
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
                  isDisabled={currentBranch ? !currentBranch.isOpen : false}
                />
              </div>
            ))
          ) : (
            <Text ta="center" fz="lg" c="dimmed" style={{ padding: '40px 0' }}>
              {COMMON_TEXTS.NO_PRODUCTS_AVAILABLE}
            </Text>
          )}
        </Box>
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
