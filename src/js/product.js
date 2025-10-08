import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const productId = getParam('product');
const dataSource = new ProductData('tents');

function addProductToCart(product) {
  if (!product || !product.Id) {
    console.error('Invalid product passed to addProductToCart', product);
    return;
  }

  const cartItems = getLocalStorage('so-cart') || [];

  const existingItem = cartItems.find((item) => item.Id == product.Id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    const productToSave = { ...product, quantity: 1 };
    cartItems.push(productToSave);
  }

  setLocalStorage('so-cart', cartItems);
  console.log('Cart updated:', cartItems);

  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: cartItems } }));
}

const product = new ProductDetails(productId, dataSource);

(async () => {
  await product.init();

  const addButton = document.getElementById('addToCart');
  if (!addButton) {
    console.error("Add to Cart button with id 'addToCart' not found in DOM.");
    return;
  }

  addButton.addEventListener('click', (e) => {
    if (!product.product) {
      console.error('Product not loaded yet in product.product');
      return;
    }
    addProductToCart(product.product);
  });
})();