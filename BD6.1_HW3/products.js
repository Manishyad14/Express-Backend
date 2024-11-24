let products = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Coffee Maker', category: 'Appliances' },
  { id: 3, name: 'Headphones', category: 'Electronics' },
  { id: 4, name: 'Running Shoes', category: 'Footwear' }
];

// Function to get all products
function getProducts() {
  return products;
}

// Function to get a product by ID
function getProductById(id) {
  return products.find((product) => product.id === id);
}

// Function to add a new product
function addNewProduct(newProduct) {
  const id = products.length + 1;
  const product = { id, ...newProduct };
  products.push(product);
  return product;
}

module.exports = { getProducts, getProductById, addNewProduct };
