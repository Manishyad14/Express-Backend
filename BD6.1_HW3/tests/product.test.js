const {
  getProducts,
  getProductById,
  addNewProduct,
} = require("../products.js");

describe("Product Functions", () => {
  // Test Get All Products
  it("should get all products", () => {
    let products = getProducts();
    expect(products.length).toBe(4);
    expect(products).toEqual([
      { id: 1, name: "Laptop", category: "Electronics" },
      { id: 2, name: "Coffee Maker", category: "Appliances" },
      { id: 3, name: "Headphones", category: "Electronics" },
      { id: 4, name: "Running Shoes", category: "Footwear" },
    ]);
  });

  // Test Get Product by ID
  it("should get a product by id", () => {
    let product = getProductById(1);
    expect(product).toEqual({
      id: 1,
      name: "Laptop",
      category: "Electronics",
    });
  });

  // Test Get Product by Non-Existent ID
  it("should return undefined for a non-existent product ID", () => {
    let product = getProductById(99);
    expect(product).toBeUndefined();
  });

  // Test Add New Product
  it("should add a new product", () => {
    const newProduct = { name: "Tablet", category: "Electronics" };
    let addedProduct = addNewProduct(newProduct);
    expect(addedProduct).toEqual({
      id: 5,
      name: "Tablet",
      category: "Electronics",
    });
  });
});
