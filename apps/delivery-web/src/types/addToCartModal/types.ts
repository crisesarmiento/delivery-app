
import { IProduct } from '../../types';
import { CartItem } from '@/context/types';

// Types for AddToCartModal subcomponents

export interface ModalHeaderProps {
  product?: IProduct;
  hasDiscount: boolean;
  originalPrice: number | null;
  discountedPrice: number;
}

export interface ProductInfoProps {
  product: IProduct;
}

export interface AddToCartModalProps {
  product: IProduct;
  opened: boolean;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  initialQuantity?: number;
  initialIngredients?: IngredientItem[];
  initialCondiments?: string[];
  initialComments?: string;
}

export interface IngredientItem {
  name: string;
  quantity: number;
  price?: number;
}

export interface IngredientsSectionProps {
  showIngredients: boolean;
  setShowIngredients: (show: boolean) => void;
  ingredients: IngredientItem[];
  handleUpdateIngredient: (index: number, change: number) => void;
  maxIngredientSelections: number;
  totalSelectedIngredients: number;
}

export interface CondimentItem {
  name: string;
  selected: boolean;
}

export interface CondimentsSectionProps {
  showCondiments: boolean;
  setShowCondiments: (show: boolean) => void;
  condiments: CondimentItem[];
  handleToggleCondiment: (index: number) => void;
  maxCondimentSelections: number;
}

export interface CommentsSectionProps {
  comments: string;
  handleCommentsChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
  commentChars: number;
  placeholder: string;
}

export interface ModalFooterProps {
  quantity: number;
  setQuantity: (value: number) => void;
  handleAddToCart: () => void;
  finalPrice: number;
  isMobile?: boolean;
}
