The application flow is:

- **User Enters the Site**

  - The user lands on the homepage, greeted by a welcoming interface (e.g., HeroBanner, Header).

- **User Selects a Branch**

  - The user chooses a branch from a list (via BranchCard components). This selection is required before product interaction and is stored in the CartContext. If no branch is selected, the app redirects to the branch selection page.

- **User Selects and Customizes Products**

  - The user browses products (via CategorySection/ProductCard) and selects one, opening a modal (AddToCartModal) to customize it (e.g., ingredients, condiments, comments) and set a quantity (defaulting to 1). They then add it to the cart (via AddToCartButton and CartContext’s addToCart).
  - This can be repeated for any number of products.
  - **Details:**
    - Ingredients with costs increase the product’s price.
    - Each addition creates a cart item with a unique identifier (via CartContext), even if the product is the same but with different customizations (e.g., burger without bacon vs. with bacon).
    - On the products page, hovering over a ProductCard reveals a QuantityControl to adjust quantity. Adjusting the quantity and adding to the cart creates a new cart item with default/no customization, which the user can edit later in checkout.

- **Cart Drawer Reflects Selections**

  - The CartDrawer displays all added products, grouping them by product name (e.g., “2x Doble Cuarto” sums quantities and prices, via CartItem). It shows the total quantity and price per product type, without displaying customization details.
  - Users can clear the cart using a trash icon (via CartHeader’s onClearCart), which triggers a confirmation modal (CartClearingModal) before clearing all items (via CartContext’s clearCart).
  - A “Ver Carrito” button navigates to the checkout page.

- **User Proceeds to Checkout**

  - Clicking “Ver Carrito” in the CartDrawer navigates to the checkout page (app/branches/[branchId]/cart/page.tsx).

- **Checkout Page Details**
  - **Product Listing:**
    - Each cart item is listed separately, showing its unique identifier, customizations (e.g., ingredients), original price (base price + customization costs), a discount badge (via DiscountBadge, if applicable), and the discounted price (via usePriceCalculation).
    - Identical products with different customizations are distinct items (e.g., “Doble Cuarto without bacon” and “Doble Cuarto with bacon”).
    - Users can edit an item’s customization (via AddToCartModal), updating its price and details while retaining its identifier (via CartContext’s updateCartItem). They can also adjust quantities (via QuantityControl).
  - **Summary Box:**
    - **Total Price:** Sum of each item’s original price × quantity.
    - **Discounts Total:** Sum of product-specific discounts × quantity (calculated separately from payment method discounts).
    - **Subtotal:** Total price - discounts total.
    - **Payment Method Discount:** A percentage discount on the subtotal (e.g., 10% for bank transfer or cash, 0% for Mercado Pago), selected dynamically on the checkout page.
    - **Delivery Fee:** A fixed or variable fee added last.
    - **Total:** (Subtotal - (subtotal × payment method discount percentage)) + delivery fee, representing the final amount to pay.
  - **Payment Method Selection:**
    - The user selects a payment method (e.g., bank transfer, cash, Mercado Pago) from a list (via PaymentMethodSelector). This selection is stored in the CheckoutContext and affects the payment method discount percentage.
    - The payment method discount percentage is used to calculate the final total (via SummaryBox).
    - The user can confirm their order by clicking the "Confirmar Pedido" button (via ConfirmOrderButton). This triggers a confirmation modal (via CartClearingModal) before submitting the order (via useOrderSubmit).
