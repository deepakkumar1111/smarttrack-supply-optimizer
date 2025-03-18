
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const productData = [
  {
    id: "PRD001",
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 249.99,
    stock: 45,
    status: "In Stock"
  },
  {
    id: "PRD002",
    name: "Standing Desk - Oak Finish",
    category: "Furniture",
    price: 399.99,
    stock: 12,
    status: "Low Stock"
  },
  {
    id: "PRD003",
    name: "Wireless Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 68,
    status: "In Stock"
  },
  {
    id: "PRD004",
    name: "27-inch 4K Monitor",
    category: "Electronics",
    price: 349.99,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: "PRD005",
    name: "Leather Notebook",
    category: "Stationery",
    price: 24.99,
    stock: 124,
    status: "In Stock"
  }
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredProducts = productData.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <Button className="md:w-auto w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Products</CardTitle>
              <CardDescription>Current product inventory count</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{productData.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Categories</CardTitle>
              <CardDescription>Product category breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {["Furniture", "Electronics", "Stationery"].map(category => (
                <div key={category} className="flex justify-between">
                  <span>{category}</span>
                  <span className="font-medium">
                    {productData.filter(p => p.category === category).length}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Stock Alerts</CardTitle>
              <CardDescription>Products requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-500">Low Stock</span>
                  <span className="font-medium">
                    {productData.filter(p => p.status === "Low Stock").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500">Out of Stock</span>
                  <span className="font-medium">
                    {productData.filter(p => p.status === "Out of Stock").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>
              Manage your product catalog, categories, and product information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="md:w-auto w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="md:w-auto w-full">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Customize
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center">Stock</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                        <TableCell className="text-center">{product.stock}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={
                              product.status === "In Stock" ? "default" : 
                              product.status === "Low Stock" ? "outline" : "destructive"
                            }
                          >
                            {product.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No products found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export</Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Shell>
  );
};

export default Products;
