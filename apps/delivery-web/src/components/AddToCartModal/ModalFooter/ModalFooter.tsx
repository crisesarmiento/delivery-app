import React from 'react';
import { Flex, Button, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import QuantityControl from '../../QuantityControl';
import styles from '../AddToCartModal.module.css';
import { PRODUCT_TEXTS, MODAL_TEXTS } from '../../../config/constants';
import { ModalFooterProps } from '../../../types/addToCartModal/types';

// Modal Footer Component
const ModalFooter = ({
  quantity,
  setQuantity,
  handleAddToCart,
  finalPrice,
  isMobile,
}: ModalFooterProps) => (
  <Flex className={styles.footer} direction={isMobile ? 'column' : 'row'}>
    <QuantityControl
      quantity={quantity}
      initialQuantity={quantity}
      minQuantity={1}
      onChange={(newQuantity) => setQuantity(newQuantity)}
      variant="footer"
      isMobile={isMobile}
    />
    <Button className={styles.addToCartButton} onClick={handleAddToCart}>
      <Flex className={styles.addToCartButtonContent}>
        <Flex className={styles.addToCartButtonAddToCartContainer}>
          <IconShoppingCart size={24} style={{ color: '#B3FF00' }} />
          <Text className={styles.addToCartButtonTextAddToCart}>
            {PRODUCT_TEXTS.ADD_TO_CART}
          </Text>
        </Flex>
        <Text className={styles.addToCartButtonTextSubtotal}>
          {`${MODAL_TEXTS.SUBTOTAL_LABEL}${finalPrice.toFixed(2)}`}
        </Text>
      </Flex>
    </Button>
  </Flex>
);

export default ModalFooter;
