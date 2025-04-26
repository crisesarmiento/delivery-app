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
  Modal,
  Collapse,
} from '@mantine/core';
import {
  IconShoppingCart,
  IconX,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';
import { IProduct } from '../../types';
import styles from './AddToCartModal.module.css';
import {
  getProductById,
  IProductWithCustomization,
  IIngredientOption,
} from '../../mocks/products.mock';
import {
  PRODUCT_TEXTS,
  MODAL_TEXTS,
  TOOLTIP_TEXTS,
  QUANTITY_CONSTANTS,
} from '../../config/constants';
import QuantityControl from '../QuantityControl';
import { CartItem as CartContextItem } from '@/context/CartContext';

// ===== Types =====
interface IngredientItem {
  name: string;
  quantity: number;
  price?: number;
}

interface CondimentItem {
  name: string;
  selected: boolean;
}

interface CartItemCustomization {
  product: IProduct;
  quantity: number;
  uniqueId?: string;
  ingredients?: Array<{ name: string; quantity: number; price?: number }>;
  condiments?: string[];
  comments?: string;
  totalPrice?: number;
}

interface AddToCartModalProps {
  product: IProduct;
  opened: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number, cartItem?: CartContextItem) => void;
  initialQuantity?: number;
  initialIngredients?: IngredientItem[];
  initialCondiments?: string[];
  initialComments?: string;
}

// ===== Custom Hooks =====

// Hook to manage ingredients
const useIngredients = (
  initialIngredients: IngredientItem[] | undefined,
  productWithCustomization: IProductWithCustomization | null,
  isInitialized: React.MutableRefObject<boolean>,
  opened: boolean
) => {
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [showIngredients, setShowIngredients] = useState(true);

  const ingredientOptions = useMemo(
    () => productWithCustomization?.customization?.ingredientOptions || [],
    [productWithCustomization]
  );

  // Calculate total selected ingredients
  const totalSelectedIngredients = useMemo(
    () => ingredients.filter((ing) => ing.quantity > 0).length,
    [ingredients]
  );

  // Maximum allowed selections
  const maxIngredientSelections = useMemo(
    () => productWithCustomization?.customization?.maxIngredientSelections || 2,
    [productWithCustomization]
  );

  // Initialize ingredients
  useEffect(() => {
    if (!opened || !productWithCustomization || isInitialized.current) {
      return;
    }

    // Check if we're editing an existing item with customizations
    const isEditingExistingItem =
      initialIngredients && initialIngredients.length > 0;

    // Initialize with all available options from the product
    if (productWithCustomization.customization?.ingredientOptions) {
      const defaultIngredients =
        productWithCustomization.customization.ingredientOptions.map(
          (option: IIngredientOption) => {
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
  }, [opened, productWithCustomization, initialIngredients, isInitialized]);

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
      const maxQuantity = QUANTITY_CONSTANTS.QUANTITY_MAX_VALUE;

      if (newQuantity <= maxQuantity) {
        newIngredients[index].quantity = newQuantity;
        setIngredients(newIngredients);
      }
    }
  };

  return {
    ingredients,
    setIngredients,
    showIngredients,
    setShowIngredients,
    handleUpdateIngredient,
    ingredientOptions,
    totalSelectedIngredients,
    maxIngredientSelections,
  };
};

// Hook to manage condiments
const useCondiments = (
  initialCondiments: string[] = [],
  productWithCustomization: IProductWithCustomization | null,
  isInitialized: React.MutableRefObject<boolean>,
  opened: boolean
) => {
  const [condiments, setCondiments] = useState<CondimentItem[]>([]);
  const [showCondiments, setShowCondiments] = useState(true);

  const condimentOptions = useMemo(() => {
    if (!productWithCustomization?.customization?.condimentOptions) {
      return [];
    }
    // Convert object to array for easier handling
    return Object.values(
      productWithCustomization.customization.condimentOptions
    );
  }, [productWithCustomization]);

  // Initialize condiments
  useEffect(() => {
    if (!opened || !productWithCustomization || isInitialized.current) {
      return;
    }

    if (productWithCustomization.customization?.condimentOptions) {
      const defaultCondiments = Object.values(
        productWithCustomization.customization.condimentOptions
      ).map((condiment) => ({
        name: condiment.name,
        selected: initialCondiments.includes(condiment.name),
      }));
      setCondiments(defaultCondiments);
    }
  }, [opened, productWithCustomization, initialCondiments, isInitialized]);

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
      alert(
        MODAL_TEXTS.MAX_CONDIMENTS_ALERT.replace(
          '{0}',
          maxCondiments.toString()
        )
      );
      return;
    }

    setCondiments(newCondiments);
  };

  return {
    condiments,
    setCondiments,
    showCondiments,
    setShowCondiments,
    handleToggleCondiment,
    condimentOptions,
  };
};

