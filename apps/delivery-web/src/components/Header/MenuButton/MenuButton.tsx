import { ActionIcon } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import styles from './MenuButton.module.css';

const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <ActionIcon
    onClick={onClick}
    className={styles.menuButton}
    data-testid="menu-button"
  >
    <IconMenu2 size={24} stroke={2} color="#FFFFFF" />
  </ActionIcon>
);

export default MenuButton;
