import { getParam, loadHeaderFooter, renderDiscount, renderNumberOfItemsBackpack, checkDiscount } from './utils.mjs';
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  await loadHeaderFooter();
  
// 1. Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// 2. Create data source
const dataSource = new ProductData();

// 3. Create the product details controller
const product = new ProductDetails(productId, dataSource);

// 4. Load the page
product.init();


  // Render Discount
  renderDiscount(
    checkDiscount(await dataSource.findProductById(productId)),
    document.querySelector(".discount-container"),
    "../images/discount.svg",
  );

  // rendering the superscript number of items in backpack
  renderNumberOfItemsBackpack(
    document.querySelector("#cart-numbers"),
    "so-cart",
  );
});