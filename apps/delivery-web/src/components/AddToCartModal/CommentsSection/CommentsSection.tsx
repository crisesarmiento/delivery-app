import React from 'react';
import { Box, Textarea } from '@mantine/core';
import styles from '../AddToCartModal.module.css';
import { CommentsSectionProps } from '../../../types/addToCartModal/types';
import { MODAL_TEXTS } from '../../../config/constants';
import { Text } from '@mantine/core';

const CommentsSection = ({
  comments,
  handleCommentsChange,
  commentChars,
  placeholder,
}: CommentsSectionProps) => (
  <Box className={styles.commentsContainer}>
    <Text className={styles.sectionLabel}>{MODAL_TEXTS.COMMENTS_LABEL}</Text>
    <Textarea
      placeholder={placeholder}
      value={comments}
      onChange={handleCommentsChange}
      maxLength={100}
      className={styles.commentTextarea}
      styles={{
        root: { width: '100%', height: '100%' },
        wrapper: { width: '100%', height: '100%' },
        input: {
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          '&::placeholder': {
            overflow: 'visible',
          },
        },
      }}
      autosize={false}
      resize="none"
      unstyled
    />
  </Box>
);

export default CommentsSection;
