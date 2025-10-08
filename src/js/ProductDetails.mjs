export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log('Product loaded:', this.product);
    this.render();
  }

  render() {
    this.renderProductDetails(this.product);
  }

  renderProductDetails(product) {
    if (!product) return;
    const priceEl = document.getElementsByClassName('product-card__price')[0];
    const colorEl = document.getElementsByClassName('product__color')[0];
    const descEl = document.getElementsByClassName('product__description')[0];

    if (priceEl) priceEl.textContent = product.FinalPrice;
    if (colorEl) colorEl.textContent = product.Colors[0].ColorName;
    if (descEl) descEl.innerHTML = product.DescriptionHtmlSimple;
    const h3 = document.querySelector('h3');
    const h2 = document.querySelector('h2');
    if (h3) h3.textContent = product.Brand?.Name || '';
    if (h2) h2.textContent = product.Name || '';

    const productImage = document.getElementById('productImage');
    if (productImage) {
      productImage.src = product.Image || '';
      productImage.alt = product.Name || '';
    }
  }
}
