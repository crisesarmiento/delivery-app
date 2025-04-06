/**
 * Text constants for the application
 * Following the naming convention of UPPERCASE for constants
 */

export const CART_TEXTS = {
  CART_TITLE: 'Mi pedido',
  EMPTY_CART:
    'Tu carrito está vacío. Agregá productos para comenzar tu pedido.',
  CHECKOUT: 'Realizar pedido',
  CLEAR_CART: 'Limpiar carrito',
  VIEW_CART: 'Ver Carrito',
  CART_EMPTY_CONFIRM: '¿Estás seguro que deseas vaciar el carrito?',
  TOTAL: 'Total',
  SUBTOTAL: 'Subtotal',
  NO_BRANCH_SELECTED:
    'No se puede acceder al carrito sin una sucursal seleccionada',
  ADD_TO_CART: 'Agregar al carrito',
};

export const CHECKOUT_TEXTS = {
  DELIVERY_DETAILS: 'Detalle de entrega',
  DELIVERY: 'Delivery',
  PICKUP: 'Retiro',
  FULL_NAME: 'Nombre completo',
  PHONE: 'Teléfono',
  ADDRESS: 'Domicilio',
  CITY: 'Ciudad',
  PROVINCE: 'Provincia',
  NOTE: 'Nota',
  PAYMENT_METHOD: 'Método de pago',
  CASH: 'Efectivo',
  TRANSFER: 'Transferencia',
  CREDIT_CARD: 'Tarjeta de crédito',
  PAYMENT_AMOUNT: 'Monto de pago',
  ORDER_SUMMARY: 'Resumen del pedido',
  SUMMARY_TITLE: 'Resumen',
  PRODUCTS_LABEL: 'Productos',
  SUBTOTAL: 'Subtotal',
  PRODUCT_DISCOUNT: 'Descuento productos',
  PAYMENT_DISCOUNT: 'Descuento de pago',
  SHIPPING_COST: 'Costo de envío',
  TOTAL: 'Total',
  CONFIRM_ORDER: 'Confirmar pedido',
  VALIDATION_ERROR: 'Por favor completa los siguientes campos:',
  PAYMENT_DISCOUNT_WITH_PERCENTAGE: 'Transferencia Bancaria (Descuento 10%)',
  CASH_WITH_PERCENTAGE: 'Efectivo (Descuento 10%)',
  PAYMENT_AMOUNT_QUESTION: 'Con cuánto vas a pagar?',
  NOTE_FOR_RESTAURANT: 'Nota para el local',
};

export const COMMON_TEXTS = {
  NO_PRODUCTS_AVAILABLE: 'No hay productos disponibles',
  BRANCH_NOT_FOUND:
    'Sucursal no encontrada. Redirigiendo a la página de sucursales.',
  ORDER_CONFIRMED: '¡Pedido confirmado! Gracias por tu compra.',
};

export const BRANCH_TEXTS = {
  BRANCH_CLOSED: 'La sucursal se encuentra cerrada en este momento.',
  BRANCH_CLOSED_ALERT:
    'Lo sentimos, esta sucursal está cerrada en este momento.',
  BRANCH_CLOSED_MESSAGE: 'Sucursal Cerrada',
  UNAVAILABLE_MESSAGE: 'No Disponible',
  SOME_BRANCHES_CLOSED:
    'Una o más sucursales se encuentran cerradas en este momento.',
  NO_BRANCHES_FOUND:
    'No se encontraron sucursales que coincidan con su búsqueda.',
  BRANCHES_TITLE: 'SUCURSALES',
  OPEN_STATUS: 'Abierto',
  CLOSED_STATUS: 'Cerrado',
};

export const ERROR_TEXTS = {
  GENERAL_ERROR_TITLE: 'Ha ocurrido un error',
  GENERAL_ERROR_MESSAGE:
    'Lo sentimos, algo salió mal. Por favor intenta recargar la página.',
  RELOAD_PAGE: 'Recargar página',
  MISSING_CALLBACK:
    'Please implement onClearCart function in the parent component',
  INVALID_PRODUCT: 'Producto inválido',
  INVALID_QUANTITY: 'Cantidad inválida',
};

export const LOADING_TEXTS = {
  LOADING: 'Cargando...',
  PROCESSING: 'Procesando...',
  REDIRECTING: 'Redirigiendo...',
};

