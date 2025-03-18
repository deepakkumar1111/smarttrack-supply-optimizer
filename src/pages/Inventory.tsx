
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  PlusCircle, 
  RefreshCw, 
  Download, 
  Box, 
  AlertTriangle,
  ArrowUpDown
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState } from "react";

const inventoryData = [
  {
    id: "INV001",
    name: "Laptop - XPS 13",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 45,
    reorderPoint: 20,
    status: "In Stock",
    lastUpdated: "2023-09-15"
  },
  {
    id: "INV002",
    name: "Office Chair - Ergonomic",
    category: "Furniture",
    location: "Warehouse B",
    quantity: 12,
    reorderPoint: 15,
    status: "Low Stock",
    lastUpdated: "2023-09-12"
  },
  {
    id: "INV003",
    name: "Wireless Keyboard",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 68,
    reorderPoint: 25,
    status: "In Stock",
    lastUpdated: "2023-09-10"
  },
  {
    id: "INV004",
    name: "4K Monitor - 27\"",
    category: "Electronics",
    location: "Warehouse C",
    quantity: 0,
    reorderPoint: 10,
    status: "Out of Stock",
    lastUpdated: "2023-09-05"
  },
  {
    id: "INV005",
    name: "Conference Table",
    category: "Furniture",
    location: "Warehouse B",
    quantity: 5,
    reorderPoint: 3,
    status: "In Stock",
    lastUpdated: "2023-09-08"
  },
  {
    id: "INV006",
    name: "Wireless Mouse",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 120,
    reorderPoint: 40,
    status: "In Stock",
    lastUpdated: "2023-09-14"
  },
  {
    id: "INV007",
    name: "USB-C Dock",
    category: "Electronics",
    location: "Warehouse A",
    quantity: 18,
    reorderPoint: 20,
    status: "Low Stock",
    lastUpdated: "2023-09-13"
  }
];

const locationData = [
  { name: 'Warehouse A', value: 4 },
  { name: 'Warehouse B', value: 2 },
  { name: 'Warehouse C', value: 1 },
];

const categoryData = [
  { name: 'Electronics', value: 5 },
  { name: 'Furniture', value: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const alerts = [
  { id: 1, item: "4K Monitor - 27\"", type: "Out of Stock", severity: "High" },
  { id: 2, item: "Office Chair - Ergonomic", type: "Low Stock", severity: "Medium" },
  { id: 3, item: "USB-C Dock", type: "Low Stock", severity: "Medium" },
];

const recentActivity = [
  { id: 1, action: "Stock Received", item: "Wireless Keyboard", quantity: 25, date: "2023-09-10", user: "John D." },
  { id: 2, action: "Stock Transfer", item: "Office Chair - Ergonomic", quantity: 5, date: "2023-09-12", user: "Maria S." },
  { id: 3, action: "Stock Count", item: "All Items - Warehouse A", quantity: null, date: "2023-09-14", user: "System" },
];

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredInventory = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function for status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "outline";
      case "Out of Stock":
        return "destructive";
      default:
        return "default";
    }
  };

  // Helper function to determine stock level color 
  const getStockLevelColor = (quantity: number, reorderPoint: number) => {
    if (quantity === 0) return "bg-red-500";
    if (quantity < reorderPoint) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="sm:w-auto w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Inventory
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Items</CardTitle>
              <CardDescription>Current inventory count</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{inventoryData.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Stock Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-amber-500">Low Stock</span>
                  <span className="font-medium">
                    {inventoryData.filter(i => i.status === "Low Stock").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500">Out of Stock</span>
                  <span className="font-medium">
                    {inventoryData.filter(i => i.status === "Out of Stock").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Locations</CardTitle>
              <CardDescription>Inventory by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {locationData.map(location => (
                  <div key={location.name} className="flex justify-between">
                    <span>{location.name}</span>
                    <span className="font-medium">{location.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Inventory by Category</CardTitle>
              <CardDescription>
                Distribution across product categories
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>
                Items requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start p-3 rounded-md border">
                    <div className="mr-3">
                      <AlertTriangle className={
                        alert.severity === 'High' ? 'text-red-500' : 
                        alert.severity === 'Medium' ? 'text-amber-500' : 'text-blue-500'
                      } />
                    </div>
                    <div>
                      <div className="font-medium">{alert.item}</div>
                      <div className="text-sm text-muted-foreground">
                        {alert.type}
                      </div>
                    </div>
                    <Badge className="ml-auto" variant={
                      alert.severity === 'High' ? 'destructive' : 
                      alert.severity === 'Medium' ? 'outline' : 'secondary'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>
              Manage your inventory levels, stock locations, and product availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <TabsList>
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="low">Low Stock</TabsTrigger>
                  <TabsTrigger value="out">Out of Stock</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="warehouseA">Warehouse A</SelectItem>
                      <SelectItem value="warehouseB">Warehouse B</SelectItem>
                      <SelectItem value="warehouseC">Warehouse C</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="all" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory.length > 0 ? (
                        filteredInventory.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded">
                                  <Box className="h-4 w-4 text-primary" />
                                </div>
                                {item.name}
                              </div>
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-center">
                              <div className="flex flex-col items-center">
                                <span>{item.quantity}</span>
                                <div className="flex w-16 h-1.5 bg-muted rounded mt-1 overflow-hidden">
                                  <div 
                                    className={`h-full ${getStockLevelColor(item.quantity, item.reorderPoint)}`}
                                    style={{ 
                                      width: item.quantity === 0 ? '3%' : 
                                             `${Math.min(100, (item.quantity / (item.reorderPoint * 2)) * 100)}%` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant={getStatusVariant(item.status)}>
                                {item.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(item.lastUpdated).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                            No inventory items found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="low" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Reorder Point</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory
                        .filter(item => item.status === "Low Stock")
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded">
                                  <Box className="h-4 w-4 text-amber-500" />
                                </div>
                                {item.name}
                              </div>
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-center">{item.reorderPoint}</TableCell>
                            <TableCell>
                              {new Date(item.lastUpdated).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="out" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-center">Reorder Point</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInventory
                        .filter(item => item.status === "Out of Stock")
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
                                  <Box className="h-4 w-4 text-red-500" />
                                </div>
                                {item.name}
                              </div>
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.location}</TableCell>
                            <TableCell className="text-center">{item.reorderPoint}</TableCell>
                            <TableCell>
                              {new Date(item.lastUpdated).toLocaleDateString()}
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
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
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

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest inventory transactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>User</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.item}</TableCell>
                      <TableCell className="text-center">
                        {activity.quantity !== null ? activity.quantity : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(activity.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{activity.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Inventory;
