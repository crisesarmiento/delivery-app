'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Image, Flex, Box, Button, Modal } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import styles from './AddToCartModal.module.css';
import { getProductById } from '@/utils/products';
import { TOOLTIP_TEXTS } from '@/config/constants';

import ModalFooter from './ModalFooter/ModalFooter';
import IngredientsSection from './IngredientsSection/IngredientsSection';
import CondimentsSection from './CondimentsSection/CondimentsSection';
import CommentsSection from './CommentsSection/CommentsSection';
import ModalHeader from './ModalHeader/ModalHeader';
import ProductInfo from './ProductInfo/ProductInfo';

// ===== Types =====
import { AddToCartModalProps } from '@/types/addToCartModal/types';
import { CartItemCustomization } from '@/context/types';

// ===== Custom Hooks =====
import { useIngredients } from '@/hooks/useIngredients';
import { useCondiments } from '@/hooks/useCondiments';
import { usePriceCalculation } from '@/hooks/usePriceCalculation';

// ===== Main Component =====
const AddToCartModal = ({
  product,
  opened,
  onClose,
  onAddToCart,
  initialQuantity = 1,
  initialIngredients,
  initialCondiments = [],
  initialComments,
}: AddToCartModalProps) => {
  // Initialization and state tracking
  const isInitialized = useRef(false);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [comments, setComments] = useState(initialComments || '');
  const [commentChars, setCommentChars] = useState(
    initialComments ? initialComments.length : 0
  );
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Get product with customization options from mock using useMemo
  const productWithCustomization = useMemo(
    () => getProductById(product.id),
    [product.id]
  );

  // Use custom hooks
  const {
    ingredients,
    showIngredients,
    setShowIngredients,
    handleUpdateIngredient,
    ingredientOptions,
    totalSelectedIngredients,
    maxIngredientSelections,
  } = useIngredients(
    initialIngredients,
    productWithCustomization || null,
    isInitialized,
    opened
  );

  const {
    condiments,
    showCondiments,
    setShowCondiments,
    handleToggleCondiment,
    condimentOptions,
  } = useCondiments(
    initialCondiments,
    productWithCustomization || null,
    isInitialized,
    opened
  );

  const {
    hasDiscount,
    discountPercent,
    originalPrice,
    discountedPrice,
    finalPrice,
  } = usePriceCalculation(product, ingredients, quantity);

  // Reset the initialization when the modal closes
  useEffect(() => {
    if (opened && !isInitialized.current) {
      isInitialized.current = true;
    } else if (!opened) {
      isInitialized.current = false;
    }
  }, [opened]);

  // Only set initial quantity when component mounts or initialQuantity changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  // Comments handler
  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setComments(newValue);
    setCommentChars(newValue.length);
  };

  // Create a dynamic placeholder that updates with character count
  const getCommentPlaceholder = () => {
    return `${commentChars}/100`;
  };

  const handleAddToCart = () => {
    const cartItem: CartItemCustomization = {
      product,
      quantity,
      uniqueId: Date.now().toString(),
      ingredients: ingredients.filter((ing) => ing.quantity > 0),
      condiments: condiments.filter((c) => c.selected).map((c) => c.name),
      comments,
      totalPrice: finalPrice,
      hasDiscount,
      discountPercentage: discountPercent,
      originalPrice,
    };

    onAddToCart(cartItem.quantity, cartItem);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      padding={0}
      radius="lg"
      size={750}
      classNames={{
        root: styles.modalOverlay,
        content: styles.modalContent,
      }}
      centered
      closeOnEscape
      closeOnClickOutside={true}
      trapFocus
      scrollAreaComponent={Box}
      transitionProps={{ transition: 'pop', duration: 200 }}
      overlayProps={{
        color: 'rgba(66, 61, 61, 0.8)',
        opacity: 1,
        blur: 3,
      }}
    >
      {/* Close button */}
      <Button
        className={styles.closeButton}
        onClick={onClose}
        aria-label={TOOLTIP_TEXTS.CLOSE_MODAL}
        variant="subtle"
        p={0}
        radius="xl"
        data-testid="close-modal-button"
      >
        <IconX size={24} />
      </Button>

      {/* Header */}
      <ModalHeader
        product={product}
        hasDiscount={hasDiscount}
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
      />

      {/* Body */}
      <Box className={styles.modalBody}>
        {/* Top section with content in two columns or reordered for mobile */}
        <Flex
          className={styles.contentTopSection}
          direction={isMobile ? 'column' : 'row'}
        >
          {/* For mobile: Image first */}
          {isMobile && (
            <Box className={styles.contentRightColumn}>
              <Box className={styles.productImageContainer}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
              </Box>
            </Box>
          )}

          {/* Left column with product description and comments */}
          <Flex className={styles.contentLeftColumn}>
            <ProductInfo product={product} />
            <CommentsSection
              comments={comments}
              handleCommentsChange={handleCommentsChange}
              commentChars={commentChars}
              placeholder={getCommentPlaceholder()}
            />
          </Flex>

          {/* Right column with product image (desktop only) */}
          {!isMobile && (
            <Box className={styles.contentRightColumn}>
              <Box className={styles.productImageContainer}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
              </Box>
            </Box>
          )}
        </Flex>

        <Flex className={styles.sectionBody}>
          {/* Ingredients Section */}
          {ingredientOptions.length > 0 && (
            <IngredientsSection
              showIngredients={showIngredients}
              setShowIngredients={setShowIngredients}
              ingredients={ingredients}
              handleUpdateIngredient={handleUpdateIngredient}
              maxIngredientSelections={maxIngredientSelections}
              totalSelectedIngredients={totalSelectedIngredients}
            />
          )}

          {/* Condiments Section */}
          {condimentOptions.length > 0 && (
            <CondimentsSection
              showCondiments={showCondiments}
              setShowCondiments={setShowCondiments}
              condiments={condiments}
              handleToggleCondiment={handleToggleCondiment}
              maxCondimentSelections={
                productWithCustomization?.customization
                  ?.maxCondimentSelections || 2
              }
            />
          )}
        </Flex>

        {/* Footer */}
        <ModalFooter
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          finalPrice={finalPrice}
          isMobile={isMobile}
        />
      </Box>
    </Modal>
  );
};

export default AddToCartModal;
