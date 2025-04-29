
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { inventoryData, InventoryItem } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { faker } from "@faker-js/faker";

// Mock service for inventory management
const inventoryService = {
  getInventory: async (): Promise<InventoryItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...inventoryData]);
      }, 500);
    });
  },
  
  addInventoryItem: async (item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = {
          id: `INV-${faker.string.numeric(3)}`,
          ...item
        };
        inventoryData.push(newItem);
        resolve(newItem);
      }, 500);
    });
  },
  
  updateInventoryItem: async (id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = inventoryData.findIndex(item => item.id === id);
        if (index !== -1) {
          inventoryData[index] = { ...inventoryData[index], ...updates };
          resolve(inventoryData[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
  
  deleteInventoryItem: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = inventoryData.findIndex(item => item.id === id);
        if (index !== -1) {
          inventoryData.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
};

export const useInventory = () => {
  const queryClient = useQueryClient();
  
  // Fetch all inventory items
  const { data: inventory = [], isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: inventoryService.getInventory,
  });
  
  // Add a new inventory item
  const addInventoryItemMutation = useMutation({
    mutationFn: inventoryService.addInventoryItem,
    onSuccess: (newItem) => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to inventory.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add inventory item. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to add inventory item:", error);
    },
  });
  
  // Update an existing inventory item
  const updateInventoryItemMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<InventoryItem> }) => 
      inventoryService.updateInventoryItem(id, updates),
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast({
        title: "Item Updated",
        description: `${updatedItem?.name} has been updated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update inventory item. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to update inventory item:", error);
    },
  });
  
  // Delete an inventory item
  const deleteInventoryItemMutation = useMutation({
    mutationFn: inventoryService.deleteInventoryItem,
    onSuccess: (success, id) => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      if (success) {
        toast({
          title: "Item Deleted",
          description: "The inventory item has been removed.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete inventory item. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to delete inventory item:", error);
    },
  });
  
  return {
    inventory,
    isLoading,
    error,
    addInventoryItem: addInventoryItemMutation.mutate,
    updateInventoryItem: updateInventoryItemMutation.mutate,
    deleteInventoryItem: deleteInventoryItemMutation.mutate,
  };
};
