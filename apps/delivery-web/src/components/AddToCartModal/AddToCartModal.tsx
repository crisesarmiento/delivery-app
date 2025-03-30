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
    setComments(event.target.value);
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
    <Box
      className={styles.modalOverlay}
      data-testid="add-to-cart-modal-overlay"
    >
      <Box
        ref={modalRef}
        className={styles.modalContent}
        data-testid="add-to-cart-modal"
      >
        {/* Modal header */}
        <Flex
          className={styles.modalHeader}
          data-testid="add-to-cart-modal-header"
        >
          <Text
            className={styles.modalTitle}
            data-testid="add-to-cart-modal-title"
          >
            {product.name}
          </Text>
          <Button
            onClick={onClose}
            className={styles.closeButton}
            variant="subtle"
            p={0}
            data-testid="add-to-cart-modal-close-button"
          >
            <IconX size={20} stroke={1.5} />
          </Button>
        </Flex>

        {/* Product preview and info */}
        <Flex
          className={styles.productPreview}
          data-testid="add-to-cart-modal-product-preview"
        >
          <Image
            src={product.imageUrl || '/images/product-placeholder.png'}
            alt={product.name}
            className={styles.productImage}
            data-testid="add-to-cart-modal-product-image"
          />
          <Box
            className={styles.productInfo}
            data-testid="add-to-cart-modal-product-info"
          >
            <Text
              className={styles.productDescription}
              data-testid="add-to-cart-modal-product-description"
            >
              {product.description || 'Sin descripción'}
            </Text>
            <Flex
              className={styles.priceContainer}
              data-testid="add-to-cart-modal-price-container"
            >
              {hasDiscount && originalPrice && (
                <Text
                  className={styles.originalPrice}
                  data-testid="add-to-cart-modal-original-price"
                >
                  ${originalPrice}
                </Text>
              )}
              <Text
                className={styles.currentPrice}
                data-testid="add-to-cart-modal-current-price"
              >
                ${product.price.toFixed(2)}
              </Text>
            </Flex>
          </Box>
        </Flex>

        {/* Quantity controls */}
        <Flex
          className={styles.quantityControls}
          data-testid="add-to-cart-modal-quantity-controls"
        >
          <Text
            className={styles.sectionLabel}
            data-testid="add-to-cart-modal-quantity-label"
          >
            Cantidad
          </Text>
          <Flex
            className={styles.quantityButtonGroup}
            data-testid="add-to-cart-modal-quantity-buttons"
          >
            <Button
              variant="outline"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className={styles.quantityButton}
              disabled={quantity <= 1}
              data-testid="add-to-cart-modal-quantity-decrement"
            >
              <IconCircleMinus size={20} stroke={1.5} />
            </Button>
            <Text
              className={styles.quantityDisplay}
              data-testid="add-to-cart-modal-quantity-value"
            >
              {quantity}
            </Text>
            <Button
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
              className={styles.quantityButton}
              data-testid="add-to-cart-modal-quantity-increment"
            >
              <IconCirclePlus size={20} stroke={1.5} />
            </Button>
          </Flex>
        </Flex>

        {/* Ingredients section */}
        {ingredientOptions.length > 0 && (
          <Box
            className={styles.customizationSection}
            data-testid="add-to-cart-modal-ingredients-section"
          >
            <Flex
              className={styles.sectionHeader}
              onClick={() => setShowIngredients(!showIngredients)}
              data-testid="add-to-cart-modal-ingredients-header"
            >
              <Text className={styles.sectionLabel}>Ingredientes</Text>
              <Button
                variant="subtle"
                p={0}
                className={styles.toggleButton}
                data-testid="add-to-cart-modal-ingredients-toggle"
              >
                {showIngredients ? (
                  <IconChevronUp size={20} stroke={1.5} />
                ) : (
                  <IconChevronDown size={20} stroke={1.5} />
                )}
              </Button>
            </Flex>

            {showIngredients && (
              <Box
                className={styles.ingredientsList}
                data-testid="add-to-cart-modal-ingredients-list"
              >
                {ingredients.map((ingredient, index) => (
                  <Flex
                    key={ingredient.name}
                    className={styles.ingredientItem}
                    data-testid={`add-to-cart-modal-ingredient-${index}`}
                  >
                    <Text
                      className={styles.ingredientName}
                      data-testid={`add-to-cart-modal-ingredient-name-${index}`}
                    >
                      {ingredient.name}
                      {ingredient.price ? ` (+$${ingredient.price})` : ''}
                    </Text>
                    <Flex
                      className={styles.ingredientControls}
                      data-testid={`add-to-cart-modal-ingredient-controls-${index}`}
                    >
                      <Button
                        variant="subtle"
                        p={0}
                        onClick={() => handleUpdateIngredient(index, -1)}
                        disabled={ingredient.quantity <= 0}
                        className={styles.ingredientButton}
                        data-testid={`add-to-cart-modal-ingredient-decrement-${index}`}
                      >
                        {ingredient.quantity <= 0 ? (
                          <IconCircleMinus
                            size={20}
                            stroke={1.5}
                            opacity={0.5}
                          />
                        ) : (
                          <IconCircleMinus size={20} stroke={1.5} />
                        )}
                      </Button>
                      <Text
                        className={styles.ingredientQuantity}
                        data-testid={`add-to-cart-modal-ingredient-quantity-${index}`}
                      >
                        {ingredient.quantity}
                      </Text>
                      <Button
                        variant="subtle"
                        p={0}
                        onClick={() => handleUpdateIngredient(index, 1)}
                        className={styles.ingredientButton}
                        data-testid={`add-to-cart-modal-ingredient-increment-${index}`}
                      >
                        <IconCirclePlus size={20} stroke={1.5} />
                      </Button>
                    </Flex>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Condiments section */}
        {condimentOptions.length > 0 && (
          <Box
            className={styles.customizationSection}
            data-testid="add-to-cart-modal-condiments-section"
          >
            <Flex
              className={styles.sectionHeader}
              onClick={() => setShowCondiments(!showCondiments)}
              data-testid="add-to-cart-modal-condiments-header"
            >
              <Text className={styles.sectionLabel}>Condimentos</Text>
              <Button
                variant="subtle"
                p={0}
                className={styles.toggleButton}
                data-testid="add-to-cart-modal-condiments-toggle"
              >
                {showCondiments ? (
                  <IconChevronUp size={20} stroke={1.5} />
                ) : (
                  <IconChevronDown size={20} stroke={1.5} />
                )}
              </Button>
            </Flex>

            {showCondiments && (
              <Box
                className={styles.condimentsList}
                data-testid="add-to-cart-modal-condiments-list"
              >
                {condimentOptions.map((condiment, index) => (
                  <Flex
                    key={condiment.name}
                    className={`${styles.condimentItem} ${
                      condiments.includes(condiment.name)
                        ? styles.condimentSelected
                        : ''
                    }`}
                    onClick={() => handleToggleCondiment(condiment.name)}
                    data-testid={`add-to-cart-modal-condiment-${index}`}
                  >
                    <Text
                      className={styles.condimentName}
                      data-testid={`add-to-cart-modal-condiment-name-${index}`}
                    >
                      {condiment.name}
                    </Text>
                    <Box
                      className={styles.checkBox}
                      data-testid={`add-to-cart-modal-condiment-checkbox-${index}`}
                    >
                      {condiments.includes(condiment.name) && (
                        <IconCheck size={16} stroke={2} />
                      )}
                    </Box>
                  </Flex>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Comments section */}
        <Box
          className={styles.commentsSection}
          data-testid="add-to-cart-modal-comments-section"
        >
          <Text
            className={styles.sectionLabel}
            data-testid="add-to-cart-modal-comments-label"
          >
            Comentarios adicionales
          </Text>
          <Textarea
            placeholder="Instrucciones especiales, alergias, etc."
            value={comments}
            onChange={handleCommentsChange}
            className={styles.commentsInput}
            minRows={2}
            maxRows={4}
            data-testid="add-to-cart-modal-comments-input"
          />
        </Box>

        {/* Total price and add to cart button */}
        <Flex className={styles.footer} data-testid="add-to-cart-modal-footer">
          <Box
            className={styles.totalPrice}
            data-testid="add-to-cart-modal-total-price"
          >
            <Text
              className={styles.totalLabel}
              data-testid="add-to-cart-modal-total-label"
            >
              Total:
            </Text>
            <Text
              className={styles.totalValue}
              data-testid="add-to-cart-modal-total-value"
            >
              ${finalPrice.toFixed(2)}
            </Text>
          </Box>
          <Button
            onClick={handleAddToCart}
            className={styles.addButton}
            data-testid="add-to-cart-modal-add-button"
          >
            Agregar <IconShoppingCart size={20} style={{ marginLeft: 8 }} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default AddToCartModal;
