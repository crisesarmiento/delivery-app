import { IProduct } from '@/types';

export const productsMock: Record<string, IProduct[]> = {
  '1': [
    {
      id: '101',
      name: 'Hamburguesa Clásica',
      description: 'Deliciosa hamburguesa con carne, lechuga, tomate y queso',
      price: 8.99,
      category: 'Hamburguesas',
      branchId: '1',
      isAvailable: true,
      imageUrl: '/images/hamburguesa-clasica.jpg',
    },
    {
      id: '102',
      name: 'Pizza Margherita',
      description:
        'Pizza tradicional con salsa de tomate, mozzarella y albahaca',
      price: 12.99,
      category: 'Pizzas',
      branchId: '1',
      isAvailable: true,
      imageUrl: '/images/pizza-margherita.jpg',
    },
    {
      id: '103',
      name: 'Ensalada César',
      description: 'Lechuga romana, crutones, queso parmesano y aderezo César',
      price: 7.5,
      category: 'Ensaladas',
      branchId: '1',
      isAvailable: true,
      imageUrl: '/images/ensalada-cesar.jpg',
    },
  ],
  '2': [
    {
      id: '201',
      name: 'Tacos al Pastor',
      description: 'Tacos de cerdo marinado con piña, cilantro y cebolla',
      price: 9.99,
      category: 'Tacos',
      branchId: '2',
      isAvailable: true,
      imageUrl: '/images/tacos-pastor.jpg',
    },
    {
      id: '202',
      name: 'Burrito de Pollo',
      description:
        'Burrito relleno de pollo, frijoles, arroz, guacamole y pico de gallo',
      price: 11.5,
      category: 'Burritos',
      branchId: '2',
      isAvailable: true,
      imageUrl: '/images/burrito-pollo.jpg',
    },
    {
      id: '203',
      name: 'Nachos Supremos',
      description:
        'Nachos con queso fundido, jalapeños, guacamole y crema agria',
      price: 10.99,
      category: 'Aperitivos',
      branchId: '2',
      isAvailable: false,
      imageUrl: '/images/nachos-supremos.jpg',
    },
  ],
  '3': [
    {
      id: '301',
      name: 'Sushi Variado',
      description: 'Selección de 12 piezas de sushi variado',
      price: 18.99,
      category: 'Sushi',
      branchId: '3',
      isAvailable: true,
      imageUrl: '/images/sushi-variado.jpg',
    },
    {
      id: '302',
      name: 'Ramen Tonkotsu',
      description:
        'Fideos ramen en caldo de cerdo con huevo, cebolleta y cerdo',
      price: 14.5,
      category: 'Ramen',
      branchId: '3',
      isAvailable: true,
      imageUrl: '/images/ramen-tonkotsu.jpg',
    },
    {
      id: '303',
      name: 'Gyozas de Verduras',
      description: 'Empanadillas japonesas rellenas de verduras',
      price: 8.99,
      category: 'Aperitivos',
      branchId: '3',
      isAvailable: false,
      imageUrl: '/images/gyozas-verduras.jpg',
    },
  ],
};
