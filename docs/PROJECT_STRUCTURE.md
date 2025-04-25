# Smarty Delivery Web – React Project Structure and Component Usage

## Directory Structure (excluding .next, node_modules, public)

- app/
  - ClientLayout.tsx
  - ThemeProvider.tsx
  - api/
    - hello/
      - route.ts
  - branches/
    - [branchId]/
      - cart/
        - page.module.css
        - page.tsx
      - page.module.css
      - page.tsx
    - layout.tsx
    - not-found.tsx
    - page.module.css
    - page.tsx
  - global.css
  - layout.tsx
  - page.module.css
  - page.tsx
  - providers.tsx
- components/
  - AddToCartButton/
    - AddToCartButton.tsx
    - AddToCartButton.module.css
    - index.ts
  - AddToCartModal/
    - AddToCartModal.tsx
    - AddToCartModal.module.css
  - BasePage/
    - BasePage.tsx
    - BasePage.module.css
    - index.ts
  - BranchCard/
    - Badge.tsx
    - BranchCard.tsx
    - BranchHoursTooltip.tsx
    - index.tsx
  - CartClearingModal/
    - CartClearingModal.tsx
    - CartClearingModal.module.css
  - CartDrawer/
    - CartDrawer.tsx
    - CartFooter.tsx
    - CartHeader.tsx
    - CartItem.tsx
    - EmptyCart.tsx
    - index.ts
  - CategorySection/
    - CategorySection.tsx
    - CategorySection.module.css
    - ProductCard.tsx
    - index.tsx
  - CategoryTabs/
    - CategoryTabs.tsx
    - CategoryTabs.module.css
  - ClientErrorBoundary/
    - ClientErrorBoundary.tsx
  - ClosedNotification/
    - ClosedNotification.tsx
    - ClosedNotification.module.css
  - ContentWrapper/
    - ContentWrapper.tsx
    - ContentWrapper.module.css
  - DiscountBadge/
    - DiscountBadge.tsx
    - DiscountBadge.module.css
  - ErrorBoundary/
    - ErrorBoundary.tsx
  - Footer/
    - Footer.tsx
    - Footer.module.css
    - index.tsx
  - Header/
    - CheckoutHeader.tsx
    - CheckoutHeader.module.css
    - Header.tsx
    - Header.module.css
    - HeaderComponents.tsx
    - ProductsHeader.tsx
    - ProductsHeader.module.css
    - index.tsx
  - HeroBanner/
    - HeroBanner.tsx
  - LoadingState/
    - LoadingState.tsx
  - MenuDrawer/
    - MenuDrawer.tsx
  - MobileCartButton/
    - MobileCartButton.tsx
    - MobileCartButton.module.css
    - index.tsx
  - ProductCard/
    - ProductCard.tsx
    - ProductCard.module.css
  - ProductGrid/
    - ProductGrid.tsx
    - ProductGrid.module.css
  - ProductsHeaderWrapper/
    - ProductsHeaderWrapper.tsx
    - ProductsHeaderWrapper.module.css
  - QuantityControl/
    - QuantityControl.tsx
    - QuantityControl.module.css
  - SectionHeader/
    - SectionHeader.tsx
    - SectionHeader.module.css
- context/
  - CartContext.tsx

## Component Usage and CSS Association

### Example (format for each component):

#### AddToCartButton
- **Path:** components/AddToCartButton/AddToCartButton.tsx
- **CSS:** AddToCartButton.module.css
- **Used by:** (files that import this component)

---

### AddToCartButton
- **Path:** `components/AddToCartButton/AddToCartButton.tsx`
- **CSS:** `AddToCartButton.module.css`
  - **Classes Used:**
    - `.addToCartButton`:
      - width: 40px;
      - height: 40px;
      - border-radius: 50%;
      - background-color: #b3ff00;
      - color: #000000;
      - display: flex;
      - align-items: center;
      - justify-content: center;
      - z-index: 10;
      - transition: transform 0.2s, background-color 0.2s;
      - **Hover:**
        - transform: scale(1.1);
        - background-color: #a2e600;
  - **Overrides:**
    - The class is combined with `className` prop in: `className={`${styles.addToCartButton} ${className || ''}`}`. If a parent passes a `className` prop, it may override/add styles, but there is no direct `style` prop override in this component.
- **Exports:** Default export
- **Re-exported by:** `components/AddToCartButton/index.ts`
- **Props:**
  - `product: IProduct`
  - `onAddToCart: (product: IProduct, quantity: number) => void`
  - `className?: string`
- **Used by (direct imports):**
  - _No direct imports found in components or app (likely used via re-export or in other files not yet detected)._
- **Components used:**
  - `ActionIcon` (from Mantine)
  - `IconShoppingCart` (from Tabler)
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Pure UI button for adding a product to cart. Uses CSS module for styling. Allows parent to override/add classes via `className` prop, but no inline style prop is used.

---

### CategoryTabs
- **Path:** `components/CategoryTabs/CategoryTabs.tsx`
- **CSS:** `CategoryTabs.module.css`
  - **Classes Used:**
    - `.stickyContainer`: fixed position, top, width, z-index, background, padding, etc.
      - **Override:** The `top` property is overridden via the `style={{ top: top }}` prop in TSX, which allows dynamic vertical positioning.
    - `.categoryTitleContainer`: flex, background, justify, width
    - `.categoryTitle`: font, color, background
    - `.categoriesContainer`: background, min-height, overflow, scrollbar
    - `.tabsContainer`: background, width, padding
    - `.tabsList`: flex row, no wrap, padding, width: max-content
    - `.tab`: flex, align, padding, border, background, font, color, transition, margin
      - **Hover:** background-color changes
      - **[data-active]:** background, border, color change
  - **Overrides:**
    - `.stickyContainer`'s `top` is dynamically set via `style={{ top: top }}` in the TSX.
    - `.tab`'s marginRight is overridden for each tab via `style={{ marginRight: '16px' }}` in the TSX.
    - The Tabs.List also applies custom inline styles for layout.
