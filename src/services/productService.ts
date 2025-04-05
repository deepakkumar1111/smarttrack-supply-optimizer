
import { Product } from '@/types/product';

// Initial mock data
const initialProducts: Product[] = [
  {
    id: "PRD001",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    stock: 45,
    status: "In Stock",
    description: "Adjustable height and lumbar support for optimal comfort during long work hours.",
    sku: "FURN-CHAIR-001",
    supplier: "OfficePro Supplies",
    lastUpdated: "2025-03-28"
  },
  {
    id: "PRD002",
    name: "Standing Desk - Oak Finish",
    category: "Furniture",
    price: 399.99,
    stock: 12,
    status: "Low Stock",
    description: "Motorized standing desk with memory height presets and cable management.",
    sku: "FURN-DESK-002",
    supplier: "ErgoDirect",
    lastUpdated: "2025-03-25"
  },
  {
    id: "PRD003",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 68,
    status: "In Stock",
    description: "Bluetooth wireless keyboard with multi-device connectivity and backlit keys.",
    sku: "ELEC-KB-003",
    supplier: "TechAccessories Inc.",
    lastUpdated: "2025-04-01"
  },
  {
    id: "PRD004",
    name: "27-inch 4K Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 0,
    status: "Out of Stock",
    description: "Ultra-sharp 4K resolution monitor with wide color gamut and eye comfort technology.",
    sku: "ELEC-MON-004",
    supplier: "VisualTech",
    lastUpdated: "2025-03-15"
  },
  {
    id: "PRD005",
    name: "Leather Notebook",
    category: "Stationery",
    price: 24.99,
    stock: 124,
    status: "In Stock",
    description: "Premium leather-bound notebook with acid-free paper and bookmark ribbon.",
    sku: "STAT-NB-005",
    supplier: "PaperWorks Co.",
    lastUpdated: "2025-04-03"
  }
];

// Store products in localStorage to persist between page refreshes
const loadProducts = (): Product[] => {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  
  // Initialize with mock data if nothing exists
  localStorage.setItem('products', JSON.stringify(initialProducts));
  return initialProducts;
};

const saveProducts = (products: Product[]): void => {
  localStorage.setItem('products', JSON.stringify(products));
};

// Service functions with artificial delay to simulate API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    await delay(300); // Simulate network delay
    return loadProducts();
  },
  
  // Get product by ID
  getProductById: async (id: string): Promise<Product | undefined> => {
    await delay(200);
    const products = loadProducts();
    return products.find(product => product.id === id);
  },
  
  // Add new product
  addProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    await delay(400);
    const products = loadProducts();
    
    // Generate a new ID based on the number of products
    const newId = `PRD${String(products.length + 1).padStart(3, '0')}`;
    
    const newProduct: Product = {
      ...product,
      id: newId,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    return newProduct;
  },
  
  // Update existing product
  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product | null> => {
    await delay(400);
    const products = loadProducts();
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) return null;
    
    const updatedProduct = {
      ...products[index],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    products[index] = updatedProduct;
    saveProducts(products);
    
    return updatedProduct;
  },
  
  // Delete product
  deleteProduct: async (id: string): Promise<boolean> => {
    await delay(300);
    const products = loadProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    
    if (filteredProducts.length === products.length) {
      return false; // No product was deleted
    }
    
    saveProducts(filteredProducts);
    return true;
  },
  
  // Get available categories
  getCategories: async (): Promise<string[]> => {
    await delay(200);
    const products = loadProducts();
    const categoriesSet = new Set(products.map(product => product.category));
    return Array.from(categoriesSet);
  }
};
