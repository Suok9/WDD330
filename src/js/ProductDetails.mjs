import { setLocalStorage } from './utils.mjs';
import { numberOfCartItems } from './cartItems.js';


const baseURL = import.meta.env.VITE_SERVER_URL

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    await new Promise(resolve => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve();
      } else {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      }
    });

    console.log('Initializing ProductDetails for productId:', this.productId);

    try {
      this.product = await this.dataSource.findProductById(`${baseURL}product/${this.productId}`);
      if (!this.product) {
        console.error('Product not found for ID:', this.productId);
        return;
      }
      console.log('Fetched product:', this.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return;
    }

    this.renderProductDetails();

    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
      console.log('Event listener attached to Add to Cart button');
    } else {
      console.error('Add to Cart button not found in the DOM');
    }
  }

  addProductToCart() {
    if (!this.product || !this.product.Id) {
      console.error('No valid product data available to add to cart:', this.product);
      return;
    }
    console.log('Adding to cart:', this.product);
    
    setLocalStorage('so-cart', this.product);
    numberOfCartItems(); //Updates the cart superscript number of items
    alert('Item added to cart!');
    console.log('Cart updated in localStorage:', getLocalStorage('so-cart'));
  }

  renderProductDetails() {
    const nameElement = document.querySelector('.product-detail h2');
    const imageElement = document.querySelector('.product-detail img');
    const priceElement = document.querySelector('.product-card__price');
    const descriptionElement = document.querySelector('.product__description');
    const colorElement = document.querySelector('.product__color');

    if (nameElement) nameElement.textContent = this.product.Name || 'Unknown Product';
    if (imageElement) imageElement.src = this.product.Images.PrimaryLarge || '';
    if (priceElement) priceElement.textContent = `$${this.product.ListPrice || '0.00'}`;
    if (descriptionElement) {
      // Strip HTML tags and set plain text
      const plainText = this.product.DescriptionHtmlSimple.replace(/<[^>]+>/g, '');
      descriptionElement.textContent = plainText || 'No description available';
    }
    if (colorElement) colorElement.textContent = this.product.Colors?.[0]?.ColorName || '';
  }
}