- **Exports:** Default export
- **Props:**
  - `categories: string[]`
  - `activeTab: string`
  - `onTabChange: (value: string | null) => void`
  - `top?: number`
- **Used by (direct imports):**
  - _To be filled by further import analysis_
- **Components used:**
  - Mantine: `Box`, `Tabs`, `ScrollArea`, `Text`
- **Hooks used:**
  - `useRef`, `useEffect`, `useCallback`
  - `useScrollIntoView` (Mantine hook)
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Responsive, sticky tab bar for categories. Supports dynamic positioning and horizontal scrolling. Several CSS properties are overridden inline for flexibility.

---

### ContentWrapper
- **Path:** `components/ContentWrapper/ContentWrapper.tsx`
- **CSS:** `ContentWrapper.module.css`
  - **Classes Defined:**
    - `.contentWrapper`: position: relative, width: 100%, flex column, z-index: 5, responsive padding
  - **Classes Used:**
    - Not used directly in the TSX; instead, a Mantine `Box` is used with an inline style for `marginTop` set to the `topOffset` prop.
  - **Overrides:**
    - The main layout is controlled by the inline style `style={{ marginTop: topOffset }}` in the TSX, not by the CSS module.
- **Exports:** Default export (with forwardRef)
- **Props:**
  - `topOffset: number`
  - `children: React.ReactNode`
- **Used by (direct imports):**
  - _To be filled by further import analysis_
- **Components used:**
  - Mantine: `Box`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Wrapper for content with dynamic top offset. CSS module is defined but not applied in the TSX; layout is controlled by inline style.

---

### CategorySection
- **Path:** `components/CategorySection/CategorySection.tsx`
- **CSS:** `CategorySection.module.css`
  - **Classes Used:**
    - `.categorySection`: flex column, width 100%, margin, z-index, responsive padding
    - `.categoriesContainer`: background, transition, responsive
    - `.categoriesFixed`: fixed position, top, z-index, box-shadow, responsive
    - `.scrollableContainer`: flex column, width 100%, margin-top, scrollbar hidden
  - **Overrides:**
    - The `mb` prop on the Mantine `Box` sets margin-bottom dynamically based on mobile state (`mb={isMobile ? '16px' : '32px'}`), which will override or supplement margin set by the CSS module.
    - The `headerClasses` string conditionally adds `.categoriesFixed` for fixed header behavior.
- **Exports:** Default export (memoized)
- **Props:**
  - `title: string`
  - `products: IProduct[]`
  - `onAddToCart: (product: IProduct, quantity: number) => void`
  - `isInitiallyExpanded?: boolean`
  - `onToggleExpand?: (isExpanded: boolean) => void`
  - `isDisabled?: boolean`
  - `isFixed?: boolean`
- **Used by (direct imports):**
  - `components/CategorySection/index.tsx`
- **Components used:**
  - Mantine: `Box`
  - Local: `ProductGrid`, `SectionHeader`
- **Hooks used:**
  - `useState`, `useEffect`
  - `memo` (React)
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Category section with expandable/collapsible state, responsive layout, and dynamic margin. Combines CSS modules with dynamic inline styles for layout and mobile responsiveness.

---

### AddToCartModal
- **Path:** `components/AddToCartModal/AddToCartModal.tsx`
- **CSS:** `AddToCartModal.module.css`
- **Exports:** Default export
- **Props:**
  - `product: IProduct`
  - `opened: boolean`
  - `onClose: () => void`
  - `onAddToCart: (quantity: number, cartItem?: CartItemCustomization) => void`
  - `initialQuantity?: number`
  - `initialIngredients?: IngredientItem[]`
  - `initialCondiments?: string[]`
  - `initialComments?: string`
- **Used by (direct imports):**
  - `components/ProductCard/ProductCard.tsx`
  - `app/branches/[branchId]/cart/page.tsx`
- **Components used:**
  - Mantine UI: `Text`, `Image`, `Flex`, `Box`, `Button`, `Textarea`, `Checkbox`, `Modal`, `Collapse`
  - Tabler Icons: `IconShoppingCart`, `IconX`, `IconChevronDown`, `IconChevronUp`
  - `QuantityControl` (local component)
- **Hooks used:**
  - `useState`, `useEffect`, `useRef`, `useMemo`
  - Custom hooks: `useIngredients`, `useCondiments`, `usePriceCalculation`
- **Context:** None detected directly
- **Is Page/Route:** No
- **Notes:** Modal for adding products to cart with customization (ingredients, condiments, comments). Handles product customization logic and uses several custom hooks.

---

### BasePage
- **Path:** components/BasePage/BasePage.tsx
- **CSS:** BasePage.module.css
- **Used by:**
  - (to be filled by import analysis)

### BranchCard
- **Path:** components/BranchCard/BranchCard.tsx
- **CSS:** (none directly, but see subcomponents)
- **Used by:**
  - components/BranchCard/index.tsx

### CartClearingModal
- **Path:** components/CartClearingModal/CartClearingModal.tsx
- **CSS:** CartClearingModal.module.css
- **Used by:**
  - (to be filled by import analysis)

### CartDrawer
- **Path:** components/CartDrawer/CartDrawer.tsx
- **CSS:** (none)
- **Used by:**
  - (to be filled by import analysis)

