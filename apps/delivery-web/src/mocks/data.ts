import { IBranch, IOrder, IOrderItem, IProduct, OrderStatus } from '../types';
import { branchesMock } from './branches.mock';
import { productsMock } from './products.mock';

// Mock branches data
export const branches: IBranch[] = branchesMock;

// Categories for products
export const categories = ['Burgers', 'Pizza', 'Drinks', 'Desserts', 'Sides'];

// Mock products data
export const products: IProduct[] = productsMock;

// Sample order items
const orderItems1: IOrderItem[] = [
  {
    id: 'item-1',
    productId: 'product-1',
    quantity: 2,
    price: 9.99,
    name: 'Classic Burger',
  },
  {
    id: 'item-2',
    productId: 'product-3',
    quantity: 1,
    price: 6.99,
    name: 'Chocolate Cake',
  },
];

const orderItems2: IOrderItem[] = [
  {
    id: 'item-3',
    productId: 'product-4',
    quantity: 1,
    price: 10.99,
    name: 'Veggie Burger',
  },
  {
    id: 'item-4',
    productId: 'product-6',
    quantity: 2,
    price: 4.99,
    name: 'Iced Coffee',
  },
];

// Mock orders data
export const orders: IOrder[] = [
  {
    id: 'order-1',
    items: orderItems1,
    total: orderItems1.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    status: OrderStatus.Completed,
    createdAt: '2023-08-01T15:30:00Z',
    userId: 'user-1',
    branchId: 'branch-1',
  },
  {
    id: 'order-2',
    items: orderItems2,
    total: orderItems2.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    status: OrderStatus.Processing,
    createdAt: '2023-08-05T12:15:00Z',
    userId: 'user-1',
    branchId: 'branch-2',
  },
];
