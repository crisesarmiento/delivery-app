'use client';

import { useState } from 'react';
import { IProduct } from '../../types';
import { Card, Text, Badge, Image, Overlay, Flex, Box } from '@mantine/core';
import {
  IconShoppingCart,
  IconTrash,
  IconCircleMinus,
  IconCirclePlus,
} from '@tabler/icons-react';
import styles from './ProductCard.module.css';
import DiscountBadge from '../DiscountBadge';
import QuantityControl from '../QuantityControl';
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import { useCart, CartItem } from '../../context/CartContext';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuantityControl, setShowQuantityControl] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    getCartItemQuantity,
    updateCartItem,
    addToCart,
    getCartItemsByProductId,
  } = useCart();

  // Get all instances of this product in the cart
  const cartItems = getCartItemsByProductId(product.id);

  // Get total quantity of this product in the cart (all versions combined)
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Check if product has discount
  const hasDiscount =
    product.name.toLowerCase().includes('promo') || Math.random() > 0.7;

  // Calculate original price (this would typically come from the product data)
  const originalPrice = hasDiscount ? (product.price * 1.2).toFixed(2) : null;

  // Calculate discount percentage (this would typically come from the product data)
  const discountPercentage = hasDiscount ? 20 : 0;

  const handleCartIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
  };

  const handleAddToCart = (newQuantity: number, cartItem?: CartItem) => {
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
          boxShadow: isHovered
            ? '0px 4px 8px rgba(0, 0, 0, 0.1)'
            : '0px 1px 3px rgba(0, 0, 0, 0.1)',
          backgroundColor: isHovered ? 'rgba(227, 232, 239, 1)' : 'white',
          border: isHovered
            ? '1px solid rgba(201, 205, 212, 1)'
            : 'rgba(238, 242, 246, 1)',
        }}
      >
        {/* Image container */}
        <div className={styles.imageContainer}>
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
            />
          )}

          {!product.isAvailable && (
            <Overlay color="#000" backgroundOpacity={0.6} blur={1}>
              <Badge
                size="xl"
                color="red"
                variant="filled"
                className={styles.unavailableBadge}
              >
                No Disponible
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
                >
                  <Text className={styles.quantityBadgeText}>{quantity}</Text>
                </Box>
              )}

              {isHovered && (
                <Box
                  className={styles.cartIconContainer}
                  onClick={handleCartIconClick}
                >
                  <IconShoppingCart
                    size={24}
                    className={styles.cartIcon}
                    stroke={1.5}
                  />
                </Box>
              )}

              {showQuantityControl && (
                <Box
                  className={styles.quantityControlContainer}
                  onMouseLeave={() => setShowQuantityControl(false)}
                >
                  <Box className={styles.controlButtons}>
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

                    <Text style={{ margin: '0 8px', fontWeight: 600 }}>
                      {quantity}
                    </Text>

                    <IconCirclePlus
                      size={20}
                      stroke={1.5}
                      style={{
                        cursor: 'pointer',
                        background: '#B3FF00',
                        borderRadius: '50%',
                      }}
                      onClick={() => {
                        if (cartItems.length === 1) {
                          // Increase single item
                          updateCartItem(
                            product.id,
                            { quantity: cartItems[0].quantity + 1 },
                            cartItems[0].uniqueId
                          );
                        } else if (cartItems.length > 1) {
                          // For multiple variations, open the modal when adding more
                          setShowQuantityControl(false);
                          setShowModal(true);
                        } else {
                          // No items in cart, add basic product
                          addToCart({
                            product,
                            quantity: 1,
                          });
                        }
                      }}
                    />
                  </Box>
                </Box>
              )}
            </>
          )}
        </div>

        {/* Content container */}
        <div className={styles.contentContainer}>
          <Text className={styles.productName} title={product.name}>
            {product.name}
          </Text>

          <Flex
            className={styles.priceContainer}
            direction="column"
            align="center"
          >
            {hasDiscount && originalPrice && (
              <Text className={styles.originalPrice}>${originalPrice}</Text>
            )}
            <Text className={styles.price}>${product.price.toFixed(2)}</Text>
          </Flex>
        </div>
      </Card>

      <AddToCartModal
        product={product}
        opened={showModal}
        onClose={() => setShowModal(false)}
        onAddToCart={handleAddToCart}
        initialQuantity={1}
      />
    </>
  );
};

export default ProductCard;
