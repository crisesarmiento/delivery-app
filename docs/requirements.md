# Smarty Web Requirements Document

## Introduction

Smarty Web is a platform where anyone with the link can place a home delivery food order from the branch they choose.

## Task: Branches Screen

### Description

This screen will contain all the brand's locations, which are the ones presented in Figma. The customer can choose any of them and access a menu according to whether the location is open or closed.

### Acceptance Criteria

- It must contain a header with:
  - A branch search bar
  - A hamburger menu containing the following tabs:
    - Branches (leads to this same branches screen, but will be useful later)
    - About Us (doesn’t lead anywhere yet :) )
- The screen contains 12 cards, each corresponding to a different location. Each card will display the following:
  - An "Open" or "Closed" tag (located in the top right corner) according to its schedule.
  - An icon that, when hovered or clicked, displays the schedule of that branch.
  - When hovering over a card, the background color, border, and clock icon change.
- It must contain a footer with the following:
  - Powered by Smarty logo
  - Social networks (only icons, with the ability to redirect once the sites are created)
  - Copyright 2025 smarty.com | All rights reserved | Privacy Policy | Terms and Conditions of Use (with the ability to redirect once the sites are created)
  - About Smarty - Contact, with the ability to redirect once the sites are created.

## Task: Selected Branch Screen

### Description

This screen displays the available menu for the selected location.

### Acceptance Criteria

- **Header**
  - Must contain a hamburger menu with the previously mentioned options
  - Must contain text indicating the name of the location + address
  - Must contain a product search bar.
- **Categories Section**
  - The section must remain fixed when scrolling down.
  - When scrolling sideways, different categories are displayed.
  - When I select a category, the background changes to green.
  - If I select a category, for example, Wraps, it will automatically scroll to "Wraps" and display that menu section with all its products, while all other sections remain closed.
- **Cart**
  - Must always remain fixed when scrolling.
  - Must display the quantity, name, and price of the selected product (the price will be the final price of that product, including the discount, and the total in $ of the order).
  - If I select "View Cart", it redirects to the cart detail.
  - The order can be completely deleted if I select the trash can in the top right corner.
  - If no product is selected, it is shown as an empty cart.
  - If the customer decides to go to another branch, the order (if the user selected something) is completely deleted.
  - When viewing this section from a mobile, the cart appears fixed at the bottom.
  - If the product name is pressed, a modal with its details is displayed.
- **Products Section**
  - They are presented grouped into categories, which can be opened or closed.
  - When clicking on a product, it redirects to the product detail.
  - Products in the "promotion" category are those with some type of discount. It is located in the top left corner, and in this case, the old price and the new price with the discount applied are shown.
  - If a product was added to the order, it is shown with the chosen quantity. If clicked, a counter is displayed to add more units or remove.
- **Closed Location**
  - If the location is closed, you can access its menu but cannot add any product to the cart, and a red notice appears at the top warning about its condition.
- **Footer**
  - Must have a footer with the same characteristics mentioned above.

## Task: Product Detail Screen

### Description

This screen is a pop-up of the chosen product with all its specifications.

### Acceptance Criteria

- It will have a top part containing the product name, price, and a tag with the discount and old price if it has any promotion.
- If the product has no promotion, the discount tag and old price do not appear.
- This pop-up will have a product description and an input for the customer to leave a comment, with a maximum of up to 100 characters.
- Toppings can be chosen, and there are two ways:
  - If the topping has a maximum quantity of 1, a checkbox appears.
  - If the topping has a maximum quantity of more than 1, an input appears to enter the number of toppings preferred, which will be tied to the maximum optional set, and will deduct from there.
- Toppings can have prices, and they will be added to the total price.
- The modal will have a unit counter for this product; according to this defined quantity, the total will be presented.
- When the unit counter is at 0, a gray "minus" appears on the left, and when it is +1, the minus turns black.
- Once "Add" is clicked, the product is added to the cart with all the attached details (number of units, toppings, and observation).
- If the location is closed, this detail cannot be opened.

## Task: Cart Screen

### Description

This screen is a detail of the order. It includes delivery details, payment method, the order, and its summary.

### Acceptance Criteria

- The header will be the same as mentioned before, as well as the footer.
- **Delivery Detail**
  - A toggle to select whether it is Delivery or Pickup.
  - If it is Pickup, the address data will be deactivated.
  - If it is Delivery, all fields are active.
- **Payment Method**
  - The options are Transfer, Cash, and Mercado Pago.
  - The selected options will be marked in black/bold.
  - According to the selection, a discount will be applied to the total.
- **My Order**
  - A list of all selected products will be shown. If the product is clicked, the modal with the details of that product will open with all its specifications (product notes, toppings, etc.).
  - Product discounts will be shown if applicable.
  - The product quantity can be modified from the unit counter.
- **Summary**
  - A price for the total of products, a total of discounts, a subtotal, discount for payment method, shipping cost if any, and a total will be shown.
