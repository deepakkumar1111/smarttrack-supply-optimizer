
import React, { useState } from "react";
import { Shell } from "@/components/Layout/Shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Factory, Plus, Search, MoreHorizontal, MapPin, Phone, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSuppliers } from "@/hooks/useSuppliers";
import { AddSupplierModal } from "@/components/suppliers/AddSupplierModal";

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const { suppliers, isLoading, addSupplier } = useSuppliers();
  
  // Filter suppliers based on search query
  const filteredSuppliers = suppliers.filter(supplier => {
    const query = searchQuery.toLowerCase();
    return (
      supplier.name.toLowerCase().includes(query) ||
      supplier.location.toLowerCase().includes(query) ||
      supplier.contact.name.toLowerCase().includes(query) ||
      supplier.contact.email.toLowerCase().includes(query) ||
      supplier.productCategories.some(cat => cat.toLowerCase().includes(query))
    );
  });
  
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Supplier Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Supplier
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Suppliers</CardTitle>
              <CardDescription>Current supplier count</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{suppliers.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Average Lead Time</CardTitle>
              <CardDescription>Average supplier lead time</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {suppliers.length > 0 
                ? Math.round(suppliers.reduce((sum, s) => sum + s.leadTimeDays, 0) / suppliers.length)
                : 0} days
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Average Reliability</CardTitle>
              <CardDescription>Average supplier reliability score</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {suppliers.length > 0 
                ? (suppliers.reduce((sum, s) => sum + s.reliabilityScore, 0) / suppliers.length).toFixed(2)
                : 0}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Suppliers Directory</CardTitle>
            <CardDescription>
              Manage your suppliers, their contact information, and performance metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search suppliers..."
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
                    <TableHead>Supplier Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead>Reliability</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col items-center justify-center">
                          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                          <p className="mt-2 text-sm text-muted-foreground">Loading suppliers...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">{supplier.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {supplier.productCategories.join(', ')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            <div className="text-sm">{supplier.contact.name}</div>
                            <div className="text-xs flex items-center text-muted-foreground">
                              <Mail className="mr-1 h-3 w-3" />
                              {supplier.contact.email}
                            </div>
                            <div className="text-xs flex items-center text-muted-foreground">
                              <Phone className="mr-1 h-3 w-3" />
                              {supplier.contact.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4 text-muted-foreground" /> 
                            {supplier.location}
                          </div>
                        </TableCell>
                        <TableCell>{supplier.leadTimeDays} days</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              supplier.reliabilityScore >= 0.95 ? "default" :
                              supplier.reliabilityScore >= 0.9 ? "secondary" : "outline"
                            }
                          >
                            {supplier.reliabilityScore.toFixed(2)}
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                              <DropdownMenuItem>Contact Info</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                        No suppliers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Suppliers</Button>
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
      
      {/* Add Supplier Modal */}
      <AddSupplierModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={addSupplier}
      />
    </Shell>
  );
};

export default Suppliers;
