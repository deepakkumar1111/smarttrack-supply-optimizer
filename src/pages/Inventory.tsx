
import React, { useState } from "react";
import { Shell } from "@/components/Layout/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, Plus, Search, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useInventory } from "@/hooks/useInventory";
import { AddInventoryModal } from "@/components/inventory/AddInventoryModal";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { inventory, isLoading, addInventoryItem } = useInventory();
  
  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.supplier.toLowerCase().includes(query)
    );
  });
  
  // Calculate inventory stats
  const totalStockValue = inventory.reduce((total, item) => total + (item.quantity * item.unitCost), 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.reorderPoint).length;
  
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Items</CardTitle>
              <CardDescription>Current inventory count</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{inventory.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Value</CardTitle>
              <CardDescription>Current inventory value</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">${totalStockValue.toLocaleString()}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Low Stock</CardTitle>
              <CardDescription>Items below reorder point</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold text-amber-500">{lowStockItems}</CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              Manage your inventory, track stock levels, and monitor items.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search inventory..."
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
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                          <p className="mt-2 text-sm text-muted-foreground">Loading inventory...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => {
                      const isLowStock = item.quantity <= item.reorderPoint;
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${item.unitCost.toFixed(2)}</TableCell>
                          <TableCell>
                            {isLowStock ? (
                              <Badge variant="outline" className="text-amber-500 border-amber-500">
                                Low Stock
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                In Stock
                              </Badge>
                            )}
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
                                <DropdownMenuItem>Edit Item</DropdownMenuItem>
                                <DropdownMenuItem>Adjust Stock</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                        No inventory items found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Inventory</Button>
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
      
      {/* Add Inventory Modal */}
      <AddInventoryModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addInventoryItem}
      />
    </Shell>
  );
};

export default Inventory;
