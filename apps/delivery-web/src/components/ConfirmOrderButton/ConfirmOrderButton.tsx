import styles from './ConfirmOrderButton.module.css';
import { Button } from '@mantine/core';
import { CHECKOUT_TEXTS } from '@/config/constants';
import { Text } from '@mantine/core';

const ConfirmOrderButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button className={styles.confirmOrderButton} onClick={onClick}>
      <Text className={styles.confirmOrderButtonText}>
        {CHECKOUT_TEXTS.CONFIRM_ORDER}
      </Text>
    </Button>
  );
};

export default ConfirmOrderButton;
