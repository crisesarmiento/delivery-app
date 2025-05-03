import styles from './OrderList.module.css';
import OrderItem from '../OrderItem/OrderItem';
import { Box } from '@mantine/core';

import { CartItem } from '@/context/types';

interface OrderListProps {
  items: CartItem[];
  onEditProduct: (item: CartItem) => void;
  onQuantityUpdate: (productId: number, newQuantity: number) => void;
}

const OrderList = ({ items, onEditProduct, onQuantityUpdate }: OrderListProps) => {
  return (
    <Box className={styles.orderListContainer}>
      {items.map((item, idx) => (
        <OrderItem
          key={item.uniqueId || idx}
          item={item}
          onEditProduct={() => onEditProduct(item)}
          onQuantityUpdate={(newQuantity: number) => onQuantityUpdate(item.product.id, newQuantity)}
        />
      ))}
    </Box>
  );
};

export default OrderList;
