import { ReactNode } from 'react';
import { BoxProps } from '@mantine/core';

export interface BasePageProps extends BoxProps {
  children: ReactNode;
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
  sidebarSlot?: ReactNode;
}
