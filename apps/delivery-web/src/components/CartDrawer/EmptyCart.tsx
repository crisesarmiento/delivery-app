'use client';

import { Box, Text, Flex, Divider } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { CART_TEXTS } from '../../config/constants';

interface EmptyCartProps {
  isVisible: boolean;
  isMobile?: boolean;
}

const EmptyCart = ({ isVisible, isMobile = false }: EmptyCartProps) => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: '406px',
        right: isVisible ? '40px' : '-240px',
        width: '200px',
        height: '242px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #EEF2F6',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        transition: 'right 0.3s ease',
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
