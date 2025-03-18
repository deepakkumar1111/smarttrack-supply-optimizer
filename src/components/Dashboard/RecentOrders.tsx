
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface OrderProps {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: 'processing' | 'shipped' | 'delivered' | 'pending';
  location: string;
}

const orders: OrderProps[] = [
  {
    id: 'ORD-001628',
    customer: 'Apple Inc.',
    date: '2023-11-01',
    amount: '$34,840.00',
    status: 'shipped',
    location: 'Cupertino, CA'
  },
  {
    id: 'ORD-001627',
    customer: 'Tesla Motors',
    date: '2023-10-31',
    amount: '$12,350.00',
    status: 'processing',
    location: 'Fremont, CA'
  },
  {
    id: 'ORD-001626',
    customer: 'Samsung Electronics',
    date: '2023-10-30',
    amount: '$28,654.00',
    status: 'delivered',
    location: 'Seoul, SK'
  },
  {
    id: 'ORD-001625',
    customer: 'Microsoft Corp',
    date: '2023-10-29',
    amount: '$18,290.00',
    status: 'pending',
    location: 'Redmond, WA'
  },
];

export function RecentOrders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800';
      case 'shipped': return 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800';
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800';
      case 'pending': return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800';
      default: return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {orders.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="p-4 hover:bg-accent/20 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{order.id}</h3>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <p className="text-sm">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.location}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
