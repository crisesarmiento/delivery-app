import { ReactNode } from 'react';

export interface ProductsHeaderWrapperProps {
  isHeaderCollapsed: boolean;
  headerHeight: number;
  collapsedHeaderHeight: number;
  header: ReactNode;
  categories: ReactNode;
}