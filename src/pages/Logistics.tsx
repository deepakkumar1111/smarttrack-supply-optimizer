import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown, TruckIcon, Plane, Ship, Train, RefreshCw, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";
import { AddShipmentModal, Shipment } from "@/components/logistics/AddShipmentModal";

// Initial shipment data
const initialShipmentData = [
  {
    id: "SHP001",
    origin: "Chicago, IL",
    destination: "New York, NY",
    carrier: "FastFreight Inc.",
    mode: "Truck",
    departureDate: "2023-09-15",
    eta: "2023-09-18",
    status: "In Transit",
    progress: 65,
    weight: "1500",
    volume: "5",
    trackingNotes: "Shipment is on schedule.",
    priority: "Medium",
    customsDeclaration: "CUST2023-123",
    estimatedCost: "2500",
    lastUpdated: "2023-09-16"
  },
  {
    id: "SHP002",
    origin: "Los Angeles, CA",
    destination: "Seattle, WA",
    carrier: "Pacific Shipping",
    mode: "Ship",
    departureDate: "2023-09-10",
    eta: "2023-09-20",
    status: "In Transit",
    progress: 40,
    weight: "5000",
    volume: "20",
    trackingNotes: "Delayed due to weather conditions.",
    priority: "High",
    customsDeclaration: "CUST2023-456",
    estimatedCost: "7500",
    lastUpdated: "2023-09-15"
  },
  {
    id: "SHP003",
    origin: "Dallas, TX",
    destination: "Miami, FL",
    carrier: "AeroFreight",
    mode: "Air",
    departureDate: "2023-09-17",
    eta: "2023-09-18",
    status: "Scheduled",
    progress: 0,
    weight: "800",
    volume: "3",
    trackingNotes: "Awaiting customs clearance.",
    priority: "Medium",
    customsDeclaration: "CUST2023-789",
    estimatedCost: "4000",
    lastUpdated: "2023-09-17"
  },
  {
    id: "SHP004",
    origin: "Boston, MA",
    destination: "Washington, DC",
    carrier: "RailExpress",
    mode: "Rail",
    departureDate: "2023-09-12",
    eta: "2023-09-14",
    status: "Delivered",
    progress: 100,
    weight: "2000",
    volume: "8",
    trackingNotes: "Delivered successfully.",
    priority: "Low",
    customsDeclaration: "CUST2023-012",
    estimatedCost: "1800",
    lastUpdated: "2023-09-14"
  },
  {
    id: "SHP005",
    origin: "Denver, CO",
    destination: "Phoenix, AZ",
    carrier: "FastFreight Inc.",
    mode: "Truck",
    departureDate: "2023-09-16",
    eta: "2023-09-19",
    status: "In Transit",
    progress: 25,
    weight: "1200",
    volume: "4",
    trackingNotes: "Minor delay due to traffic.",
    priority: "Medium",
    customsDeclaration: "CUST2023-345",
    estimatedCost: "2200",
    lastUpdated: "2023-09-17"
  }
] as Shipment[];

const transportModeData = [
  { name: 'Truck', value: 45 },
  { name: 'Ship', value: 25 },
  { name: 'Air', value: 20 },
  { name: 'Rail', value: 10 },
];

const carrierPerformanceData = [
  { name: 'FastFreight', onTime: 92, costEfficiency: 85 },
  { name: 'Pacific Ship', onTime: 78, costEfficiency: 92 },
  { name: 'AeroFreight', onTime: 95, costEfficiency: 70 },
  { name: 'RailExpress', onTime: 88, costEfficiency: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "In Transit":
      return "outline";
    case "Scheduled":
      return "secondary";
    case "Delayed":
      return "warning";
    case "Cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "Delayed":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "Cancelled":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-blue-500" />;
  }
};

