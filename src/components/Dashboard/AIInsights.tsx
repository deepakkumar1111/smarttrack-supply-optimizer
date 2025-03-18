
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp, LightbulbIcon, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function AIInsights() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <LightbulbIcon size={16} className="text-amber-500" />
          AI-Powered Insights
        </CardTitle>
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
              {recommendations.map((item, index) => (
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
              {anomalies.map((item, index) => (
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
              {forecasting.map((item, index) => (
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
    </Card>
  );
}

const recommendations = [
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

const anomalies = [
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

const forecasting = [
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
