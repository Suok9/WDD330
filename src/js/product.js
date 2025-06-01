import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./productDetails.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// add to cart button event handler
async function addToCartHandler(e) {
   const product = await dataSource.findProductById(e.target.dataset.id);
   addProductToCart(product);
}

// add listener to Add to Cart button
const addToCartBtn = document.getElementById("addToCart");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", addToCartHandler);
}
