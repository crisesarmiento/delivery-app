import styles from './DeliveryDetails.module.css';
import { Box } from '@mantine/core';
import { CHECKOUT_TEXTS } from '@/config/constants';
import {
  Text,
  TextInput,
  Textarea,
  Divider,
  NumberInput,
  Flex,
} from '@mantine/core';
import { useCheckout } from '@/context/CheckoutContext';

const DeliveryDetails = () => {
  const {
    deliveryMethod,
    setDeliveryMethod,
    fullName,
    setFullName,
    phone,
    setPhone,
    address,
    setAddress,
    city,
    setCity,
    province,
    setProvince,
    note,
    setNote,
    paymentMethod,
    setPaymentMethod,
    paymentAmount,
    setPaymentAmount,
  } = useCheckout();
  return (
    <Box className={styles.deliveryDetailsContainer}>
      <Text className={styles.sectionTitle}>
        {CHECKOUT_TEXTS.DELIVERY_DETAILS}
      </Text>
      <Flex className={styles.deliveryToggle}>
        <Box
          // ...rest of the component remains unchanged
        />
      </Flex>
    </Box>
  );
};

export default DeliveryDetails;
