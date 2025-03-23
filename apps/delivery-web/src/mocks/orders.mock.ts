import { IOrder, OrderStatus } from '@/types';

export const ordersMock: IOrder[] = [
  {
    id: '1001',
    items: [
      {
        id: '1',
        productId: '101',
        quantity: 2,
        price: 8.99,
        name: 'Hamburguesa Clásica',
      },
      {
        id: '2',
        productId: '103',
        quantity: 1,
        price: 7.5,
        name: 'Ensalada César',
      },
    ],
    total: 25.48,
    status: OrderStatus.Completed,
    createdAt: '2023-06-15T14:30:00Z',
    userId: 'user1',
    branchId: '1',
  },
  {
    id: '1002',
    items: [
      {
        id: '3',
        productId: '201',
        quantity: 3,
        price: 9.99,
        name: 'Tacos al Pastor',
      },
    ],
    total: 29.97,
    status: OrderStatus.Processing,
    createdAt: '2023-06-18T18:15:00Z',
    userId: 'user1',
    branchId: '2',
  },
  {
    id: '1003',
    items: [
      {
        id: '4',
        productId: '301',
        quantity: 1,
        price: 18.99,
        name: 'Sushi Variado',
      },
      {
        id: '5',
        productId: '302',
        quantity: 1,
        price: 14.5,
        name: 'Ramen Tonkotsu',
      },
    ],
    total: 33.49,
    status: OrderStatus.Pending,
    createdAt: '2023-06-20T19:45:00Z',
    userId: 'user2',
    branchId: '3',
  },
];