### CategorySection
- **Path:** components/CategorySection/CategorySection.tsx
- **CSS:** CategorySection.module.css
- **Used by:**
  - components/CategorySection/index.tsx

### CategoryTabs
- **Path:** components/CategoryTabs/CategoryTabs.tsx
- **CSS:** CategoryTabs.module.css
- **Used by:**
  - (to be filled by import analysis)

### ClientErrorBoundary
- **Path:** components/ClientErrorBoundary/ClientErrorBoundary.tsx
- **CSS:** (none)
- **Used by:**
  - app/ClientLayout.tsx

### ClosedNotification
- **Path:** `components/ClosedNotification/ClosedNotification.tsx`
- **CSS:** `ClosedNotification.module.css`
  - **Classes Used:**
    - `.closedNotification`:
      - display: flex;
      - flex-direction: row;
      - justify-content: center;
      - align-items: center;
      - padding: 8px;
      - gap: 8px;
      - width: 100%;
      - max-width: 100%;
      - margin: 0 auto;
      - background: #fef1f2;
      - position: fixed;
      - top: 0; left: 0; right: 0;
      - z-index: 1000;
    - `.closedMessage`:
      - font-family: 'Inter';
      - font-style: normal;
      - font-weight: 500;
      - font-size: 12px;
      - line-height: 18px;
      - display: flex;
      - align-items: center;
      - color: #e02d3c;
  - **Overrides:** None (no `style` prop or inline style detected in TSX).
- **Exports:** Default export
- **Props:**
  - `message?: string` (defaults to `BRANCH_TEXTS.BRANCH_CLOSED`)
- **Used by (direct imports):**
  - _To be filled by further import analysis_
- **Components used:**
  - Mantine: `Box`, `Text`
- **Hooks used:**
  - `useEffect` (adds/removes a class to `<body>` when shown/hidden)
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Fixed, full-width notification banner for branch closed state. Dynamically adds/removes a class to `<body>` to enable global style effects if needed.

---

### ClientErrorBoundary
- **Path:** `components/ClientErrorBoundary/ClientErrorBoundary.tsx`
- **CSS:** _(none)_
- **Exports:** Default export
- **Props:**
  - `children: ReactNode`
- **Used by (direct imports):**
  - `app/ClientLayout.tsx`
- **Components used:**
  - Dynamically imports and renders `ErrorBoundary` (SSR disabled)
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Client-side error boundary wrapper. Uses Next.js dynamic import to ensure error boundary is only rendered on the client (SSR disabled).

---

### ContentWrapper
- **Path:** `components/ContentWrapper/ContentWrapper.tsx`
- **CSS:** `ContentWrapper.module.css`
  - **Classes Defined:**
    - `.contentWrapper`: position: relative; width: 100%; display: flex; flex-direction: column; z-index: 5; responsive padding (on mobile)
  - **Classes Used:**
    - Not used directly in the TSX; instead, a Mantine `Box` is used with an inline style for `marginTop` set to the `topOffset` prop.
  - **Overrides:**
    - The main layout is controlled by the inline style `style={{ marginTop: topOffset }}` in the TSX, not by the CSS module.
- **Exports:** Default export (with forwardRef)
- **Props:**
  - `topOffset: number`
  - `children: React.ReactNode`
- **Used by (direct imports):**
  - _To be filled by further import analysis_
- **Components used:**
  - Mantine: `Box`
- **Hooks used:** None (uses forwardRef)
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Wrapper for content with dynamic top offset. CSS module is defined but not applied in the TSX; layout is controlled by inline style. Uses React `forwardRef` for ref forwarding.

---

### ErrorBoundary
- **Path:** `components/ErrorBoundary/ErrorBoundary.tsx`
- **CSS:** _(none)_
- **Exports:** Default export (class component)
- **Props:**
  - `children: ReactNode`
  - `fallback?: ReactNode`
- **Used by (direct imports):**
  - `components/ClientErrorBoundary/ClientErrorBoundary.tsx`
- **Components used:**
  - Mantine: `Box`, `Text`, `Button`
- **Hooks used:** None (class lifecycle methods)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Implements React error boundary pattern as a class component.
  - Uses `getDerivedStateFromError`, `componentDidCatch`, and custom error UI.
  - Logs errors to console and allows page reload on error.
  - Accepts an optional `fallback` prop for custom error UI.

---

### BasePage
- **Path:** `components/BasePage/BasePage.tsx`
- **CSS:** `BasePage.module.css`
  - **Classes Used:**
    - `.pageContainer`: flex column layout, min/max width, background, overflow-x hidden
    - `.headerContainer`: sticky header, z-index, border, background
    - `.hasNotification .headerContainer`: adjusts top if notification present
    - `.contentWrapper`: flex, relative, padding for notification
    - `.sidebarContainer`: fixed, scrollable sidebar, responsive hidden on mobile
    - `.mainContent`: main area, background, responsive
    - `.footerContainer`: styled footer
  - **Overrides:**
    - Adds `.hasNotification` class dynamically based on body class
- **Exports:** Default export
- **Props:**
  - `children: ReactNode`
  - `headerSlot?: ReactNode`
  - `footerSlot?: ReactNode`
  - `sidebarSlot?: ReactNode`
  - `className?: string`
  - All Mantine `BoxProps`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`
- **Hooks used:**
  - `useState`, `useEffect` (tracks notification state, observes DOM class changes)
- **Context:** None
- **Is Page/Route:** No
- **Notes:** Uses MutationObserver to detect notification banner state and update layout.

---

### BranchCard
- **Path:** `components/BranchCard/BranchCard.tsx`
- **CSS:** _(none found)_
- **Exports:** Default export
- **Props:**
  - `branch: IBranch`
  - `onClick?: () => void`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Card`, `Text`, `Box`, `BranchBadge`, `BranchHoursTooltip`, `IconClock`
