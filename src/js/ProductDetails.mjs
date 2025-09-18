import { setLocalStorage, getLocalStorage } from './utils.mjs';

function productTemplate(product) {
  return `<section class="product-detail">
    <h3 class="product-brand">${product.Brand.Name}</h3>
    <h2 class="product-name">${product.NameWithoutBrand}</h2>
    <img
      class="product-image"
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <p class="product-price">$${product.FinalPrice}</p>
    <p class="product-color">${product.Colors[0].ColorName}</p>
    <p class="product-description">
      ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = productTemplate(this.product);
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    // This is the code that should be saving to local storage
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }
}