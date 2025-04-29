import { ActionIcon } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import styles from './BackButton.module.css';

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <ActionIcon
    onClick={onClick}
    className={styles.backButton}
    data-testid="back-button"
  >
    <IconArrowLeft size={18} stroke={2} color="#FFFFFF" />
  </ActionIcon>
);

export default BackButton;
