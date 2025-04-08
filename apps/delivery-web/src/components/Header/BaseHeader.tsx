'use client';

import { ReactNode } from 'react';
import { Box } from '@mantine/core';
import ClosedNotification from '../ClosedNotification';

interface BaseHeaderProps {
  showClosedNotification?: boolean;
  closedMessage?: string;
  topOffset?: string;
  headerContent: ReactNode;
}

const BaseHeader = ({
  showClosedNotification = false,
  closedMessage,
  topOffset = '0',
  headerContent,
}: BaseHeaderProps) => {
  return (
    <>
      {/* Closed notification banner */}
      {showClosedNotification && <ClosedNotification message={closedMessage} />}

      {/* Fixed hero header */}
      <Box
        component="header"
        style={{
          position: 'fixed',
          width: '100%',
          height: '70px',
          left: '0',
          top: showClosedNotification ? '34px' : topOffset,
          zIndex: 100,
          overflow: 'hidden',
        }}
        data-testid="header"
      >
        {/* Background image */}
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '283px',
            left: 0,
            top: 0,
            backgroundImage: 'url(/images/hero-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          data-testid="header-background"
        />

        {/* Solid black rectangle on the left */}
        <Box
          className="left-black-rectangle"
          style={{
            position: 'absolute',
            height: '70px',
            left: 0,
            top: 0,
            backgroundColor: '#000000',
            width: '50%',
            maxWidth: '1440px',
          }}
          data-testid="header-left-rectangle"
        />

        {/* Overlay covering the entire header */}
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '70px',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
          data-testid="header-overlay"
        />

        {/* Content container - positioned above the backgrounds */}
        <Box
          style={{
            position: 'relative',
            zIndex: 5,
            height: '100%',
            width: '100%',
          }}
          data-testid="header-content"
        >
          {headerContent}
        </Box>
      </Box>

      {/* Empty space to push content below fixed header */}
      <Box style={{ height: '70px' }} data-testid="header-spacer" />
    </>
  );
};

export default BaseHeader;