- **Hooks used:**
  - `useState`, `useEffect` (hover state, mobile detection, tooltip visibility)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Uses many inline styles for layout, color, and responsive design.
  - Handles hover and tooltip visibility with state.

---

### CartClearingModal
- **Path:** `components/CartClearingModal/CartClearingModal.tsx`
- **CSS:** `CartClearingModal.module.css`
  - **Classes Used:**
    - `.modalOverlay`, `.modalContent`, `.modalHeader`, `.closeButton`, `.modalBody`, `.modalTitle`, `.modalText`, `.modalFooter`, `.modalConfirmButton`, `.modalCancelButton`
    - Each class controls modal layout, button appearance, and responsive behavior
  - **Overrides:**
    - Uses Mantine Modal with custom classes, and sets body `overflow` and `userSelect` via useEffect for modal open/close
- **Exports:** Named export
- **Props:**
  - `clicked: boolean`
  - `onNavigate: (route: string) => void`
  - `onClose?: () => void`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Modal`, `Text`, `Button`, `Box`, `Flex`, `IconX`
- **Hooks used:**
  - `useDisclosure`, `useEffect`, custom `useCart`
- **Context:** Uses `CartContext`
- **Is Page/Route:** No
- **Notes:**
  - Synchronizes modal open state with props and cart state.
  - Cleans up and locks body scroll/user-select during modal open.

---

### DiscountBadge
- **Path:** `components/DiscountBadge/DiscountBadge.tsx`
- **CSS:** `DiscountBadge.module.css`
  - **Classes Used:**
    - `.discountBadge`: styled badge for discounts (size, color, border-radius, font)
  - **Overrides:**
    - Accepts `className` prop for further override
- **Exports:** Default export
- **Props:**
  - `discountPercentage?: number` (default 20)
  - `className?: string`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** None (just a styled div)
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Simple badge for displaying a discount percentage.

---

### Footer
- **Path:** `components/Footer/Footer.tsx`
- **CSS:** `Footer.module.css`
  - **Classes Used:**
    - `.footer`, `.container`, `.gridContainer`, `.poweredByContainer`, `.poweredByText`, `.smartyText`, `.linksContainer`, `.link`, `.divider`, `.bottomContainer`, `.socialContainer`, `.copyrightContainer`, `.copyright`
    - Responsive adjustments for mobile
  - **Overrides:** None
- **Exports:** Default export
- **Props:** None
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`, `Text`, `Divider`, Next.js `Link`, `Image`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Structured footer with grid layout, links, copyright, and responsive design.

---

### Header
- **Path:** `components/Header/Header.tsx`
- **CSS:** `Header.module.css`
  - **Classes Used:**
    - `.headerContainer`, `.logoContainer`, `.menuButtonContainer`, `.branchesTitle`, `.searchContainer`, `.hiddenSearch`, `.leftBlackOverlay`, `.collapsedHeader`, `.bottomHeader`, etc.
    - Responsive and state-based adjustments for collapsed header and search
  - **Overrides:**
    - Uses Mantine and custom hooks to dynamically control header collapse and search bar visibility
- **Exports:** Default export
- **Props:**
  - `showSearchBar?: boolean`
  - `searchValue?: string`
  - `onSearchChange?: (value: string) => void`
  - `showClosedNotification?: boolean`
  - `closedMessage?: string`
  - `isFiltering?: boolean`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`, `Text`, custom `MenuDrawer`, `Logo`, `MenuButton`, `SearchBar`
- **Hooks used:**
  - `useState`, `useEffect`, `useRef`, `useDisclosure`, `useHeadroom`, Next.js `useRouter`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Emits custom events for header state changes.
  - Responsive and dynamic header with search and menu.

---

### HeroBanner
- **Path:** `components/HeroBanner/HeroBanner.tsx`
- **CSS:** _(inline styles only)_
  - **Overrides:**
    - All layout and background handled via inline styles (background images, overlays, responsive height, etc.)
- **Exports:** Named export
- **Props:**
  - `imageUrl: string`
  - `title?: string`
  - `subtitle?: string`
  - `buttonText?: string`
  - `height?: number`
  - `onButtonClick?: () => void`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`, `Container`, `Title`, `Text`, `Stack`, `Button`, `Group`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - All visual styling and overlays are controlled by inline styles for background image, overlay, and content stacking.

---

### LoadingState
- **Path:** `components/LoadingState/LoadingState.tsx`
- **CSS:** _(inline styles only)_
  - **Overrides:**
    - Uses Mantine `Box` and inline styles for loading indicator layout
- **Exports:** Default export
- **Props:** None
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Simple loading indicator, no CSS module.

---

### MenuDrawer
- **Path:** `components/MenuDrawer/MenuDrawer.tsx`
- **CSS:** _(inline styles only, no CSS module)_
  - **Overrides:**
    - Drawer and button layout, colors, and transitions are controlled by inline styles and Mantine theming
