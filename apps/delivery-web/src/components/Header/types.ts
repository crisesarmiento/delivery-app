import { IBranch } from '@/types';

export interface HeaderProps {
  showSearchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showClosedNotification?: boolean;
  closedMessage?: string;
  isFiltering?: boolean;
  isHeaderCollapsed: boolean;
}


export interface ProductsHeaderProps {
  branch: IBranch;
  onBackClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  isClosed?: boolean;
  closedMessage?: string;
  isFiltering?: boolean;
  isHeaderCollapsed: boolean;
  collapsedHeaderHeight?: number;
}

export type SearchBarVariant = 'white' | 'light-gray';

export interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  // Using Record<string, any> here is necessary for Mantine's style system
  // which accepts complex CSS-in-JS objects with nested selectors
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: Record<string, any>;
  variant?: SearchBarVariant;
  autoFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface CheckoutHeaderProps {
  isClosed: boolean;
  closedMessage: string;
}