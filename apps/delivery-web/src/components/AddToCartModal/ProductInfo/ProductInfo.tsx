import { Flex, Box } from '@mantine/core';
import styles from '../AddToCartModal.module.css';
import { IProduct } from '@/types';
import { MODAL_TEXTS } from '../../../config/constants';

// Product Info Component
const ProductInfo = ({ product }: { product: IProduct }) => (
  <Flex className={styles.productInfo} direction="column" gap={8}>
    <Box className={styles.productDescription}>{product.description}</Box>
    <Box className={styles.helperText}>{MODAL_TEXTS.CUSTOMIZE_HELPER_TEXT}</Box>
  </Flex>
);

export default ProductInfo;
