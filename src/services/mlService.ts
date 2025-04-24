
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
  routeOptimizationData?: Array<{ name: string; current: number; optimized: number; savings: number }>;
  emissionsData?: Array<{ name: string; value: number; unit: string }>;
  riskAssessment?: {
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    riskFactors: Array<{ factor: string; impact: number }>;
  };
}

// ML Model Types
export type MLModelType = 'predictive' | 'anomaly-detection' | 'optimization' | 'nlp';

export interface MLModelInfo {
  id: string;
  name: string;
  type: MLModelType;
  accuracy: number;
  lastTrained: string;
  status: 'active' | 'training' | 'inactive';
  description: string;
}

// ML Service class to handle all AI/ML operations
class MLService {
  private apiKey: string | null = null;
  private apiEndpoint = "https://api.example.com/supply-chain-ai";
  private mlModels: MLModelInfo[] = [
    {
      id: "model-001",
      name: "Shipment Delay Predictor",
      type: "predictive",
      accuracy: 0.89,
      lastTrained: "2023-11-15",
      status: "active",
      description: "Predicts shipment delays based on historical patterns, weather data, and carrier performance."
    },
    {
      id: "model-002",
      name: "Inventory Anomaly Detector",
      type: "anomaly-detection",
      accuracy: 0.92,
      lastTrained: "2023-12-05",
      status: "active",
      description: "Identifies unusual patterns in inventory levels and consumption rates."
    },
    {
      id: "model-003",
      name: "Route Optimizer",
      type: "optimization",
      accuracy: 0.85,
      lastTrained: "2024-01-10",
      status: "active",
      description: "Optimizes shipping routes for cost, time, and environmental impact."
    },
    {
      id: "model-004",
      name: "Document Classifier",
      type: "nlp",
      accuracy: 0.88,
      lastTrained: "2024-02-20",
      status: "training",
      description: "Classifies shipping documents and extracts relevant information."
    }
  ];
  
  // Configure the ML service
  configure(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('ml_api_key', apiKey);
    console.log("ML Service configured with API key");
    return true;
  }

  // Initialize service from localStorage if available
  initialize() {
    const savedApiKey = localStorage.getItem('ml_api_key');
    if (savedApiKey) {
      this.apiKey = savedApiKey;
      console.log("ML Service initialized from stored API key");
      return true;
    }
    return false;
  }

  // Check if the service is configured
  isConfigured() {
    return !!this.apiKey;
  }

  // Get available ML models
  getMLModels(): MLModelInfo[] {
    return this.mlModels;
  }

