
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { mlService, ShipmentAnalyticsData } from "@/services/mlService";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shipment } from "./AddShipmentModal";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ShipmentAnalyticsProps {
  shipments?: Shipment[];
}

export const ShipmentAnalytics = ({ shipments = [] }: ShipmentAnalyticsProps) => {
  const [analyticsData, setAnalyticsData] = useState<ShipmentAnalyticsData>({
    transportModeData: [],
    carrierPerformanceData: []
  });
  const [loading, setLoading] = useState(false);
  const [apiDialog, setApiDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Load analytics data
  const loadAnalyticsData = async () => {
    if (!mlService.isConfigured()) {
      setApiDialog(true);
      return;
    }

    setLoading(true);
    try {
      const data = await mlService.analyzeShipmentData(shipments);
      setAnalyticsData(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      toast.error("Failed to load AI analytics");
    } finally {
      setLoading(false);
    }
  };

  // Configure API key
  const configureApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    if (mlService.configure(apiKey)) {
      setApiDialog(false);
      toast.success("ML service configured successfully");
      loadAnalyticsData();
    } else {
      toast.error("Failed to configure ML service");
    }
  };

  // Initial data load
  useEffect(() => {
    // Only load if configured or use default data
    if (mlService.isConfigured()) {
      loadAnalyticsData();
    } else {
      // Use default data from the props if available
      setAnalyticsData({
        transportModeData: [
          { name: 'Truck', value: shipments.filter(s => s.mode === 'Truck').length || 45 },
          { name: 'Ship', value: shipments.filter(s => s.mode === 'Ship').length || 25 },
          { name: 'Air', value: shipments.filter(s => s.mode === 'Air').length || 20 },
          { name: 'Rail', value: shipments.filter(s => s.mode === 'Rail').length || 10 },
        ],
        carrierPerformanceData: [
          { name: 'FastFreight', onTime: 92, costEfficiency: 85 },
          { name: 'Pacific Ship', onTime: 78, costEfficiency: 92 },
          { name: 'AeroFreight', onTime: 95, costEfficiency: 70 },
          { name: 'RailExpress', onTime: 88, costEfficiency: 90 },
        ]
      });
    }
  }, [shipments]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Transport Mode Distribution</CardTitle>
                <CardDescription>
                  Breakdown of shipping methods by volume
                </CardDescription>
              </div>
              {!mlService.isConfigured() && (
                <Button variant="outline" size="sm" onClick={() => setApiDialog(true)}>
                  Connect ML
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.transportModeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.transportModeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Carrier Performance</CardTitle>
                <CardDescription>
                  On-time delivery vs cost efficiency
                </CardDescription>
              </div>
              {mlService.isConfigured() && (
                <Button variant="outline" size="sm" onClick={loadAnalyticsData}>
                  Refresh
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="py-4">
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={analyticsData.carrierPerformanceData}
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
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={apiDialog} onOpenChange={setApiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect to ML Service</DialogTitle>
            <DialogDescription>
              Enter your ML service API key to enable real-time AI analytics and insights for your supply chain data.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">ML Service API Key</Label>
              <Input
                id="api-key"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApiDialog(false)}>Cancel</Button>
            <Button onClick={configureApiKey}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