const Logistics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shipmentData, setShipmentData] = useState<Shipment[]>(initialShipmentData);
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState<keyof Shipment | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleAddShipment = (newShipment: Shipment) => {
    setShipmentData(prev => [newShipment, ...prev]);
  };

  const handleSort = (field: keyof Shipment) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredAndSortedShipments = shipmentData
    .filter(shipment => 
      Object.values(shipment).some(value => 
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : 1;
      }
      return aVal < bVal ? 1 : -1;
    });

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case "Truck":
        return <TruckIcon className="h-4 w-4" />;
      case "Ship":
        return <Ship className="h-4 w-4" />;
      case "Air":
        return <Plane className="h-4 w-4" />;
      case "Rail":
        return <Train className="h-4 w-4" />;
      default:
        return <TruckIcon className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Delivered":
        return "default";
      case "In Transit":
        return "outline";
      case "Scheduled":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleRefresh = () => {
    // In a real app, this would fetch fresh data from API
    // For now, just reset to initial data
    setShipmentData(initialShipmentData);
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Logistics</h1>
          <div className="flex items-center space-x-2">
            <AddShipmentModal onAddShipment={handleAddShipment} />
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Shipments</CardTitle>
              <CardDescription>Currently in transit</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {shipmentData.filter(s => s.status === "In Transit").length}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Departures</CardTitle>
              <CardDescription>Scheduled for next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {shipmentData.filter(s => s.status === "Scheduled").length}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Completed</CardTitle>
              <CardDescription>Delivered this month</CardDescription>
            </CardHeader>
            <CardContent className="text-3xl font-bold">
              {shipmentData.filter(s => s.status === "Delivered").length}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transport Mode Distribution</CardTitle>
              <CardDescription>
                Breakdown of shipping methods by volume
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={transportModeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {transportModeData.map((entry, index) => (
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
              <CardTitle>Carrier Performance</CardTitle>
              <CardDescription>
                On-time delivery vs cost efficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={carrierPerformanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="onTime" name="On-Time %" fill="#0088FE" />
                  <Bar dataKey="costEfficiency" name="Cost Efficiency" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shipment Tracking</CardTitle>
            <CardDescription>
              Track shipments, manage carriers, and optimize delivery routes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <TabsList>
                  <TabsTrigger value="all">All Shipments</TabsTrigger>
                  <TabsTrigger value="transit">In Transit</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="delayed">Delayed</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search shipments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleSort('departureDate')}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <TabsContent value="all" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedShipments.map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm">{shipment.origin}</span>
                              <span className="text-xs text-muted-foreground">to</span>
                              <span className="text-sm">{shipment.destination}</span>
                            </div>
                          </TableCell>
                          <TableCell>{shipment.carrier}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getTransportIcon(shipment.mode)}
                              <span>{shipment.mode}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              shipment.priority === "High" ? "destructive" :
                              shipment.priority === "Medium" ? "default" :
                              "secondary"
                            }>
                              {shipment.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>${shipment.estimatedCost}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(shipment.status)}
                              <Badge variant={getStatusColor(shipment.status)}>
                                {shipment.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="w-full">
                              <Progress value={shipment.progress} className="h-2" />
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(shipment.departureDate).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {shipment.progress}%
                                </span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="transit" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedShipments
                        .filter(shipment => shipment.status === "In Transit")
                        .map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{shipment.origin}</span>
                                <span className="text-xs text-muted-foreground">to</span>
                                <span className="text-sm">{shipment.destination}</span>
                              </div>
                            </TableCell>
                            <TableCell>{shipment.carrier}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getTransportIcon(shipment.mode)}
                                <span>{shipment.mode}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(shipment.eta).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="w-full">
                                <Progress value={shipment.progress} className="h-2" />
                                <div className="flex justify-between mt-1">
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(shipment.departureDate).toLocaleDateString()}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {shipment.progress}%
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Departure</TableHead>
                        <TableHead>ETA</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedShipments
                        .filter(shipment => shipment.status === "Scheduled")
                        .map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{shipment.origin}</span>
                                <span className="text-xs text-muted-foreground">to</span>
                                <span className="text-sm">{shipment.destination}</span>
                              </div>
                            </TableCell>
                            <TableCell>{shipment.carrier}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getTransportIcon(shipment.mode)}
                                <span>{shipment.mode}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(shipment.departureDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(shipment.eta).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="delivered" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>Delivered On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedShipments
                        .filter(shipment => shipment.status === "Delivered")
                        .map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{shipment.origin}</span>
                                <span className="text-xs text-muted-foreground">to</span>
                                <span className="text-sm">{shipment.destination}</span>
                              </div>
                            </TableCell>
                            <TableCell>{shipment.carrier}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getTransportIcon(shipment.mode)}
                                <span>{shipment.mode}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(shipment.eta).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="delayed" className="m-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking #</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Carrier</TableHead>
                        <TableHead>Mode</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAndSortedShipments
                        .filter(shipment => shipment.status === "Delayed")
                        .map((shipment) => (
                          <TableRow key={shipment.id}>
                            <TableCell className="font-medium">{shipment.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{shipment.origin}</span>
                                <span className="text-xs text-muted-foreground">to</span>
                                <span className="text-sm">{shipment.destination}</span>
                              </div>
                            </TableCell>
                            <TableCell>{shipment.carrier}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getTransportIcon(shipment.mode)}
                                <span>{shipment.mode}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(shipment.eta).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusVariant(shipment.status)}>
                                {shipment.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Logistics;
