
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shipment } from "./AddShipmentModal";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle, BarChartHorizontal, Percent } from "lucide-react";
import { mlService } from "@/services/mlService";
import { toast } from "sonner";

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
  riskIndex?: number;
  carbonFootprint?: number;
  predictionConfidence?: number;
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
  const [isLoading, setIsLoading] = useState(false);

  // Calculate enhanced stats with ML predictions
  useEffect(() => {
    const calculateStats = async () => {
      setIsLoading(true);
      
      // Basic stats from shipment data
      const basicStats = {
        inTransit: shipments.filter(s => s.status === "In Transit").length,
        scheduled: shipments.filter(s => s.status === "Scheduled").length,
        delivered: shipments.filter(s => s.status === "Delivered").length,
      };

      // If ML service is configured, enhance with predictions
      if (mlService.isConfigured()) {
        try {
          // In a real app with ML integration, these would be actual API calls
          console.log("Fetching enhanced shipment stats...");

          // Get delay predictions for in-transit shipments
          let delayPredictions = 0;
          let totalRiskScore = 0;
          let predictionConfidence = 0;
          
          // For demonstration, we'll simulate predictions for each in-transit shipment
          const inTransitShipments = shipments.filter(s => s.status === "In Transit");
          
          if (inTransitShipments.length > 0) {
            for (const shipment of inTransitShipments.slice(0, 3)) { // Limit to 3 to avoid too many simulated calls
              const prediction = await mlService.predictDelays(shipment.id);
              if (prediction && prediction.predictedDelay > 0) {
                delayPredictions++;
                totalRiskScore += parseFloat(prediction.delayProbability || "0");
                predictionConfidence += parseFloat(prediction.confidenceScore || "0");
              }
            }
            
            // Get average values if we have predictions
            if (delayPredictions > 0) {
              totalRiskScore = Math.round((totalRiskScore / delayPredictions) * 100);
              predictionConfidence = Math.round((predictionConfidence / delayPredictions) * 100);
            }
          }
          
          // Calculate carbon footprint based on shipment modes and distances (simplified simulation)
          const carbonFootprint = shipments.reduce((total, s) => {
            // Different emission factors by mode (simplified)
            const emissionFactors = {
              'Truck': 0.1, // kg CO2 per ton-km
              'Ship': 0.015,
              'Air': 0.5,
              'Rail': 0.03
            };
            
            // Very rough estimation for demo purposes
            const weight = parseFloat(s.weight) || 1000;
            const distance = Math.random() * 1000 + 500; // Simulated distance
            const emissionFactor = emissionFactors[s.mode as keyof typeof emissionFactors] || 0.1;
            
            return total + (weight * distance * emissionFactor / 1000);
          }, 0);

          // Calculate potential cost savings based on ML optimization
          const totalShipmentValue = shipments.reduce((sum, s) => sum + (parseFloat(s.estimatedCost) || 0), 0);
          const costSavings = Math.round(totalShipmentValue * 0.08); // 8% potential savings
          
          setEnhancedStats({
            ...basicStats,
            predictedDelays: delayPredictions,
            efficiencyScore: 85 + Math.floor(Math.random() * 10), // 85-95
            costSavings: costSavings,
            riskIndex: totalRiskScore,
            carbonFootprint: Math.round(carbonFootprint),
            predictionConfidence: predictionConfidence
          });
        } catch (error) {
          console.error("Failed to get enhanced stats:", error);
          toast.error("Failed to get enhanced shipment statistics");
          setEnhancedStats({...basicStats, predictedDelays: 0, efficiencyScore: 0, costSavings: 0});
        } finally {
          setIsLoading(false);
        }
      } else {
        setEnhancedStats({...basicStats, predictedDelays: 0, efficiencyScore: 0, costSavings: 0});
        setIsLoading(false);
      }
    };

    calculateStats();
  }, [shipments]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                <AlertCircle className="w-3 h-3 mr-1" />
                {enhancedStats.predictedDelays} potential delays predicted
              </Badge>
            </div>
          )}
          {enhancedStats.riskIndex !== undefined && enhancedStats.riskIndex > 0 && (
            <div className="flex items-center gap-1 text-sm mt-1">
              <span className="text-xs text-muted-foreground">
                Risk index: {enhancedStats.riskIndex}% 
                {enhancedStats.predictionConfidence && (
                  <span className="ml-1">
                    • {enhancedStats.predictionConfidence}% confidence
                  </span>
                )}
              </span>
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
      
      {mlService.isConfigured() && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>ML Insights</CardTitle>
            <CardDescription>AI-powered metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Efficiency Score</span>
                <div className="flex items-center gap-1">
                  <BarChartHorizontal className="w-3 h-3 text-emerald-500" />
                  <span className="font-medium">{enhancedStats.efficiencyScore}%</span>
                </div>
              </div>
              
              {enhancedStats.carbonFootprint !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Carbon Footprint</span>
                  <div className="flex items-center gap-1">
                    <Percent className="w-3 h-3 text-blue-500" />
                    <span className="font-medium">{enhancedStats.carbonFootprint} kg</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Model Confidence</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-amber-500" />
                  <span className="font-medium">{isLoading ? "Calculating..." : `${enhancedStats.predictionConfidence || 92}%`}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
