'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import {
  IconTrash,
  IconCirclePlus,
  IconCircleMinus,
} from '@tabler/icons-react';
import styles from './page.module.css';
import ProductsHeader from '@/components/Header/ProductsHeader';
import { branchesMock } from '../../../../mocks/branches.mock';
import { useCart, CartItem } from '../../../../context/CartContext';
import { IBranch, IProduct } from '../../../../types';
import { CHECKOUT_TEXTS, COMMON_TEXTS } from '../../../../config/constants';
import AddToCartModal from '@/components/AddToCartModal/AddToCartModal';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const branchId = (params?.branchId as string) || '';
  const { items, updateCartItem, removeFromCart, getTotalPrice } = useCart();

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

  // Find the current branch
  const currentBranch = branchesMock.find((branch) => branch.id === branchId);

  // Handle back navigation
  const handleBack = () => {
    router.push(`/branches/${branchId}`);
  };

  // Redirect if branch is not found
  useEffect(() => {
    if (!currentBranch && branchId) {
      router.push('/branches');
    }
  }, [currentBranch, branchId, router]);

  // Calculate prices
  const subtotal = getTotalPrice();

  // Calculate product discount (10% of products with discount)
  const productDiscount = items.reduce((total, item) => {
    // Check if product has discount based on its name or ID
    const hasDiscount =
      item.product.name.toLowerCase().includes('promo') ||
      (typeof item.product.id === 'number'
        ? item.product.id % 3 === 0
        : String(item.product.id).length % 3 === 0);

    if (hasDiscount) {
      // Calculate 10% of the product price
      return total + item.product.price * item.quantity * 0.1;
    }
    return total;
  }, 0);

  // Calculate payment method discount (10% of subtotal after product discounts)
  // Only apply if payment method is transfer or cash
  const paymentDiscountRate =
    paymentMethod === 'transfer' || paymentMethod === 'cash' ? 0.1 : 0;
  const paymentDiscount = Math.round(
    (subtotal - productDiscount) * paymentDiscountRate
  );

  const shippingCost = 1500;
  const total = subtotal - productDiscount - paymentDiscount + shippingCost;

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

    // Here you would implement the checkout logic
    console.log('Checkout initiated with data:', {
      deliveryMethod,
      fullName,
      phone,
      address,
      city,
      province,
      note,
      paymentMethod,
      paymentAmount,
      cartItems: items,
      totalAmount: total,
    });

    // For demo purposes, alert the user and redirect
    alert(COMMON_TEXTS.ORDER_CONFIRMED);
    router.push(`/branches/${branchId}`);
  };

  // Handle product quantity update
  const handleQuantityUpdate = (
    productId: string | number,
    newQuantity: number
  ) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateCartItem(productId, { quantity: newQuantity });
    }
  };

  // Open edit modal for a product
  const handleEditProduct = (item: CartItem) => {
    console.log('Editing product with details:', item);
    console.log('Item uniqueId:', item.uniqueId);
    console.log('Item ingredients:', item.ingredients);
    console.log('Item condiments:', item.condiments);

    if (!item.uniqueId) {
      console.error('Error: Attempting to edit an item without a uniqueId');
    }

    // Important: When editing a product, create a full copy of the product
    // with any customizations from the cart to ensure we're working with the same data
    const productForEdit = {
      ...item.product,
    };

    setCurrentProduct(productForEdit);
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
    if (currentProduct) {
      updateCartItem(
        currentProduct.id,
        {
          quantity,
          ...customizations,
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

  // Check if cart is empty
  if (items.length === 0) {
    router.push(`/branches/${branchId}`);
    return null;
  }

  return (
    <Box className={styles.checkoutPageContainer}>
      {/* Header */}
      <ProductsHeader
        branch={currentBranch as IBranch}
        onBackClick={handleBack}
      />

      <Box className={styles.contentContainer}>
        {/* Left Section - Delivery Details */}
        <Box className={styles.leftSection} style={{ paddingBottom: '20px' }}>
          <Text className={styles.sectionTitle}>Detalle de entrega</Text>

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
              <Text>Delivery</Text>
            </Box>
            <Box
              className={`${styles.toggleButton} ${
                deliveryMethod === 'pickup'
                  ? styles.activeToggle
                  : styles.inactiveToggle
              }`}
              onClick={() => setDeliveryMethod('pickup')}
            >
              <Text>Retiro</Text>
            </Box>
          </Flex>

          {/* Customer Information Form */}
          <Box className={styles.formField}>
            <Text className={styles.formLabel}>
              Nombre completo<span className={styles.requiredAsterisk}>*</span>
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
              Teléfono<span className={styles.requiredAsterisk}>*</span>
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
                  Domicilio<span className={styles.requiredAsterisk}>*</span>
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
                    Ciudad<span className={styles.requiredAsterisk}>*</span>
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
                    Provincia<span className={styles.requiredAsterisk}>*</span>
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
            <Text className={styles.textAreaLabel}>Nota para el local</Text>
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

          {/* Payment Method Section */}
          <Text className={styles.sectionTitle}>Forma de pago</Text>

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
                Transferencia Bancaria (Descuento 10%)
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
                Mercado Pago
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
                Efectivo (Descuento 10%)
              </Text>
            </Box>
          </Box>

          {/* Payment Amount */}
          <Box className={styles.formField} style={{ marginBottom: '0' }}>
            <Text className={styles.formLabel}>Con cuánto vas a pagar?</Text>
            <NumberInput
              placeholder=""
              value={paymentAmount}
              onChange={handlePaymentAmountChange}
              min={0}
              classNames={{
                root: styles.numberInput,
                input: styles.formInput,
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
                // Check if product has discount using the same logic as the productDiscount calculation
                const hasDiscount =
                  item.product.name.toLowerCase().includes('promo') ||
                  (typeof item.product.id === 'number'
                    ? item.product.id % 3 === 0
                    : String(item.product.id).length % 3 === 0);
                // const discountPercentage = hasDiscount ? 10 : 0;

                // Use the item's totalPrice (if it has customizations) or calculate based on product price
                const itemBasePrice = item.totalPrice || item.product.price;
                const originalPrice = hasDiscount
                  ? (itemBasePrice * 1.1).toFixed(2)
                  : null;

                // Create a stable unique key for each item
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
                        {item.ingredients && item.ingredients.length > 0 && (
                          <Text size="xs" color="dimmed" mt={2}>
                            {item.ingredients
                              .filter((ing) => ing.quantity > 0) // Only display ingredients with quantity > 0
                              .map((ing) => `${ing.name} x${ing.quantity}`)
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
                        <Text className={styles.productPrice}>
                          ${(itemBasePrice * item.quantity).toLocaleString()}
                        </Text>
                        {hasDiscount && originalPrice && (
                          <Text className={styles.productOriginalPrice}>
                            $
                            {(
                              parseFloat(originalPrice) * item.quantity
                            ).toLocaleString()}
                          </Text>
                        )}

                        {/* Quantity controls */}
                        <Box className={styles.quantityControls}>
                          {item.quantity <= 1 ? (
                            <IconTrash
                              size={26}
                              stroke={1.5}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                if (item.uniqueId) {
                                  updateCartItem(
                                    item.product.id,
                                    { quantity: 0 },
                                    item.uniqueId
                                  );
                                } else {
                                  removeFromCart(item.product.id);
                                }
                              }}
                            />
                          ) : (
                            <IconCircleMinus
                              size={26}
                              stroke={1.5}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                if (item.uniqueId) {
                                  updateCartItem(
                                    item.product.id,
                                    { quantity: item.quantity - 1 },
                                    item.uniqueId
                                  );
                                } else {
                                  handleQuantityUpdate(
                                    item.product.id,
                                    item.quantity - 1
                                  );
                                }
                              }}
                            />
                          )}

                          <Text fw={600}>{item.quantity}</Text>

                          <IconCirclePlus
                            size={26}
                            stroke={1.5}
                            style={{
                              background: '#B3FF00',
                              borderRadius: '50%',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              if (item.uniqueId) {
                                updateCartItem(
                                  item.product.id,
                                  { quantity: item.quantity + 1 },
                                  item.uniqueId
                                );
                              } else {
                                handleQuantityUpdate(
                                  item.product.id,
                                  item.quantity + 1
                                );
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
              <Text className={styles.sectionTitle}>Resumen</Text>
              <Divider
                className={styles.summaryDivider}
                style={{ marginTop: -4 }}
              />

              {/* Price Summary */}
              <Box className={styles.priceLine}>
                <Text className={styles.priceLabel}>Productos</Text>
                <Text className={styles.priceValue}>
                  ${subtotal.toLocaleString()}
                </Text>
              </Box>

              <Box className={styles.priceLine}>
                <Text className={styles.priceLabel}>
                  Descuento de productos
                </Text>
                <Text className={styles.discountValue}>
                  -${productDiscount.toLocaleString()}
                </Text>
              </Box>

              <Divider className={styles.summaryDivider} />

              <Box className={styles.priceLine}>
                <Text className={styles.sectionSubtitle}>Subtotal</Text>
                <Text className={styles.priceValue}>
                  ${(subtotal - productDiscount).toLocaleString()}
                </Text>
              </Box>

              <Box className={styles.priceLine}>
                <Text className={styles.priceLabel}>
                  Descuento forma de pago
                </Text>
                <Text className={styles.discountValue}>
                  -${paymentDiscount.toLocaleString()}
                </Text>
              </Box>

              <Box className={styles.priceLine}>
                <Text className={styles.priceLabel}>Envío</Text>
                <Text className={styles.priceValue}>
                  ${shippingCost.toLocaleString()}
                </Text>
              </Box>

              <Divider className={styles.summaryDivider} />

              <Box className={styles.priceLine}>
                <Text className={styles.totalLabel}>Total</Text>
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
              Confirmar pedido
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
          onAddToCart={(quantity: number, cartItem: any) => {
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
    </Box>
  );
}
