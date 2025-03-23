import { IBranch } from '@/types';

export const branchesMock: IBranch[] = [
  {
    id: '1',
    name: 'Sucursal Centro',
    address: 'Av. Principal 123, Centro',
    isOpen: true,
    openingHours: '8:00 - 22:00',
    phoneNumber: '555-1234',
    imageUrl: '/images/branch-centro.jpg',
  },
  {
    id: '2',
    name: 'Sucursal Norte',
    address: 'Calle 45 #789, Zona Norte',
    isOpen: true,
    openingHours: '9:00 - 21:00',
    phoneNumber: '555-5678',
    imageUrl: '/images/branch-norte.jpg',
  },
  {
    id: '3',
    name: 'Sucursal Sur',
    address: 'Av. del Sur 567, Zona Sur',
    isOpen: false,
    openingHours: '10:00 - 20:00',
    phoneNumber: '555-9012',
    imageUrl: '/images/branch-sur.jpg',
  },
];
