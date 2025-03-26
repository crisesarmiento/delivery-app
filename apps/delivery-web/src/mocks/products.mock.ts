import { IProduct } from '@/types';

// Define types for product customizations
export interface IIngredientOption {
  id: string | number;
  name: string;
  price?: number;
  default: boolean;
  maxQuantity?: number;
}

export interface ICondimentOption {
  id: string | number;
  name: string;
  default: boolean;
}

export interface IProductCustomization {
  ingredientOptions: IIngredientOption[];
  condimentOptions: ICondimentOption[];
  maxIngredientSelections?: number;
  maxCondimentSelections?: number;
  allowComments: boolean;
}

// Extended product type with customization options
export interface IProductWithCustomization extends IProduct {
  customization: IProductCustomization;
}

// Product categories
export const productCategories = [
  { id: 'hamburguesas', name: 'Hamburguesas' },
  { id: 'promos', name: 'Promociones' },
  { id: 'acompañamientos', name: 'Acompañamientos' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'postres', name: 'Postres' },
];

// Common ingredient options
const commonBurgerIngredients: IIngredientOption[] = [
  { id: 1, name: 'Lechuga', default: true, maxQuantity: 2 },
  { id: 2, name: 'Tomate', default: true, maxQuantity: 2 },
  { id: 3, name: 'Cebolla morada', default: false, maxQuantity: 1 },
  { id: 4, name: 'Cebolla caramelizada', default: false, maxQuantity: 1 },
  { id: 5, name: 'Queso cheddar', default: true, maxQuantity: 2 },
  {
    id: 6,
    name: 'Queso mozzarella',
    default: false,
    price: 500,
    maxQuantity: 1,
  },
  { id: 7, name: 'Bacon', default: false, price: 800, maxQuantity: 2 },
  { id: 8, name: 'Huevo frito', default: false, price: 600, maxQuantity: 1 },
  { id: 9, name: 'Guacamole', default: false, price: 700, maxQuantity: 1 },
];

// Common condiment options
const commonCondiments: ICondimentOption[] = [
  { id: 1, name: 'Mayonesa', default: true },
  { id: 2, name: 'Ketchup', default: false },
  { id: 3, name: 'Mostaza', default: false },
  { id: 4, name: 'BBQ', default: false },
  { id: 5, name: 'Chimichurri', default: false },
  { id: 6, name: 'Salsa picante', default: false },
];

