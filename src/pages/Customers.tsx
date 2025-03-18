
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Search, Download, FileText, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const customerData = [
  {
    id: "CUST001",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    totalSpent: 12450.75,
    status: "Active",
    lastOrder: "2023-09-15",
    avatar: "",
    tier: "Premium"
  },
  {
    id: "CUST002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, USA",
    totalSpent: 8320.50,
    status: "Active",
    lastOrder: "2023-09-10",
    avatar: "",
    tier: "Standard"
  },
  {
    id: "CUST003",
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 456-7890",
    location: "Chicago, USA",
    totalSpent: 15780.25,
    status: "Inactive",
    lastOrder: "2023-08-05",
    avatar: "",
    tier: "Premium"
  },
  {
    id: "CUST004",
    name: "Dave Wilson",
    email: "dave.wilson@example.com",
    phone: "+1 (555) 789-0123",
    location: "Houston, USA",
    totalSpent: 4560.80,
    status: "Active",
    lastOrder: "2023-09-22",
    avatar: "",
    tier: "Standard"
  },
  {
    id: "CUST005",
    name: "Eve Brown",
    email: "eve.brown@example.com",
    phone: "+1 (555) 234-5678",
    location: "Miami, USA",
    totalSpent: 9870.35,
    status: "Active",
    lastOrder: "2023-09-18",
    avatar: "",
    tier: "Premium"
  }
];

const recentInteractions = [
  {
    id: 1,
    customer: "Alice Johnson",
    type: "Support Ticket",
    description: "Requested information about product warranties",
    date: "2023-09-20",
    status: "Resolved"
  },
  {
    id: 2,
    customer: "Bob Smith",
    type: "Order Inquiry",
    description: "Asked about shipping times for recent order",
    date: "2023-09-19",
    status: "Pending"
  },
  {
    id: 3,
    customer: "Eve Brown",
    type: "Complaint",
    description: "Product arrived damaged, requesting replacement",
    date: "2023-09-18",
    status: "In Progress"
  }
];

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCustomers = customerData.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <Button className="md:w-auto w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Customers</CardTitle>
              <CardDescription>Active customer accounts</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{customerData.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Customer Tiers</CardTitle>
              <CardDescription>Breakdown by subscription tier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Premium</span>
                <span className="font-medium">
                  {customerData.filter(c => c.tier === "Premium").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Standard</span>
                <span className="font-medium">
                  {customerData.filter(c => c.tier === "Standard").length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-500">Resolved</span>
                  <span className="font-medium">
                    {recentInteractions.filter(i => i.status === "Resolved").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-500">Pending</span>
                  <span className="font-medium">
                    {recentInteractions.filter(i => i.status === "Pending" || i.status === "In Progress").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>
              Manage customer accounts, orders, and relationship data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <TabsList>
                  <TabsTrigger value="all">All Customers</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                
                <div className="relative flex-1 md:max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <TabsContent value="all" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Last Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={customer.avatar} />
                                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{customer.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-1 h-3 w-3" /> 
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Phone className="mr-1 h-3 w-3" /> 
                                  <span>{customer.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{customer.location}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${customer.totalSpent.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={customer.status === "Active" ? "default" : "secondary"}
                              >
                                {customer.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(customer.lastOrder).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                            No customers found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="active" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers
                        .filter(customer => customer.status === "Active")
                        .map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{customer.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-1 h-3 w-3" /> 
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Phone className="mr-1 h-3 w-3" /> 
                                  <span>{customer.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{customer.location}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${customer.totalSpent.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {new Date(customer.lastOrder).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="inactive" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Total Spent</TableHead>
                        <TableHead>Last Order</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers
                        .filter(customer => customer.status === "Inactive")
                        .map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{customer.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-1 h-3 w-3" /> 
                                  <span>{customer.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Phone className="mr-1 h-3 w-3" /> 
                                  <span>{customer.phone}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{customer.location}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${customer.totalSpent.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {new Date(customer.lastOrder).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Report
              </Button>
            </div>
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

export default Customers;
