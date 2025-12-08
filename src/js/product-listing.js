import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import {
  loadHeaderFooter,
  getParam,
  renderNumberOfItemsBackpack,
  checkDiscount,
  renderDiscount,
} from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  // Load header and footer dynamically
  await loadHeaderFooter();
  
  // Get category from URL
  const category = getParam("category");
  
  // Create data source
  const dataSource = new ExternalServices();
  
  // Get the element where the products will render
  const listElement = document.querySelector(".product-list");
  
  // Create ProductList instance
  const myList = new ProductList(category, dataSource, listElement);
  
  // Render products
  myList.init();
  
  // Update page title with category
  const titleElement = document.querySelector(".products h2");
  if (titleElement && category) {
    // Capitalize first letter
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    titleElement.textContent = `Top Products: ${formattedCategory}`;
  }
  
  // Render the superscript number of items in backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );
  
  // Discount for the product lists
  const categoryArray = await dataSource.getData(category);
  const discountArray = categoryArray.map(checkDiscount, categoryArray);
  const discountContainerArray = document.querySelectorAll(
    ".discount-container",
  );
  discountArray.forEach((discount, i) => {
    const container = discountContainerArray[i];
    if (container) {
      renderDiscount(discount, container, "../images/discount.svg");
    }
  });
});



