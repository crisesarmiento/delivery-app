import { forwardRef } from 'react';
import { Box } from '@mantine/core';
import useIsMobile from '@/hooks/useIsMobile';
import { useCart } from '@/context/CartContext';
import MobileCartButton from '../MobileCartButton';
import styles from './ProductsContentWrapper.module.css';

interface ContentWrapperProps {
  topOffset: number;
  cartButtonOnClick?: () => void;
  children: React.ReactNode;
}

const ProductsContentWrapper = forwardRef<
  HTMLDivElement | null,
  ContentWrapperProps
>(({ topOffset, cartButtonOnClick, children }, ref) => {
  const isMobile = useIsMobile();
  const { cartTotal } = useCart();

  return (
    <Box
      className={styles.productsContentWrapper}
      style={{ marginTop: topOffset, marginBottom: '97px' }}
      ref={ref}
    >
      {children}
      {isMobile && (
        <MobileCartButton cartTotal={cartTotal} onClick={cartButtonOnClick} />
      )}
    </Box>
  );
});

ProductsContentWrapper.displayName = 'ProductsContentWrapper';

export default ProductsContentWrapper;
