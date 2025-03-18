
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter, SlidersHorizontal, MoreHorizontal, Edit, Trash2, Eye, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

type SortOption = "name-asc" | "name-desc" | "price-high" | "price-low" | "stock-high" | "stock-low";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const { toast } = useToast();
  
  // Filter products based on search query and filter selections
  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === "" || product.category === filterCategory;
    const matchesStatus = filterStatus === "" || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "stock-high":
        return b.stock - a.stock;
      case "stock-low":
        return a.stock - b.stock;
      default:
        return 0;
    }
  });

  // Handle adding a new product
  const handleAddProduct = () => {
    toast({
      title: "Add New Product",
      description: "This would open a form to add a new product.",
    });
  };
  
  // Product action handlers
  const handleViewProduct = (productId: string) => {
    toast({
      title: "View Product",
      description: `Viewing product ${productId}`,
    });
  };
  
  const handleEditProduct = (productId: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${productId}`,
    });
  };
  
  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Delete Product",
      description: `Deleting product ${productId}`,
      variant: "destructive",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Data",
      description: "Exporting product data to CSV",
    });
  };
  
  const handleCustomize = () => {
    toast({
      title: "Customize View",
      description: "This would open options to customize the product table view",
    });
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
          <Button className="md:w-auto w-full" onClick={handleAddProduct}>
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
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="md:w-auto w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <p className="text-xs font-medium mb-1">Category</p>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        <SelectItem value="Furniture">Furniture</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Stationery">Stationery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2">
                    <p className="text-xs font-medium mb-1">Status</p>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setFilterCategory(""); setFilterStatus(""); }}>
                    Reset Filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="md:w-auto w-full" onClick={handleCustomize}>
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Customize
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="md:w-auto w-full">Sort By</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("name-desc")}>
                    Name (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-high")}>
                    Price (High-Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("price-low")}>
                    Price (Low-High)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("stock-high")}>
                    Stock (High-Low)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("stock-low")}>
                    Stock (Low-High)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
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
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewProduct(product.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditProduct(product.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                        No products found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleExport}>
              <FileText className="mr-2 h-4 w-4" />
              Export
            </Button>
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
