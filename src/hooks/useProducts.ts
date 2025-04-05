
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

export const useProducts = () => {
  const queryClient = useQueryClient();
  
  // Fetch all products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
  });
  
  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: productService.getCategories,
  });
  
  // Add a new product
  const addProductMutation = useMutation({
    mutationFn: productService.addProduct,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added to the catalog.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to add product:", error);
    },
  });
  
  // Update an existing product
  const updateProductMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Product> }) => 
      productService.updateProduct(id, updates),
    onSuccess: (updatedProduct) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      toast({
        title: "Product Updated",
        description: `${updatedProduct?.name} has been updated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to update product:", error);
    },
  });
  
  // Delete a product
  const deleteProductMutation = useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: (success, id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (success) {
        toast({
          title: "Product Deleted",
          description: "The product has been removed from the catalog.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to delete product:", error);
    },
  });
  
  // Get stock status counts
  const stockStatusCounts = {
    inStock: products.filter(p => p.status === "In Stock").length,
    lowStock: products.filter(p => p.status === "Low Stock").length,
    outOfStock: products.filter(p => p.status === "Out of Stock").length,
  };
  
  // Get category counts
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = products.filter(p => p.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    products,
    categories,
    isLoading,
    error,
    addProduct: addProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
    stockStatusCounts,
    categoryCounts,
  };
};
