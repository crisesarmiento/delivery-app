'use client';

import { Box, Text, Flex, Divider } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';
import { useEffect, useState } from 'react';

interface EmptyCartProps {
  isVisible: boolean;
  isMobile?: boolean;
  isHeaderCollapsed?: boolean;
  headerOffset?: number;
}

const EmptyCart = ({
  isVisible,
  isMobile = false,
  isHeaderCollapsed = false,
  headerOffset = 0,
}: EmptyCartProps) => {
  const [rightPosition, setRightPosition] = useState('80px');

  // Calculate position based on viewport width and container max-width
  useEffect(() => {
    const updatePosition = () => {
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

    // Initial calculation and set up resize listener
    updatePosition();
    window.addEventListener('resize', updatePosition);

    // Clean up
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Using fixed top position now
  const topPosition = isHeaderCollapsed ? '290px' : '307px'; // Aligned with categories when collapsed

  return (
    <Box
      style={{
        position: 'fixed',
        top: topPosition,
        transform: `translateY(-${headerOffset}px)`,
        right: isVisible ? rightPosition : '-240px',
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
