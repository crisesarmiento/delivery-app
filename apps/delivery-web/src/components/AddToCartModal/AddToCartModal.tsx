'use client';

import { useEffect, useState, useRef } from 'react';
import { Text, Image, Flex, Box, Button, Textarea } from '@mantine/core';
import {
  IconShoppingCart,
  IconTrash,
  IconCirclePlus,
  IconX,
  IconChevronDown,
  IconChevronUp,
  IconCircleMinus,
  IconCheck,
} from '@tabler/icons-react';
import { IProduct } from '../../types';
import styles from './AddToCartModal.module.css';
import { getProductById } from '../../mocks/products.mock';
import { CartItem } from '../../context/CartContext';

interface IngredientItem {
  name: string;
  quantity: number;
  price?: number;
}

interface AddToCartModalProps {
  product: IProduct;
  opened: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number, cartItem?: CartItem) => void;
  initialQuantity?: number;
  initialIngredients?: IngredientItem[];
  initialCondiments?: string[];
  initialComments?: string;
}

const AddToCartModal = ({
  product,
  opened,
  onClose,
  onAddToCart,
  initialQuantity = 1,
  initialIngredients,
  initialCondiments,
  initialComments,
}: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const [showCondiments, setShowCondiments] = useState(true);
  const [comments, setComments] = useState(initialComments || '');

  // Get product with customization options from mock
  const productWithCustomization = getProductById(product.id);

  // Initialize ingredients based on the product customization options
  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    initialIngredients || []
  );

  // Initialize condiments
  const [condiments, setCondiments] = useState<string[]>(
    initialCondiments || []
  );

  // For debugging - log what we're getting
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AddToCartModal - Product:', product.id, product.name);
      console.log('AddToCartModal - Initial ingredients:', initialIngredients);
      console.log('AddToCartModal - Initial condiments:', initialCondiments);
      console.log(
        'AddToCartModal - Product with customization:',
        productWithCustomization
      );
    }
  }, [
    product,
    initialIngredients,
    initialCondiments,
    productWithCustomization,
  ]);

  // Calculate if product has discount (for demo purposes)
  const hasDiscount =
    product.name.toLowerCase().includes('promo') ||
    (typeof product.id === 'number'
      ? product.id % 3 === 0
      : String(product.id).length % 3 === 0);
  const discountPercentage = hasDiscount ? 10 : 0;
  const originalPrice = hasDiscount ? (product.price * 1.1).toFixed(2) : null;

  // Set up initial ingredients and condiments from product data
  useEffect(() => {
    if (productWithCustomization && opened) {
      // Check if we're editing an existing item with customizations
      const isEditingExistingItem =
        initialIngredients && initialIngredients.length > 0;

      console.log('Is editing existing item:', isEditingExistingItem);
      console.log('Initial ingredients provided:', initialIngredients);

      // Initialize with all available options from the product
      const defaultIngredients =
        productWithCustomization.customization.ingredientOptions.map(
          (option) => {
            // For existing items being edited, use their existing customizations
            if (isEditingExistingItem) {
              // Look for this ingredient in initialIngredients
              const existingIngredient = initialIngredients.find(
                (ing) => ing.name === option.name
              );

              // If found, use its quantity, otherwise default to 0 (not selected)
              return {
                name: option.name,
                quantity:
                  existingIngredient !== undefined
                    ? existingIngredient.quantity
                    : 0,
                price: option.price,
              };
            } else {
              // For new items or a new variant, use product defaults
              return {
                name: option.name,
                quantity: option.default ? 1 : 0,
                price: option.price,
              };
            }
          }
        );

      console.log('Setting ingredients to:', defaultIngredients);
      setIngredients(defaultIngredients);

      // For condiments, similar approach
      const allCondiments =
        productWithCustomization.customization.condimentOptions.map(
          (option) => option.name
        );

      // Initialize condiments based on whether we're editing or creating new
      let selectedCondiments;

      if (isEditingExistingItem && initialCondiments) {
        // For existing items, use what's already selected
        selectedCondiments = allCondiments.filter((condimentName) =>
          initialCondiments.includes(condimentName)
        );
      } else {
        // For new items, use default selections
        selectedCondiments =
          productWithCustomization.customization.condimentOptions
            .filter((option) => option.default)
            .map((option) => option.name);
      }

      console.log('Setting condiments to:', selectedCondiments);
      setCondiments(selectedCondiments);
    }
  }, [productWithCustomization, opened, initialIngredients, initialCondiments]);

  useEffect(() => {
    console.log('AddToCartModal rendered, opened:', opened);

    // Handle click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [opened, onClose]);

  // Only set initial quantity when component mounts or initialQuantity changes or when modal opens
  useEffect(() => {
    if (opened) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity, opened]);

  if (!opened) return null;

  const handleUpdateIngredient = (index: number, change: number) => {
    const newIngredients = [...ingredients];
    const newQuantity = newIngredients[index].quantity + change;

    // Check if we have reached max ingredients selection
    const currentSelections = newIngredients.filter(
      (ing) => ing.quantity > 0
    ).length;
    const maxSelections =
      productWithCustomization?.customization?.maxIngredientSelections || 5;

    // Only allow adding if we haven't reached the max
    if (
      change > 0 &&
      newQuantity > 0 &&
      currentSelections >= maxSelections &&
      newIngredients[index].quantity === 0
    ) {
      console.log('Reached max ingredient selections');
      return;
    }

    // Check limits
    if (newQuantity >= 0) {
      // Check if there's a max quantity for this ingredient
      const ingredientOption =
        productWithCustomization?.customization?.ingredientOptions.find(
          (opt) => opt.name === newIngredients[index].name
        );
      const maxQuantity = ingredientOption?.maxQuantity || 2;

      if (newQuantity <= maxQuantity) {
        newIngredients[index].quantity = newQuantity;
        setIngredients(newIngredients);
      }
    }
  };

  const handleToggleCondiment = (condiment: string) => {
    if (condiments.includes(condiment)) {
      setCondiments(condiments.filter((c) => c !== condiment));
    } else {
      // Check if we've reached the max condiment selections
      const maxCondiments =
        productWithCustomization?.customization?.maxCondimentSelections || 3;
      if (condiments.length < maxCondiments) {
        setCondiments([...condiments, condiment]);
      }
    }
  };

  const handleAddToCart = () => {
    // Get selected ingredients and condiments
    const selectedIngredients = ingredients.filter((ing) => ing.quantity > 0);

    // Create cart item with customizations
    const cartItem: CartItem = {
      product,
      quantity,
      ingredients: selectedIngredients,
      condiments,
      comments: comments.trim() || undefined,
      totalPrice: calculateTotalPrice(),
    };

    // Pass the cartItem to the parent component
    onAddToCart(quantity, cartItem);
  };

  // Comments handler
  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComments(event.currentTarget.value);
    const currentLength = event.currentTarget.value.length;
    const commentCounter = document.getElementById('commentCounter');
    if (commentCounter) {
      commentCounter.innerText = `${currentLength}/100`;
    }
  };

  // Calculate total price including ingredients
  const calculateTotalPrice = () => {
    const basePrice = product.price;
    const ingredientsPrice = ingredients
      .filter((ing) => ing.quantity > 0)
      .reduce((sum, ing) => sum + (ing.price || 0) * ing.quantity, 0);

    return (basePrice + ingredientsPrice) * quantity;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div ref={modalRef} className={styles.modalContent}>
          {/* Black header - fixed */}
          <div className={styles.modalHeader}>
            {hasDiscount && (
              <div className={styles.discountBadge}>
                {discountPercentage}% OFF
              </div>
            )}
            <IconX onClick={onClose} className={styles.closeButton} />
            <Text className={styles.modalTitle}>Armala como quieras</Text>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text className={styles.modalPrice}>
                ${product.price.toFixed(2)}
              </Text>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                {hasDiscount && originalPrice && (
                  <Text className={styles.modalOriginalPrice}>
                    ${originalPrice}
                  </Text>
                )}
              </Box>
            </Box>
          </div>

          {/* Content area */}
          <div className={styles.container}>
            {/* Product image and basic info section */}
            <div className={styles.topSection}>
              {/* Basic product info on the left */}
              <Box className={styles.contentContainer}>
                <div className={styles.fixedProductInfo}>
                  <Text className={styles.productIngredients}>
                    {product.ingredients}
                  </Text>
                  <Text className={styles.additionalInfo}>
                    En comentarios, aclaranos si lo preferis sin chimi. Gracias!
                  </Text>

                  {productWithCustomization?.customization?.allowComments && (
                    <Box className={styles.commentInput}>
                      <Text className={styles.commentLabel}>Comentarios</Text>
                      <Textarea
                        placeholder=""
                        maxLength={100}
                        autosize={false}
                        value={comments}
                        onChange={handleCommentsChange}
                      />
                      <Text
                        id="commentCounter"
                        className={styles.commentCounter}
                      >
                        {comments.length}/100
                      </Text>
                    </Box>
                  )}
                </div>
              </Box>

              {/* Product image on the right */}
              <Box className={styles.imageContainer}>
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className={styles.productImage}
                  />
                )}
              </Box>
            </div>

            {/* Scrollable sections - full width */}
            <div className={styles.scrollableContent}>
              {/* Ingredients section */}
              {(productWithCustomization?.customization?.ingredientOptions
                ?.length ?? 0) > 0 && (
                <Box mb={20}>
                  <Box
                    className={styles.sectionHeader}
                    onClick={() => setShowIngredients(!showIngredients)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Text className={styles.sectionTitle}>
                      Elige hasta{' '}
                      {productWithCustomization?.customization
                        ?.maxIngredientSelections || 5}{' '}
                      Ingredientes
                    </Text>
                    {showIngredients ? (
                      <IconChevronUp size={24} stroke={1.5} />
                    ) : (
                      <IconChevronDown size={24} stroke={1.5} />
                    )}
                  </Box>

                  {showIngredients && (
                    <>
                      {ingredients.map((ingredient, index) => {
                        // Create stable unique key for each ingredient
                        const ingredientKey = `ingredient-${ingredient.name.replace(
                          /\s+/g,
                          '-'
                        )}-${index}`;

                        return (
                          <Box key={ingredientKey}>
                            <Box className={styles.ingredientRow}>
                              <Text className={styles.ingredientName}>
                                {ingredient.name}
                              </Text>

                              {ingredient.price && (
                                <Box className={styles.priceTag}>
                                  + ${ingredient.price.toLocaleString()}
                                </Box>
                              )}

                              <Box className={styles.quantityControl}>
                                <IconCircleMinus
                                  size={18}
                                  stroke={1.5}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    handleUpdateIngredient(index, -1)
                                  }
                                />
                                <Text className={styles.quantityText}>
                                  {ingredient.quantity}
                                </Text>
                                <IconCirclePlus
                                  size={18}
                                  stroke={1.5}
                                  style={{
                                    cursor: 'pointer',
                                    background:
                                      ingredient.quantity > 0
                                        ? '#B3FF00'
                                        : 'transparent',
                                    borderRadius: '50%',
                                  }}
                                  onClick={() =>
                                    handleUpdateIngredient(index, 1)
                                  }
                                />
                              </Box>
                            </Box>
                            {index < ingredients.length - 1 && (
                              <hr className={styles.ingredientDivider} />
                            )}
                          </Box>
                        );
                      })}
                    </>
                  )}
                </Box>
              )}

              {/* Condiments section */}
              {(productWithCustomization?.customization?.condimentOptions
                ?.length ?? 0) > 0 && (
                <Box mb={20}>
                  <Box
                    className={styles.sectionHeader}
                    onClick={() => setShowCondiments(!showCondiments)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Text className={styles.sectionTitle}>
                      Elige{' '}
                      {productWithCustomization?.customization
                        ?.maxCondimentSelections || 3}{' '}
                      Aderezos
                    </Text>
                    {showCondiments ? (
                      <IconChevronUp size={24} stroke={1.5} />
                    ) : (
                      <IconChevronDown size={24} stroke={1.5} />
                    )}
                  </Box>

                  {showCondiments && (
                    <>
                      {productWithCustomization?.customization?.condimentOptions.map(
                        (condiment, index) => {
                          // Create stable unique key for each condiment
                          const condimentKey = `condiment-${
                            condiment.id || condiment.name.replace(/\s+/g, '-')
                          }-${index}`;

                          return (
                            <Box key={condimentKey}>
                              <Box className={styles.ingredientRow}>
                                <Text className={styles.ingredientName}>
                                  {condiment.name}
                                </Text>
                                <Box
                                  className={`${styles.checkbox} ${
                                    condiments.includes(condiment.name)
                                      ? styles.checkedBox
                                      : ''
                                  }`}
                                  onClick={() =>
                                    handleToggleCondiment(condiment.name)
                                  }
                                  style={{ cursor: 'pointer' }}
                                >
                                  {condiments.includes(condiment.name) && (
                                    <IconCheck
                                      size={16}
                                      stroke={1.5}
                                      color="#000000"
                                    />
                                  )}
                                </Box>
                              </Box>
                              {index <
                                (productWithCustomization?.customization
                                  ?.condimentOptions.length || 0) -
                                  1 && (
                                <hr className={styles.ingredientDivider} />
                              )}
                            </Box>
                          );
                        }
                      )}
                    </>
                  )}
                </Box>
              )}
            </div>
          </div>

          {/* Footer with action buttons - fixed */}
          <div className={styles.footerContainer}>
            <Flex className={styles.footerActions}>
              <div className={styles.quantityControlWrapper}>
                {quantity <= 1 ? (
                  <IconTrash
                    size={26}
                    stroke={1.5}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setQuantity(0);
                      onAddToCart(0);
                      onClose();
                    }}
                  />
                ) : (
                  <IconCircleMinus
                    size={26}
                    stroke={1.5}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setQuantity(quantity - 1)}
                  />
                )}
                <Text fw={600}>{quantity}</Text>
                <IconCirclePlus
                  size={26}
                  stroke={1.5}
                  style={{
                    background: '#B3FF00',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </div>

              <Button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                <div className={styles.addToCartContent}>
                  <div className={styles.addToCartLeft}>
                    <IconShoppingCart size={24} color="#B3FF00" />
                    <Text className={styles.addToCartText}>
                      Agregar al carrito
                    </Text>
                  </div>
                  <div className={styles.addToCartRight}>
                    <Text className={styles.subtotalText}>
                      Subtotal: ${calculateTotalPrice().toFixed(2)}
                    </Text>
                  </div>
                </div>
              </Button>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
