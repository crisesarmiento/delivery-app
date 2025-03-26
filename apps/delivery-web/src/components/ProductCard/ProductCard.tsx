'use client';

import { useState } from 'react';
import { IProduct } from '../../types';
import { Card, Text, Badge, Image, Overlay, Flex, Box } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import styles from './ProductCard.module.css';
import DiscountBadge from '../DiscountBadge';
import QuantityControl from '../QuantityControl';
import AddToCartModal from '../AddToCartModal/AddToCartModal';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuantityControl, setShowQuantityControl] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { getCartItemQuantity, updateCartItem, addToCart } = useCart();
  const quantity = getCartItemQuantity(product.id);

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

  const handleAddToCart = (newQuantity: number) => {
    if (newQuantity === 0) {
      updateCartItem(product.id, { quantity: 0 });
    } else {
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
                    setShowQuantityControl(true);
                  }}
                  onMouseEnter={() => setShowQuantityControl(true)}
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
                  <QuantityControl
                    initialQuantity={quantity || 1}
                    onChange={(newQuantity) => {
                      if (newQuantity === 0) {
                        updateCartItem(product.id, { quantity: 0 });
                        setShowQuantityControl(false);
                      } else {
                        updateCartItem(product.id, { quantity: newQuantity });
                      }
                    }}
                    onAddToCart={() => {
                      if (product && quantity > 0) {
                        // Just update the quantity without opening modal
                        updateCartItem(product.id, { quantity: quantity + 1 });
                      }
                    }}
                  />
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
        initialQuantity={quantity}
      />
    </>
  );
};

export default ProductCard;
