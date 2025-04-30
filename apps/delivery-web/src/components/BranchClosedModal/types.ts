export interface BranchClosedModalProps {
  clicked: boolean;
  onNavigate: (route: string) => void;
  onClose: () => void;
}