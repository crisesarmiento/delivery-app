import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, Button } from '@mantine/core';
import { ERROR_TEXTS } from '../../config/constants';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box p="xl" ta="center">
          <Text fz="xl" fw={600} mb="md">
            {ERROR_TEXTS.GENERAL_ERROR_TITLE}
          </Text>
          <Text mb="xl">{ERROR_TEXTS.GENERAL_ERROR_MESSAGE}</Text>
          <Button onClick={() => window.location.reload()}>
            {ERROR_TEXTS.RELOAD_PAGE}
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
