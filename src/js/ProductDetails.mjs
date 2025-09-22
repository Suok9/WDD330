import {getLocalStorage, setLocalStorage} from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.render();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
  }

    addProductToCart(product) {
      let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
      cart.push(product);
      localStorage.setItem("so-cart", JSON.stringify(cart));
    }

    render() {
      this.renderProductDetails(this.product);
    }
     renderProductDetails(product) {
        document.getElementsByClassName('product-card__price')[0].textContent = product.FinalPrice;
        document.getElementsByClassName('product__color')[0].textContent = product.Colors[0].ColorName;
        document.getElementsByClassName('product__description')[0].innerHTML = product.DescriptionHtmlSimple;
        document.querySelector('h3').textContent = product.Brand.Name;
        document.querySelector('h2').textContent = product.Name;

        const productImage = document.getElementById('productImage');
        productImage.src = product.Image
        productImage.alt = product.Name;

        
    }
}