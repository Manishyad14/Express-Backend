const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory product database
let products = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Coffee Maker', category: 'Appliances' },
  { id: 3, name: 'Headphones', category: 'Electronics' },
  { id: 4, name: 'Running Shoes', category: 'Footwear' },
];

// Function to get all products
const getProducts = () => products;

// Function to get a product by ID
const getProductById = (id) => products.find((product) => product.id === id);

// Function to add a new product
const addNewProduct = (product) => {
  products.push(product);
  return product;
};

// Endpoint to get all products
app.get('/products', (req, res) => {
  res.json(getProducts());
});

// Endpoint to get a product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Endpoint to add a new product
app.post('/products/new', (req, res) => {
  const { id, name, category } = req.body;
  const newProduct = { id, name, category };
  const addedProduct = addNewProduct(newProduct);
  res.status(201).json(addedProduct);
});

module.exports = { app, getProducts, getProductById, addNewProduct };
