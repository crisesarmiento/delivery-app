'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Text,
  TextInput,
  Textarea,
  Divider,
  Button,
  Image,
  NumberInput,
  Flex,
} from '@mantine/core';
import styles from './page.module.css';
import CheckoutHeader from '@/components/Header/HeaderCheckout/CheckoutHeader';
import { useCart } from '@/context/CartContext';
import DiscountBadge from '@/components/DiscountBadge';
import { IProduct } from '@/types';
import { CartItemCustomization, CartItem } from '@/context/types';
import { BRANCH_TEXTS, CHECKOUT_TEXTS, COMMON_TEXTS } from '@/config/constants';
import AddToCartModal from '@/components/AddToCartModal/AddToCartModal';
import ContentWrapper from '@/components/ContentWrapper/ContentWrapper';
import { isBranchOpen } from '@/utils/branch';
import QuantityControl from '@/components/QuantityControl/QuantityControl';
import { useNav } from '@/context/navContext';
import useIsMobile from '@/hooks/useIsMobile';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';

export default function CheckoutPage() {
  // State for edit modal's product, ingredients, and quantity
  const [editQuantity, setEditQuantity] = useState<number>(1);
  const [editIngredients, setEditIngredients] = useState<
    { name: string; quantity: number; price?: number }[]
  >([]);

  const router = useRouter();
  const { activeBranch } = useNav();
  const {
    items,
    updateCartItem,
    removeFromCart,
    cartTotal,
    cartProductsTotal,
  } = useCart();

  // Calculate total product discount for the summary
  const productDiscount = items.reduce((sum, item) => {
    if (item.hasDiscount && item.originalPrice) {
      // Discount per item is (original - discounted) * quantity
      const discountPerItem =
        item.originalPrice - (item.totalPrice || item.product.price);
      return sum + discountPerItem * item.quantity;
    }
    return sum;
  }, 0);

  const contentWrapperRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useIsMobile();
  const branchId = activeBranch?.id;

  // State for the form
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [paymentAmount, setPaymentAmount] = useState<number | ''>('');

  // State for product editing and uniqueId tracking
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [currentItemUniqueId, setCurrentItemUniqueId] = useState<
    string | undefined
  >();

  // Calculate discount info for the edit modal
  const {
    hasDiscount: editHasDiscount,
    discountPercent: editDiscountPercent,
    originalPrice: editOriginalPrice,
  } = usePriceCalculation(
    currentProduct || ({} as IProduct),
    editIngredients,
    editQuantity
  );

  // State to branch open status
  const [isBranchClosed, setIsBranchClosed] = useState(false);

  // Update branch status on component mount and every minute
  useEffect(() => {
    if (activeBranch) {
      const checkBranchStatus = () => {
        const isOpen = isBranchOpen(activeBranch);
        setIsBranchClosed(!isOpen);
      };

      // Check status immediately
      checkBranchStatus();

      // Set interval to check every minute
      const intervalId = setInterval(checkBranchStatus, 60000);

      return () => clearInterval(intervalId);
    }
    return undefined;
  }, [activeBranch]);

  // Redirect if branch is not found
  useEffect(() => {
    if (!activeBranch && branchId) {
      router.push('/branches');
    }
  }, [activeBranch, branchId, router]);

  // Subtotal from cart context
  const subtotal = cartTotal;

  // Payment method discount (10% of subtotal)
  const paymentDiscountRate =
    paymentMethod === 'transfer' || paymentMethod === 'cash' ? 0.1 : 0;
  const paymentDiscount = Math.round(subtotal * paymentDiscountRate);

  const shippingCost = 1500;
  const total = subtotal - paymentDiscount + shippingCost;

  // Handle checkout
  const handleCheckout = () => {
    // Validate required fields
    const errors = [];

    if (!fullName.trim()) errors.push(CHECKOUT_TEXTS.FULL_NAME);
    if (!phone.trim()) errors.push(CHECKOUT_TEXTS.PHONE);

    if (deliveryMethod === 'delivery') {
      if (!address.trim()) errors.push(CHECKOUT_TEXTS.ADDRESS);
      if (!city.trim()) errors.push(CHECKOUT_TEXTS.CITY);
      if (!province.trim()) errors.push(CHECKOUT_TEXTS.PROVINCE);
    }

    if (errors.length > 0) {
      alert(`${CHECKOUT_TEXTS.VALIDATION_ERROR} ${errors.join(', ')}`);
      return;
    }
    // For demo purposes, alert the user and redirect
    alert(COMMON_TEXTS.ORDER_CONFIRMED);
    router.push(`/branches/${branchId}`);
  };

  // Handle product quantity update
  const handleQuantityUpdate = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, { quantity: newQuantity });
    }
  };

  // Open edit modal for a product
  const handleEditProduct = (item: CartItem) => {
    const productForEdit = {
      ...item.product,
    };
    setCurrentProduct(productForEdit);
    setEditQuantity(item.quantity || 1);
    setEditIngredients(item.ingredients || []);
    setEditModalOpen(true);
    // Store the uniqueId to ensure we update the right variant
    setCurrentItemUniqueId(item.uniqueId);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentProduct(null);
    setCurrentItemUniqueId(undefined);
  };

  // Handle add to cart (update) from modal
  const handleAddToCart = (
    quantity: number,
    customizations?: {
      ingredients?: { name: string; quantity: number; price?: number }[];
      condiments?: string[];
      comments?: string;
      totalPrice?: number;
    }
  ) => {
    setEditQuantity(quantity);
    setEditIngredients(customizations?.ingredients || []);
    if (currentProduct) {
      updateCartItem(
        currentProduct.id,
        {
          quantity,
          ...customizations,
          hasDiscount: editHasDiscount,
          discountPercentage: editDiscountPercent,
          originalPrice: editOriginalPrice,
        },
        currentItemUniqueId
      );
    }
    setEditModalOpen(false);
    setCurrentProduct(null);
    setCurrentItemUniqueId(undefined);
  };

  // Handle payment amount change
  const handlePaymentAmountChange = (value: string | number) => {
    setPaymentAmount(
      typeof value === 'string' ? (value === '' ? '' : Number(value)) : value
    );
  };

  // Check if cart is empty - moved to useEffect to prevent navigation during render
  useEffect(() => {
    if (items.length === 0) {
      router.push(`/branches/${branchId}`);
    }
  }, [items.length, branchId, router]);

  // Early return for empty cart while the redirect happens
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Flex
        className={styles.checkoutPageContainer}
        style={{ minHeight: '100vh' }}
      >
        {/* Header */}
        <CheckoutHeader
          isClosed={isBranchClosed}
          closedMessage={BRANCH_TEXTS.BRANCH_CLOSED}
        />

        <ContentWrapper ref={contentWrapperRef} topOffset={0}>
          <Box className={styles.contentContainer}>
            {/* Left Section - Delivery Details */}
            <Box className={styles.leftSection}>
              <Text className={styles.sectionTitle}>
                {CHECKOUT_TEXTS.DELIVERY_DETAILS}
              </Text>

              {/* Delivery Method Toggle */}
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

              {/* Customer Information Form */}
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
                  style={{
                    border: '1px solid #EFF2F6',
                    borderRadius: '4px',
                  }}
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
                  style={{
                    border: '1px solid #EFF2F6',
                    borderRadius: '4px',
                  }}
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
                      style={{
                        border: '1px solid #EFF2F6',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>

                  <div className={styles.cityProvinceRow}>
                    <Box
                      className={`${styles.formField} ${styles.cityProvinceItem}`}
                    >
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
                        style={{
                          border: '1px solid #EFF2F6',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>

                    <Box
                      className={`${styles.formField} ${styles.cityProvinceItem}`}
                    >
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
                        style={{
                          border: '1px solid #EFF2F6',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  </div>
                </>
              )}

              {/* Note for the restaurant */}
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
                <Text className={styles.textAreaCounter}>
                  {note.length}/100
                </Text>
              </Box>

              <Divider className={styles.divider} />

              {/* Payment Method Section */}
              <Text className={styles.sectionTitle}>
                {CHECKOUT_TEXTS.PAYMENT_METHOD}
              </Text>

              <Box>
                <Box
                  mb={12}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
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

              {/* Payment Amount */}
              <Box className={styles.formField} style={{ marginBottom: '0' }}>
                <Text className={styles.formLabel}>
                  {CHECKOUT_TEXTS.PAYMENT_AMOUNT_QUESTION}
                </Text>
                <NumberInput
                  placeholder=""
                  value={paymentAmount}
                  onChange={handlePaymentAmountChange}
                  min={0}
                  disabled={paymentMethod !== 'cash'}
                  classNames={{
                    root: styles.numberInput,
                    input: styles.formInputAmount,
                    wrapper: styles.numberInput,
                  }}
                />
              </Box>
            </Box>

            {/* Right Section - Order Summary */}
            <Box className={styles.rightSection}>
              {/* Order Box */}
              <Box className={styles.orderBox}>
                <Text className={styles.sectionTitle}>Mi pedido</Text>
                <Divider
                  className={styles.summaryDivider}
                  style={{ marginTop: -4, marginBottom: 16 }}
                />

                {/* Scrollable Products Container */}
                <Box className={styles.scrollableProductsContainer}>
                  {items.map((item, itemIndex) => {
                    // Use discount info from cart item
                    const hasDiscount = item.hasDiscount;
                    const discountPercentage = item.discountPercentage;
                    const itemBasePrice = item.totalPrice || item.product.price;
                    const originalPrice = item.originalPrice;
                    const itemKey =
                      item.uniqueId || `item-${item.product.id}-${itemIndex}`;
                    return (
                      <Box key={itemKey}>
                        <Box className={styles.productRow}>
                          <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className={styles.productImage}
                          />

                          <Box className={styles.productDetails}>
                            <Text className={styles.productName}>
                              {item.product.name}
                            </Text>

                            {/* Show customizations if any */}
                            {item.ingredients &&
                              item.ingredients.length > 0 && (
                                <Text size="xs" color="dimmed" mt={2}>
                                  {item.ingredients
                                    .filter((ing) => ing.quantity > 0) // Only display ingredients with quantity > 0
                                    .map(
                                      (ing) => `${ing.name} x${ing.quantity}`
                                    )
                                    .join(', ')}
                                </Text>
                              )}
                            {item.condiments && item.condiments.length > 0 && (
                              <Text size="xs" color="dimmed" mt={2}>
                                {item.condiments.join(', ')}
                              </Text>
                            )}
                            {item.comments && (
                              <Text size="xs" color="dimmed" mt={2} fs="italic">
                                {item.comments}
                              </Text>
                            )}

                            <Text
                              className={styles.editLink}
                              onClick={() => handleEditProduct(item)}
                            >
                              Editar
                            </Text>
                          </Box>

                          <Box
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                            }}
                          >
                            <Box
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                              }}
                            >
                              <Text className={styles.productPrice}>
                                $
                                {(
                                  itemBasePrice * item.quantity
                                ).toLocaleString()}
                              </Text>
                              {hasDiscount && (
                                <DiscountBadge
                                  discountPercentage={discountPercentage}
                                />
                              )}
                            </Box>
                            {hasDiscount && originalPrice && (
                              <Text className={styles.productOriginalPrice}>
                                $
                                {(
                                  originalPrice * item.quantity
                                ).toLocaleString()}
                              </Text>
                            )}

                            {/* Quantity controls */}
                            <Box className={styles.quantityControls}>
                              <QuantityControl
                                initialQuantity={item.quantity}
                                variant="checkout"
                                isMobile={isMobile}
                                onChange={(newQuantity) => {
                                  if (newQuantity === 0) {
                                    if (item.uniqueId) {
                                      updateCartItem(
                                        item.product.id,
                                        { quantity: 0 },
                                        item.uniqueId
                                      );
                                    } else {
                                      removeFromCart(item.product.id);
                                    }
                                  } else {
                                    if (item.uniqueId) {
                                      updateCartItem(
                                        item.product.id,
                                        { quantity: newQuantity },
                                        item.uniqueId
                                      );
                                    } else {
                                      handleQuantityUpdate(
                                        item.product.id,
                                        newQuantity
                                      );
                                    }
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                        <Divider
                          className={styles.summaryDivider}
                          style={{ margin: '8px 0' }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* Summary Box */}
              <Box className={styles.summaryBox}>
                <Box>
                  <Text className={styles.sectionTitle}>
                    {CHECKOUT_TEXTS.SUMMARY_TITLE}
                  </Text>
                  <Divider
                    className={styles.summaryDivider}
                    style={{ marginTop: -4 }}
                  />

                  {/* Price Summary */}
                  <Box className={styles.priceLine}>
                    <Text className={styles.priceLabel}>
                      {CHECKOUT_TEXTS.PRODUCTS_LABEL}
                    </Text>
                    <Text className={styles.priceValue}>
                      ${cartProductsTotal.toLocaleString()}
                    </Text>
                  </Box>

                  <Box className={styles.priceLine}>
                    <Text className={styles.priceLabel}>
                      {CHECKOUT_TEXTS.PRODUCT_DISCOUNT}
                    </Text>
                    <Text className={styles.discountValue}>
                      -${productDiscount.toLocaleString()}
                    </Text>
                  </Box>

                  <Divider className={styles.summaryDivider} />

                  <Box className={styles.priceLine}>
                    <Text className={styles.sectionSubtitle}>
                      {CHECKOUT_TEXTS.SUBTOTAL}
                    </Text>
                    <Text className={styles.priceValue}>
                      ${cartTotal.toLocaleString()}
                    </Text>
                  </Box>

                  <Box className={styles.priceLine}>
                    <Text className={styles.priceLabel}>
                      {CHECKOUT_TEXTS.PAYMENT_DISCOUNT}
                    </Text>
                    <Text className={styles.discountValue}>
                      -${paymentDiscount.toLocaleString()}
                    </Text>
                  </Box>

                  <Box className={styles.priceLine}>
                    <Text className={styles.priceLabel}>
                      {CHECKOUT_TEXTS.SHIPPING_COST}
                    </Text>
                    <Text className={styles.priceValue}>
                      ${shippingCost.toLocaleString()}
                    </Text>
                  </Box>

                  <Divider className={styles.summaryDivider} />

                  <Box className={styles.priceLine}>
                    <Text className={styles.totalLabel}>
                      {CHECKOUT_TEXTS.TOTAL}
                    </Text>
                    <Text className={styles.totalValue}>
                      ${total.toLocaleString()}
                    </Text>
                  </Box>
                </Box>

                {/* Confirm Button */}
                <Button
                  className={styles.confirmButton}
                  onClick={handleCheckout}
                  fullWidth
                >
                  {CHECKOUT_TEXTS.CONFIRM_ORDER}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Edit Product Modal */}
          {editModalOpen && currentProduct && (
            <AddToCartModal
              product={currentProduct}
              opened={editModalOpen}
              onClose={handleCloseEditModal}
              onAddToCart={(
                quantity: number,
                cartItem?: CartItemCustomization
              ) => {
                if (cartItem) {
                  // If we have a full cartItem with customizations, use it
                  const { ingredients, condiments, comments, totalPrice } =
                    cartItem;
                  handleAddToCart(quantity, {
                    ingredients,
                    condiments,
                    comments,
                    totalPrice,
                  });
                } else {
                  // Otherwise just update the quantity
                  handleAddToCart(quantity);
                }
              }}
              initialQuantity={
                // Only use uniqueId to find the exact item being edited - don't fall back to product ID matching
                items.find((item) => item.uniqueId === currentItemUniqueId)
                  ?.quantity || 1
              }
              initialIngredients={
                // Only use uniqueId to find the exact item being edited
                items.find((item) => item.uniqueId === currentItemUniqueId)
                  ?.ingredients
              }
              initialCondiments={
                // Only use uniqueId to find the exact item being edited
                items.find((item) => item.uniqueId === currentItemUniqueId)
                  ?.condiments
              }
              initialComments={
                // Only use uniqueId to find the exact item being edited
                items.find((item) => item.uniqueId === currentItemUniqueId)
                  ?.comments
              }
            />
          )}
        </ContentWrapper>
      </Flex>
    </>
  );
}
