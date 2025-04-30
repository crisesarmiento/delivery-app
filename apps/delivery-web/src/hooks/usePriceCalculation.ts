
import { IProduct } from '@/types';
import { IngredientItem } from '../types/addToCartModal/types';

export const usePriceCalculation = (
  product: IProduct,
  ingredients: IngredientItem[],
  quantity: number
) => {
  const discountPercent = product.discountPercent || 0;
const hasDiscount = discountPercent > 0;
const originalPrice = product.price;
const discountedPrice = hasDiscount
  ? Number((originalPrice * (1 - discountPercent / 100)).toFixed(2))
  : originalPrice;

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
    discountPercent,
    originalPrice,
    discountedPrice,
    finalPrice,
  };
};
