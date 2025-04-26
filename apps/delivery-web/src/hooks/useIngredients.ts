import { useState, useEffect, useMemo } from 'react';
import { IngredientItem } from '../types/addToCartModal/types';
import { IProductWithCustomization, IIngredientOption } from '@/types'
import { QUANTITY_CONSTANTS } from '../config/constants';

export const useIngredients = (
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

  const totalSelectedIngredients = useMemo(
    () => ingredients.filter((ing) => ing.quantity > 0).length,
    [ingredients]
  );

  const maxIngredientSelections = useMemo(
    () => productWithCustomization?.customization?.maxIngredientSelections || 2,
    [productWithCustomization]
  );

  useEffect(() => {
    if (!opened || !productWithCustomization || isInitialized.current) {
      return;
    }

    const isEditingExistingItem =
      initialIngredients && initialIngredients.length > 0;

    if (productWithCustomization.customization?.ingredientOptions) {
      const defaultIngredients =
        productWithCustomization.customization.ingredientOptions.map(
          (option: IIngredientOption) => {
            if (isEditingExistingItem) {
              const existingIngredient = initialIngredients.find(
                (ing) => ing.name === option.name
              );
              return {
                name: option.name,
                quantity:
                  existingIngredient !== undefined
                    ? existingIngredient.quantity
                    : 0,
                price: option.price,
              };
            } else {
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
    const currentSelections = newIngredients.filter(
      (ing) => ing.quantity > 0
    ).length;
    const maxSelections =
      productWithCustomization?.customization?.maxIngredientSelections || 2;
    if (
      change > 0 &&
      newQuantity > 0 &&
      currentSelections >= maxSelections &&
      newIngredients[index].quantity === 0
    ) {
      return;
    }
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
