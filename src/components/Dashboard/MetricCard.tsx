
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    trend: 'up' | 'down' | 'neutral';
    text?: string;
  };
  className?: string;
}

export function MetricCard({ title, value, icon, change, className }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-medium border", 
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="text-muted-foreground w-4 h-4 text-muted-foreground">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          {change && (
            <div className="flex items-center mt-1 space-x-1 text-xs">
              <div className={cn(
                "flex items-center",
                change.trend === 'up' ? 'text-emerald-500' : change.trend === 'down' ? 'text-rose-500' : 'text-muted-foreground'
              )}>
                {change.trend === 'up' && <ArrowUpIcon className="w-3 h-3" />}
                {change.trend === 'down' && <ArrowDownIcon className="w-3 h-3" />}
                <span>{change.value}%</span>
              </div>
              {change.text && (
                <span className="text-muted-foreground">{change.text}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
