'use client';

import { useState, useEffect } from 'react';
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
import { IconShoppingCart } from '@tabler/icons-react';
import styles from './ProductCard.module.css';
import DiscountBadge from '../DiscountBadge';
import { useCart } from '@/context/CartContext';
import { useDisclosure } from '@mantine/hooks';
import { BRANCH_TEXTS } from '@/config/constants';
import QuantityControl from '../QuantityControl';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';
import { BranchClosedModal } from '../BranchClosedModal';
import { useRouter } from 'next/navigation';
import { ProductCardProps } from './types';

const ProductCard = ({
  product,
  isBranchClosed,
  isDisabled = false,
  onProductClick,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuantityControl, setShowQuantityControl] = useState(false);
  const theme = useMantineTheme();
  const [branchClosedModalOpened, setBranchClosedModalOpened] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();

  const { updateCartItem, getCartItemsByProductId } = useCart();

  // Get all instances of this product in the cart
  const cartItems = getCartItemsByProductId(product.id);

  // Get total quantity of this product in the cart (all versions combined)
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const priceCalculation = usePriceCalculation(product, [], quantity);

  useEffect(() => {
    if (quantity > 0) {
      setShowQuantityControl(true);
    }
  }, [quantity]);

  const handleNavigate = (route: string) => {
    router.push(route);
    close();
  };

  // Use discountPercent from product, default to 0 if not present
  const discountPercent = priceCalculation.discountPercent;
  const hasDiscount = priceCalculation.hasDiscount;
  const originalPrice = priceCalculation.originalPrice;

  return (
    <>
      {/* Branch Closed Modal */}
      {isBranchClosed && branchClosedModalOpened && (
        <BranchClosedModal
          clicked={branchClosedModalOpened}
          onNavigate={() => handleNavigate('/branches')}
          onClose={() => {
            setBranchClosedModalOpened(false);
            close();
          }}
        />
      )}
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
        data-testid={`product-card-${product.id}`}
      >
        {/* Image container */}
        <div
          className={styles.imageContainer}
          style={{ background: theme.colors.neutral[9] }}
          data-testid="product-card-image-container"
        >
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
              data-testid="product-card-image"
            />
          )}

          {(!product.isAvailable || isDisabled) && (
            <Overlay
              color={theme.colors.neutral[9]}
              backgroundOpacity={0.6}
              blur={1}
              data-testid="product-card-overlay"
            >
              <Badge
                size="xl"
                color={isDisabled ? 'gray' : 'error'}
                variant="filled"
                className={styles.unavailableBadge}
                data-testid="product-card-unavailable-badge"
              >
                {isDisabled
                  ? BRANCH_TEXTS.BRANCH_CLOSED_MESSAGE
                  : BRANCH_TEXTS.UNAVAILABLE_MESSAGE}
              </Badge>
            </Overlay>
          )}

          {/* Discount badge */}
          {hasDiscount && product.isAvailable && (
            <DiscountBadge
              discountPercentage={discountPercent}
              className={styles.discountBadge}
              data-testid="product-card-discount-badge"
            />
          )}

          {/* Cart icon or quantity indicator */}
          {product.isAvailable && (
            <>
              {quantity > 0 && (
                <Box
                  className={styles.quantityBadge}
                  onMouseEnter={() => setShowQuantityControl(true)}
                  data-testid="product-card-quantity-badge"
                >
                  <Text
                    className={styles.quantityBadgeText}
                    style={{
                      fontFamily: theme.fontFamily,
                      fontWeight: 600,
                      color: theme.colors.neutral[9],
                    }}
                    data-testid="product-card-quantity-text"
                  >
                    {quantity}
                  </Text>
                </Box>
              )}

              {isHovered && !isDisabled && (
                <Box
                  className={styles.cartIconContainer}
                  style={{
                    backgroundColor: theme.colors.action[4],
                    boxShadow: theme.shadows.md,
                  }}
                  data-testid="product-card-cart-icon-container"
                >
                  <IconShoppingCart
                    size={24}
                    className={styles.cartIcon}
                    stroke={1.5}
                    aria-label="Add to cart"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents bubbling to parent
                      if (isBranchClosed) {
                        setBranchClosedModalOpened(true);
                        toggle();
                      } else if (!isDisabled) {
                        onProductClick?.(product);
                      }
                    }}
                    data-testid="product-card-cart-icon"
                    style={{ color: theme.colors.neutral[9] }}
                  />
                </Box>
              )}

              {showQuantityControl && (
                <Box
                  className={styles.quantityControlContainer}
                  onMouseLeave={() => setShowQuantityControl(false)}
                >
                  <QuantityControl
                    quantity={quantity}
                    variant="productCard"
                    initialQuantity={quantity}
                    onChange={(newQuantity) => {
                      if (newQuantity === 0) {
                        if (cartItems.length === 1) {
                          // Remove single item
                          updateCartItem(
                            { quantity: 0 },
                            cartItems[0].uniqueId
                          );
                        } else {
                          // Remove all items of this product
                          cartItems.forEach((item) => {
                            updateCartItem({ quantity: 0 }, item.uniqueId);
                          });
                        }
                        setShowQuantityControl(false);
                      } else if (newQuantity < quantity) {
                        if (cartItems.length === 1) {
                          // Decrease single item
                          updateCartItem(
                            { quantity: cartItems[0].quantity - 1 },
                            cartItems[0].uniqueId
                          );
                        } else {
                          // Decrease one from the first item
                          const firstItem = cartItems[0];
                          if (firstItem.quantity > 1) {
                            updateCartItem(
                              { quantity: firstItem.quantity - 1 },
                              firstItem.uniqueId
                            );
                          } else {
                            // If first item has quantity 1, remove it
                            updateCartItem({ quantity: 0 }, firstItem.uniqueId);
                          }
                        }
                      } else if (newQuantity > quantity) {
                        if (cartItems.length === 1) {
                          // Increase single item
                          updateCartItem(
                            { quantity: cartItems[0].quantity + 1 },
                            cartItems[0].uniqueId
                          );
                        } else {
                          setShowQuantityControl(false);
                        }
                      }
                    }}
                  />
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
    </>
  );
};

export default ProductCard;
