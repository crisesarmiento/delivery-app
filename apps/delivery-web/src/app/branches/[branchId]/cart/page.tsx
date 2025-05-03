'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Divider, Flex } from '@mantine/core';
import styles from './page.module.css';
import DeliveryDetails from '@/components/DeliveryDetails/DeliveryDetails';
import OrderList from '@/components/OrderList/OrderList';
import SummaryBox from '@/components/SummaryBox/SummaryBox';
import ConfirmOrderButton from '@/components/ConfirmOrderButton/ConfirmOrderButton';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/types';
import AddToCartModal from '@/components/AddToCartModal/AddToCartModal';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import { useNav } from '@/context/navContext';
import CheckoutHeader from '@/components/Header/HeaderCheckout/CheckoutHeader';
import { CheckoutProvider } from '@/context/CheckoutContext';

export default function CheckoutPage() {
  const [editQuantity, setEditQuantity] = useState<number>(1);
  const [editIngredients, setEditIngredients] = useState<
    { name: string; quantity: number; price?: number }[]
  >([]);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [currentItemUniqueId, setCurrentItemUniqueId] = useState<
    string | undefined
  >(undefined);

  const router = useRouter();
  const { activeBranch } = useNav();
  const { items, updateCartItem, removeFromCart } = useCart();

  // Header height logic (mirroring /app/page.tsx)
  const headerRef = useRef<HTMLDivElement>(null);
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const headerHeight = isMobile ? 200 : 280;
  const collapsedHeaderHeight = isMobile ? 40 : 70;
  const [headerActualHeight, setHeaderActualHeight] = useState(
    isHeaderCollapsed ? collapsedHeaderHeight : headerHeight
  );

  // Track scroll position to detect header collapse state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderCollapsed(currentScrollPos > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderActualHeight(height);
      } else {
        setHeaderActualHeight(
          isHeaderCollapsed ? collapsedHeaderHeight : headerHeight
        );
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isHeaderCollapsed, collapsedHeaderHeight, headerHeight]);

  // Calculate total product discount for the summary
  const productDiscount = items.reduce((sum, item) => {
    if (item.hasDiscount && item.originalPrice) {
      const discountPerItem =
        item.originalPrice - (item.totalPrice || item.product.price);
      return sum + discountPerItem * item.quantity;
    }
    return sum;
  }, 0);

  // Handle product quantity update
  const handleQuantityUpdate = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, { quantity: newQuantity });
    }
  };

  // Open edit modal for a product
  const handleEditProduct = (item: CartItem) => {
    const productForEdit = {
      ...item.product,
    };
    setCurrentProduct(productForEdit);
    setEditQuantity(item.quantity || 1);
    setEditIngredients(item.ingredients || []);
    setEditModalOpen(true);
    setCurrentItemUniqueId(item.uniqueId);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentProduct(null);
    setCurrentItemUniqueId(undefined);
  };

  // Handle add to cart (update) from modal
  const handleAddToCart = (
    quantity: number,
    customizations?: {
      ingredients?: { name: string; quantity: number; price?: number }[];
      condiments?: string[];
      comments?: string;
      totalPrice?: number;
    }
  ) => {
    setEditQuantity(quantity);
    setEditIngredients(customizations?.ingredients || []);
    if (currentProduct) {
      updateCartItem(
        currentProduct.id,
        {
          quantity,
          ...customizations,
        },
        currentItemUniqueId
      );
    }
    setEditModalOpen(false);
    setCurrentProduct(null);
    setCurrentItemUniqueId(undefined);
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push(`/branches/${activeBranch?.id || ''}`);
    }
  }, [items.length, activeBranch, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <CheckoutProvider>
      <Flex className={styles.checkoutPageContainer}>
        <ContentWrapper topOffset={headerActualHeight}>
          <Box className={styles.contentContainer}>
            <div
              ref={headerRef}
              className={isHeaderCollapsed ? 'collapsedHeader' : undefined}
            >
              <CheckoutHeader
                isHeaderCollapsed={isHeaderCollapsed}
                showSearchBar={false}
                searchValue={''}
              />
            </div>
            <DeliveryDetails />
            <Divider className={styles.divider} />
            <OrderList
              items={items}
              onEditProduct={handleEditProduct}
              onQuantityUpdate={handleQuantityUpdate}
            />
            <SummaryBox />
            <ConfirmOrderButton
              onClick={() => {
                /* handle checkout logic here */
              }}
            />
          </Box>
        </ContentWrapper>
        {editModalOpen && currentProduct && (
          <AddToCartModal
            product={currentProduct}
            opened={editModalOpen}
            onClose={handleCloseEditModal}
            onAddToCart={(cartItem: CartItem) => {
              handleAddToCart(cartItem);
            }}
            initialQuantity={editQuantity}
          />
        )}
      </Flex>
    </CheckoutProvider>
  );
}
