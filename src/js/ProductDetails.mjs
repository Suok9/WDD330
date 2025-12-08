import { getLocalStorage,setLocalStorage } from './utils.mjs';
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await 
    this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
    .getElementById('addToCart')
    .addEventListener('click', this.addProductToCart.bind(this));
  }

  renderProductDetails(){
    const details =
    ProductDetailsTemplate(this.product);

    document.querySelector('.product-detail').innerHTML = details;
  }

  addProductToCart() {
  let cartItems = getLocalStorage('so-cart') || [];

  const index = cartItems.findIndex(i => i.id === this.product.id);

  if (index > -1) {
    cartItems[index].quantity += 1;
  } else {
    cartItems.push({
      id: this.product.id,
      Name: this.product.Name,
      Image: this.product.Image,
      Colors: this.product.Colors[0].ColorName,
      FinalPrice: this.product.FinalPrice,
      quantity: 1
    });
  }

  setLocalStorage('so-cart', cartItems);
}

}

function ProductDetailsTemplate(product) {
    
  return`
  <h3>${product.Brand}</h3>
<h2 class="divider">${product.Name}</h2>

<img class="divider" src="${product.Image}" alt="${product.Name}" />

<p class="product-card__price">${product.Name}</p>
<p class="product__color">${product.Name}</p>
<p class="product__description">${product.Name}</p>

<div class="product-detail__add">
  <button id="addToCart" data-id="${product.id}">${product.Name}</button>
</div>
  `
}



