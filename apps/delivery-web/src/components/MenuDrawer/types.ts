export interface MenuDrawerProps {
  opened: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}
