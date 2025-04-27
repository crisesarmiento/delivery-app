import React from 'react';
import { Flex, Collapse, Box, Text } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import styles from '../AddToCartModal.module.css';
import { IngredientsSectionProps } from '../../../types/addToCartModal/types';
import { MODAL_TEXTS, QUANTITY_CONSTANTS } from '../../../config/constants';
import QuantityControl from '../../QuantityControl';

// Ingredients Section Component
const IngredientsSection = ({
  showIngredients,
  setShowIngredients,
  ingredients,
  handleUpdateIngredient,
  maxIngredientSelections,
  totalSelectedIngredients,
}: IngredientsSectionProps) => (
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
export default IngredientsSection;
