'use client';

import { Box, Text, Flex, Divider } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';
import { useEffect, useState, useCallback } from 'react';

const EmptyCart = () => {
  const [rightPosition, setRightPosition] = useState('80px');
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);

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

  return (
    <Box
      style={{
        position: 'fixed',
        top: topPosition,
        transform: `translateY(-${headerOffset}px)`,
        right: rightPosition || '-240px',
        width: '200px',
        height: '242px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #EEF2F6',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        transition: 'right 0.3s ease, transform 0.3s ease, top 0.3s ease',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      <Flex
        justify="flex-start"
        align="center"
        style={{ height: '32px', padding: '10px 16px' }}
      >
        <Text
          style={{
            fontFamily: 'Inter',
            fontSize: '12px',
            lineHeight: '18px',
            color: '#000000',
            fontWeight: 500,
            height: '18px',
          }}
        >
          {CART_TEXTS.CART_TITLE}
        </Text>
      </Flex>

      <Divider
        style={{
          width: '175px',
          borderWidth: '0.7px',
          borderStyle: 'solid',
          borderColor: '#EEF2F6',
          margin: '0 auto',
        }}
      />

      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 16px',
          gap: '16px',
        }}
      >
        <IconShoppingCart
          style={{
            width: '34px',
            height: '34px',
            color: '#939393',
          }}
        />
        <Text
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '18px',
            color: '#939393',
            textAlign: 'center',
            maxWidth: '180px',
            margin: '0 auto',
          }}
        >
          {CART_TEXTS.EMPTY_CART}
        </Text>
      </Flex>
    </Box>
  );
};

export default EmptyCart;
