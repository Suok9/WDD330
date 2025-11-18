import { getLocalStorage,setLocalStorage } from './utils.mjs';
export default class productDetails {
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
    productDetailsTemplate(this.product);

    document.querySelector('.product-detail').innerHTML = details;
  }

  addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || [];
    cartItems.push(this.product);
setLocalStorage('so-cart', cartItems);
  }

}

function productDetailsTemplate(product) {
    
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



//document.getElementById('home').textContent = product.Name;
//document.getElementById('drive').textContent = product.Brand.Name;

//const productImage = document.getElementById('productImage');
//productImage.src = product.Image;
//productImage.alt = product.Brand.Name;

//document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;
//document.getElementById('productColor').textContent = product.Colors[0].ColorName
//document.getElementById('productPrice').textContent = product.FinalPrice;

//document.getElementById('addToCart').dataset.id = product.Id;