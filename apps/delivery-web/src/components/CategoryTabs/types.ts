

export interface CategoryTabsProps {
  categories: string[];
  onTabChange: (value: string | null) => void;
  top?: number;
}
