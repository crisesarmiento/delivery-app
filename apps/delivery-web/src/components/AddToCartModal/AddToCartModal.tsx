'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import {
  Text,
  Image,
  Flex,
  Box,
  Button,
  Textarea,
  Checkbox,
} from '@mantine/core';
import {
  IconShoppingCart,
  IconX,
  IconChevronDown,
  IconChevronUp,
  IconCircleMinus,
  IconCirclePlus,
  IconTrash,
} from '@tabler/icons-react';
import { IProduct } from '../../types';
import styles from './AddToCartModal.module.css';
import { getProductById } from '../../mocks/products.mock';
import { CartItem } from '../../context/CartContext';
import { PRODUCT_TEXTS, MODAL_TEXTS } from '../../config/constants';

interface IngredientItem {
  name: string;
  quantity: number;
  price?: number;
}

interface CondimentItem {
  name: string;
  selected: boolean;
}

interface AddToCartModalProps {
  product: IProduct;
  opened: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
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
  initialCondiments = [],
  initialComments,
}: AddToCartModalProps) => {
  // Add a ref to track initialization
  const isInitialized = useRef(false);

  const [quantity, setQuantity] = useState(initialQuantity);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const [showCondiments, setShowCondiments] = useState(true);
  const [comments, setComments] = useState(initialComments || '');
  const [commentChars, setCommentChars] = useState(
    initialComments ? initialComments.length : 0
  );

  // Log when dropdown sections are toggled
  useEffect(() => {
    if (modalRef.current) {
      console.log('Ingredients section expanded:', showIngredients);
    }
  }, [showIngredients]);

  // Get product with customization options from mock using useMemo
  const productWithCustomization = useMemo(
    () => getProductById(product.id),
    [product.id]
  );

  // Memoize discount calculations to prevent recalculations on every render
  const { hasDiscount, discountPercentage, originalPrice, discountedPrice } =
    useMemo(() => {
      const hasDiscount =
        product.name.toLowerCase().includes('promo') ||
        (typeof product.id === 'number'
          ? product.id % 3 === 0
          : String(product.id).length % 3 === 0);
      const discountPercentage = hasDiscount ? 20 : 0;
      const originalPrice = hasDiscount ? product.price * 1.2 : null;
      const discountedPrice = hasDiscount ? product.price : product.price;

      return {
        hasDiscount,
        discountPercentage,
        originalPrice,
        discountedPrice,
      };
    }, [product.name, product.id, product.price]);

  // Memoize ingredient and condiment options
  const { ingredientOptions, condimentOptions } = useMemo(() => {
    return {
      ingredientOptions:
        productWithCustomization?.customization?.ingredientOptions || [],
      condimentOptions:
        productWithCustomization?.customization?.condimentOptions || [],
    };
  }, [productWithCustomization]);

  // Initialize ingredients based on the product customization options with default empty array
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [condiments, setCondiments] = useState<CondimentItem[]>([]);

  // Initialize only when modal is opened and not already initialized
  useEffect(() => {
    if (!opened || !productWithCustomization || isInitialized.current) {
      return;
    }

    // Set initialized ref to true to prevent re-initialization
    isInitialized.current = true;

    // Check if we're editing an existing item with customizations
    const isEditingExistingItem =
      initialIngredients && initialIngredients.length > 0;

    // Initialize with all available options from the product
    if (productWithCustomization.customization?.ingredientOptions) {
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

      setIngredients(defaultIngredients);
    }

    // Initialize condiments
    if (productWithCustomization.customization?.condimentOptions) {
      const defaultCondiments =
        productWithCustomization.customization.condimentOptions.map(
          (condiment) => ({
            name: condiment.name,
            selected: initialCondiments.includes(condiment.name),
          })
        );
      setCondiments(defaultCondiments);
    }
  }, [opened, productWithCustomization, initialIngredients, initialCondiments]);

  // Reset the initialization when the modal closes
  useEffect(() => {
    if (!opened) {
      isInitialized.current = false;
    }
  }, [opened]);

  // Handle click outside to close
  useEffect(() => {
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

  // Only set initial quantity when component mounts or initialQuantity changes
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

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

  const handleToggleCondiment = (index: number) => {
    const newCondiments = [...condiments];

    // Toggle the selected state
    newCondiments[index].selected = !newCondiments[index].selected;

    // Check if we've hit the max allowed condiments
    const selectedCount = newCondiments.filter((c) => c.selected).length;
    const maxCondiments =
      productWithCustomization?.customization?.maxCondimentSelections || 3;

    // If too many selected, revert the change
    if (selectedCount > maxCondiments) {
      newCondiments[index].selected = !newCondiments[index].selected;
      alert(`Solo puedes elegir ${maxCondiments} aderezos`);
      return;
    }

    setCondiments(newCondiments);
  };

  const handleAddToCart = () => {
    // Get selected ingredients and condiments
    const selectedIngredients = ingredients.filter((ing) => ing.quantity > 0);

    // Create cart item with customizations
    const cartItem: CartItem = {
      product,
      quantity,
      uniqueId: Date.now().toString(), // Generate a unique ID for this customization
      customizations: {
        ingredients: ingredients.filter((ing) => ing.quantity > 0),
        condiments: condiments.filter((c) => c.selected).map((c) => c.name),
        comments,
      },
    };

    onAddToCart(cartItem.quantity);
  };

  // Comments handler
  const handleCommentsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setComments(newValue);
    setCommentChars(newValue.length);
  };

  // Calculate total price including customizations
  const calculateTotalPrice = () => {
    let total = hasDiscount ? discountedPrice : product.price;

    // Add cost of extra ingredients with price
    if (ingredients.length > 0) {
      ingredients.forEach((ing) => {
        if (ing.quantity > 0 && ing.price) {
          total += ing.price;
        }
      });
    }

    return total * quantity;
  };

  // Get the final price
  const finalPrice = calculateTotalPrice();

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          <IconX size={18} />
        </button>

        {/* Header section with black background */}
        <div className={styles.modalHeader}>
          {hasDiscount && <div className={styles.discountBadge}>20% OFF</div>}

          <Text className={styles.modalTitle}>{product.name}</Text>

          <div className={styles.priceContainer}>
            <Text className={styles.currentPrice}>
              ${discountedPrice.toFixed(2)}
            </Text>
            {hasDiscount && originalPrice && (
              <Text className={styles.originalPrice}>
                ${originalPrice.toFixed(2)}
              </Text>
            )}
          </div>
        </div>

        <div className={styles.modalBody}>
          {/* Top section with content in two columns */}
          <Flex className={styles.contentTopSection}>
            {/* Left column with product description and comments */}
            <Flex className={styles.contentLeftColumn}>
              {/* Product Description */}
              <Flex className={styles.productInfo}>
                <Box className={styles.productDescription}>
                  {product.description}
                </Box>
                <Box className={styles.helperText}>
                  {MODAL_TEXTS.CUSTOMIZE_HELPER_TEXT}
                </Box>
              </Flex>

              {/* Comments Section */}
              <Box className={styles.commentsContainer}>
                <Text className={styles.sectionLabel}>Comentarios</Text>
                <Textarea
                  placeholder="Instrucciones especiales, alergias, etc."
                  value={comments}
                  onChange={handleCommentsChange}
                  maxLength={100}
                  className={styles.commentTextarea}
                />
                <Text size="xs" className={styles.charCount}>
                  {commentChars}/100
                </Text>
              </Box>
            </Flex>

            {/* Right column with product image */}
            <Box className={styles.contentRightColumn}>
              <Box className={styles.productImageContainer}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImage}
                />
              </Box>
            </Box>
          </Flex>

          {/* Ingredients Section - Placed below the top section */}
          {ingredientOptions.length > 0 && (
            <Flex className={styles.section}>
              <Flex
                className={styles.sectionHeader}
                onClick={() => setShowIngredients(!showIngredients)}
              >
                <Text className={styles.sectionHeaderText}>
                  Elige hasta 5 Ingredientes
                </Text>
                {showIngredients ? (
                  <IconChevronUp size={24} />
                ) : (
                  <IconChevronDown size={24} />
                )}
              </Flex>

              {showIngredients && (
                <Flex className={styles.ingredientsList}>
                  {ingredients.map((ingredient, index) => (
                    <Flex
                      key={ingredient.name}
                      className={styles.ingredientItem}
                    >
                      <Text className={styles.ingredientName}>
                        {ingredient.name}
                      </Text>

                      {ingredient.price && (
                        <Text className={styles.priceTag}>
                          +${ingredient.price}
                        </Text>
                      )}

                      <Flex className={styles.quantityControl}>
                        <IconCircleMinus
                          size={18}
                          className={`${styles.iconButton} ${
                            ingredient.quantity <= 0 ? styles.iconDisabled : ''
                          }`}
                          onClick={() => handleUpdateIngredient(index, -1)}
                        />
                        <Text className={styles.quantityValue}>
                          {ingredient.quantity}
                        </Text>
                        <IconCirclePlus
                          size={18}
                          className={styles.iconButtonAdd}
                          onClick={() => handleUpdateIngredient(index, 1)}
                        />
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              )}
            </Flex>
          )}

          {/* Condiments Section */}
          {condimentOptions.length > 0 && (
            <Flex className={styles.section}>
              <Flex
                className={styles.sectionHeader}
                onClick={() => setShowCondiments(!showCondiments)}
              >
                <Text className={styles.sectionHeaderText}>
                  Elige 3 Aderezos
                </Text>
                {showCondiments ? (
                  <IconChevronUp size={24} />
                ) : (
                  <IconChevronDown size={24} />
                )}
              </Flex>

              {showCondiments && (
                <Flex className={styles.condimentsList}>
                  {condiments.map((condiment, index) => (
                    <Flex key={condiment.name} className={styles.condimentItem}>
                      <Text className={styles.condimentName}>
                        {condiment.name}
                      </Text>

                      <Checkbox
                        checked={condiment.selected}
                        onChange={() => handleToggleCondiment(index)}
                        className={styles.condimentCheckbox}
                        styles={{
                          input: {
                            backgroundColor: condiment.selected
                              ? '#B3FF00'
                              : 'transparent',
                            borderColor: condiment.selected
                              ? '#B3FF00'
                              : '#939393',
                          },
                        }}
                      />
                    </Flex>
                  ))}
                </Flex>
              )}
            </Flex>
          )}

          {/* Quantity Controls */}
          <Flex className={styles.quantityControls}>
            <IconTrash
              size={26}
              className={styles.trashIcon}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            />
            <Text className={styles.quantityControlValue}>{quantity}</Text>
            <IconCirclePlus
              size={26}
              className={styles.iconButtonAdd}
              onClick={() => setQuantity(quantity + 1)}
            />
          </Flex>

          {/* Footer always at the bottom of the modal body */}
          <div className={styles.footer}>
            <Button
              leftSection={<IconShoppingCart size={24} />}
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              {PRODUCT_TEXTS.ADD_TO_CART}
            </Button>
            <Text className={styles.subtotalText}>
              Subtotal: ${finalPrice.toFixed(2)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
