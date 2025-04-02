'use client';

import { useEffect, useState, useRef } from 'react';
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
  initialCondiments = [],
  initialComments,
}: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const [showCondiments, setShowCondiments] = useState(true);
  const [comments, setComments] = useState(initialComments || '');
  const [commentChars, setCommentChars] = useState(0);

  // Get product with customization options from mock
  const productWithCustomization = getProductById(product.id);

  // Initialize ingredients based on the product customization options
  const [ingredients, setIngredients] = useState<IngredientItem[]>(
    initialIngredients || []
  );

  // Initialize condiments
  const [condiments, setCondiments] = useState<CondimentItem[]>([]);

  // Calculate if product has discount (for demo purposes)
  const hasDiscount =
    product.name.toLowerCase().includes('promo') ||
    (typeof product.id === 'number'
      ? product.id % 3 === 0
      : String(product.id).length % 3 === 0);
  const discountPercentage = hasDiscount ? 20 : 0;
  const originalPrice = hasDiscount ? product.price * 1.2 : null;
  const discountedPrice = hasDiscount ? product.price : product.price;

  // Set up initial ingredients and condiments from product data
  useEffect(() => {
    if (productWithCustomization && opened) {
      // Check if we're editing an existing item with customizations
      const isEditingExistingItem =
        initialIngredients && initialIngredients.length > 0;

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

      setIngredients(defaultIngredients);

      // Initialize condiments
      if (productWithCustomization.customization.condimentOptions) {
        const defaultCondiments =
          productWithCustomization.customization.condimentOptions.map(
            (condiment) => ({
              name: condiment.name,
              selected: initialCondiments.includes(condiment.name),
            })
          );
        setCondiments(defaultCondiments);
      }
    }
  }, [productWithCustomization, opened, initialIngredients, initialCondiments]);

  useEffect(() => {
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
      productWithCustomization?.customization?.maxIngredientSelections || 2;

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
      productWithCustomization?.customization?.maxCondimentSelections || 2;

    // If too many selected, revert the change
    if (selectedCount > maxCondiments) {
      newCondiments[index].selected = !newCondiments[index].selected;
      alert(`Solo puedes elegir ${maxCondiments} aderezos`);
      return;
    }

    setCondiments(newCondiments);
  };

  const handleAddToCart = () => {
    // Create a new cart item with all customizations
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

    onAddToCart(quantity, cartItem);
  };

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

  // Convert customization options to arrays for UI rendering
  const ingredientOptions =
    productWithCustomization?.customization?.ingredientOptions || [];
  const condimentOptions =
    productWithCustomization?.customization?.condimentOptions || [];

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          <IconX size={20} />
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
          {/* Product Description & Image */}
          <div className={styles.productInfo}>
            <Text className={styles.productDescription}>
              {product.description}
            </Text>
            <Text className={styles.helperText}>
              {MODAL_TEXTS.CUSTOMIZE_HELPER_TEXT}
            </Text>
          </div>

          <Box className={styles.productImageContainer}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
              width={256}
              height={288}
            />
          </Box>

          {/* Comments Section */}
          <div className={styles.commentsContainer}>
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
          </div>

          {/* Ingredients Section */}
          {ingredientOptions.length > 0 && (
            <div className={styles.section}>
              <div
                className={styles.sectionHeader}
                onClick={() => setShowIngredients(!showIngredients)}
              >
                <Text className={styles.sectionHeaderText}>
                  Elige hasta{' '}
                  {productWithCustomization?.customization
                    ?.maxIngredientSelections || 2}{' '}
                  Ingredientes
                </Text>
                {showIngredients ? (
                  <IconChevronUp size={24} />
                ) : (
                  <IconChevronDown size={24} />
                )}
              </div>

              {showIngredients && (
                <div className={styles.ingredientsList}>
                  {ingredients.map((ingredient, index) => (
                    <div
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

                      <div className={styles.quantityControl}>
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
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Condiments Section */}
          {condimentOptions.length > 0 && (
            <div className={styles.section}>
              <div
                className={styles.sectionHeader}
                onClick={() => setShowCondiments(!showCondiments)}
              >
                <Text className={styles.sectionHeaderText}>
                  Elige{' '}
                  {productWithCustomization?.customization
                    ?.maxCondimentSelections || 2}{' '}
                  Aderezos
                </Text>
                {showCondiments ? (
                  <IconChevronUp size={24} />
                ) : (
                  <IconChevronDown size={24} />
                )}
              </div>

              {showCondiments && (
                <div className={styles.condimentsList}>
                  {condiments.map((condiment, index) => (
                    <div key={condiment.name} className={styles.condimentItem}>
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quantity Controls */}
          <div className={styles.quantityControls}>
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
          </div>
        </div>

        {/* Footer with Add to Cart button */}
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
  );
};

export default AddToCartModal;
