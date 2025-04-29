import { forwardRef } from 'react';
import { ContentWrapperProps } from './types';
import { Box } from '@mantine/core';
import styles from './ContentWrapper.module.css';

const ContentWrapper = forwardRef<HTMLDivElement | null, ContentWrapperProps>(
  ({ topOffset, children }, ref) => {
    return (
      <Box
        className={styles.contentWrapper}
        style={{ marginTop: topOffset, width: '100%' }}
        ref={ref}
      >
        {children}
      </Box>
    );
  }
);

ContentWrapper.displayName = 'ContentWrapper';

export default ContentWrapper;
