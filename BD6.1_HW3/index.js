const express = require("express");
const { getProducts, getProductById, addNewProduct } = require("./products.js");
const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint to get all products
app.get("/products", (req, res) => {
  res.json(getProducts());
});

// Endpoint to get a product by ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = getProductById(id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

// Endpoint to add a new product
app.post("/products/new", (req, res) => {
  const newProduct = req.body;
  const addedProduct = addNewProduct(newProduct);
  res.status(201).json(addedProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
