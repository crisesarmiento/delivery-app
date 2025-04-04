'use client';

import { Text, TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconMenu2 } from '@tabler/icons-react';
import { MENU_TEXTS, SEARCH_TEXTS } from '../../config/constants';

/**
 * Logo component used across different header styles
 */
export const Logo = () => (
  <Text
    fw={700}
    size="md"
    color="white"
    style={{
      fontSize: '16px',
      fontWeight: '800',
      fontFamily: 'Inter, sans-serif',
      lineHeight: '100%',
      letterSpacing: '0px',
      color: '#FFFFFF',
    }}
  >
    PUNTO 33
  </Text>
);

/**
 * Menu button component for toggling the menu drawer
 */
export const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <ActionIcon
    onClick={onClick}
    style={{
      width: '32px',
      height: '32px',
      backgroundColor: 'transparent',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      left: '16.67%',
      right: '16.67%',
      top: '25%',
      bottom: '25%',
    }}
  >
    <IconMenu2 size={24} stroke={2.5} color="#FFFFFF" />
  </ActionIcon>
);

/**
 * Search bar component with consistent styling and behavior
 */
export const SearchBar = ({
  value,
  onChange,
  placeholder = SEARCH_TEXTS.DEFAULT_SEARCH_PLACEHOLDER,
  styles = {},
  variant = 'white',
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: Record<string, any>;
  variant?: 'white' | 'light-gray';
}) => {
  // Define variant-specific base styles
  const variantBaseStyles = {
    white: {
      background: '#FFFFFF',
      border: '1px solid #FFFFFF',
    },
    'light-gray': {
      background: '#F8FAFC',
      border: '1px solid #F8FAFC',
    },
  };

  // Get current variant background/border
  const currentVariant = variantBaseStyles[variant];

  // Create merged styles object
  const mergedStyles = {
    root: {
      width: '100%',
      ...(styles.root || {}),
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '0px 16px',
      gap: '8px',
      height: '44px',
      background: currentVariant.background,
      border: currentVariant.border,
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.02)',
      borderRadius: '4px',
      '&:focusWithin': {
        border: `1px solid ${
          currentVariant.background.split(' ')[0]
        } !important`,
        outline: 'none !important',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.02) !important',
      },
      ...(styles.wrapper || {}),
    },
    input: {
      width: 'calc(100% - 40px)',
      height: '24px',
      fontFamily: 'Inter, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      color: '#6C7684',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      '&::placeholder': {
        color: '#6C7684',
      },
      '&:focus': {
        border: 'none !important',
        outline: 'none !important',
        boxShadow: 'none !important',
      },
      ...(styles.input || {}),
    },
    section: {
      paddingRight: 0,
      ...(styles.section || {}),
    },
  };

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      styles={mergedStyles}
      rightSection={
        <ActionIcon
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#B3FF00',
            borderRadius: '7px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconSearch size={16} stroke={2} color="#000000" />
        </ActionIcon>
      }
      rightSectionWidth={42}
    />
  );
};