  // Helper method to make API calls
  private async callAPI(endpoint: string, data: any) {
    if (!this.apiKey) {
      throw new Error("ML service not configured with API key");
    }

    try {
      console.log(`Calling ML API: ${endpoint} with data:`, data);
      
      // In a real implementation, this would be an actual API call
      // For now, we're simulating network latency with a timeout
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      // Simulate API call
      const response = await fetch(`${this.apiEndpoint}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).catch(() => {
        // This won't actually run in our mock, but would in a real implementation
        console.log("Network request failed, using simulated response");
        return new Response(JSON.stringify({ success: true }));
      });

      // Log simulation info
      console.log(`API ${endpoint} response received`);
      
      // In a development environment, return mock data
      return this.getMockResponseData(endpoint, data);
    } catch (error) {
      console.error("ML API error:", error);
      toast.error("Failed to fetch AI insights. Using fallback data.");
      return null;
    }
  }

  // Mock data generator based on endpoint
  private getMockResponseData(endpoint: string, requestData: any) {
    switch (endpoint) {
      case '/recommendations':
        return {
          recommendations: [
            {
              title: 'Optimize Inventory Levels',
              description: 'Reduce inventory of product SKU-28491 by 15% based on historical demand patterns.',
              impact: 'positive',
              impactValue: '12%',
              impactLabel: 'Carrying cost reduction',
              icon: null, // Will be set by consumer
              iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
            },
            {
              title: 'Consolidate European Shipments',
              description: 'Combining shipments to Frankfurt, Munich, and Berlin can reduce transportation costs significantly.',
              impact: 'positive',
              impactValue: '€4,200',
              impactLabel: 'Monthly savings',
              icon: null,
              iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
            },
            {
              title: 'Supplier Diversification Alert',
              description: '72% of electronic components sourced from single supplier. High supply chain risk detected.',
              impact: 'negative',
              impactValue: '32%',
              impactLabel: 'Risk exposure',
              icon: null,
              iconBg: 'bg-rose-50 dark:bg-rose-950/30'
            },
            {
              title: 'Alternative Shipping Route',
              description: 'Port congestion at Shanghai predicted. Recommend Ningbo port for next 3 shipments.',
              impact: 'positive',
              impactValue: '8 days',
              impactLabel: 'Reduced lead time',
              icon: null,
              iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
            },
          ]
        };
      
      case '/anomalies':
        return {
          anomalies: [
            {
              title: 'Unusual Delivery Pattern',
              description: 'Carrier FastFreight showing 43% higher delivery time variation in Northeast region.',
              action: 'Review carrier SLAs and performance metrics',
              icon: null,
              iconBg: 'bg-amber-50 dark:bg-amber-950/30'
            },
            {
              title: 'Inventory Data Inconsistency',
              description: 'System inventory for product SKU-39281 differs from physical count by 18 units.',
              action: 'Conduct physical inventory verification',
              icon: null,
              iconBg: 'bg-rose-50 dark:bg-rose-950/30'
            },
            {
              title: 'Pricing Anomaly Detected',
              description: 'Supplier increased component pricing by 28% without prior notification.',
              action: 'Contact supplier representative',
              icon: null,
              iconBg: 'bg-rose-50 dark:bg-rose-950/30'
            },
            {
              title: 'Order Frequency Change',
              description: 'Customer XYZ Corp has increased order frequency by 215% in last 30 days.',
              action: 'Review customer contract and forecast',
              icon: null,
              iconBg: 'bg-blue-50 dark:bg-blue-950/30'
            },
          ]
        };
      
      case '/forecasts':
        return {
          forecasts: [
            {
              title: 'Peak Season Demand',
              description: 'Historical analysis predicts 27% demand increase for product category A in Q4.',
              trend: 'up',
              trendValue: '+27%',
              timeline: 'Next quarter',
              icon: null,
              iconBg: 'bg-blue-50 dark:bg-blue-950/30'
            },
            {
              title: 'Supplier Lead Time Risk',
              description: 'Geopolitical tensions may disrupt supplier XYZ shipments by 10-14 days.',
              trend: 'up',
              trendValue: '+12 days',
              timeline: 'Next 60 days',
              icon: null,
              iconBg: 'bg-amber-50 dark:bg-amber-950/30'
            },
            {
              title: 'Transportation Cost Trend',
              description: 'Ocean freight rates predicted to decrease based on capacity increases.',
              trend: 'down',
              trendValue: '-8.5%',
              timeline: 'Next 90 days',
              icon: null,
              iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
            },
            {
              title: 'Market Share Projection',
              description: 'Current trajectory indicates 3.2% market share growth in European market.',
              trend: 'up',
              trendValue: '+3.2%',
              timeline: 'Next 2 quarters',
              icon: null,
              iconBg: 'bg-blue-50 dark:bg-blue-950/30'
            },
          ]
        };

      case '/analyze-shipments':
        const { shipments } = requestData;
        // Generate more realistic analytics based on actual shipment data
        return {
          transportModeData: [
            { name: 'Truck', value: shipments.filter(s => s.mode === 'Truck').length || Math.floor(Math.random() * 30) + 40 },
            { name: 'Ship', value: shipments.filter(s => s.mode === 'Ship').length || Math.floor(Math.random() * 20) + 20 },
            { name: 'Air', value: shipments.filter(s => s.mode === 'Air').length || Math.floor(Math.random() * 15) + 15 },
            { name: 'Rail', value: shipments.filter(s => s.mode === 'Rail').length || Math.floor(Math.random() * 10) + 10 },
          ],
          carrierPerformanceData: [
            { name: 'FastFreight', onTime: Math.floor(Math.random() * 10) + 85, costEfficiency: Math.floor(Math.random() * 10) + 80 },
            { name: 'Pacific Ship', onTime: Math.floor(Math.random() * 10) + 75, costEfficiency: Math.floor(Math.random() * 10) + 85 },
            { name: 'AeroFreight', onTime: Math.floor(Math.random() * 10) + 90, costEfficiency: Math.floor(Math.random() * 10) + 65 },
            { name: 'RailExpress', onTime: Math.floor(Math.random() * 10) + 85, costEfficiency: Math.floor(Math.random() * 10) + 85 },
          ],
          routeOptimizationData: [
            { name: 'East Coast', current: 5200, optimized: 4680, savings: 520 },
            { name: 'West Coast', current: 7800, optimized: 6942, savings: 858 },
            { name: 'Midwest', current: 4100, optimized: 3731, savings: 369 },
            { name: 'South', current: 5500, optimized: 4895, savings: 605 },
          ],
          emissionsData: [
            { name: 'CO2', value: 28500, unit: 'kg' },
            { name: 'NOx', value: 450, unit: 'kg' },
            { name: 'PM2.5', value: 120, unit: 'kg' },
            { name: 'SOx', value: 85, unit: 'kg' },
          ],
          riskAssessment: {
            highRiskCount: Math.floor(Math.random() * 3) + 1,
            mediumRiskCount: Math.floor(Math.random() * 5) + 5,
            lowRiskCount: Math.floor(Math.random() * 10) + 10,
            riskFactors: [
              { factor: 'Weather Events', impact: Math.floor(Math.random() * 30) + 60 },
              { factor: 'Port Congestion', impact: Math.floor(Math.random() * 20) + 40 },
              { factor: 'Labor Disruption', impact: Math.floor(Math.random() * 30) + 30 },
              { factor: 'Documentation Errors', impact: Math.floor(Math.random() * 20) + 20 },
            ]
          }
        };
      
      case '/optimize-routes':
        const { origin, destination } = requestData;
        return {
          optimalRoutes: [
            {
              id: "route-1",
              name: "Primary Route",
              distance: Math.floor(Math.random() * 1000) + 1000,
              duration: Math.floor(Math.random() * 24) + 48,
              cost: Math.floor(Math.random() * 1000) + 2000,
              emissions: Math.floor(Math.random() * 500) + 1000,
              riskScore: Math.floor(Math.random() * 20) + 10,
              segments: [
                { from: origin, to: "Distribution Center Alpha", mode: "Truck", duration: 12 },
                { from: "Distribution Center Alpha", to: "Hub Beta", mode: "Rail", duration: 28 },
                { from: "Hub Beta", to: destination, mode: "Truck", duration: 8 }
              ]
            },
            {
              id: "route-2",
              name: "Alternative Route",
              distance: Math.floor(Math.random() * 1200) + 1200,
              duration: Math.floor(Math.random() * 36) + 36,
              cost: Math.floor(Math.random() * 1500) + 2500,
              emissions: Math.floor(Math.random() * 400) + 800,
              riskScore: Math.floor(Math.random() * 15) + 20,
              segments: [
                { from: origin, to: "Port Charlie", mode: "Truck", duration: 6 },
                { from: "Port Charlie", to: "Port Delta", mode: "Ship", duration: 48 },
                { from: "Port Delta", to: destination, mode: "Truck", duration: 10 }
              ]
            }
          ],
          costSavings: {
            amount: Math.floor(Math.random() * 500) + 500,
            percentage: Math.floor(Math.random() * 10) + 5,
            annualized: Math.floor(Math.random() * 10000) + 5000
          },
          timeSavings: {
            hours: Math.floor(Math.random() * 24) + 12,
            percentage: Math.floor(Math.random() * 15) + 10
          },
          environmentalImpact: {
            co2Reduction: Math.floor(Math.random() * 500) + 500,
            carbonCredits: Math.floor(Math.random() * 10) + 5
          }
        };

      case '/predict-delays':
        const { shipmentId } = requestData;
        const delayProbability = Math.random();
        return {
          shipmentId,
          delayProbability: delayProbability.toFixed(2),
          predictedDelay: delayProbability > 0.7 
            ? Math.floor(Math.random() * 48) + 24 
            : (delayProbability > 0.4 ? Math.floor(Math.random() * 24) + 4 : 0),
          confidenceScore: (0.7 + Math.random() * 0.25).toFixed(2),
          riskFactors: [
            { factor: "Weather Conditions", severity: Math.floor(Math.random() * 100) },
            { factor: "Carrier Performance", severity: Math.floor(Math.random() * 100) },
            { factor: "Port Congestion", severity: Math.floor(Math.random() * 100) },
            { factor: "Customs Clearance", severity: Math.floor(Math.random() * 100) }
          ],
          recommendedActions: [
            "Contact carrier for status update",
            "Prepare contingency plan for inventory",
            "Alert customer of potential delay",
            "Review alternative shipping routes"
          ].filter(() => Math.random() > 0.3)
        };
      
      case '/inventory-optimization':
        return {
          recommendedLevels: [
            { sku: "SKU-001", currentStock: 120, recommendedStock: 95, savingsPotential: 4200 },
            { sku: "SKU-002", currentStock: 85, recommendedStock: 110, stockoutRisk: "High" },
            { sku: "SKU-003", currentStock: 210, recommendedStock: 150, savingsPotential: 5800 },
            { sku: "SKU-004", currentStock: 65, recommendedStock: 65, status: "Optimal" }
          ],
          totalSavings: 10000,
          implementationSteps: [
            "Adjust reorder points in inventory system",
            "Update safety stock calculations",
            "Modify ordering schedule with suppliers",
            "Implement new inventory review cycle"
          ],
          impactAnalysis: {
            serviceLevel: "+2.5%",
            inventoryTurnover: "+1.8",
            carryingCostReduction: "$32,500 annually"
          }
        };

      case '/demand-forecast':
        return {
          forecastPeriods: [
            { period: "Q3 2023", demand: 12500, confidence: 0.92, trend: "up" },
            { period: "Q4 2023", demand: 18700, confidence: 0.85, trend: "up" },
            { period: "Q1 2024", demand: 14200, confidence: 0.78, trend: "down" },
            { period: "Q2 2024", demand: 13800, confidence: 0.72, trend: "stable" }
          ],
          seasonalFactors: [
            { season: "Summer", impact: "+15%" },
            { season: "Holiday", impact: "+40%" },
            { season: "Winter", impact: "-5%" },
            { season: "Spring", impact: "+8%" }
          ],
          externalFactors: [
            { factor: "Market Expansion", impact: "High", direction: "Positive" },
            { factor: "Competitor Activity", impact: "Medium", direction: "Negative" },
            { factor: "Economic Indicators", impact: "Low", direction: "Positive" }
          ]
        };

      default:
        return {
          status: "success",
          data: {}
        };
    }
  }

  // Generate recommendations based on supply chain data
  async generateRecommendations(): Promise<AIRecommendation[]> {
    try {
      console.log("Generating AI recommendations...");
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
      console.log("Detecting anomalies in supply chain data...");
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
      console.log("Generating AI forecasts...");
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
      console.log(`Analyzing ${shipments.length} shipments for insights...`);
      const result = await this.callAPI('/analyze-shipments', { shipments });
      
      if (result) return {
        transportModeData: result.transportModeData,
        carrierPerformanceData: result.carrierPerformanceData,
        routeOptimizationData: result.routeOptimizationData,
        emissionsData: result.emissionsData,
        riskAssessment: result.riskAssessment
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
    console.log(`Finding optimal routes from ${origin} to ${destination}...`);
    return await this.callAPI('/optimize-routes', { origin, destination });
  }

  // Predict delivery delays
  async predictDelays(shipmentId: string) {
    console.log(`Predicting delays for shipment ${shipmentId}...`);
    return await this.callAPI('/predict-delays', { shipmentId });
  }

  // Optimize inventory levels
  async optimizeInventory(productCategories: string[], locations: string[]) {
    console.log(`Optimizing inventory for ${productCategories.length} product categories across ${locations.length} locations...`);
    return await this.callAPI('/inventory-optimization', { productCategories, locations });
  }

  // Generate demand forecast
  async forecastDemand(productId: string, months: number) {
    console.log(`Forecasting demand for product ${productId} for the next ${months} months...`);
    return await this.callAPI('/demand-forecast', { productId, months });
  }

  // Train or update a specific ML model
  async trainModel(modelId: string, trainingData: any) {
    console.log(`Training model ${modelId} with new data...`);
    const response = await this.callAPI('/train-model', { modelId, trainingData });
    
    // Update local model metadata after training
    if (response && response.success) {
      const modelIndex = this.mlModels.findIndex(model => model.id === modelId);
      if (modelIndex >= 0) {
        this.mlModels[modelIndex].status = 'training';
        this.mlModels[modelIndex].accuracy = response.expectedAccuracy || this.mlModels[modelIndex].accuracy;
        
        // Simulate training completion after some time
        setTimeout(() => {
          this.mlModels[modelIndex].status = 'active';
          this.mlModels[modelIndex].lastTrained = new Date().toISOString().split('T')[0];
          console.log(`Model ${modelId} training completed`);
        }, 10000);
      }
    }
    
    return response;
  }
}

// Export a singleton instance
export const mlService = new MLService();

// Initialize the service on load
mlService.initialize();