// Hook to manage pricing and discounts
const usePriceCalculation = (
  product: IProduct,
  ingredients: IngredientItem[],
  quantity: number
) => {
  // Memoize discount calculations to prevent recalculations on every render
  const { hasDiscount, originalPrice, discountedPrice } = useMemo(() => {
    const hasDiscount =
      product.name.toLowerCase().includes('promo') ||
      (typeof product.id === 'number'
        ? product.id % 3 === 0
        : String(product.id).length % 3 === 0);
    const originalPrice = hasDiscount ? product.price * 1.2 : null;
    const discountedPrice = hasDiscount ? product.price : product.price;

    return {
      hasDiscount,
      originalPrice,
      discountedPrice,
    };
  }, [product.name, product.id, product.price]);

  // Calculate total price including customizations
  const calculateTotalPrice = () => {
    let total = hasDiscount ? discountedPrice : product.price;

    // Add cost of extra ingredients with price
    if (ingredients.length > 0) {
      ingredients.forEach((ing) => {
        if (ing.quantity > 0 && ing.price) {
          // Multiply the ingredient price by its quantity
          const ingredientCost = ing.price * ing.quantity;
          total += ingredientCost;
        }
      });
    }

    return total * quantity;
  };

  const finalPrice = calculateTotalPrice();

  return {
    hasDiscount,
    originalPrice,
    discountedPrice,
    finalPrice,
  };
};

// ===== Subcomponents =====

// Modal Header Component
const ModalHeader = ({
  product,
  hasDiscount,
  originalPrice,
  discountedPrice,
}: {
  product: IProduct;
  hasDiscount: boolean;
  originalPrice: number | null;
  discountedPrice: number;
}) => (
  <Box className={styles.modalHeader}>
    {hasDiscount && (
      <Box className={styles.discountBadge}>{MODAL_TEXTS.DISCOUNT_BADGE}</Box>
    )}
    <Text className={styles.modalTitle}>{MODAL_TEXTS.MODAL_TITLE}</Text>
    <Box className={styles.priceContainer}>
      <Text className={styles.currentPrice}>${discountedPrice.toFixed(2)}</Text>
      {hasDiscount && originalPrice && (
        <Text className={styles.originalPrice}>
          ${originalPrice.toFixed(2)}
        </Text>
      )}
    </Box>
  </Box>
);

// Product Info Component
const ProductInfo = ({ product }: { product: IProduct }) => (
  <Flex className={styles.productInfo} direction="column" gap={8}>
    <Box className={styles.productDescription}>{product.description}</Box>
    <Box className={styles.helperText}>{MODAL_TEXTS.CUSTOMIZE_HELPER_TEXT}</Box>
  </Flex>
);

// Comments Section Component
const CommentsSection = ({
  comments,
  handleCommentsChange,
  commentChars,
  placeholder,
}: {
  comments: string;
  handleCommentsChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentChars: number;
  placeholder: string;
}) => (
  <Box className={styles.commentsContainer}>
    <Text className={styles.sectionLabel}>{MODAL_TEXTS.COMMENTS_LABEL}</Text>
    <Textarea
      placeholder={placeholder}
      value={comments}
      onChange={handleCommentsChange}
      maxLength={100}
      className={styles.commentTextarea}
      styles={{
        root: { width: '100%', height: '100%' },
        wrapper: { width: '100%', height: '100%' },
        input: {
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          '&::placeholder': {
            overflow: 'visible',
          },
        },
      }}
      autosize={false}
      resize="none"
      unstyled
    />
  </Box>
);

