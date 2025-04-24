
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shipment } from "./AddShipmentModal";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { mlService } from "@/services/mlService";

interface ShipmentStatsProps {
  shipments: Shipment[];
}

interface EnhancedStats {
  inTransit: number;
  scheduled: number;
  delivered: number;
  predictedDelays: number;
  efficiencyScore: number;
  costSavings: number;
}

export const ShipmentStats = ({ shipments }: ShipmentStatsProps) => {
  const [enhancedStats, setEnhancedStats] = useState<EnhancedStats>({
    inTransit: 0,
    scheduled: 0,
    delivered: 0,
    predictedDelays: 0,
    efficiencyScore: 0,
    costSavings: 0
  });

  // Calculate enhanced stats with ML predictions
  useEffect(() => {
    const calculateStats = async () => {
      // Basic stats from shipment data
      const basicStats = {
        inTransit: shipments.filter(s => s.status === "In Transit").length,
        scheduled: shipments.filter(s => s.status === "Scheduled").length,
        delivered: shipments.filter(s => s.status === "Delivered").length,
      };

      // If ML service is configured, enhance with predictions
      if (mlService.isConfigured()) {
        try {
          // This would be a real API call in a production environment
          // For now, we'll simulate with mock data that builds on actual shipments
          
          // In a real app, you'd call your ML API here
          // const enhancedData = await mlService.enhanceShipmentStats(shipments);
          
          // Mock enhanced data
          setEnhancedStats({
            ...basicStats,
            predictedDelays: Math.round(basicStats.inTransit * 0.2), // 20% of in-transit predicted to be delayed
            efficiencyScore: 85 + Math.floor(Math.random() * 10), // 85-95
            costSavings: Math.round((shipments.reduce((sum, s) => sum + (parseFloat(s.estimatedCost) || 0), 0) * 0.08)) // 8% savings
          });
        } catch (error) {
          console.error("Failed to get enhanced stats:", error);
          setEnhancedStats({...basicStats, predictedDelays: 0, efficiencyScore: 0, costSavings: 0});
        }
      } else {
        setEnhancedStats({...basicStats, predictedDelays: 0, efficiencyScore: 0, costSavings: 0});
      }
    };

    calculateStats();
  }, [shipments]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>Currently in transit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold">
            {enhancedStats.inTransit}
          </div>
          {enhancedStats.predictedDelays > 0 && mlService.isConfigured() && (
            <div className="flex items-center gap-1 text-sm">
              <Badge variant="outline" className="text-amber-500">
                <TrendingUp className="w-3 h-3 mr-1" />
                {enhancedStats.predictedDelays} potential delays predicted
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Departures</CardTitle>
          <CardDescription>Scheduled for next 7 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold">
            {enhancedStats.scheduled}
          </div>
          {mlService.isConfigured() && (
            <div className="flex items-center gap-1 text-sm">
              <Badge variant="outline" className="text-emerald-500">
                <TrendingDown className="w-3 h-3 mr-1" />
                Optimized departure schedule
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Completed</CardTitle>
          <CardDescription>Delivered this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold">
            {enhancedStats.delivered}
          </div>
          {enhancedStats.costSavings > 0 && mlService.isConfigured() && (
            <div className="flex items-center gap-1 text-sm">
              <Badge variant="outline" className="text-emerald-500">
                <TrendingDown className="w-3 h-3 mr-1" />
                ${enhancedStats.costSavings} potential savings identified
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
