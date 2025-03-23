import { IBranch, IOrder, IOrderItem, IProduct, OrderStatus } from '../types';

// Mock branches data
export const branches: IBranch[] = [
  {
    id: 'branch-1',
    name: 'Smarty Downtown',
    address: '123 Main St, Downtown',
    isOpen: true,
    openingHours: '10:00 AM - 10:00 PM',
    phoneNumber: '+1 (555) 123-4567',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop',
  },
  {
    id: 'branch-2',
    name: 'Smarty Uptown',
    address: '456 Park Ave, Uptown',
    isOpen: true,
    openingHours: '8:00 AM - 9:00 PM',
    phoneNumber: '+1 (555) 987-6543',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
  },
  {
    id: 'branch-3',
    name: 'Smarty Westside',
    address: '789 Ocean Blvd, Westside',
    isOpen: false,
    openingHours: '9:00 AM - 11:00 PM',
    phoneNumber: '+1 (555) 456-7890',
    imageUrl:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop',
  },
];

// Categories for products
export const categories = ['Burgers', 'Pizza', 'Drinks', 'Desserts', 'Sides'];

// Mock products data
export const products: IProduct[] = [
  // Branch 1 products
  {
    id: 'product-1',
    name: 'Classic Burger',
    description: 'Beef patty with lettuce, tomato, and our special sauce',
    price: 9.99,
    category: 'Burgers',
    imageUrl:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-1',
  },
  {
    id: 'product-2',
    name: 'Cheese Pizza',
    description: 'Traditional pizza with tomato sauce and mozzarella cheese',
    price: 12.99,
    category: 'Pizza',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c7edcad34c4?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-1',
  },
  {
    id: 'product-3',
    name: 'Chocolate Cake',
    description: 'Decadent chocolate cake with chocolate ganache',
    price: 6.99,
    category: 'Desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-1',
  },

  // Branch 2 products
  {
    id: 'product-4',
    name: 'Veggie Burger',
    description: 'Plant-based patty with avocado and sprouts',
    price: 10.99,
    category: 'Burgers',
    imageUrl:
      'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-2',
  },
  {
    id: 'product-5',
    name: 'Pepperoni Pizza',
    description: 'Classic pizza with tomato sauce, cheese and pepperoni',
    price: 14.99,
    category: 'Pizza',
    imageUrl:
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-2',
  },
  {
    id: 'product-6',
    name: 'Iced Coffee',
    description: 'Cold brewed coffee served over ice',
    price: 4.99,
    category: 'Drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop',
    isAvailable: false,
    branchId: 'branch-2',
  },

  // Branch 3 products
  {
    id: 'product-7',
    name: 'BBQ Burger',
    description: 'Beef patty with BBQ sauce, bacon, and cheddar cheese',
    price: 11.99,
    category: 'Burgers',
    imageUrl:
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-3',
  },
  {
    id: 'product-8',
    name: 'French Fries',
    description: 'Crispy golden french fries with sea salt',
    price: 3.99,
    category: 'Sides',
    imageUrl:
      'https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop',
    isAvailable: true,
    branchId: 'branch-3',
  },
];

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
