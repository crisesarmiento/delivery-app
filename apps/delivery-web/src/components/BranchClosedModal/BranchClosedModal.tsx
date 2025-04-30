'use client';

import { Modal, Text, Button, Box, Flex } from '@mantine/core';
import styles from './BranchClosedModal.module.css';
import { IconX } from '@tabler/icons-react';
import { BRANCH_CLOSED_TEXTS } from '@/constants/text';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';

interface BranchClosedModalProps {
  clicked: boolean;
  onNavigate: (route: string) => void;
  onClose: () => void;
}

export function BranchClosedModal({
  clicked,
  onNavigate,
  onClose,
}: BranchClosedModalProps) {
  const [opened, { toggle, close, open }] = useDisclosure(false);

  useEffect(() => {
    if (clicked) {
      open();
    } else if (!clicked && opened) {
      close();
    }
  }, [clicked, opened, open, close]);

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
      onNavigate('/');
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
      size={350}
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
      data-testid="branch-closed-modal"
    >
      <Button
        className={styles.closeButton}
        onClick={handleClose}
        aria-label={BRANCH_CLOSED_TEXTS.CLOSE_MODAL_LABEL}
        variant="subtle"
        p={0}
        radius="xl"
      >
        <IconX size={24} />
      </Button>
      <Flex className={styles.modalHeader}>
        <Text className={styles.modalTitle}>{BRANCH_CLOSED_TEXTS.TITLE}</Text>
      </Flex>
      <Box className={styles.modalBody}>
        <Text size="sm" mb="md" className={styles.modalText}>
          {BRANCH_CLOSED_TEXTS.DESCRIPTION}
        </Text>
        <Flex className={styles.modalFooter}>
          <Button
            variant="outline"
            className={styles.modalCancelButton}
            onClick={handleClose}
            data-testid="close-branch-closed-modal"
          >
            {BRANCH_CLOSED_TEXTS.CLOSE_BUTTON}
          </Button>
          <Button
            className={styles.modalConfirmButton}
            onClick={handleConfirm}
            data-testid="go-home-branch-closed-modal"
          >
            {BRANCH_CLOSED_TEXTS.GO_HOME_BUTTON}
          </Button>
        </Flex>
      </Box>
    </Modal>
  );
}

export default BranchClosedModal;
