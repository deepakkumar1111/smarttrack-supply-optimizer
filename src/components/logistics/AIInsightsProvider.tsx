
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  mlService, 
  AIRecommendation, 
  AIAnomaly, 
  AIForecast 
} from "@/services/mlService";
import { AlertCircle, LightbulbIcon, TrendingDown, TrendingUp } from "lucide-react";

interface AIInsightsContextType {
  recommendations: AIRecommendation[];
  anomalies: AIAnomaly[];
  forecasts: AIForecast[];
  loading: boolean;
  loadInsights: () => Promise<void>;
  isConfigured: boolean;
}

const AIInsightsContext = createContext<AIInsightsContextType>({
  recommendations: [],
  anomalies: [],
  forecasts: [],
  loading: false,
  loadInsights: async () => {},
  isConfigured: false
});

export const useAIInsights = () => useContext(AIInsightsContext);

// Default mock data with proper icons
const defaultRecommendations: AIRecommendation[] = [
  {
    title: 'Optimize Inventory Levels',
    description: 'Adjust inventory levels of microprocessors based on demand forecasts to reduce carrying costs.',
    impact: 'positive',
    impactValue: '8%',
    impactLabel: 'Potential cost reduction',
    icon: <TrendingUp size={16} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
  },
  {
    title: 'Consolidate Shipments',
    description: 'Combine multiple smaller shipments to North America to reduce transportation costs.',
    impact: 'positive',
    impactValue: '12%',
    impactLabel: 'Logistics savings',
    icon: <TrendingUp size={16} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
  },
  {
    title: 'Adjust Safety Stock',
    description: 'Current safety stock levels for display modules can be reduced based on supplier reliability.',
    impact: 'positive',
    impactValue: '5%',
    impactLabel: 'Inventory cost reduction',
    icon: <TrendingUp size={16} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
  },
];

const defaultAnomalies: AIAnomaly[] = [
  {
    title: 'Unusual Delay Pattern',
    description: 'Multiple shipments from Shanghai port showing similar delay patterns over the past week.',
    action: 'Investigate supplier transportation arrangements',
    icon: <AlertCircle size={16} className="text-amber-500" />,
    iconBg: 'bg-amber-50 dark:bg-amber-950/30'
  },
  {
    title: 'Battery Stock Critical',
    description: 'Battery cell inventory has dropped below safety threshold faster than predicted.',
    action: 'Expedite pending battery orders',
    icon: <AlertCircle size={16} className="text-rose-500" />,
    iconBg: 'bg-rose-50 dark:bg-rose-950/30'
  },
  {
    title: 'Quality Deviation',
    description: 'Recent display module batch shows 2.3x higher defect rate than normal.',
    action: 'Contact supplier quality assurance team',
    icon: <AlertCircle size={16} className="text-amber-500" />,
    iconBg: 'bg-amber-50 dark:bg-amber-950/30'
  },
];

const defaultForecasts: AIForecast[] = [
  {
    title: 'Seasonal Demand Spike',
    description: 'Expect 23% higher demand for finished products in Q4 based on historical patterns.',
    trend: 'up',
    trendValue: '+23%',
    timeline: 'Next 3 months',
    icon: <TrendingUp size={16} className="text-blue-500" />,
    iconBg: 'bg-blue-50 dark:bg-blue-950/30'
  },
  {
    title: 'Supply Chain Disruption Risk',
    description: 'High probability of shipping delays from East Asia due to upcoming weather patterns.',
    trend: 'down',
    trendValue: '-18%',
    timeline: 'Delivery reliability',
    icon: <TrendingDown size={16} className="text-rose-500" />,
    iconBg: 'bg-rose-50 dark:bg-rose-950/30'
  },
  {
    title: 'Material Cost Trend',
    description: 'Aluminum prices projected to decrease based on market indicators and supplier negotiations.',
    trend: 'down',
    trendValue: '-7%',
    timeline: 'Next 6 months',
    icon: <TrendingDown size={16} className="text-emerald-500" />,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/30'
  },
];

export const AIInsightsProvider = ({ children }: { children: ReactNode }) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(defaultRecommendations);
  const [anomalies, setAnomalies] = useState<AIAnomaly[]>(defaultAnomalies);
  const [forecasts, setForecasts] = useState<AIForecast[]>(defaultForecasts);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  // Check if ML service is configured
  useEffect(() => {
    setIsConfigured(mlService.isConfigured());
  }, []);

  // Load AI insights
  const loadInsights = async () => {
    if (!mlService.isConfigured()) {
      return;
    }

    setLoading(true);
    try {
      const [recData, anomalyData, forecastData] = await Promise.all([
        mlService.generateRecommendations(),
        mlService.detectAnomalies(),
        mlService.generateForecasts()
      ]);

      // Only update states if we got data back
      if (recData.length > 0) setRecommendations(recData);
      if (anomalyData.length > 0) setAnomalies(anomalyData);
      if (forecastData.length > 0) setForecasts(forecastData);
      
    } catch (error) {
      console.error("Error loading AI insights:", error);
    } finally {
      setLoading(false);
    }
  };

  // Attempt to load insights if ML service is configured
  useEffect(() => {
    if (mlService.isConfigured()) {
      loadInsights();
    }
  }, [isConfigured]);

  return (
    <AIInsightsContext.Provider value={{
      recommendations,
      anomalies,
      forecasts,
      loading,
      loadInsights,
      isConfigured
    }}>
      {children}
    </AIInsightsContext.Provider>
  );
};
