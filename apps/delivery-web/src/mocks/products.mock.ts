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
    id: '14',
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
    id: '15',
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
    id: '16',
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
  {
    id: '17',
    branchId: '1',
    name: 'Lomo Mediano de Carne',
    description: 'Sándwich de lomo mediano con carne jugosa',
    price: 17500,
    imageUrl: '/images/products/Lomo Mediano 1.jpg',
    isAvailable: true,
    ingredients: 'Pan de lomo, carne, lechuga, tomate, mayonesa',
    category: productCategories[6],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 300 },
        { id: 2, name: 'Bacon', default: false, price: 400 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '18',
    branchId: '1',
    name: 'Wrap Pollo Especial',
    description: 'Wrap de pollo con verduras frescas y salsa',
    price: 11500,
    imageUrl: '/images/products/Wrap-de-Pollo.jpg',
    isAvailable: true,
    ingredients:
      'Tortilla, pollo sazonado, pimientos, verduras, salsa especial',
    category: productCategories[7],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Pollo', default: false, price: 400 },
        { id: 2, name: 'Guacamole', default: false, price: 350 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '19',
    branchId: '1',
    name: 'Wrap Veggie',
    description: 'Wrap vegetariano con verduras frescas',
    price: 10500,
    imageUrl: '/images/products/Wraps 1.jpg',
    isAvailable: true,
    ingredients: 'Tortilla, mix de verduras, pimientos, zanahoria, espinaca',
    category: productCategories[7],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Queso vegano', default: false, price: 350 },
        { id: 2, name: 'Guacamole', default: false, price: 350 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '20',
    branchId: '1',
    name: 'Cerveza Punto 33',
    description: 'Cerveza artesanal de la casa',
    price: 5500,
    imageUrl: '/images/products/Cerveza.jpg',
    isAvailable: true,
    ingredients: 'Agua, malta, lúpulo',
    category: productCategories[8],
    customization: {
      ingredientOptions: [],
      condimentOptions: {},
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '21',
    branchId: '1',
    name: 'Sprite Punto 33',
    description: 'Bebida gaseosa refrescante',
    price: 3200,
    imageUrl: '/images/products/Sprite.jpg',
    isAvailable: true,
    ingredients: 'Agua carbonatada, azúcar, saborizantes',
    category: productCategories[8],
    customization: {
      ingredientOptions: [],
      condimentOptions: {},
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '22',
    branchId: '1',
    name: 'Coca-Cola',
    description: 'Clásica bebida refrescante',
    price: 3200,
    imageUrl: '/images/products/Coca Cola.jpg',
    isAvailable: true,
    ingredients: 'Agua carbonatada, azúcar, extracto de cola',
    category: productCategories[8],
    customization: {
      ingredientOptions: [],
      condimentOptions: {},
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '23',
    branchId: '1',
    name: 'Cazuela de Carne',
    description: 'Cazuela tradicional con trozos de carne y verduras',
    price: 17990,
    imageUrl: '/images/products/Cazuelas 1.jpg',
    isAvailable: true,
    ingredients: 'Carne, caldo, verduras, especias',
    category: productCategories[9],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Carne', default: false, price: 500 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '24',
    branchId: '1',
    name: 'Papas con Cheddar',
    description: 'Papas fritas cubiertas con queso cheddar',
    price: 5900,
    imageUrl: '/images/products/Papas & Snacks 1.jpg',
    isAvailable: true,
    ingredients: 'Papas, queso cheddar, especias',
    category: productCategories[10],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Bacon', default: false, price: 400 },
        { id: 2, name: 'Extra Queso', default: false, price: 300 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '25',
    branchId: '1',
    name: 'Nuggets de Pollo',
    description: 'Crujientes nuggets de pollo con salsa a elección',
    price: 6500,
    imageUrl: '/images/products/Chicken Nuggets.jpg',
    isAvailable: true,
    ingredients: 'Pollo rebozado, especias',
    category: productCategories[10],
    customization: {
      ingredientOptions: [],
      condimentOptions: condiments,
      maxIngredientSelections: 0,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '26',
    branchId: '1',
    name: 'Ensalada Verde',
    description: 'Ensalada fresca con mix de verdes y tomates cherry',
    price: 7200,
    imageUrl: '/images/products/Ensalada 1.jpg',
    isAvailable: true,
    ingredients: 'Lechuga, rúcula, espinaca, tomates cherry, aderezo',
    category: productCategories[11],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Queso Parmesano', default: false, price: 200 },
        { id: 2, name: 'Pollo Grillado', default: false, price: 400 },
        { id: 3, name: 'Nueces', default: false, price: 250 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '27',
    branchId: '1',
    name: 'Ensalada de Quinoa',
    description: 'Ensalada saludable con base de quinoa y vegetales',
    price: 8900,
    imageUrl: '/images/products/Ensalada de Quinoa y Calabaza.jpg',
    isAvailable: true,
    ingredients: 'Quinoa, tomate, palta, pepino, cebolla morada, vinagreta',
    category: productCategories[11],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Pollo Grillado', default: false, price: 400 },
        { id: 2, name: 'Queso Feta', default: false, price: 300 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '28',
    branchId: '1',
    name: 'Menú Infantil Nuggets',
    description: 'Mini nuggets con papas fritas para los más pequeños',
    price: 9900,
    imageUrl: '/images/products/Infantil Nuggets.jpg',
    isAvailable: true,
    ingredients: 'Nuggets de pollo, papas fritas, salsa ketchup, jugo',
    category: productCategories[12],
    customization: {
      ingredientOptions: [],
      condimentOptions: condiments,
      maxIngredientSelections: 0,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '29',
    branchId: '1',
    name: 'Chimichurri Casero',
    description: 'Nuestra salsa chimichurri especial casera',
    price: 2800,
    imageUrl: '/images/products/Chimichurri.jpg',
    isAvailable: true,
    ingredients: 'Perejil, ajo, aceite de oliva, vinagre, orégano, ají molido',
    category: productCategories[13],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Picante', default: false, price: 0 },
      ],
      condimentOptions: {},
      maxIngredientSelections: 1,
      maxCondimentSelections: 0,
    },
  },
  {
    id: '30',
    branchId: '1',
    name: 'Lomo Mediano Especial',
    description:
      'Sándwich de lomo mediano con deliciosa combinación de ingredientes',
    price: 18500,
    imageUrl: '/images/products/Lomo Mediano 2.jpg',
    isAvailable: true,
    ingredients: 'Pan de lomo, carne, lechuga, tomate, queso, huevo, especias',
    category: productCategories[6],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 350 },
        { id: 2, name: 'Bacon', default: false, price: 450 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '31',
    branchId: '1',
    name: 'Wrap Especial Vegetales',
    description: 'Wrap con variedad de vegetales frescos y aderezo',
    price: 10800,
    imageUrl: '/images/products/Wraps 2.jpg',
    isAvailable: true,
    ingredients:
      'Tortilla, mix de vegetales, pimientos, cebolla, aderezo especial',
    category: productCategories[7],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Queso', default: false, price: 300 },
        { id: 2, name: 'Salsa Picante', default: false, price: 150 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '32',
    branchId: '1',
    name: 'Wrap de Carne',
    description: 'Wrap con carne jugosa y vegetales',
    price: 12800,
    imageUrl: '/images/products/Wraps 3.jpg',
    isAvailable: true,
    ingredients: 'Tortilla, carne de res, lechuga, tomate, cebolla, aderezo',
    category: productCategories[7],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Carne', default: false, price: 450 },
        { id: 2, name: 'Queso', default: false, price: 300 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '33',
    branchId: '1',
    name: 'Wrap Mixto',
    description: 'Delicioso wrap con combinación de sabores',
    price: 13200,
    imageUrl: '/images/products/Wraps 4.jpg',
    isAvailable: true,
    ingredients: 'Tortilla, carne, pollo, vegetales, salsa especial',
    category: productCategories[7],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Proteína', default: false, price: 450 },
        { id: 2, name: 'Guacamole', default: false, price: 350 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '34',
    branchId: '1',
    name: 'Cazuela Mixta',
    description: 'Cazuela con variedad de carnes y mariscos',
    price: 19900,
    imageUrl: '/images/products/Cazuelas 2.jpg',
    isAvailable: true,
    ingredients: 'Carne, pollo, mariscos, verduras, caldo, especias',
    category: productCategories[9],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Mariscos', default: false, price: 600 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '35',
    branchId: '1',
    name: 'Snacks Mixtos',
    description: 'Variedad de snacks para compartir',
    price: 7800,
    imageUrl: '/images/products/Papas & Snacks 2.jpg',
    isAvailable: true,
    ingredients: 'Papas fritas, nuggets, aros de cebolla, salsas',
    category: productCategories[10],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Salsa', default: false, price: 250 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '36',
    branchId: '1',
    name: 'Ensalada César',
    description: 'Clásica ensalada césar con aderezo especial',
    price: 7900,
    imageUrl: '/images/products/Ensalada Cesar.jpg',
    isAvailable: true,
    ingredients:
      'Lechuga romana, crutones, queso parmesano, pollo, aderezo césar',
    category: productCategories[11],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Pollo', default: false, price: 400 },
        { id: 2, name: 'Extra Parmesano', default: false, price: 250 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '37',
    branchId: '1',
    name: 'Ensalada Primavera',
    description: 'Fresca ensalada con variedad de vegetales de temporada',
    price: 7600,
    imageUrl: '/images/products/Ensalada Primavera.jpg',
    isAvailable: true,
    ingredients: 'Mix de verdes, tomate cherry, zanahoria, pepino, vinagreta',
    category: productCategories[11],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Pollo', default: false, price: 400 },
        { id: 2, name: 'Nueces', default: false, price: 250 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 2,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '38',
    branchId: '1',
    name: 'Menú Infantil Hamburguesa',
    description: 'Mini hamburguesa con papas fritas para los más pequeños',
    price: 10500,
    imageUrl: '/images/products/Burger Infantil.jpg',
    isAvailable: true,
    ingredients: 'Mini hamburguesa, pan, queso, papas fritas, jugo',
    category: productCategories[12],
    customization: {
      ingredientOptions: [
        { id: 1, name: 'Extra Queso', default: false, price: 200 },
      ],
      condimentOptions: condiments,
      maxIngredientSelections: 1,
      maxCondimentSelections: 2,
    },
  },
  {
    id: '39',
    branchId: '1',
    name: 'Jugo de Naranja',
    description: 'Jugo natural de naranja recién exprimido',
    price: 4200,
    imageUrl: '/images/products/Jugo-de-Naranja.jpg',
    isAvailable: true,
    ingredients: 'Naranjas frescas',
    category: productCategories[8],
    customization: {
      ingredientOptions: [],
      condimentOptions: {},
      maxIngredientSelections: 0,
      maxCondimentSelections: 0,
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
