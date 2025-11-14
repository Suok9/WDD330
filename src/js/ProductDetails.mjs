import { getLocalStorage,setLocalStorage } from './utils.mjs';

export default class productDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
    .getElementById('addToCart')
    .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
setLocalStorage('so-cart', this.cartItems);
  }

  renderProductDetails(){
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Name;
    document.querySelector('h3').textContent = product.Brand.Name;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.Brand.Name;

    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName
    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('addToCart').dataset.id = product.Id;
  
}
