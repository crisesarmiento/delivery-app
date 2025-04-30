export interface SectionHeaderProps {
  title: string;
  isExpanded?: boolean;
  toggleable?: boolean;
  onToggle?: () => void;
  className?: string;
}