// Mock data for products with customization options
export const products: IProductWithCustomization[] = [
  {
    id: '1',
    branchId: '1',
    name: 'Hamburguesa Clásica',
    description: 'Hamburguesa de carne con lechuga, tomate y queso cheddar',
    price: 8500,
    imageUrl: '/images/products/Cheese Burger 1.jpg',
    isAvailable: true,
    ingredients: 'Carne de res, pan artesanal, lechuga, tomate, queso cheddar',
    category: 'hamburguesas',
    tags: ['popular', 'carne'],
    customization: {
      ingredientOptions: commonBurgerIngredients,
      condimentOptions: commonCondiments,
      maxIngredientSelections: 5,
      maxCondimentSelections: 3,
      allowComments: true,
    },
  },
  {
    id: '2',
    branchId: '1',
    name: 'Hamburguesa con Bacon',
    description:
      'Hamburguesa de carne con bacon crujiente, queso y cebolla caramelizada',
    price: 9500,
    imageUrl: '/images/products/Papas con Mayo y Chimi 1.jpg',
    isAvailable: true,
    ingredients:
      'Carne de res, pan artesanal, bacon, queso, cebolla caramelizada',
    category: 'hamburguesas',
    tags: ['popular', 'carne', 'bacon'],
    customization: {
      ingredientOptions: commonBurgerIngredients.map((ing) =>
        ing.name === 'Bacon' ? { ...ing, default: true } : ing
      ),
      condimentOptions: commonCondiments,
      maxIngredientSelections: 5,
      maxCondimentSelections: 3,
      allowComments: true,
    },
  },
  {
    id: '3',
    branchId: '1',
    name: 'Hamburguesa Vegetariana',
    description:
      'Hamburguesa vegetariana con medallón de lentejas, lechuga y tomate',
    price: 7500,
    imageUrl: '/images/products/Burger Champi 1.jpg',
    isAvailable: true,
    ingredients: 'Medallón de lentejas, pan artesanal, lechuga, tomate, queso',
    category: 'hamburguesas',
    tags: ['vegetariano'],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Lechuga', default: true, maxQuantity: 2 },
        { id: 2, name: 'Tomate', default: true, maxQuantity: 2 },
        { id: 3, name: 'Cebolla morada', default: true, maxQuantity: 1 },
        { id: 4, name: 'Rúcula', default: false, maxQuantity: 1 },
        {
          id: 5,
          name: 'Queso vegano',
          default: false,
          price: 600,
          maxQuantity: 1,
        },
        {
          id: 6,
          name: 'Guacamole',
          default: false,
          price: 700,
          maxQuantity: 1,
        },
      ],
      condimentOptions: [
        { id: 1, name: 'Mayonesa vegana', default: true },
        { id: 2, name: 'Ketchup', default: false },
        { id: 3, name: 'Mostaza', default: false },
        { id: 4, name: 'Salsa de yogur', default: false },
      ],
      maxIngredientSelections: 5,
      maxCondimentSelections: 3,
      allowComments: true,
    },
  },
  {
    id: '4',
    branchId: '1',
    name: 'Promo Barbacoa',
    description: 'Hamburguesa BBQ con papas fritas y bebida',
    price: 12800,
    imageUrl: '/images/products/Promo Barbacoa 1.jpg',
    isAvailable: true,
    ingredients:
      'Hamburguesa con salsa BBQ, bacon, cebolla, papas fritas y bebida a elección',
    category: 'promos',
    tags: ['promo', 'popular'],
    customization: {
      ingredientOptions: [
        ...commonBurgerIngredients.map((ing) =>
          ing.name === 'Bacon' ? { ...ing, default: true } : ing
        ),
        {
          id: 10,
          name: 'Salsa BBQ extra',
          default: false,
          price: 300,
          maxQuantity: 1,
        },
      ],
      condimentOptions: commonCondiments.map((con) =>
        con.name === 'BBQ' ? { ...con, default: true } : con
      ),
      maxIngredientSelections: 5,
      maxCondimentSelections: 3,
      allowComments: true,
    },
  },
  {
    id: '5',
    branchId: '1',
    name: 'Papas Fritas',
    description: 'Crujientes papas fritas',
    price: 3500,
    imageUrl: '/images/products/Lomo Especial 1.jpg',
    isAvailable: true,
    ingredients: 'Papas, sal',
    category: 'acompañamientos',
    tags: [],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Sal', default: true, maxQuantity: 1 },
        {
          id: 2,
          name: 'Queso cheddar',
          default: false,
          price: 600,
          maxQuantity: 1,
        },
        { id: 3, name: 'Bacon', default: false, price: 800, maxQuantity: 1 },
      ],
      condimentOptions: [
        { id: 1, name: 'Mayonesa', default: false },
        { id: 2, name: 'Ketchup', default: false },
        { id: 3, name: 'Salsa barbacoa', default: false },
      ],
      maxIngredientSelections: 3,
      maxCondimentSelections: 2,
      allowComments: true,
    },
  },
  {
    id: '6',
    branchId: '1',
    name: 'Lomo Completo Grande',
    description: 'Sándwich de lomo grande con lechuga, tomate y mayonesa',
    price: 19.5,
    imageUrl: '/images/products/Lomo Completo Grande 1.jpg',
    isAvailable: true,
    ingredients:
      'Pan de lomo, bife de pollo, mayo chimi, lechuga, tomate, jamón, queso, huevo, toque de chimi (opcional) + papas',
    category: 'Lomos',
    tags: [],
    customization: {
      ingredientOptions: [],
      condimentOptions: [],
      allowComments: false,
    },
  },
  {
    id: '7',
    branchId: '1',
    name: 'Lomo de Pollo',
    description: 'Sándwich de pollo grillado con lechuga y tomate',
    price: 15.99,
    imageUrl: '/images/products/agua-mineral.jpg',
    isAvailable: true,
    ingredients:
      'Pan de lomo, bife de pollo, mayo chimi, lechuga, tomate, jamón, queso, huevo, toque de chimi (opcional) + papas',
    category: 'Lomos',
    tags: [],
    customization: {
      ingredientOptions: [],
      condimentOptions: [],
      allowComments: false,
    },
  },
  {
    id: '8',
    branchId: '1',
    name: 'Lomo Veggie',
    description:
      'Sándwich vegetariano con proteína vegetal y vegetales frescos',
    price: 16.99,
    imageUrl: '/images/products/Lomo Veggie 1.jpg',
    isAvailable: true,
    ingredients:
      'Pan de lomo, bife de pollo, mayo chimi, lechuga, tomate, jamón, queso, huevo, toque de chimi (opcional) + papas',
    category: 'Lomos',
    tags: ['popular', 'dulce'],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Salsa de chocolate', default: true, maxQuantity: 1 },
        { id: 2, name: 'Salsa de caramelo', default: false, maxQuantity: 1 },
        {
          id: 3,
          name: 'Crema batida',
          default: false,
          price: 300,
          maxQuantity: 1,
        },
        { id: 4, name: 'Nueces', default: false, price: 400, maxQuantity: 1 },
      ],
      condimentOptions: [],
      maxIngredientSelections: 3,
      allowComments: true,
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
  return products.find((product) => String(product.id) === String(id));
};

export default products;
