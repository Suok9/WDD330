import CheckoutProcess from './CheckoutProcess.mjs';

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();
myCheckout.calculateOrderTotal();

// Escuchar clic en el botón de envío del formulario
document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms['checkout'];
  const isValid = myForm.checkValidity();
  myForm.reportValidity();

  if (isValid) {
    myCheckout.checkout();
  }
});
