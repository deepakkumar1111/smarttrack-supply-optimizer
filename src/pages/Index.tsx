
import React from 'react';
import { Shell } from '@/components/Layout/Shell';
import { MetricCard } from '@/components/Dashboard/MetricCard';
import { InventoryStatus } from '@/components/Dashboard/InventoryStatus';
import { RecentOrders } from '@/components/Dashboard/RecentOrders';
import { SupplyChainMap } from '@/components/Dashboard/SupplyChainMap';
import { PerformanceChart } from '@/components/Dashboard/PerformanceChart';
import { AIInsights } from '@/components/Dashboard/AIInsights';
import { motion } from 'framer-motion';
import { BarChart4, Clock, PieChart, AlertTriangle } from 'lucide-react';
import { dashboardStats } from '@/services/mockData';
import { AIInsightsProvider } from '@/components/logistics/AIInsightsProvider';

const Index = () => {
  // Animation container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
      }
    }
  };

  return (
    <AIInsightsProvider>
      <Shell>
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.h1 
              className="text-3xl font-bold tracking-tight mb-1"
              variants={itemVariants}
            >
              Supply Chain Dashboard
            </motion.h1>
            <motion.p 
              className="text-muted-foreground"
              variants={itemVariants}
            >
              Real-time insights and analytics for your supply chain operations
            </motion.p>
          </div>

          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={itemVariants}
          >
            <MetricCard 
              title="Orders Fulfilled" 
              value={dashboardStats.ordersFulfilled} 
              icon={<BarChart4 />} 
              change={dashboardStats.ordersFulfilledChange as any}
            />
            <MetricCard 
              title="Avg. Delivery Time" 
              value={`${dashboardStats.deliveryTime} days`} 
              icon={<Clock />} 
              change={dashboardStats.deliveryTimeChange as any}
            />
            <MetricCard 
              title="Inventory Turnover" 
              value={dashboardStats.inventoryTurnover} 
              icon={<PieChart />} 
              change={dashboardStats.inventoryTurnoverChange as any}
            />
            <MetricCard 
              title="Stockouts" 
              value={dashboardStats.stockouts} 
              icon={<AlertTriangle />} 
              change={dashboardStats.stockoutsChange as any}
            />
          </motion.div>

          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={itemVariants}
          >
            <div className="md:col-span-2 lg:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <AIInsights />
            </div>
          </motion.div>

          <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            variants={itemVariants}
          >
            <div>
              <InventoryStatus />
            </div>
            <div>
              <RecentOrders />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <SupplyChainMap />
            </div>
          </motion.div>
        </motion.div>
      </Shell>
    </AIInsightsProvider>
  );
};

export default Index;
