'use client';

import { Box, Text, Divider, Button } from '@mantine/core';

import { useEffect, useState, useCallback } from 'react';
import { IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { CART_TITLE, CART_TOTAL, CART_VIEW_BUTTON } from '@/constants/text';
import ItemCart from './ItemCart';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { CartDrawerProps } from './types';

const CartDrawer = ({ clearCart }: CartDrawerProps) => {
  const [rightPosition, setRightPosition] = useState('80px');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);

  const { currentBranchId, items, cartTotal } = useCart();

  const router = useRouter();

  // Check if viewport is mobile and calculate position
  useEffect(() => {
    const updatePositioning = () => {
      const viewportWidth = window.innerWidth;

      // Calculate right position based on container width (1440px max)
      if (viewportWidth > 1440) {
        // If viewport is wider than 1440px, calculate offset from right edge
        const offsetFromCenter = (viewportWidth - 1440) / 2;
        setRightPosition(`${offsetFromCenter + 80}px`);
      } else {
        // For smaller viewports, keep standard 80px from right
        setRightPosition('80px');
      }
    };

    // Check on mount and resize
    updatePositioning();
    window.addEventListener('resize', updatePositioning);

    // Clean up
    return () => window.removeEventListener('resize', updatePositioning);
  }, []);

  // Handler for closing/clearing the cart
  const handleClearCart = () => {
    clearCart();
  };

  // Track scroll position to detect header collapse state and header height changes
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const newIsHeaderCollapsed = currentScrollPos > 50;

    // Only update state when the value changes to prevent needless re-renders
    if (newIsHeaderCollapsed !== isHeaderCollapsed) {
      setIsHeaderCollapsed(newIsHeaderCollapsed);
    }

    // Calculate header offset based on scroll position
    const collapsedHeaderHeight = 70; // Height when collapsed
    const fullHeaderHeight = 280; // Height when expanded

    // Calculate how much of the header has been scrolled
    const scrolledPortion = Math.min(
      currentScrollPos,
      fullHeaderHeight - collapsedHeaderHeight
    );
    const currentHeaderOffset = scrolledPortion > 0 ? scrolledPortion : 0;

    // Only update if value has changed
    if (currentHeaderOffset !== headerOffset) {
      setHeaderOffset(currentHeaderOffset);
    }
  }, [isHeaderCollapsed, headerOffset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial call to set correct values
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Calculate top position based on header state - now using fixed position
  const topPosition = isHeaderCollapsed ? '290px' : '307px'; // Aligned with categories when collapsed

  // Handler for cart view button click
  const handleViewCartClick = () => {
    if (currentBranchId) {
      router.push(`/branches/${currentBranchId}/cart`);
    } else {
      console.error('Cannot navigate to cart: No branch ID set');
    }
  };

  return (
    <Box
      style={{
        position: 'fixed',
        top: topPosition,
        transform: `translateY(-${headerOffset}px)`,
        right: rightPosition || '-240px',
        width: '200px',
        maxHeight: '242px',
        background: '#FFFFFF',
        border: '1px solid #EEF2F6',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        transition: 'right 0.3s ease, transform 0.3s ease, top 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden',
        boxSizing: 'border-box',
        padding: '12px 0',
      }}
      data-testid="cart-drawer"
    >
      <Box style={{ position: 'relative', padding: '0 16px 8px' }}>
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: '12px',
            lineHeight: '18px',
            fontWeight: 500,
            color: '#000000',
          }}
        >
          {CART_TITLE}
        </Text>
        <Box style={{ position: 'absolute', top: 0, right: 16 }}>
          {/* Trash/Clear Cart Icon */}
          <IconTrash
            size={18}
            style={{ cursor: 'pointer', marginLeft: 8 }}
            onClick={handleClearCart}
            title="Vaciar carrito"
          />
        </Box>
      </Box>

      <Divider
        style={{
          width: '90%',
          margin: '0 auto 8px',
          borderWidth: '0.7px',
          borderStyle: 'solid',
          borderColor: '#EEF2F6',
        }}
      />

      <Box
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '4px 16px 8px',
        }}
        data-testid="cart-drawer-items-container"
      >
        {items.map((item, index) => {
          // Create a stable unique key for each cart item
          const itemKey =
            item.uniqueId || `cart-item-${item.product.id}-${index}`;
          return (
            <ItemCart
              key={itemKey}
              item={item}
              data-testid={`cart-item-${index}`}
            />
          );
        })}
      </Box>

      <Divider
        style={{
          width: '90%',
          margin: '0 auto 8px',
          borderWidth: '0.7px',
          borderStyle: 'solid',
          borderColor: '#EEF2F6',
        }}
      />

      <Box style={{ padding: '8px 16px 0' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 500,
            }}
          >
            {CART_TOTAL}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 500,
              textAlign: 'right',
            }}
          >
            ${cartTotal.toLocaleString()}
          </Text>
        </Box>

        <Button
          fullWidth
          style={{
            backgroundColor: '#000000',
            color: '#B3FF00',
            height: '40px',
            fontSize: '16px',
            lineHeight: '20px',
            borderRadius: '4px',
            fontFamily: 'Inter',
            fontWeight: 600,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleViewCartClick}
          data-testid="view-cart-button"
        >
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <IconShoppingCart size={20} color="#B3FF00" stroke={2} />
            <Text
              style={{ color: '#B3FF00', fontSize: '16px', fontWeight: 600 }}
            >
              {CART_VIEW_BUTTON}
            </Text>
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default CartDrawer;
