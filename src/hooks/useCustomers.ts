
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { faker } from "@faker-js/faker";

interface CustomerContact {
  name: string;
  email: string;
  phone: string;
}

interface Customer {
  id: string;
  name: string;
  location: string;
  contact: CustomerContact;
  notes?: string;
}

// Mock data for customers
const customersData: Customer[] = [
  {
    id: "CUS-001",
    name: "TechCorp Solutions",
    location: "San Francisco, CA",
    contact: {
      name: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "555-123-4567"
    },
    notes: "Premium enterprise client"
  },
  {
    id: "CUS-002",
    name: "Global Industries",
    location: "Chicago, IL",
    contact: {
      name: "Emma Johnson",
      email: "emma.johnson@globalind.com",
      phone: "555-222-3333"
    }
  },
  {
    id: "CUS-003",
    name: "Innovate Manufacturing",
    location: "Austin, TX",
    contact: {
      name: "Michael Brown",
      email: "michael.brown@innovatemfg.com",
      phone: "555-444-5555"
    },
    notes: "Regular bulk orders"
  }
];

// Mock service for customers management
const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...customersData]);
      }, 500);
    });
  },
  
  addCustomer: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCustomer = {
          id: `CUS-${faker.string.numeric(3)}`,
          ...customer
        };
        customersData.push(newCustomer);
        resolve(newCustomer);
      }, 500);
    });
  },
  
  updateCustomer: async (id: string, updates: Partial<Customer>): Promise<Customer | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = customersData.findIndex(customer => customer.id === id);
        if (index !== -1) {
          customersData[index] = { ...customersData[index], ...updates };
          resolve(customersData[index]);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
  
  deleteCustomer: async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = customersData.findIndex(customer => customer.id === id);
        if (index !== -1) {
          customersData.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }
};

export const useCustomers = () => {
  const queryClient = useQueryClient();
  
  // Fetch all customers
  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getCustomers,
  });
  
  // Add a new customer
  const addCustomerMutation = useMutation({
    mutationFn: customerService.addCustomer,
    onSuccess: (newCustomer) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Customer Added",
        description: `${newCustomer.name} has been added to your customer list.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add customer. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to add customer:", error);
    },
  });
  
  // Update an existing customer
  const updateCustomerMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Customer> }) => 
      customerService.updateCustomer(id, updates),
    onSuccess: (updatedCustomer) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast({
        title: "Customer Updated",
        description: `${updatedCustomer?.name} has been updated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update customer. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to update customer:", error);
    },
  });
  
  // Delete a customer
  const deleteCustomerMutation = useMutation({
    mutationFn: customerService.deleteCustomer,
    onSuccess: (success, id) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      if (success) {
        toast({
          title: "Customer Deleted",
          description: "The customer has been removed from your list.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete customer. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to delete customer:", error);
    },
  });
  
  return {
    customers,
    isLoading,
    error,
    addCustomer: addCustomerMutation.mutate,
    updateCustomer: updateCustomerMutation.mutate,
    deleteCustomer: deleteCustomerMutation.mutate,
  };
};