- **Exports:** Default export
- **Props:**
  - `opened: boolean`
  - `onClose: () => void`
  - `clicked: boolean`
  - `onNavigate: (route: string) => void`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Drawer`, `Box`, `Text`, `UnstyledButton`, Tabler `Icon` components, custom `CartClearingModal`
- **Hooks used:**
  - `useTheme`, `useState`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Renders navigation and contact options with hover effects; uses `CartClearingModal` for cart clearing logic.

---

### MobileCartButton
- **Path:** `components/MobileCartButton/MobileCartButton.tsx`
- **CSS:** `MobileCartButton.module.css`
  - **Classes Used:**
    - `.mobileCartButton`, `.button`, `.addToCartLeft`, `.addToCartRight`, `.iconShoppingCart`, `.buttonText`, `.totalAmount`
  - **Overrides:**
    - Inline styles for layout and positioning of icon/text/subtotal
- **Exports:** Default export
- **Props:**
  - `cartItems: CartItem[]`
  - `cartTotal: number`
  - `onClick?: () => void`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Button`, `Flex`, `Text`, Tabler `IconShoppingCart`
- **Hooks used:**
  - Next.js `usePathname`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Only renders on non-`/branches` routes. Uses both CSS module and inline styles for layout.

---

### ProductCard
- **Path:** `components/ProductCard/ProductCard.tsx`
- **CSS:** `ProductCard.module.css`
  - **Classes Used:**
    - `.productCard` (applied in grid), others for layout, hover, and responsive adjustments
  - **Overrides:**
    - Extensive use of inline styles for card, image, badge, buttons, and overlay
- **Exports:** Default export
- **Props:**
  - `product: IProduct`
  - `isDisabled?: boolean`
- **Used by (direct imports):** `ProductGrid`
- **Components used:** Mantine `Card`, `Text`, `Badge`, `Image`, `Overlay`, `Box`, Tabler `IconShoppingCart`, custom `DiscountBadge`, `AddToCartModal`, `QuantityControl`
- **Hooks used:**
  - `useState`, `useMemo`, custom `useCart`
- **Context:** Uses `CartContext`
- **Is Page/Route:** No
- **Notes:**
  - Handles hover, discount logic, cart interactions, and modal state.

---

### ProductGrid
- **Path:** `components/ProductGrid/ProductGrid.tsx`
- **CSS:** `ProductGrid.module.css`
  - **Classes Used:**
    - `.productsGrid` (main grid container), responsive adjustments for gap/padding, custom scrollbar
  - **Overrides:** None
