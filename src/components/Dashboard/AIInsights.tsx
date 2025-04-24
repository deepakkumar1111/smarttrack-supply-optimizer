
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp, LightbulbIcon, TrendingUp, TrendingDown, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mlService } from '@/services/mlService';
import { useAIInsights } from '../logistics/AIInsightsProvider';

export function AIInsights() {
  const [apiDialog, setApiDialog] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { 
    recommendations,
    anomalies, 
    forecasts, 
    loading, 
    loadInsights,
    isConfigured 
  } = useAIInsights();

  // Configure API key
  const configureApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    if (mlService.configure(apiKey)) {
      setApiDialog(false);
      toast.success("ML service configured successfully");
      loadInsights();
    } else {
      toast.error("Failed to configure ML service");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <LightbulbIcon size={16} className="text-amber-500" />
            AI-Powered Insights
          </CardTitle>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            !isConfigured && (
              <Button variant="outline" size="sm" onClick={() => setApiDialog(true)}>
                Connect ML
              </Button>
            )
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="recommendations">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
              <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="recommendations" className="px-0 mt-0">
            <div className="divide-y">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : recommendations.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-4 hover:bg-accent/20 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 items-start">
                    <div className={`p-2 rounded-full ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <div className={item.impact === 'positive' ? 'text-emerald-500' : 'text-rose-500'}>
                          {item.impact === 'positive' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        </div>
                        <span className={item.impact === 'positive' ? 'text-emerald-500' : 'text-rose-500'}>
                          {item.impactValue}
                        </span>
                        <span className="text-muted-foreground">{item.impactLabel}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="anomalies" className="px-0 mt-0">
            <div className="divide-y">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : anomalies.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-4 hover:bg-accent/20 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 items-start">
                    <div className={`p-2 rounded-full ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <p className="text-xs font-medium mt-2">{item.action}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="forecasting" className="px-0 mt-0">
            <div className="divide-y">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : forecasts.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="p-4 hover:bg-accent/20 transition-colors cursor-pointer"
                >
                  <div className="flex gap-3 items-start">
                    <div className={`p-2 rounded-full ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <div className={item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>
                          {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        </div>
                        <span className={item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>
                          {item.trendValue}
                        </span>
                        <span className="text-muted-foreground">{item.timeline}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

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
    </Card>
  );
}
