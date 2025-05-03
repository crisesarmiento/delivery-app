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
          className={`${styles.toggleButton} ${
            deliveryMethod === 'delivery'
              ? styles.activeToggle
              : styles.inactiveToggle
          }`}
          onClick={() => setDeliveryMethod('delivery')}
        >
          <Text>{CHECKOUT_TEXTS.DELIVERY}</Text>
        </Box>
        <Box
          className={`${styles.toggleButton} ${
            deliveryMethod === 'pickup'
              ? styles.activeToggle
              : styles.inactiveToggle
          }`}
          onClick={() => setDeliveryMethod('pickup')}
        >
          <Text>{CHECKOUT_TEXTS.PICKUP}</Text>
        </Box>
      </Flex>
      <Box className={styles.formField}>
        <Text className={styles.formLabel}>
          {CHECKOUT_TEXTS.FULL_NAME}
          <span className={styles.requiredAsterisk}>*</span>
        </Text>
        <TextInput
          placeholder=""
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          classNames={{ input: styles.formInput }}
          style={{ border: '1px solid #EFF2F6', borderRadius: '4px' }}
        />
      </Box>
      <Box className={styles.formField}>
        <Text className={styles.formLabel}>
          {CHECKOUT_TEXTS.PHONE}
          <span className={styles.requiredAsterisk}>*</span>
        </Text>
        <TextInput
          placeholder=""
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          classNames={{ input: styles.formInput }}
          style={{ border: '1px solid #EFF2F6', borderRadius: '4px' }}
        />
      </Box>
      {deliveryMethod === 'delivery' && (
        <>
          <Box className={styles.formField}>
            <Text className={styles.formLabel}>
              {CHECKOUT_TEXTS.ADDRESS}
              <span className={styles.requiredAsterisk}>*</span>
            </Text>
            <TextInput
              placeholder=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              classNames={{ input: styles.formInput }}
              style={{ border: '1px solid #EFF2F6', borderRadius: '4px' }}
            />
          </Box>
          <div className={styles.cityProvinceRow}>
            <Box className={`${styles.formField} ${styles.cityProvinceItem}`}>
              <Text className={styles.formLabel}>
                {CHECKOUT_TEXTS.CITY}
                <span className={styles.requiredAsterisk}>*</span>
              </Text>
              <TextInput
                placeholder=""
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                classNames={{ input: styles.formInput }}
                style={{ border: '1px solid #EFF2F6', borderRadius: '4px' }}
              />
            </Box>
            <Box className={`${styles.formField} ${styles.cityProvinceItem}`}>
              <Text className={styles.formLabel}>
                {CHECKOUT_TEXTS.PROVINCE}
                <span className={styles.requiredAsterisk}>*</span>
              </Text>
              <TextInput
                placeholder=""
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                classNames={{ input: styles.formInput }}
                style={{ border: '1px solid #EFF2F6', borderRadius: '4px' }}
              />
            </Box>
          </div>
        </>
      )}
      <Box style={{ marginTop: 16 }}>
        <Text className={styles.textAreaLabel}>
          {CHECKOUT_TEXTS.NOTE_FOR_RESTAURANT}
        </Text>
        <Textarea
          placeholder=""
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={100}
          minRows={3}
          classNames={{
            root: styles.noteTextarea,
            wrapper: styles.noteTextarea,
            input: styles.noteTextarea,
          }}
        />
        <Text className={styles.textAreaCounter}>{note.length}/100</Text>
      </Box>
      <Divider className={styles.divider} />
      <Text className={styles.sectionTitle}>
        {CHECKOUT_TEXTS.PAYMENT_METHOD}
      </Text>
      <Box>
        <Box
          mb={12}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setPaymentMethod('transfer')}
        >
          <div className={styles.radioContainer}>
            <input
              type="radio"
              checked={paymentMethod === 'transfer'}
              onChange={() => setPaymentMethod('transfer')}
              className={styles.radioInput}
            />
          </div>
          <Text
            className={
              paymentMethod === 'transfer'
                ? styles.radioButton
                : styles.radioButtonInactive
            }
          >
            {CHECKOUT_TEXTS.PAYMENT_DISCOUNT_WITH_PERCENTAGE}
          </Text>
        </Box>
        <Box
          mb={12}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setPaymentMethod('mercadopago')}
        >
          <div className={styles.radioContainer}>
            <input
              type="radio"
              checked={paymentMethod === 'mercadopago'}
              onChange={() => setPaymentMethod('mercadopago')}
              className={styles.radioInput}
            />
          </div>
          <Text
            className={
              paymentMethod === 'mercadopago'
                ? styles.radioButton
                : styles.radioButtonInactive
            }
          >
            {CHECKOUT_TEXTS.CREDIT_CARD}
          </Text>
        </Box>
        <Box
          mb={16}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setPaymentMethod('cash')}
        >
          <div className={styles.radioContainer}>
            <input
              type="radio"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className={styles.radioInput}
            />
          </div>
          <Text
            className={
              paymentMethod === 'cash'
                ? styles.radioButton
                : styles.radioButtonInactive
            }
          >
            {CHECKOUT_TEXTS.CASH_WITH_PERCENTAGE}
          </Text>
        </Box>
      </Box>
      <Box className={styles.formField} style={{ marginBottom: '0' }}>
        <Text className={styles.formLabel}>
          {CHECKOUT_TEXTS.PAYMENT_AMOUNT_QUESTION}
        </Text>
        <NumberInput
          placeholder=""
          value={paymentAmount}
          onChange={setPaymentAmount}
          min={0}
          disabled={paymentMethod !== 'cash'}
          classNames={{
            root: styles.numberInput,
            input: styles.formInputAmount,
            wrapper: styles.numberInput,
          }}
        />
      </Box>{' '}
    </Box>
  );
};

export default DeliveryDetails;
