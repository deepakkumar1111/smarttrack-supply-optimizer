
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle, Search, Mail, Phone, MapPin, Download, Filter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const supplierData = [
  {
    id: "SUP001",
    name: "Acme Manufacturing",
    type: "Parts Manufacturer",
    contactName: "John Miller",
    email: "j.miller@acme.com",
    phone: "+1 (555) 234-5678",
    location: "Detroit, USA",
    relationshipLength: "5 years",
    performanceScore: 92,
    status: "Preferred",
    lastDelivery: "2023-09-15"
  },
  {
    id: "SUP002",
    name: "Global Materials Inc.",
    type: "Raw Materials",
    contactName: "Sarah Chen",
    email: "s.chen@globalmaterials.com",
    phone: "+1 (555) 987-6543",
    location: "Chicago, USA",
    relationshipLength: "3 years",
    performanceScore: 87,
    status: "Approved",
    lastDelivery: "2023-09-12"
  },
  {
    id: "SUP003",
    name: "Quick Logistics",
    type: "Logistics Provider",
    contactName: "David Patel",
    email: "d.patel@quicklogistics.com",
    phone: "+1 (555) 111-2222",
    location: "Atlanta, USA",
    relationshipLength: "2 years",
    performanceScore: 79,
    status: "Approved",
    lastDelivery: "2023-09-10"
  },
  {
    id: "SUP004",
    name: "Tech Components Ltd.",
    type: "Electronics Supplier",
    contactName: "Maria Garcia",
    email: "m.garcia@techcomponents.com",
    phone: "+1 (555) 333-4444",
    location: "San Jose, USA",
    relationshipLength: "7 years",
    performanceScore: 95,
    status: "Preferred",
    lastDelivery: "2023-09-20"
  },
  {
    id: "SUP005",
    name: "Packaging Solutions",
    type: "Packaging Supplier",
    contactName: "Robert Kim",
    email: "r.kim@packagingsol.com",
    phone: "+1 (555) 555-6666",
    location: "Portland, USA",
    relationshipLength: "1 year",
    performanceScore: 72,
    status: "Probationary",
    lastDelivery: "2023-09-05"
  }
];

const supplierRiskData = [
  { category: "Quality Issues", count: 3 },
  { category: "Late Deliveries", count: 5 },
  { category: "Price Increases", count: 2 }
];

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSuppliers = supplierData.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper function to determine badge color based on performance score
  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 80) return "default";
    if (score >= 70) return "outline";
    return "destructive";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Supplier Management</h1>
          <Button className="md:w-auto w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Supplier
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Suppliers</CardTitle>
              <CardDescription>Active supplier relationships</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{supplierData.length}</CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Supplier Status</CardTitle>
              <CardDescription>Breakdown by relationship status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Preferred</span>
                <span className="font-medium">
                  {supplierData.filter(s => s.status === "Preferred").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Approved</span>
                <span className="font-medium">
                  {supplierData.filter(s => s.status === "Approved").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Probationary</span>
                <span className="font-medium">
                  {supplierData.filter(s => s.status === "Probationary").length}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>Supplier risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {supplierRiskData.map(risk => (
                  <div key={risk.category} className="flex justify-between">
                    <span>{risk.category}</span>
                    <span className="font-medium">{risk.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Supplier Directory</CardTitle>
            <CardDescription>
              Manage supplier relationships, contracts, and performance metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="md:w-auto w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="md:w-auto w-full">Sort By</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Performance (High-Low)</DropdownMenuItem>
                  <DropdownMenuItem>Performance (Low-High)</DropdownMenuItem>
                  <DropdownMenuItem>Recent Deliveries</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Performance</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{supplier.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                              <div className="text-xs text-muted-foreground">{supplier.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="text-sm font-medium">{supplier.contactName}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Mail className="mr-1 h-3 w-3" /> 
                              <span>{supplier.email}</span>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Phone className="mr-1 h-3 w-3" /> 
                              <span>{supplier.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>{supplier.location}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{supplier.relationshipLength}</div>
                        </TableCell>
                        <TableCell>{supplier.type}</TableCell>
                        <TableCell>
                          <div className="flex flex-col items-center">
                            <div className="flex w-full justify-between mb-1">
                              <span className="text-xs">{supplier.performanceScore}%</span>
                            </div>
                            <Progress 
                              value={supplier.performanceScore} 
                              className="w-full h-2"
                              indicatorClassName={getScoreColor(supplier.performanceScore)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant={
                              supplier.status === "Preferred" ? "default" : 
                              supplier.status === "Approved" ? "outline" : 
                              "secondary"
                            }
                          >
                            {supplier.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No suppliers found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
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
      </div>
    </Shell>
  );
};

export default Suppliers;
