import { forwardRef } from 'react';
import { Box } from '@mantine/core';

interface ContentWrapperProps {
  topOffset: number;
  children: React.ReactNode;
}

const ProductsContentWrapper = forwardRef<HTMLDivElement | null, ContentWrapperProps>(
  ({ topOffset, children }, ref) => {
    return (
      <Box style={{ marginTop: topOffset }} ref={ref}>
        {children}
      </Box>
    );
  }
);

ProductsContentWrapper.displayName = 'ProductsContentWrapper';

export default ProductsContentWrapper;
