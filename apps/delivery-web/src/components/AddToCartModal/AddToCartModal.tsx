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

interface IngredientItem {
  name: string;
  quantity: number;
  price?: number;
}

interface AddToCartModalProps {
  product: IProduct;
  opened: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

const AddToCartModal = ({
  product,
  opened,
  onClose,
  onAddToCart,
}: AddToCartModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const [showCondiments, setShowCondiments] = useState(true);

  // Mocked ingredients based on the product
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    { name: 'Lechuga', quantity: 2 },
    { name: 'Tomate', quantity: 0, price: 1000 },
    { name: 'Cebolla morada', quantity: 0 },
    { name: 'Cebolla caramelizada', quantity: 0 },
  ]);

  // Mocked condiments
  const [condiments, setCondiments] = useState<string[]>(['Mayonesa']);

  // Calculate if product has discount (for demo purposes)
  const hasDiscount =
    product.name.toLowerCase().includes('promo') || Math.random() > 0.7;
  const discountPercentage = hasDiscount ? 20 : 0;
  const originalPrice = hasDiscount ? (product.price * 1.2).toFixed(2) : null;

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

  if (!opened) return null;

  const handleUpdateIngredient = (index: number, change: number) => {
    const newIngredients = [...ingredients];
    const newQuantity = newIngredients[index].quantity + change;

    // Check limits
    if (newQuantity >= 0) {
      newIngredients[index].quantity = newQuantity;
      setIngredients(newIngredients);
    }
  };

  const handleToggleCondiment = (condiment: string) => {
    if (condiments.includes(condiment)) {
      setCondiments(condiments.filter((c) => c !== condiment));
    } else {
      setCondiments([...condiments, condiment]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div ref={modalRef} className={styles.modalContent}>
          {/* Black header */}
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

            {/* Product details on the left */}
            <Box className={styles.contentContainer}>
              <Text className={styles.productIngredients}>
                {product.ingredients}
              </Text>
              <Text className={styles.additionalInfo}>
                En comentarios, aclaranos si lo preferis sin chimi. Gracias!
              </Text>

              <Box className={styles.commentInput}>
                <Text className={styles.commentLabel}>Comentarios</Text>
                <Textarea
                  placeholder=""
                  maxLength={100}
                  autosize={false}
                  onChange={(event) => {
                    const currentLength = event.currentTarget.value.length;
                    const commentCounter =
                      document.getElementById('commentCounter');
                    if (commentCounter) {
                      commentCounter.innerText = `${currentLength}/100`;
                    }
                  }}
                />
                <Text id="commentCounter" className={styles.commentCounter}>
                  0/100
                </Text>
              </Box>

              {/* Ingredients section */}
              <Box mb={20}>
                <Box
                  className={styles.sectionHeader}
                  onClick={() => setShowIngredients(!showIngredients)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text className={styles.sectionTitle}>
                    Elige hasta 2 Ingredientes
                  </Text>
                  {showIngredients ? (
                    <IconChevronUp size={24} stroke={1.5} />
                  ) : (
                    <IconChevronDown size={24} stroke={1.5} />
                  )}
                </Box>

                {showIngredients && (
                  <>
                    {ingredients.map((ingredient, index) => (
                      <Box key={ingredient.name}>
                        <Box className={styles.ingredientRow}>
                          <Flex align="center" gap={10}>
                            <Text className={styles.ingredientName}>
                              {ingredient.name}
                            </Text>
                            {ingredient.price && (
                              <Box className={styles.priceTag}>
                                + ${ingredient.price.toLocaleString()}
                              </Box>
                            )}
                          </Flex>

                          <Box className={styles.quantityControl}>
                            <IconCircleMinus
                              size={18}
                              stroke={1.5}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleUpdateIngredient(index, -1)}
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
                              onClick={() => handleUpdateIngredient(index, 1)}
                            />
                          </Box>
                        </Box>
                        {index < ingredients.length - 1 && (
                          <hr className={styles.ingredientDivider} />
                        )}
                      </Box>
                    ))}
                  </>
                )}
              </Box>

              {/* Condiments section */}
              <Box mb={20}>
                <Box
                  className={styles.sectionHeader}
                  onClick={() => setShowCondiments(!showCondiments)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text className={styles.sectionTitle}>Elige 2 Aderezos</Text>
                  {showCondiments ? (
                    <IconChevronUp size={24} stroke={1.5} />
                  ) : (
                    <IconChevronDown size={24} stroke={1.5} />
                  )}
                </Box>

                {showCondiments && (
                  <>
                    <Box className={styles.ingredientRow}>
                      <Text className={styles.ingredientName}>Mayonesa</Text>
                      <Box
                        className={`${styles.checkbox} ${
                          condiments.includes('Mayonesa')
                            ? styles.checkedBox
                            : ''
                        }`}
                        onClick={() => handleToggleCondiment('Mayonesa')}
                        style={{ cursor: 'pointer' }}
                      >
                        {condiments.includes('Mayonesa') && (
                          <IconCheck size={16} stroke={1.5} color="#000000" />
                        )}
                      </Box>
                    </Box>
                    <hr className={styles.ingredientDivider} />

                    <Box className={styles.ingredientRow}>
                      <Text className={styles.ingredientName}>Ketchup</Text>
                      <Box
                        className={`${styles.checkbox} ${
                          condiments.includes('Ketchup')
                            ? styles.checkedBox
                            : ''
                        }`}
                        onClick={() => handleToggleCondiment('Ketchup')}
                        style={{
                          cursor: 'pointer',
                          border: '1px solid #939393',
                        }}
                      >
                        {condiments.includes('Ketchup') && (
                          <IconCheck size={16} stroke={1.5} color="#000000" />
                        )}
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </div>

          {/* Footer with action buttons */}
          <div className={styles.footerContainer}>
            <Flex className={styles.footerActions}>
              <div className={styles.quantityControlWrapper}>
                <IconTrash
                  size={26}
                  stroke={1.5}
                  style={{ cursor: 'pointer' }}
                />
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
                      Subtotal: ${(product.price * quantity).toFixed(2)}
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