- **Exports:** Default export
- **Props:**
  - `products: IProduct[]`
  - `className?: string`
  - `isDisabled?: boolean`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`, custom `ProductCard`
- **Hooks used:**
  - `useRef`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Horizontal scrollable grid for product cards, responsive design.

---

### ProductsHeaderWrapper
- **Path:** `components/ProductsHeaderWrapper/ProductsHeaderWrapper.tsx`
- **CSS:** `ProductsHeaderWrapper.module.css`
  - **Classes Used:**
    - `.productsHeaderWrapper`, `.headerContainer` (fixed/relative wrappers, responsive)
  - **Overrides:** None
- **Exports:** Default export
- **Props:**
  - `isHeaderCollapsed: boolean`
  - `headerHeight: number`
  - `collapsedHeaderHeight: number`
  - `header: ReactNode`
  - `categories: ReactNode`
- **Used by (direct imports):** _(to be filled)_
- **Components used:** Mantine `Box`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Fixed/relative wrapper for header and category tabs, responsive design.

---

### QuantityControl
- **Path:** `components/QuantityControl/QuantityControl.tsx`
- **CSS:** `QuantityControl.module.css`
  - **Classes Used:**
    - `.footerVariant`, `.ingredientVariant`, `.checkoutVariant`, `.button`, `.quantityText` (various layout/variant classes for different usages)
  - **Overrides:**
    - Inline styles for button icons, responsive adjustments, and variant-specific layouts
- **Exports:** Default export
- **Props:**
  - `initialQuantity?: number`
  - `minQuantity?: number`
  - `maxQuantity?: number`
  - `onChange?: (quantity: number) => void`
  - `onAddToCart?: () => void`
  - `isDisabled?: boolean`
  - `variant?: 'footer' | 'ingredient' | 'checkout' | 'productCard'`
- **Used by (direct imports):** `ProductCard`, cart components
- **Components used:** Mantine `Box`, `Text`, `Flex`, `Button`, Tabler `IconCircleMinus`, `IconCirclePlus`, `IconTrash`
- **Hooks used:**
  - `useState`, `useEffect`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Flexible quantity control for different UI contexts (footer, ingredient, checkout, product card). Responsive and accessible.

---

### SectionHeader
- **Path:** `components/SectionHeader/SectionHeader.tsx`
- **CSS:** `SectionHeader.module.css`
  - **Classes Used:**
    - `.sectionHeader`: flex, space-between, align-center, padding, bg, border, cursor, border-radius, margin
    - `.sectionTitle`: font, weight, size, color
    - `.toggleButton`: transparent bg, subtle variant
  - **Overrides:**
    - Uses Mantine theme for spacing and icons for toggle
- **Exports:** Default export
- **Props:**
  - `title: string`
  - `isExpanded?: boolean`
  - `toggleable?: boolean`
  - `onToggle?: () => void`
  - `className?: string`
- **Used by (direct imports):** CategorySection
- **Components used:** Mantine `Flex`, `Text`, `Button`, Tabler `IconChevronDown`, `IconChevronUp`
- **Hooks used:**
  - Mantine `useMantineTheme`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Provides expandable/collapsible section headers with theme-based spacing.

---

### CategorySection/ProductCard
- **Path:** `components/CategorySection/ProductCard.tsx`
- **CSS:** _(ProductCard.module.css missing)_
  - **Classes Used:**
    - `.productCard`, `.productImageContainer`, `.productImage`, `.productDetails`, `.productName`, `.productDescription`, `.priceAndButtonContainer`, `.productPrice`, `.addButton` (based on TSX usage)
  - **Overrides:**
    - Uses Mantine and inline styles for image error handling and button behavior
- **Exports:** Default export
- **Props:**
  - `product: IProduct`
  - `onAddToCart: (product: IProduct, quantity: number) => void`
- **Used by (direct imports):** CategorySection
- **Components used:** Mantine `Box`, `Text`, `Image`, `Button`
- **Hooks used:**
  - `useState` (image error state)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Handles image error fallback, add-to-cart logic, and basic product display.

---

### CartDrawer/CartHeader
- **Path:** `components/CartDrawer/CartHeader.tsx`
- **CSS:** _(none)_
  - **Overrides:**
    - Inline styles for header layout, positioning, and clear button
- **Exports:** Default export
- **Props:**
  - `onClearCart?: () => void`
- **Used by (direct imports):** CartDrawer
- **Components used:** Mantine `Box`, `Flex`, `Text`, `Button`, Tabler `IconTrash`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Displays cart title and optional clear cart button.

---

### CartDrawer/CartItem
- **Path:** `components/CartDrawer/CartItem.tsx`
- **CSS:** _(none)_
  - **Overrides:**
    - Inline styles for item layout, text, and price display
- **Exports:** Default export
- **Props:**
  - `item: { productId: string; quantity: number; product: IProduct; totalPrice?: number; }`
- **Used by (direct imports):** CartDrawer
- **Components used:** Mantine `Box`, `Text`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Displays cart item name, quantity, and price.

---

### CartDrawer/EmptyCart
- **Path:** `components/CartDrawer/EmptyCart.tsx`
- **CSS:** _(none)_
  - **Overrides:**
    - Inline styles for empty cart box, icon, and text
- **Exports:** Default export
- **Props:** None
- **Used by (direct imports):** CartDrawer
- **Components used:** Mantine `Box`, `Flex`, `Text`, `Divider`, Tabler `IconShoppingCart`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Shows empty cart message and icon when cart is empty.

---

### CartDrawer/CartFooter
- **Path:** `components/CartDrawer/CartFooter.tsx`
- **CSS:** _(none)_
  - **Overrides:**
    - Inline styles for divider, total row, and button (including hover state)
- **Exports:** Default export
- **Props:**
  - `cartTotal: number`
  - `onCheckout: () => void`
- **Used by (direct imports):** CartDrawer
- **Components used:** Mantine `Box`, `Text`, `Button`, `Divider`, Tabler `IconShoppingCart`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Displays cart total and checkout button with custom styling.

---

### CategoryTabs
- **Path:** `components/CategoryTabs/CategoryTabs.tsx`
- **CSS:** `CategoryTabs.module.css`
  - **Classes Used:**
    - `.stickyContainer`, `.categoriesContainer`, `.tabsContainer`, `.tabsList`, `.tab`, `.tab[data-active]`, `.categoryTitleContainer`, `.categoryTitle` (with responsive/mobile adjustments)
  - **Overrides:**
    - Uses inline style for `top` to dynamically position sticky container
- **Exports:** Default export
- **Props:**
  - `categories: string[]`
  - `activeTab: string`
  - `onTabChange: (value: string | null) => void`
  - `top?: number`
- **Used by (direct imports):** ProductsHeaderWrapper, CategorySection
- **Components used:** Mantine `Text`, `Box`, `Tabs`, `ScrollArea`
- **Hooks used:**
  - `useRef`, `useEffect`, `useCallback`, Mantine `useScrollIntoView`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Handles horizontal scrolling of tabs, auto-scrolls active tab into view, and supports dynamic sticky positioning.

---

### CartDrawer/CartDrawer
- **Path:** `components/CartDrawer/CartDrawer.tsx`
- **CSS:** _(none)_
  - **Overrides:**
    - Extensive use of inline styles for drawer positioning, transitions, and responsive layout
- **Exports:** Default export
- **Props:**
  - `opened: boolean`
  - `onClose: () => void`
  - `cartItems: CartItem[]`
  - `cartTotal: number`
  - `isMobile?: boolean`
- **Used by (direct imports):** Main app/cart context
- **Components used:** Mantine `Box`, `Text`, `Divider`, `Button`, Tabler `IconShoppingCart`, `IconTrash`, custom `EmptyCart`, `CartItem`
- **Hooks used:**
  - `useState`, `useEffect`, `useCallback`, Mantine `useMediaQuery`, custom `useCart`, Next.js `useRouter`
- **Context:** Uses `CartContext`
- **Is Page/Route:** No
- **Notes:**
  - Responsive cart drawer with animated transitions, dynamic positioning, and cart management logic.

---

### Header/Header
- **Path:** `components/Header/Header.tsx`
- **CSS:** `Header.module.css`
  - **Classes Used:**
    - `.headerContainer`, `.topHeader`, `.contentContainer`, `.bottomHeader`, `.bottomHeaderContent`, `.headerBackground`, `.headerOverlay`, `.logoContainer`, `.menuButtonContainer`, `.branchInfoContainer`, `.branchName`, `.branchDetails`, `.searchContainer`, `.collapsedHeader`, `.headerSpacer` (with mobile adjustments)
  - **Overrides:**
    - Responsive layout, fixed positioning, background overlays, dynamic class for collapsed state
- **Exports:** Default export
- **Props:**
  - `showSearchBar?: boolean`
  - `searchValue?: string`
  - `onSearchChange?: (value: string) => void`
  - `showClosedNotification?: boolean`
  - `closedMessage?: string`
  - `isFiltering?: boolean`
- **Used by (direct imports):** Main app layout
- **Components used:** Mantine `Box`, `Text`, custom `MenuDrawer`, `Logo`, `MenuButton`, `SearchBar`
- **Hooks used:**
  - `useState`, `useEffect`, `useRef`, Mantine `useDisclosure`, `useHeadroom`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Responsive, fixed header with dynamic collapse, search bar, and notification banner. Emits custom events for header state changes.

---

### Header/CheckoutHeader
- **Path:** `components/Header/CheckoutHeader.tsx`
- **CSS:** `CheckoutHeader.module.css`
  - **Classes Used:**
    - `.headerContainer`, `.topHeader`, `.menuButtonContainer`, `.logoContainer` (mirrors Header.module.css with checkout-specific tweaks)
  - **Overrides:**
    - Inline style for closed notification banner
- **Exports:** Default export
- **Props:**
  - `branch: IBranch`
  - `isClosed: boolean`
  - `closedMessage: string`
- **Used by (direct imports):** Checkout flow/pages
- **Components used:** Mantine `Box`, `Text`, custom `MenuButton`, `Logo`, `MenuDrawer`
- **Hooks used:**
  - Mantine `useDisclosure`, Next.js `useRouter`
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Displays branch info and closed notification with fixed header and menu.

---

### Header/ProductsHeader
- **Path:** `components/Header/ProductsHeader.tsx`
- **CSS:** `ProductsHeader.module.css`
  - **Classes Used:**
    - `.productsHeaderContainer`, `.productsHeaderTitle`, `.productsHeaderSubtitle`, `.productsHeaderActions` (based on typical usage)
  - **Overrides:**
    - None
- **Exports:** Default export
- **Props:**
  - Usually receives title, subtitle, and actions as children or props
- **Used by (direct imports):** ProductsHeaderWrapper
- **Components used:** Mantine `Box`, `Text`, custom components as children
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Used to display product section headers with optional actions.

---

### Header/HeaderComponents
- **Path:** `components/Header/HeaderComponents.tsx`
- **CSS:** Inline styles and Mantine theming
  - **Overrides:**
    - Inline styles for logo, menu button, and search bar action icon
- **Exports:**
  - `Logo`, `MenuButton`, `SearchBar`
- **Props:**
  - `MenuButton`: `onClick: () => void`
  - `SearchBar`: `value: string`, `onChange: (e) => void`, `autoFocus?: boolean`, `placeholder?: string`, etc.
- **Used by (direct imports):** Header, CheckoutHeader
- **Components used:** Mantine `ActionIcon`, `TextInput`, Tabler `IconMenu2`, `IconSearch`
- **Hooks used:**
  - `useEffect`, `useRef` (for autofocus and search bar)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Contains presentational header components, including logo, menu button, and a search bar with custom action icon and autofocus logic.

---

### Footer/Footer
- **Path:** `components/Footer/Footer.tsx`
- **CSS:** `Footer.module.css`
  - **Classes Used:**
    - `.footer`, `.container`, `.gridContainer`, `.poweredByContainer`, `.poweredByText`, `.smartyText`, `.linksContainer`, `.link`, `.divider`, `.bottomContainer`, `.socialContainer`, `.copyright`
    - Responsive/mobile adjustments for layout and text alignment
  - **Overrides:**
    - None (all styles via CSS module)
- **Exports:** Default export
- **Props:** None
- **Used by (direct imports):** Main app layout
- **Components used:** Mantine `Box`, `Text`, `Divider`, Next.js `Link`, `Image`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Responsive footer with grid layout, links, and social icons. Text and layout adapt for mobile.

---

### ErrorBoundary/ErrorBoundary
- **Path:** `components/ErrorBoundary/ErrorBoundary.tsx`
- **CSS:** Inline Mantine styles
  - **Overrides:**
    - Uses Mantine `Box` and `Text` for fallback UI
- **Exports:** Default export (class component)
- **Props:**
  - `children: ReactNode`
  - `fallback?: ReactNode`
- **Used by (direct imports):** ClientErrorBoundary, app-level error boundaries
- **Components used:** Mantine `Box`, `Text`, `Button`
- **Hooks used:** None (class lifecycle methods)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Catches errors in React tree, displays fallback or reload option. Logs errors to console.

---

### BranchCard/Badge
- **Path:** `components/BranchCard/Badge.tsx`
- **CSS:** Inline styles only
  - **Overrides:**
    - Inline styles for badge positioning, color, border, and background based on open/closed status
- **Exports:** Default export
- **Props:**
  - `isOpen: boolean`
- **Used by (direct imports):** BranchCard
- **Components used:** Mantine `Badge`, `Text`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Displays open/closed badge with dynamic color and label.

---

### BranchCard/BranchHoursTooltip
- **Path:** `components/BranchCard/BranchHoursTooltip.tsx`
- **CSS:** Inline styles only
  - **Overrides:**
    - Inline styles for tooltip box, dividers, and text formatting
- **Exports:** Default export
- **Props:**
  - `isVisible: boolean`
  - `trigger: React.ReactNode`
  - `branch: IBranch`
  - `onVisibilityChange?: (visible: boolean) => void`
- **Used by (direct imports):** BranchCard
- **Components used:** Mantine `Box`, `Text`, `Divider`
- **Hooks used:**
  - `useRef`, `useEffect` (for visibility and DOM effects)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Displays branch hours in a tooltip with dynamic content and formatting. Handles visibility state and updates.

---

### AddToCartButton
- **Path:** `components/AddToCartButton/AddToCartButton.tsx`
- **CSS:** `AddToCartButton.module.css`
  - **Classes Used:**
    - `.addToCartButton` (size, color, flex, border-radius, hover scaling)
  - **Overrides:**
    - Combines CSS module and optional external className
- **Exports:** Default export
- **Props:**
  - `product: IProduct`
  - `onAddToCart: (product: IProduct, quantity: number) => void`
  - `className?: string`
- **Used by (direct imports):** ProductCard, AddToCartModal
- **Components used:** Mantine `ActionIcon`, Tabler `IconShoppingCart`
- **Hooks used:** None
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Handles click event to add product to cart (if available), stops event propagation.

---

### AddToCartModal
- **Path:** `components/AddToCartModal/AddToCartModal.tsx`
- **CSS:** `AddToCartModal.module.css`
  - **Classes Used:**
    - `.modalOverlay`, `.modalContent`, `.closeButton`, `.modalHeader`, `.modalTitle`, `.modalBody`, `.modalText`, `.modalFooter`, `.modalCancelButton`, `.modalConfirmButton`, `.addToCartButton`, `.addToCartButtonContent`, `.addToCartButtonTextAddToCart`, `.addToCartButtonTextSubtotal`, `.section`, `.sectionHeader`, `.sectionHeaderText`, `.ingredientItem`, `.ingredientName`, `.priceTagContainer`, `.ingredientQuantityWrapper`, `.footer`, etc. (with mobile adjustments)
  - **Overrides:**
    - Modal overlay and content styling, sticky headers/footers, responsive layout
- **Exports:** Default export
- **Props:**
  - (Multiple, including product, open/close state, customization handlers)
- **Used by (direct imports):** ProductCard, CartDrawer
- **Components used:** Mantine `Modal`, `Box`, `Flex`, `Text`, `Button`, `Textarea`, `Checkbox`, `Image`, `Collapse`, Tabler icons, custom `QuantityControl`
- **Hooks used:**
  - `useEffect`, `useState`, `useRef`, `useMemo` (for modal state, focus, and product customization)
- **Context:** None
- **Is Page/Route:** No
- **Notes:**
  - Handles product customization, comments, quantity, and cart add logic. Responsive modal with sticky header/footer and close/confirm actions.

---

### CartContext
- **Path:** `context/CartContext.tsx`
- **Exports:**
  - Default export: `CartContext` (React context object)
  - Provider: wraps children and provides cart state and actions
- **Provided Values/Methods:**
  - `items: CartItem[]` — All items in the cart
  - `addToCart(item: CartItem)` — Add a new cart item
  - `updateCartItem(productId, updates, uniqueId?)` — Update an item by productId (and optionally uniqueId)
  - `removeFromCart(productId)` — Remove item(s) by productId
  - `getCartItemQuantity(productId)` — Get quantity of a specific product
  - `getCartItemsByProductId(productId)` — Get all cart items for a specific product
  - `getTotalItems()` — Get total number of items in cart
  - `getTotalPrice()` — Get total price of all items in cart
  - `clearCart()` — Remove all items from cart
  - `cartItems: CartItem[]` — Alias for `items`
  - `cartTotal: number` — Alias for `getTotalPrice()`
  - `currentBranchId: string | null` — Current selected branch
  - `setBranchId(branchId)` — Set the current branch
- **Props:**
  - `children: ReactNode` — Components to receive context
- **Hooks used:**
  - `useState` (cart items, branch id)
  - `useEffect` (branch id persistence)
  - `useMemo` (context value memoization)
  - `useCallback` (all cart actions)
  - `useContext` (for consumer usage)
- **Context:**
  - Provides cart state and actions to all consumers in the React tree
- **Dynamic Behaviors:**
  - Cart actions are memoized for performance
  - Branch id is persisted in localStorage
  - Cart supports customizations, quantities, and comments
- **Used by (direct imports):** CartDrawer, AddToCartModal, etc.
- **Is Page/Route:** No
- **Notes:**
  - Centralizes all cart logic for the app. Use `useCart = () => useContext(CartContext)` for easy access in components.

---

### Types
- **Path:** `types/index.ts`
- **Exports:**
  - `IOpeningHours`: Structured branch opening hours (mon-thu, fri-sun, with shifts)
  - `IBranch`: Branch info (id, name, description, address, phone, opening hours, isOpen, image)
  - `IProduct`: Product info (id, name, description, price, image, availability, ingredients, category, branch)
  - `OrderStatus`: Enum for order status (`Pending`, `Processing`, `Completed`, `Cancelled`)
  - `IOrder`: Order info (id, items, total, status, createdAt, userId, branchId)
  - `IOrderItem`: Order item info (id, productId, quantity, price, name)
  - `IApiResponse<T>`: Generic API response (success, data, error, message)
- **Usage:**
  - Used throughout the app for type safety in components, context, API calls, and business logic
- **Notes:**
  - Centralizes all core types for branch, product, order, and API response
  - `IOpeningHours` supports both legacy and structured formats for flexible business hours logic
  - `OrderStatus` enum ensures consistent order state handling
- **Context:**
  - Imported by components, context providers, and API utilities
- **Is Page/Route:** No
- **AI/Debugging:**
  - Enables strict typing for all business entities, aiding in debugging and future refactoring

---

(...and so on for each component...)


---

> This document can be expanded with more detailed usage analysis, such as which props are passed, or which hooks are used, if needed.

## Notes
- This structure omits asset-heavy or build folders as requested.
- CSS associations are based on convention and import statements.
- Usage is inferred from import relationships and may be further refined by deeper static analysis.

---

If you need a more detailed mapping of component relationships or want to include/exclude specific details, let me know!
