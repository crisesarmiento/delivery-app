'use client';

import { Modal, Text, Button, Box, Flex } from '@mantine/core';
import styles from './CartClearingModal.module.css';
import { TOOLTIP_TEXTS } from '@/config/constants';
import { IconX } from '@tabler/icons-react';
import { useCart } from '@/context/CartContext';
import { CART_CLEARING_TEXTS } from '@/constants/text';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { CartClearingModalProps } from './types';

export function CartClearingModal({
  clicked,
  onNavigate,
  onClose,
}: CartClearingModalProps) {
  const { cartItems, clearCart } = useCart();
  const [opened, { toggle, close, open }] = useDisclosure(false);

  // Sync opened state with clicked prop
  useEffect(() => {
    if (clicked && cartItems.length > 0) {
      open();
    } else if (!clicked && opened) {
      close();
    }
  }, [clicked, cartItems.length, open, close, opened]);

  // Clean up body styles on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
    };
  }, []);

  // Set body styles when modal is open
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.userSelect = '';
    }
  }, [opened]);

  const handleConfirm = () => {
    if (opened) {
      if (cartItems.length > 0) {
        clearCart();
        onNavigate('/');
      }
      close();
      if (onClose) onClose();
    }
  };

  const handleClose = () => {
    if (opened) {
      close();
      if (onClose) onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      padding={0}
      radius="lg"
      size={250}
      classNames={{
        root: styles.modalOverlay,
        content: styles.modalContent,
      }}
      centered
      closeOnEscape={true}
      closeOnClickOutside={true}
      trapFocus
      scrollAreaComponent={Box}
      transitionProps={{ transition: 'pop', duration: 200 }}
      overlayProps={{
        color: 'rgba(66, 61, 61, 0.8)',
        opacity: opened ? 1 : 0,
        blur: 3,
      }}
      data-testid="cart-clearing-modal"
    >
      <Button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label={TOOLTIP_TEXTS.CLOSE_MODAL}
        variant="subtle"
        p={0}
        radius="xl"
      >
        <IconX size={24} />
      </Button>
      <Flex className={styles.modalHeader}>
        <Text className={styles.modalTitle}>{CART_CLEARING_TEXTS.TITLE}</Text>
      </Flex>
      <Box className={styles.modalBody}>
        <Text size="sm" mb="md" className={styles.modalText}>
          {CART_CLEARING_TEXTS.DESCRIPTION}
        </Text>
        <Flex className={styles.modalFooter}>
          <Button
            variant="outline"
            className={styles.modalCancelButton}
            onClick={handleClose}
            data-testid="cancel-clear-cart-button"
          >
            {CART_CLEARING_TEXTS.CLOSE_BUTTON}
          </Button>
          <Button
            className={styles.modalConfirmButton}
            onClick={handleConfirm}
            data-testid="confirm-clear-cart-button"
          >
            {CART_CLEARING_TEXTS.CONFIRM_BUTTON}
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
}
