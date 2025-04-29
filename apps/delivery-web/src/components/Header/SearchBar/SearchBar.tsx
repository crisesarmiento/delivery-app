import { TextInput, ActionIcon } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { forwardRef, useEffect } from 'react';
import { SEARCH_TEXTS } from '@/config/constants';
import { SearchBarProps, SearchBarVariant } from '@/components/Header/types';

/**
 * Search bar component with consistent styling and behavior
 */
const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      onChange,
      placeholder = SEARCH_TEXTS.DEFAULT_SEARCH_PLACEHOLDER,
      styles = {},
      variant = 'white' as SearchBarVariant,
      autoFocus = false,
      ...props
    },
    ref
  ) => {
    // Define variant-specific base styles
    const variantBaseStyles: Record<
      SearchBarVariant,
      { background: string; border: string }
    > = {
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
    const currentVariant = variantBaseStyles[variant as SearchBarVariant];

    // Create merged styles object
    const mergedStyles = {
      root: {
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        transition: 'opacity 0.3s ease',
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
        fontFamily: 'Inter',
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

    // Handle autofocus when the component first renders or when autoFocus prop changes
    useEffect(() => {
      let cleanup: (() => void) | undefined;
      if (autoFocus && ref && typeof ref !== 'function') {
        const inputElement = ref.current;
        if (inputElement) {
          // Short timeout to let the transition complete
          const focusTimeout = setTimeout(() => {
            inputElement.focus();
          }, 100);
          cleanup = () => clearTimeout(focusTimeout);
        }
      }
      return cleanup;
    }, [autoFocus, ref]);

    const handleSearch = () => {
      // Optionally, trigger search logic
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.blur();
      }
    };

    return (
      <TextInput
        ref={ref}
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
              cursor: 'pointer',
            }}
            onClick={handleSearch}
          >
            <IconSearch size={16} stroke={2} color="#000000" />
          </ActionIcon>
        }
        rightSectionWidth={42}
        {...props}
      />
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
