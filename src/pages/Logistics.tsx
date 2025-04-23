
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown, TruckIcon, Plane, Ship, Train, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
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
    progress: 65
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
    progress: 40
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
    progress: 0
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
    progress: 100
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
    progress: 25
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

const Logistics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shipmentData, setShipmentData] = useState<Shipment[]>(initialShipmentData);
  const [activeTab, setActiveTab] = useState("all");
  
  const handleAddShipment = (newShipment: Shipment) => {
    setShipmentData(prev => [...prev, newShipment]);
  };
  
  const filteredShipments = shipmentData.filter(shipment => 
    shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
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
                        <TableHead>ETA</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShipments.length > 0 ? (
                        filteredShipments.map((shipment) => (
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
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                            No shipments found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
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
                      {filteredShipments
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
                      {filteredShipments
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
                      {filteredShipments
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
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export Log</Button>
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

export default Logistics;
