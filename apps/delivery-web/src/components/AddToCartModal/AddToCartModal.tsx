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
  IconArrowLeft,
  IconMinus,
  IconPlus,
} from '@tabler/icons-react';
import { IProduct } from '../../types';
import styles from './AddToCartModal.module.css';
import { getProductById } from '../../mocks/products.mock';
import { CartItem } from '../../context/CartContext';
import { PRODUCT_TEXTS, COMMON_TEXTS } from '../../config/constants';

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
  const [isMobile, setIsMobile] = useState(false);
  const [commentChars, setCommentChars] = useState(0);

  // Detect if on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Calculate if product has discount (for demo purposes)
  const hasDiscount =
    product.name.toLowerCase().includes('promo') ||
    (typeof product.id === 'number'
      ? product.id % 3 === 0
      : String(product.id).length % 3 === 0);
  const discountPercentage = hasDiscount ? 20 : 0;
  const originalPrice = hasDiscount ? (product.price * 1.2).toFixed(2) : null;

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

      setCondiments(selectedCondiments);
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
    // Create a new cart item with all customizations
    const cartItem: CartItem = {
      product,
      quantity,
      uniqueId: Date.now().toString(), // Generate a unique ID for this customization
      customizations: {
        ingredients: ingredients.filter((ing) => ing.quantity > 0),
        condiments,
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
    let total = product.price;

    // Add cost of extra ingredients
    if (ingredients.length > 0) {
      ingredients.forEach((ing) => {
        if (ing.quantity > 0 && ing.price) {
          // First ingredient is often included in base price
          // Extra quantities of the same ingredient are charged
          const extraQuantity = ing.quantity - 1;
          if (extraQuantity > 0) {
            total += extraQuantity * ing.price;
          }
        }
      });
    }

    return total * quantity;
  };

  // Calculate final price with any discounts applied
  const finalPrice = hasDiscount
    ? calculateTotalPrice() * (1 - discountPercentage / 100)
    : calculateTotalPrice();

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
        {/* Header with black background */}
        <div className={styles.modalHeader}>
          {hasDiscount && (
            <span className={styles.discountBadge}>
              {discountPercentage}% OFF
            </span>
          )}

          <div className={styles.headerTopRow}>
            <div className={styles.headerControls}>
              {isMobile && (
                <button
                  className={styles.backButton}
                  onClick={onClose}
                  aria-label="Back"
                >
                  <IconArrowLeft size={20} />
                </button>
              )}
            </div>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              <IconX size={20} />
            </button>
          </div>

          <h2 className={styles.modalTitle}>{product.name}</h2>

          <div className={styles.headerPrice}>
            <span className={styles.currentPrice}>
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && originalPrice && (
              <span className={styles.originalPrice}>${originalPrice}</span>
            )}
          </div>
        </div>

        <div className={styles.modalBody}>
          {/* Product Description & Image */}
          <div className={styles.productPreview}>
            <div className={styles.productInfo}>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productNote}>
                En comentarios, aclaranos si lo preferis sin chimi. Gracias!
              </p>
            </div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
            />
          </div>

          {/* Comments Section */}
          <div className={styles.commentsSection}>
            <div className={styles.commentsLabel}>Comentarios</div>
            <textarea
              className={styles.comments}
              placeholder="Instrucciones especiales, alergias, etc."
              value={comments}
              onChange={handleCommentsChange}
              maxLength={100}
            />
            <div className={styles.commentCount}>{commentChars}/100</div>
          </div>

          {/* Ingredients Section - Collapsible */}
          {ingredientOptions.length > 0 && (
            <div className={styles.customizationSection}>
              <div className={styles.sectionHeader}>
                <div
                  className={styles.sectionTitleWithIcon}
                  onClick={() => setShowIngredients(!showIngredients)}
                >
                  <h3 className={styles.sectionTitle}>
                    Elige hasta 2 Ingredientes
                  </h3>
                  {showIngredients ? (
                    <IconChevronUp size={20} />
                  ) : (
                    <IconChevronDown size={20} />
                  )}
                </div>
              </div>

              {showIngredients && (
                <div className={styles.ingredientsList}>
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={ingredient.name}
                      className={styles.ingredientItem}
                    >
                      <div>
                        {ingredient.name}
                        {ingredient.price && (
                          <span className={styles.priceTag}>
                            +${ingredient.price}
                          </span>
                        )}
                      </div>

                      <div className={styles.ingredientQuantity}>
                        <IconCircleMinus
                          size={18}
                          onClick={() => handleUpdateIngredient(index, -1)}
                          style={{
                            cursor: 'pointer',
                            opacity: ingredient.quantity <= 0 ? 0.5 : 1,
                          }}
                        />
                        <span>{ingredient.quantity}</span>
                        <IconCirclePlus
                          size={18}
                          onClick={() => handleUpdateIngredient(index, 1)}
                          style={{
                            cursor: 'pointer',
                            color: '#000',
                            background: '#B3FF00',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Condiments Section - Collapsible */}
          {condimentOptions.length > 0 && (
            <div className={styles.customizationSection}>
              <div className={styles.sectionHeader}>
                <div
                  className={styles.sectionTitleWithIcon}
                  onClick={() => setShowCondiments(!showCondiments)}
                >
                  <h3 className={styles.sectionTitle}>Elige 2 Aderezos</h3>
                  {showCondiments ? (
                    <IconChevronUp size={20} />
                  ) : (
                    <IconChevronDown size={20} />
                  )}
                </div>
              </div>

              {showCondiments && (
                <div className={styles.condimentsList}>
                  {condimentOptions.map((condiment, index) => (
                    <div
                      key={condiment.name}
                      className={`${styles.condimentItem} ${
                        condiments.includes(condiment.name)
                          ? styles.condimentSelected
                          : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={`condiment-${index}`}
                        className={styles.checkbox}
                        checked={condiments.includes(condiment.name)}
                        onChange={() => handleToggleCondiment(condiment.name)}
                      />
                      <label
                        htmlFor={`condiment-${index}`}
                        className={styles.condimentName}
                      >
                        {condiment.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quantity controls */}
          <div className={styles.quantityControls}>
            <IconTrash
              size={26}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              style={{ cursor: 'pointer' }}
            />
            <span className={styles.quantityValue}>{quantity}</span>
            <IconCirclePlus
              size={26}
              onClick={() => setQuantity(quantity + 1)}
              style={{
                cursor: 'pointer',
                color: '#000',
                background: '#B3FF00',
                borderRadius: '50%',
              }}
            />
          </div>
        </div>

        {/* Footer with Add to Cart button */}
        <div className={styles.footer}>
          <button className={styles.addButton} onClick={handleAddToCart}>
            <IconShoppingCart size={20} />
            {PRODUCT_TEXTS.ADD_TO_CART}
          </button>
          <span className={styles.subtotalText}>
            Subtotal: ${finalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
