const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} - ${res.statusText}`);
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
}
  async findProductById(id) {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);
    console.log('Found product by ID:', id, product);
    return product || null;
  }
  
  async checkout(order) {
    const url = `${baseURL}checkout`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
    const response = await fetch(url, options);
    console.log('Checkout response:', response);
    if (!response.ok) throw new Error('Checkout failed');
    return response.json();
  }
}
