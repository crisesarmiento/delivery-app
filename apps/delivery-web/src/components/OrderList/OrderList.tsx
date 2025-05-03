import styles from './OrderList.module.css';
import OrderItem from '../OrderItem/OrderItem';
import { Box } from '@mantine/core';
import { OrderListProps } from './types';

const OrderList = ({ items }: OrderListProps) => {
  return (
    <Box className={styles.orderListContainer}>
      {items.map((item, idx) => (
        <OrderItem key={item.uniqueId || idx} item={item} />
      ))}
    </Box>
  );
};

export default OrderList;
