import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown, RefreshCw } from "lucide-react";
import { useState } from "react";
import { AddShipmentModal, Shipment } from "@/components/logistics/AddShipmentModal";
import { ShipmentStats } from "@/components/logistics/ShipmentStats";
import { ShipmentAnalytics } from "@/components/logistics/ShipmentAnalytics";
import { ShipmentTable } from "@/components/logistics/ShipmentTable";
import { AIInsightsProvider } from "@/components/logistics/AIInsightsProvider";

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

  const handleRefresh = () => {
    setShipmentData(initialShipmentData);
  };

  return (
    <AIInsightsProvider>
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

          <ShipmentStats shipments={shipmentData} />
          <ShipmentAnalytics shipments={shipmentData} />

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
                  <ShipmentTable shipments={filteredAndSortedShipments} activeTab={activeTab} />
                </TabsContent>
                
                <TabsContent value="transit" className="m-0">
                  <ShipmentTable shipments={filteredAndSortedShipments} activeTab={activeTab} />
                </TabsContent>
                
                <TabsContent value="scheduled" className="m-0">
                  <ShipmentTable shipments={filteredAndSortedShipments} activeTab={activeTab} />
                </TabsContent>
                
                <TabsContent value="delivered" className="m-0">
                  <ShipmentTable shipments={filteredAndSortedShipments} activeTab={activeTab} />
                </TabsContent>

                <TabsContent value="delayed" className="m-0">
                  <ShipmentTable shipments={filteredAndSortedShipments} activeTab={activeTab} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </Shell>
    </AIInsightsProvider>
  );
};

export default Logistics;
