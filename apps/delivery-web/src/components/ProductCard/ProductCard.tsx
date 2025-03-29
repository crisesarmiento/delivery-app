'use client';

import { useState, useMemo } from 'react';
import { IProduct } from '../../types';
import {
  Card,
  Text,
  Badge,
  Image,
  Overlay,
  Box,
  useMantineTheme,
} from '@mantine/core';
import {
  IconShoppingCart,
  IconTrash,
  IconCircleMinus,
  IconCirclePlus,
} from '@tabler/icons-react';
import styles from './ProductCard.module.css';
import DiscountBadge from '../DiscountBadge';
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import { useCart, CartItem } from '../../context/CartContext';

interface ProductCardProps {
  product: IProduct;
  isDisabled?: boolean;
}

const ProductCard = ({ product, isDisabled = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuantityControl, setShowQuantityControl] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useMantineTheme();

  const { updateCartItem, addToCart, getCartItemsByProductId } = useCart();

  // Get all instances of this product in the cart
  const cartItems = getCartItemsByProductId(product.id);

  // Get total quantity of this product in the cart (all versions combined)
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Check if product has discount - use a stable approach
  const hasDiscount = useMemo(() => {
    // Check if name includes 'promo' or use a deterministic approach based on product id
    if (product.name.toLowerCase().includes('promo')) {
      return true;
    }

    // Use product ID to determine discount in a type-safe way
    if (typeof product.id === 'number') {
      return product.id % 3 === 0;
    } else {
      // For string IDs, use the string length
      const idString = String(product.id);
      return idString.length % 3 === 0;
    }
  }, [product.id, product.name]);

  // Calculate original price (this would typically come from the product data)
  const originalPrice = hasDiscount ? (product.price * 1.2).toFixed(2) : null;

  // Calculate discount percentage (this would typically come from the product data)
  const discountPercentage = hasDiscount ? 20 : 0;

  const handleCartIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Don't open modal if product is disabled
    if (isDisabled) return;

    setShowModal(true);
  };

  const handleAddToCart = (newQuantity: number, cartItem?: CartItem) => {
    // Don't update cart if product is disabled
    if (isDisabled) return;

    if (newQuantity === 0) {
      // If there are multiple instances of this product, we'll remove one at a time
      if (cartItems.length > 0) {
        // Remove the first instance found
        updateCartItem(product.id, { quantity: 0 }, cartItems[0].uniqueId);
      }
    } else if (cartItem) {
      // Use the cart item with customizations if provided
      addToCart(cartItem);
    } else {
      // Fallback to adding a basic product
      addToCart({
        product,
        quantity: newQuantity,
      });
    }

    setShowModal(false);
  };

  return (
    <>
      <Card
        className={styles.productCard}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered ? theme.shadows.md : theme.shadows.xs,
          backgroundColor: isHovered
            ? theme.colors.neutral[1]
            : theme.colors.neutral[0],
          border: isHovered
            ? `1px solid ${theme.colors.neutral[3]}`
            : `1px solid ${theme.colors.neutral[2]}`,
          opacity: isDisabled ? 0.7 : 1,
          cursor: isDisabled ? 'default' : 'pointer',
          borderRadius: theme.radius.md,
        }}
      >
        {/* Image container */}
        <div
          className={styles.imageContainer}
          style={{ background: theme.colors.neutral[9] }}
        >
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
            />
          )}

          {(!product.isAvailable || isDisabled) && (
            <Overlay
              color={theme.colors.neutral[9]}
              backgroundOpacity={0.6}
              blur={1}
            >
              <Badge
                size="xl"
                color={isDisabled ? 'gray' : 'error'}
                variant="filled"
                className={styles.unavailableBadge}
              >
                {isDisabled ? 'Sucursal Cerrada' : 'No Disponible'}
              </Badge>
            </Overlay>
          )}

          {/* Discount badge */}
          {hasDiscount && product.isAvailable && (
            <DiscountBadge
              discountPercentage={discountPercentage}
              className={styles.discountBadge}
            />
          )}

          {/* Cart icon or quantity indicator */}
          {product.isAvailable && (
            <>
              {quantity > 0 && !showQuantityControl && (
                <Box
                  className={styles.quantityBadge}
                  onClick={(e) => {
                    e.stopPropagation();
                    // If only one item type, show quantity control
                    // If multiple versions, open modal to select which one to modify
                    if (cartItems.length === 1) {
                      setShowQuantityControl(true);
                    } else {
                      setShowModal(true);
                    }
                  }}
                  onMouseEnter={() => setShowQuantityControl(true)}
                  onMouseLeave={(e) => {
                    // Check if we're not hovering over the quantity control
                    const elementUnderMouse = document.elementFromPoint(
                      e.clientX,
                      e.clientY
                    );
                    if (
                      !elementUnderMouse?.closest(
                        `.${styles.quantityControlContainer}`
                      )
                    ) {
                      setShowQuantityControl(false);
                    }
                  }}
                  style={{
                    background: theme.colors.neutral[0],
                    borderRadius: theme.radius.sm,
                    boxShadow: theme.shadows.xs,
                  }}
                >
                  <Text
                    className={styles.quantityBadgeText}
                    style={{
                      fontFamily: theme.fontFamily,
                      fontWeight: 600,
                      color: theme.colors.neutral[9],
                    }}
                  >
                    {quantity}
                  </Text>
                </Box>
              )}

              {isHovered && !isDisabled && (
                <Box
                  className={styles.cartIconContainer}
                  onClick={handleCartIconClick}
                  style={{
                    backgroundColor: theme.colors.action[4],
                    boxShadow: theme.shadows.md,
                  }}
                >
                  <IconShoppingCart
                    size={24}
                    className={styles.cartIcon}
                    stroke={1.5}
                    style={{ color: theme.colors.neutral[9] }}
                  />
                </Box>
              )}

              {showQuantityControl && (
                <Box
                  className={styles.quantityControlContainer}
                  onMouseLeave={() => setShowQuantityControl(false)}
                >
                  <Box
                    className={styles.controlButtons}
                    style={{
                      background: theme.colors.neutral[0],
                      borderRadius: theme.radius.sm,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      boxShadow: theme.shadows.xs,
                    }}
                  >
                    {quantity <= 1 ? (
                      <IconTrash
                        size={20}
                        stroke={1.5}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (cartItems.length === 1) {
                            // Remove single item
                            updateCartItem(
                              product.id,
                              { quantity: 0 },
                              cartItems[0].uniqueId
                            );
                          } else {
                            // Remove all items of this product
                            cartItems.forEach((item) => {
                              updateCartItem(
                                product.id,
                                { quantity: 0 },
                                item.uniqueId
                              );
                            });
                          }
                          setShowQuantityControl(false);
                        }}
                      />
                    ) : (
                      <IconCircleMinus
                        size={20}
                        stroke={1.5}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (cartItems.length === 1) {
                            // Decrease single item
                            updateCartItem(
                              product.id,
                              { quantity: cartItems[0].quantity - 1 },
                              cartItems[0].uniqueId
                            );
                          } else {
                            // Decrease one from the first item
                            const firstItem = cartItems[0];
                            if (firstItem.quantity > 1) {
                              updateCartItem(
                                product.id,
                                { quantity: firstItem.quantity - 1 },
                                firstItem.uniqueId
                              );
                            } else {
                              // If first item has quantity 1, remove it
                              updateCartItem(
                                product.id,
                                { quantity: 0 },
                                firstItem.uniqueId
                              );
                            }
                          }
                        }}
                      />
                    )}

                    <Text
                      mx={theme.spacing.sm}
                      style={{
                        fontFamily: theme.fontFamily,
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '18px',
                        textAlign: 'center',
                        color: theme.colors.neutral[9],
                      }}
                    >
                      {quantity}
                    </Text>

                    <IconCirclePlus
                      size={20}
                      stroke={1.5}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (cartItems.length === 1) {
                          // Increase single item
                          updateCartItem(
                            product.id,
                            { quantity: cartItems[0].quantity + 1 },
                            cartItems[0].uniqueId
                          );
                        } else {
                          // Open the modal to select which item to modify
                          setShowModal(true);
                          setShowQuantityControl(false);
                        }
                      }}
                    />
                  </Box>
                </Box>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className={styles.contentContainer}>
          <Text
            ta="center"
            style={{
              fontFamily: theme.fontFamily,
              fontSize: '12px',
              lineHeight: '18px',
              fontWeight: 400,
              color: theme.colors.neutral[6],
              marginBottom: '0px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </Text>
          <Box
            className={styles.priceContainer}
            style={{
              marginBottom: theme.spacing.xs,
            }}
          >
            {hasDiscount && originalPrice && (
              <Text
                style={{
                  fontFamily: theme.fontFamily,
                  fontSize: '10px',
                  lineHeight: '18px',
                  fontWeight: 500,
                  textAlign: 'center',
                  textDecoration: 'line-through',
                  color: theme.colors.neutral[5],
                  marginBottom: '2px',
                }}
              >
                ${originalPrice}
              </Text>
            )}
            <Text
              style={{
                fontFamily: theme.fontFamily,
                fontWeight: 600,
                fontSize: theme.fontSizes.xs,
                lineHeight: '18px',
                textAlign: 'center',
                color: theme.colors.neutral[9],
              }}
            >
              ${product.price.toFixed(2)}
            </Text>
          </Box>
        </div>
      </Card>

      {/* Modal for adding to cart with customizations */}
      {showModal && (
        <AddToCartModal
          product={product}
          opened={showModal}
          onClose={() => setShowModal(false)}
          onAddToCart={handleAddToCart}
          initialQuantity={1}
        />
      )}
    </>
  );
};

export default ProductCard;
