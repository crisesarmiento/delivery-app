import { CartItem } from "@/context/types";

export interface OrderItemProps {
  item: CartItem;
  onEditProduct: () => void;
  onQuantityUpdate: (newQuantity: number) => void;
}