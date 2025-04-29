
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suppliersData, Supplier } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { faker } from "@faker-js/faker";

// Mock service for suppliers management
const supplierService = {
  getSuppliers: async (): Promise<Supplier[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...suppliersData]);
      }, 500);
    });
  },
  
  addSupplier: async (supplier: Omit<Supplier, 'id'>): Promise<Supplier> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSupplier = {
          id: `SUP-${faker.string.numeric(3)}`,
          ...supplier
        };
        suppliersData.push(newSupplier);
        resolve(newSupplier);
      }, 500);
    });
  },
  
  updateSupplier: async (id: string, updates: Partial<Supplier>): Promise<Supplier | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = suppliersData.findIndex(supplier => supplier.id === id);
        if (index !== -1) {
          suppliersData[index] = { ...suppliersData[index], ...updates };
          resolve(suppliersData[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
  
  deleteSupplier: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = suppliersData.findIndex(supplier => supplier.id === id);
        if (index !== -1) {
          suppliersData.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
};

export const useSuppliers = () => {
  const queryClient = useQueryClient();
  
  // Fetch all suppliers
  const { data: suppliers = [], isLoading, error } = useQuery({
    queryKey: ["suppliers"],
    queryFn: supplierService.getSuppliers,
  });
  
  // Add a new supplier
  const addSupplierMutation = useMutation({
    mutationFn: supplierService.addSupplier,
    onSuccess: (newSupplier) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Supplier Added",
        description: `${newSupplier.name} has been added to your supplier network.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add supplier. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to add supplier:", error);
    },
  });
  
  // Update an existing supplier
  const updateSupplierMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Supplier> }) => 
      supplierService.updateSupplier(id, updates),
    onSuccess: (updatedSupplier) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast({
        title: "Supplier Updated",
        description: `${updatedSupplier?.name} has been updated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update supplier. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to update supplier:", error);
    },
  });
  
  // Delete a supplier
  const deleteSupplierMutation = useMutation({
    mutationFn: supplierService.deleteSupplier,
    onSuccess: (success, id) => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      if (success) {
        toast({
          title: "Supplier Deleted",
          description: "The supplier has been removed from your network.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete supplier. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to delete supplier:", error);
    },
  });
  
  return {
    suppliers,
    isLoading,
    error,
    addSupplier: addSupplierMutation.mutate,
    updateSupplier: updateSupplierMutation.mutate,
    deleteSupplier: deleteSupplierMutation.mutate,
  };
};
