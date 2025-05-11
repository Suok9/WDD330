import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];

  // Verificamos que sea un arreglo. Si no, lo convertimos en arreglo.
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }

  // Agregamos el nuevo producto
  cartItems.push(product);

  // Guardamos el arreglo actualizado
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
