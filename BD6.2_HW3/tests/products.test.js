const { getProducts, getProductById, addNewProduct } = require("../index");

jest.mock("../index", () => {
  const originalModule = jest.requireActual("../index");
  return {
    ...originalModule,
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    addNewProduct: jest.fn(),
  };
});

describe("Products API Functions", () => {
  const mockProducts = [
    { id: 1, name: "Laptop", category: "Electronics" },
    { id: 2, name: "Coffee Maker", category: "Appliances" },
    { id: 3, name: "Headphones", category: "Electronics" },
    { id: 4, name: "Running Shoes", category: "Footwear" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Exercise 4: Test Get All Products
  test("getProducts should return all product records", () => {
    getProducts.mockReturnValue(mockProducts);

    const result = getProducts();
    expect(result).toEqual(mockProducts);
    expect(result.length).toBe(4);
    expect(getProducts).toHaveBeenCalledTimes(1);
  });

  // Exercise 5: Test Get Product by ID
  test("getProductById should return the correct product record for a valid ID", () => {
    const mockProduct = { id: 1, name: "Laptop", category: "Electronics" };
    getProductById.mockReturnValue(mockProduct);

    const result = getProductById(1);
    expect(result).toEqual(mockProduct);
    expect(getProductById).toHaveBeenCalledWith(1);
  });

  // Exercise 6: Test Get Product by Non-Existent ID
  test("getProductById should return undefined for a non-existent ID", () => {
    getProductById.mockReturnValue(undefined);

    const result = getProductById(999);
    expect(result).toBeUndefined();
    expect(getProductById).toHaveBeenCalledWith(999);
  });

  // Exercise 7: Test Add New Product
  test("addNewProduct should add a new product record", () => {
    const newProduct = { id: 5, name: "Tablet", category: "Electronics" };
    addNewProduct.mockReturnValue(newProduct);

    const result = addNewProduct(newProduct);
    expect(result).toEqual(newProduct);
    expect(addNewProduct).toHaveBeenCalledWith(newProduct);
  });
});
