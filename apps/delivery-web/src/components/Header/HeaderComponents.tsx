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
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: Record<string, unknown>;
}) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    styles={styles}
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
