
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface InventoryItemProps {
  name: string;
  stock: number;
  capacity: number;
  category: string;
  status: 'normal' | 'low' | 'critical';
  lastUpdated: string;
}

const inventoryItems: InventoryItemProps[] = [
  {
    name: 'Microprocessors',
    stock: 850,
    capacity: 1000,
    category: 'Electronics',
    status: 'normal',
    lastUpdated: '2 hours ago'
  },
  {
    name: 'Display Modules',
    stock: 120,
    capacity: 500,
    category: 'Components',
    status: 'low',
    lastUpdated: '4 hours ago'
  },
  {
    name: 'Battery Cells',
    stock: 25,
    capacity: 200,
    category: 'Power',
    status: 'critical',
    lastUpdated: '1 hour ago'
  },
  {
    name: 'Aluminum Casings',
    stock: 450,
    capacity: 600,
    category: 'Materials',
    status: 'normal',
    lastUpdated: '1 day ago'
  },
];

export function InventoryStatus() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';
      case 'low': return 'text-amber-500 bg-amber-50 dark:bg-amber-950/30';
      case 'critical': return 'text-rose-500 bg-rose-50 dark:bg-rose-950/30';
      default: return 'text-slate-500 bg-slate-50 dark:bg-slate-950/30';
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-emerald-500';
      case 'low': return 'bg-amber-500';
      case 'critical': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  const getProgressValue = (stock: number, capacity: number) => {
    return Math.round((stock / capacity) * 100);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Inventory Status</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {inventoryItems.map((item, i) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="px-4 py-3 rounded-lg bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>
              
              <div className="mb-1">
                <Progress 
                  value={getProgressValue(item.stock, item.capacity)} 
                  className="h-1.5"
                  indicatorClassName={getProgressColor(item.status)}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{item.stock} of {item.capacity} units</span>
                <span>Updated {item.lastUpdated}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
