import { IProduct } from '@/types';

// Define types for product customizations
export interface IIngredientOption {
  id: number;
  name: string;
  price?: number;
  default: boolean;
}

export interface ICondimentOption {
  [key: string]: {
    name: string;
    default: boolean;
  };
}

export interface IProductCustomization {
  ingredientOptions: IIngredientOption[];
  condimentOptions: ICondimentOption;
  maxIngredientSelections?: number;
  maxCondimentSelections?: number;
}

// Extended product type with customization options
export interface IProductWithCustomization extends IProduct {
  customization: IProductCustomization;
}

// Product categories
export const productCategories = {
  1: 'Promo 33',
  2: 'Burgers',
  3: 'Bebidas',
  4: 'Postres',
  5: 'Lomos & Sandwiches XL',
  6: 'Lomos Medianos',
  7: 'Wraps',
  8: 'Bebidas',
  9: 'Cazuelas',
  10: 'Papas & Snacks',
  11: 'Ensalada',
  12: 'Menu Infantil',
  13: 'Chimichurri',
};

// Common condiment options
const condiments: ICondimentOption = {
  Mayonesa: {
    name: 'Mayonesa',
    default: true,
  },
  Ketchup: {
    name: 'Ketchup',
    default: false,
  },
  Mostaza: {
    name: 'Mostaza',
    default: false,
  },
  BBQ: {
    name: 'BBQ',
    default: false,
  },
  Chimichurri: {
    name: 'Chimichurri',
    default: false,
  },
  'Salsa picante': {
    name: 'Salsa picante',
    default: false,
  },
};

