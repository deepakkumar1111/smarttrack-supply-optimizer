
import React, { useState } from "react";
import { Shell } from "@/components/Layout/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Search, MoreHorizontal, MapPin, Phone, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCustomers } from "@/hooks/useCustomers";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { customers, isLoading, addCustomer } = useCustomers();
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    const query = searchQuery.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      customer.location.toLowerCase().includes(query) ||
      customer.contact.name.toLowerCase().includes(query) ||
      customer.contact.email.toLowerCase().includes(query) ||
      (customer.notes && customer.notes.toLowerCase().includes(query))
    );
  });
  
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Customers</CardTitle>
              <CardDescription>Current customer count</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{customers.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Customers</CardTitle>
              <CardDescription>Customers with recent orders</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{Math.round(customers.length * 0.8)}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Customer Satisfaction</CardTitle>
              <CardDescription>Average customer rating</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">4.7/5</CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>
              Manage your customers, their contact information, and order history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search customers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                          <p className="mt-2 text-sm text-muted-foreground">Loading customers...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{customer.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            <div className="text-sm">{customer.contact.name}</div>
                            <div className="text-xs flex items-center text-muted-foreground">
                              <Mail className="mr-1 h-3 w-3" />
                              {customer.contact.email}
                            </div>
                            <div className="text-xs flex items-center text-muted-foreground">
                              <Phone className="mr-1 h-3 w-3" />
                              {customer.contact.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4 text-muted-foreground" /> 
                            {customer.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate">
                            {customer.notes || "No additional notes"}
                          </div>
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                              <DropdownMenuItem>Order History</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No customers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Customers</Button>
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
      
      {/* Add Customer Modal */}
      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addCustomer}
      />
    </Shell>
  );
};

export default Customers;
