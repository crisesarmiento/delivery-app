import { useMemo } from 'react';
import { IProduct } from '@/types';
import { IngredientItem } from '../types/addToCartModal/types';

export const usePriceCalculation = (
  product: IProduct,
  ingredients: IngredientItem[],
  quantity: number
) => {
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

  const calculateTotalPrice = () => {
    let total = hasDiscount ? discountedPrice : product.price;
    if (ingredients.length > 0) {
      ingredients.forEach((ing) => {
        if (ing.quantity > 0 && ing.price) {
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
