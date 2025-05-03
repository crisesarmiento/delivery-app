import { CartItem } from '@/context/types';
import { IProduct } from '@/types';

export function buildCartItemFromPartial(
  customization: Partial<CartItem>,
  product: IProduct,
  quantity: number
): CartItem {
  return {
    product,
    quantity,
    uniqueId: customization.uniqueId || Date.now().toString(),
    ingredients: customization.ingredients || [],
    condiments: customization.condiments || [],
    comments: customization.comments || '',
    totalPrice: customization.totalPrice,
    hasDiscount: customization.hasDiscount,
    discountPercentage: customization.discountPercentage,
    originalPrice: customization.originalPrice,
    // ...add/merge any other fields as needed
  };
}