// Ingredients Section Component
const IngredientsSection = ({
  showIngredients,
  setShowIngredients,
  ingredients,
  handleUpdateIngredient,
  maxIngredientSelections,
  totalSelectedIngredients,
}: {
  showIngredients: boolean;
  setShowIngredients: (value: boolean) => void;
  ingredients: IngredientItem[];
  handleUpdateIngredient: (index: number, change: number) => void;
  maxIngredientSelections: number;
  totalSelectedIngredients: number;
}) => (
  <Flex className={styles.ingredientsSection}>
    <Flex
      className={styles.sectionHeader}
      onClick={() => setShowIngredients(!showIngredients)}
      justify="center"
      align="center"
      w="100%"
      style={{ position: 'relative' }}
    >
      <Box className={styles.sectionHeaderContainer}>
        <Text className={styles.sectionHeaderText}>
          {MODAL_TEXTS.INGREDIENTS_SECTION_TITLE} {maxIngredientSelections}{' '}
          {MODAL_TEXTS.INGREDIENTS_SUFFIX}
        </Text>
        {showIngredients ? (
          <IconChevronUp size={24} stroke={1.5} />
        ) : (
          <IconChevronDown size={24} stroke={1.5} />
        )}
      </Box>
    </Flex>

    <Collapse in={showIngredients}>
      <Flex className={styles.ingredientsSectionBody}>
        <Flex className={styles.ingredientsList}>
          {ingredients.map((ingredient, index) => (
            <Flex key={ingredient.name} className={styles.ingredientItem}>
              <Text className={styles.ingredientName}>{ingredient.name}</Text>

              {ingredient.price && (
                <Box className={styles.priceTagContainer}>
                  <Text className={styles.priceTag}>+${ingredient.price}</Text>
                </Box>
              )}

              <Box className={styles.ingredientQuantityWrapper}>
                <QuantityControl
                  initialQuantity={ingredient.quantity}
                  minQuantity={0}
                  maxQuantity={QUANTITY_CONSTANTS.QUANTITY_MAX_VALUE}
                  onChange={(newValue) =>
                    handleUpdateIngredient(
                      index,
                      newValue - ingredient.quantity
                    )
                  }
                  variant="ingredient"
                  isDisabled={
                    totalSelectedIngredients >= maxIngredientSelections &&
                    ingredient.quantity === 0
                  }
                />
              </Box>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Collapse>
  </Flex>
);

// Condiments Section Component
const CondimentsSection = ({
  showCondiments,
  setShowCondiments,
  condiments,
  handleToggleCondiment,
  maxCondimentSelections,
}: {
  showCondiments: boolean;
  setShowCondiments: (value: boolean) => void;
  condiments: CondimentItem[];
  handleToggleCondiment: (index: number) => void;
  maxCondimentSelections: number;
}) => (
  <Flex className={styles.condimentsSection}>
    <Flex
      className={styles.sectionHeader}
      onClick={() => setShowCondiments(!showCondiments)}
      justify="center"
      align="center"
      w="100%"
      style={{ position: 'relative' }}
    >
      <Box className={styles.sectionHeaderContainer}>
        <Text className={styles.sectionHeaderText}>
          {MODAL_TEXTS.CONDIMENTS_SECTION_TITLE} {maxCondimentSelections}{' '}
          {MODAL_TEXTS.CONDIMENTS_SUFFIX}
        </Text>
        {showCondiments ? (
          <IconChevronUp size={24} stroke={1.5} />
        ) : (
          <IconChevronDown size={24} stroke={1.5} />
        )}
      </Box>
    </Flex>

    <Collapse in={showCondiments}>
      <Flex className={styles.condimentsSectionBody}>
        <Flex className={styles.condimentsList}>
          {condiments.map((condiment, index) => (
            <Flex key={condiment.name} className={styles.condimentItem}>
              <Text className={styles.condimentName}>{condiment.name}</Text>

              <Checkbox
                checked={condiment.selected}
                onChange={() => handleToggleCondiment(index)}
                classNames={{
                  root: styles.condimentCheckbox,
                  input: styles.condimentCheckboxInput,
                  icon: styles.condimentCheckboxIcon,
                }}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Collapse>
  </Flex>
);

// Modal Footer Component
const ModalFooter = ({
  quantity,
  setQuantity,
  handleAddToCart,
  finalPrice,
  isMobile,
}: {
  quantity: number;
  setQuantity: (value: number) => void;
  handleAddToCart: () => void;
  finalPrice: number;
  isMobile?: boolean;
}) => (
  <Flex className={styles.footer} direction={isMobile ? 'column' : 'row'}>
    <QuantityControl
      initialQuantity={quantity}
      minQuantity={1}
      onChange={(newQuantity) => setQuantity(newQuantity)}
      variant="footer"
      isMobile={isMobile}
    />
    <Button className={styles.addToCartButton} onClick={handleAddToCart}>
      <Flex className={styles.addToCartButtonContent}>
        <Flex className={styles.addToCartButtonAddToCartContainer}>
          <IconShoppingCart size={24} style={{ color: '#B3FF00' }} />
          <Text className={styles.addToCartButtonTextAddToCart}>
            {PRODUCT_TEXTS.ADD_TO_CART}
          </Text>
        </Flex>
        <Text className={styles.addToCartButtonTextSubtotal}>
          {`${MODAL_TEXTS.SUBTOTAL_LABEL}${finalPrice.toFixed(2)}`}
        </Text>
      </Flex>
    </Button>
  </Flex>
);

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

  const { hasDiscount, originalPrice, discountedPrice, finalPrice } =
    usePriceCalculation(product, ingredients, quantity);

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
    // Get selected ingredients and condiments
    const cartItem: CartItemCustomization = {
      product,
      quantity,
      uniqueId: Date.now().toString(), // Generate a unique ID for this customization
      ingredients: ingredients.filter((ing) => ing.quantity > 0),
      condiments: condiments.filter((c) => c.selected).map((c) => c.name),
      comments,
      totalPrice: finalPrice, // Pass the calculated finalPrice to the cart
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
