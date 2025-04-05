
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  description?: string;
  imageUrl?: string;
  sku?: string;
  supplier?: string;
  lastUpdated?: string;
}