export const PRODUCT_TEXTS = {
  ADD_TO_CART: 'Agregar al carrito',
  PRODUCT_DETAILS: 'Detalles del producto',
  INGREDIENTS: 'Ingredientes',
  CUSTOMIZATION: 'Personalización',
  QUANTITY: 'Cantidad',
  ADD_TO_CART_ARIA: 'Agregar al carrito',
  OFF: 'OFF',
  PROMO_KEYWORD: 'promo',
};

export const MODAL_TEXTS = {
  CUSTOMIZE_HELPER_TEXT:
    'En comentarios, aclaranos si lo preferis sin chimi. Gracias!',
  COMMENTS_LABEL: 'Comentarios',
  INGREDIENTS_SECTION_TITLE: 'Elige hasta',
  INGREDIENTS_SUFFIX: 'Ingredientes',
  COMMENTS_PLACEHOLDER: 'Instrucciones especiales, alergias, etc.',
  CHAR_COUNT: 'caracteres',
  CONDIMENTS_SECTION_TITLE: 'Elige',
  CONDIMENTS_SUFFIX: 'Aderezos',
  DISCOUNT_BADGE: '20% OFF',
  CHAR_COUNT_SUFFIX: '/100',
  MAX_CONDIMENTS_ALERT: 'Solo puedes elegir {0} aderezos',
};

export const MENU_TEXTS = {
  TITLE: 'Menú',
  BRANCHES: 'Sucursales',
  ABOUT_US: 'Acerca de Nosotros',
  CONTACT: 'Contacto',
};

export const CATEGORY_TEXTS = {
  PROMO: 'Promociones',
  CATEGORY_TITLE: 'Categorías',
};

// New constant group for branch hours texts
export const BRANCH_HOURS_TEXTS = {
  TITLE: 'Horario',
  WEEKDAY: 'Lunes a Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
  CLOSED: 'Cerrado',
};

// New constants for ProductGrid, CategorySection, etc.
export const PRODUCT_GRID_LOGS = {
  GRID_DIMENSIONS:
    'ProductGrid: visible width={0}px, total width={1}px, scrollable={2}',
};

export const SECTION_TEXTS = {
  SECTION_HEADER: 'Sección',
};

export const STYLE_CONSTANTS = {
  TRANSITION_EASE: 'all 0.2s ease',
};

export const HERO_BANNER_TEXTS = {
  DEFAULT_TITLE: 'Smarty Delivery',
  DEFAULT_SUBTITLE: 'Disfruta de tu comida favorita a domicilio',
  DEFAULT_BUTTON_TEXT: 'Ordenar Ahora',
};

export const SEARCH_TEXTS = {
  BRANCH_SEARCH_PLACEHOLDER: 'Busca una sucursal...',
  FOOD_SEARCH_PLACEHOLDER: '¿Qué te gustaría comer hoy?',
  DEFAULT_SEARCH_PLACEHOLDER: 'Buscar...',
  PRODUCT_SEARCH_PLACEHOLDER: 'Buscar un Producto...',
};

export const HEADER_TEXTS = {
  BACK_BUTTON: 'Atrás',
  LOGO_TEXT: 'PUNTO 33',
};

// New constants for UI components
export const UI_CONSTANTS = {
  BUTTON_VARIANTS: {
    SUBTLE: 'subtle',
    PRIMARY: 'primary',
    OUTLINE: 'outline',
    FILLED: 'filled',
    DEFAULT: 'default',
  },
};

export const FOOTER_TEXTS = {
  POWERED_BY: 'Powered by',
  SMARTY: 'SMARTY',
  ABOUT_SMARTY: 'Acerca de Smarty',
  CONTACT: 'Contacto',
  COPYRIGHT:
    'Copyright 2023 smarty.com | Todos los derechos reservados | Política de privacidad | Términos y Condiciones de Uso',
  ALT_FACEBOOK: 'Facebook',
  ALT_TWITTER: 'Twitter',
  ALT_INSTAGRAM: 'Instagram',
};

// Append new accessibility texts
export const ACCESSIBILITY_TEXTS = {
  REMOVE_FROM_CART: 'Eliminar del carrito',
  DECREASE_QUANTITY: 'Disminuir cantidad',
  INCREASE_QUANTITY: 'Aumentar cantidad',
};