// Mock data for products with customization options
export const products: IProductWithCustomization[] = [
  {
    id: '1',
    branchId: '1',
    name: 'Hamburguesa Clásica',
    description: 'Hamburguesa de carne con lechuga, tomate y queso cheddar',
    price: 8500,
    imageUrl: '/images/products/Cheese Burger 2 1.jpg',
    isAvailable: true,
    ingredients: 'Carne de res, pan artesanal, lechuga, tomate, queso cheddar',
    category: productCategories[2],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: false, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '2',
    branchId: '1',
    name: 'Hamburguesa con Bacon',
    description:
      'Hamburguesa de carne con bacon crujiente, queso y cebolla caramelizada',
    price: 9500,
    imageUrl: '/images/products/Papas con Mayo y Chimi 2 1.jpg',
    isAvailable: true,
    ingredients:
      'Carne de res, pan artesanal, bacon, queso, cebolla caramelizada',
    category: productCategories[2],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '3',
    branchId: '1',
    name: 'Hamburguesa Vegetariana',
    description:
      'Hamburguesa vegetariana con medallón de lentejas, lechuga y tomate',
    price: 7500,
    imageUrl: '/images/products/Burger Champi 2 1.jpg',
    isAvailable: true,
    ingredients: 'Medallón de lentejas, pan artesanal, lechuga, tomate, queso',
    category: productCategories[2],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Lechuga', default: true },
        { id: 2, name: 'Tomate', default: true },
        { id: 3, name: 'Cebolla morada', default: true },
        { id: 4, name: 'Rúcula', default: false },
        { id: 5, name: 'Queso vegano', default: false, price: 600 },
        { id: 6, name: 'Guacamole', default: false, price: 700 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '4',
    branchId: '1',
    name: 'Promo Barbacoa',
    description: 'Hamburguesa BBQ con papas fritas y bebida',
    price: 12800,
    imageUrl: '/images/products/Promo Barbacoa 4 1.jpg',
    isAvailable: true,
    ingredients:
      'Hamburguesa con salsa BBQ, bacon, cebolla, papas fritas y bebida a elección',
    category: productCategories[1],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
        { id: 10, name: 'Salsa BBQ extra', default: false, price: 300 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '5',
    branchId: '1',
    name: 'Papas Fritas',
    description: 'Crujientes papas fritas',
    price: 3500,
    imageUrl: '/images/products/Papas con Mayo y Chimi 2 1.jpg',
    isAvailable: true,
    ingredients: 'Papas, sal',
    category: productCategories[10],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Sal', default: true },
        { id: 2, name: 'Queso cheddar', default: false, price: 600 },
        { id: 3, name: 'Bacon', default: false, price: 800 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '6',
    branchId: '1',
    name: 'Lomo Completo Grande',
    description: 'Sándwich de lomo grande con lechuga, tomate y mayonesa',
    price: 19500,
    imageUrl: '/images/products/Lomo Completo Grande 1 1.jpg',
    isAvailable: true,
    ingredients:
      'Pan de lomo, bife de pollo, mayo chimi, lechuga, tomate, jamón, queso, huevo, toque de chimi (opcional) + papas',
    category: productCategories[5],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '7',
    branchId: '1',
    name: 'Lomo de Pollo',
    description: 'Sándwich de pollo grillado con lechuga y tomate',
    price: 15990,
    imageUrl: '/images/products/Lomo de Pollo 1 1.jpg',
    isAvailable: true,
    ingredients:
      'Pan de lomo, bife de pollo, mayo chimi, lechuga, tomate, jamón, queso, huevo, toque de chimi (opcional) + papas',
    category: productCategories[5],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '8',
    branchId: '1',
    name: 'Lomo Veggie',
    description:
      'Sándwich vegetariano con proteína vegetal y vegetales frescos',
    price: 16990,
    imageUrl: '/images/products/Lomo Veggie 2 1.jpg',
    isAvailable: true,
    ingredients:
      'Pan de lomo, bife de pollo, mayo chimi, lechuga, tomate, jamón, queso, huevo, toque de chimi (opcional) + papas',
    category: productCategories[5],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Lechuga', default: true },
        { id: 2, name: 'Tomate', default: true },
        { id: 3, name: 'Cebolla morada', default: true },
        { id: 4, name: 'Rúcula', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '9',
    branchId: '1',
    name: 'Hamburguesa Doble',
    description: 'Doble medallón de carne con queso cheddar',
    price: 10500,
    imageUrl: '/images/products/Burger Doble 2 1.jpg',
    isAvailable: true,
    ingredients: 'Doble carne, pan artesanal, doble queso cheddar',
    category: productCategories[2],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 3,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '10',
    branchId: '1',
    name: 'Hamburguesa BBQ',
    description: 'Hamburguesa con salsa barbacoa y cebolla crispy',
    price: 9800,
    imageUrl: '/images/products/Burger barbacoa 33 2 1.jpg',
    isAvailable: true,
    ingredients:
      'Carne, pan artesanal, salsa BBQ, cebolla crispy, queso cheddar',
    category: productCategories[2],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 3,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '11',
    branchId: '1',
    name: 'Hamburguesa Blue Cheese',
    description: 'Hamburguesa con queso azul y rúcula',
    price: 10200,
    imageUrl: '/images/products/Burger Blue Cheese 2 1.jpg',
    isAvailable: true,
    ingredients: 'Carne, pan artesanal, queso azul, rúcula',
    category: productCategories[2],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 3,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '12',
    branchId: '1',
    name: 'Promo Para Compartir Lomos',
    description: '2 lomos completos, papas grandes, 2 bebidas',
    price: 25990,
    imageUrl: '/images/products/Promo Para Compartir Lomos 2 1.jpg',
    isAvailable: true,
    ingredients: '2 lomos completos, papas grandes, 2 bebidas',
    category: productCategories[1],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
    },
  },
  {
    id: '13',
    branchId: '1',
    name: 'Refresco Cola',
    description: 'Bebida refrescante de cola',
    price: 3000,
    imageUrl: '/images/products/Refresco-Cola.jpg',
    isAvailable: true,
    ingredients: 'Agua carbonatada, azúcar, extracto de cola',
    category: productCategories[3],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '14',
    branchId: '1',
    name: 'Helado de Vainilla',
    description: 'Delicioso helado cremoso de vainilla',
    price: 4500,
    imageUrl: '/images/products/Helado-de-Vainilla.jpg',
    isAvailable: true,
    ingredients: 'Leche, azúcar, vainilla',
    category: productCategories[4],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 600 },
        { id: 2, name: 'Bacon Crujiente', default: true, price: 800 },
        { id: 3, name: 'Champiñones Salteados', default: false, price: 500 },
        { id: 4, name: 'Cebolla Caramelizada', default: false },
        { id: 5, name: 'Jalapeños', default: false },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '15',
    branchId: '1',
    name: 'Lomo Mediano Especial',
    description: 'Sándwich de lomo mediano con aderezo especial',
    price: 18000,
    imageUrl: '/images/products/Lomo-Mediano-Especial.jpg',
    isAvailable: true,
    ingredients: 'Pan de lomo, lomo mediano, aderezo especial',
    category: productCategories[6],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 300 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '16',
    branchId: '1',
    name: 'Wrap de Pollo',
    description: 'Wrap ligero con pollo a la parrilla y vegetales frescos',
    price: 9900,
    imageUrl: '/images/products/Wrap-de-Pollo.jpg',
    isAvailable: true,
    ingredients: 'Tortilla, pollo a la parrilla, lechuga, tomate, salsa',
    category: productCategories[7],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Salsa Especial', default: false, price: 200 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '17',
    branchId: '1',
    name: 'Jugo de Naranja',
    description: 'Jugo natural de naranja',
    price: 4000,
    imageUrl: '/images/products/Jugo-de-Naranja.jpg',
    isAvailable: true,
    ingredients: 'Naranjas frescas, agua',
    category: productCategories[8],
    customization: {
      ingredientOptions: [],
      condimentOptions: condiments,
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '18',
    branchId: '1',
    name: 'Cazuela de Mariscos',
    description: 'Cazuela tradicional de mariscos',
    price: 18990,
    imageUrl: '/images/products/Cazuela-de-Mariscos.jpg',
    isAvailable: true,
    ingredients: 'Mariscos, caldo, vegetales, especias',
    category: productCategories[9],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Mariscos', default: false, price: 500 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '19',
    branchId: '1',
    name: 'Ensalada César',
    description: 'Ensalada clásica César con aderezo especial',
    price: 7500,
    imageUrl: '/images/products/Ensalada-Cesar.jpg',
    isAvailable: true,
    ingredients: 'Lechuga, pollo, parmesano, crutones',
    category: productCategories[11],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Crutones', default: false, price: 150 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '20',
    branchId: '1',
    name: 'Menú Infantil',
    description: 'Pequeño menú infantil con opciones divertidas',
    price: 12990,
    imageUrl: '/images/products/Menu-Infantil.jpg',
    isAvailable: true,
    ingredients: 'Mini hamburguesa, papas, jugo',
    category: productCategories[12],
    customization: {
      ingredientOptions: [],
      condimentOptions: condiments,
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '21',
    branchId: '1',
    name: 'Alitas con Chimichurri',
    description: 'Alitas de pollo bañadas en salsa chimichurri',
    price: 13500,
    imageUrl: '/images/products/Alitas-con-Chimichurri.jpg',
    isAvailable: true,
    ingredients: 'Alitas de pollo, salsa chimichurri',
    category: productCategories[13],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Salsa extra chimichurri', default: false, price: 300 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
];

// Helper function to get products by category
export const getProductsByCategory = (
  category: string
): IProductWithCustomization[] => {
  return products.filter((product) => product.category === category);
};

// Helper function to get a product by ID
export const getProductById = (
  id: string | number
): IProductWithCustomization | undefined => {
  // Convert ID to string for comparison
  const stringId = String(id);

  // Find the product
  const product = products.find((product) => String(product.id) === stringId);

  if (!product) {
    console.warn(`Product with ID ${stringId} not found`);
  }

  return product;
};

export default products;
