import { getParam, alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./productDetails.mjs";



const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);
product.init();

// función para agregar un producto al carrito
function addProductToCart(product) {
  const cart = getLocalStorage("so-cart") || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
  alertMessage("Producto añadido al carrito 🎉", false); // mensaje de éxito
}

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
