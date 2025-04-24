
import { toast } from "sonner";
import { Shipment } from "@/components/logistics/AddShipmentModal";
import { inventoryData, ordersData, suppliersData, shipmentsData } from "./mockData";

// Types for AI analysis responses
export interface AIRecommendation {
  title: string;
  description: string;
  impact: 'positive' | 'negative';
  impactValue: string;
  impactLabel: string;
  icon: React.ReactNode;
  iconBg: string;
}

export interface AIAnomaly {
  title: string;
  description: string;
  action: string;
  icon: React.ReactNode;
  iconBg: string;
}

export interface AIForecast {
  title: string;
  description: string;
  trend: 'up' | 'down';
  trendValue: string;
  timeline: string;
  icon: React.ReactNode;
  iconBg: string;
}

export interface ShipmentAnalyticsData {
  transportModeData: Array<{ name: string; value: number }>;
  carrierPerformanceData: Array<{ name: string; onTime: number; costEfficiency: number }>;
}

// ML Service class to handle all AI/ML operations
class MLService {
  private apiKey: string | null = null;
  private apiEndpoint = "https://api.example.com/supply-chain-ai";
  
  // Configure the ML service
  configure(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('ml_api_key', apiKey);
    return true;
  }

  // Initialize service from localStorage if available
  initialize() {
    const savedApiKey = localStorage.getItem('ml_api_key');
    if (savedApiKey) {
      this.apiKey = savedApiKey;
      return true;
    }
    return false;
  }

  // Check if the service is configured
  isConfigured() {
    return !!this.apiKey;
  }

  // Helper method to make API calls
  private async callAPI(endpoint: string, data: any) {
    if (!this.apiKey) {
      throw new Error("ML service not configured with API key");
    }

    try {
      const response = await fetch(`${this.apiEndpoint}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("ML API error:", error);
      toast.error("Failed to fetch AI insights. Using fallback data.");
      return null;
    }
  }

  // Generate recommendations based on supply chain data
  async generateRecommendations(): Promise<AIRecommendation[]> {
    try {
      const result = await this.callAPI('/recommendations', {
        inventory: inventoryData,
        orders: ordersData,
        suppliers: suppliersData
      });
      
      if (result) return result.recommendations;
      
      // Fallback to mock data
      return [];
    } catch (error) {
      console.error("Error generating recommendations:", error);
      return [];
    }
  }

  // Detect anomalies in the supply chain data
  async detectAnomalies(): Promise<AIAnomaly[]> {
    try {
      const result = await this.callAPI('/anomalies', {
        inventory: inventoryData,
        orders: ordersData,
        shipments: shipmentsData
      });
      
      if (result) return result.anomalies;
      
      // Fallback to mock data
      return [];
    } catch (error) {
      console.error("Error detecting anomalies:", error);
      return [];
    }
  }

  // Generate forecasts based on historical data
  async generateForecasts(): Promise<AIForecast[]> {
    try {
      const result = await this.callAPI('/forecasts', {
        inventory: inventoryData,
        orders: ordersData,
        suppliers: suppliersData,
        shipments: shipmentsData
      });
      
      if (result) return result.forecasts;
      
      // Fallback to mock data
      return [];
    } catch (error) {
      console.error("Error generating forecasts:", error);
      return [];
    }
  }

  // Analyze shipment data for visualization
  async analyzeShipmentData(shipments: Shipment[]): Promise<ShipmentAnalyticsData> {
    try {
      const result = await this.callAPI('/analyze-shipments', { shipments });
      
      if (result) return {
        transportModeData: result.transportModeData,
        carrierPerformanceData: result.carrierPerformanceData
      };
      
      // Fallback data
      return {
        transportModeData: [
          { name: 'Truck', value: shipments.filter(s => s.mode === 'Truck').length },
          { name: 'Ship', value: shipments.filter(s => s.mode === 'Ship').length },
          { name: 'Air', value: shipments.filter(s => s.mode === 'Air').length },
          { name: 'Rail', value: shipments.filter(s => s.mode === 'Rail').length },
        ],
        carrierPerformanceData: [
          { name: 'FastFreight', onTime: 92, costEfficiency: 85 },
          { name: 'Pacific Ship', onTime: 78, costEfficiency: 92 },
          { name: 'AeroFreight', onTime: 95, costEfficiency: 70 },
          { name: 'RailExpress', onTime: 88, costEfficiency: 90 },
        ]
      };
    } catch (error) {
      console.error("Error analyzing shipment data:", error);
      return {
        transportModeData: [],
        carrierPerformanceData: []
      };
    }
  }

  // Generate optimized shipping routes
  async optimizeShippingRoutes(origin: string, destination: string) {
    return await this.callAPI('/optimize-routes', { origin, destination });
  }

  // Predict delivery delays
  async predictDelays(shipmentId: string) {
    return await this.callAPI('/predict-delays', { shipmentId });
  }
}

// Export a singleton instance
export const mlService = new MLService();

// Initialize the service on load
mlService.initialize();
