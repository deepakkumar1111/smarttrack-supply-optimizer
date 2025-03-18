
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface RouteStatus {
  id: string;
  origin: string;
  destination: string;
  carrier: string;
  status: 'on time' | 'delayed' | 'at risk';
  departureTime: string;
  arrivalTime: string;
  distance: string;
  progress: number;
}

const logisticsRoutes: RouteStatus[] = [
  {
    id: 'RT-5678',
    origin: 'Shanghai, CN',
    destination: 'Los Angeles, US',
    carrier: 'Ocean Freight Ltd.',
    status: 'on time',
    departureTime: '2023-10-25 08:30',
    arrivalTime: '2023-11-15 14:00',
    distance: '6,600 miles',
    progress: 65
  },
  {
    id: 'RT-5677',
    origin: 'Tokyo, JP',
    destination: 'Seattle, US',
    carrier: 'Pacific Shipping',
    status: 'delayed',
    departureTime: '2023-10-22 10:15',
    arrivalTime: '2023-11-12 09:30',
    distance: '4,800 miles',
    progress: 40
  },
  {
    id: 'RT-5676',
    origin: 'Berlin, DE',
    destination: 'Paris, FR',
    carrier: 'Euro Logistics',
    status: 'on time',
    departureTime: '2023-11-01 12:00',
    arrivalTime: '2023-11-02 18:00',
    distance: '680 miles',
    progress: 90
  },
  {
    id: 'RT-5675',
    origin: 'Bengaluru, IN',
    destination: 'Singapore, SG',
    carrier: 'Asian Express',
    status: 'at risk',
    departureTime: '2023-10-28 22:45',
    arrivalTime: '2023-11-04 05:30',
    distance: '2,200 miles',
    progress: 30
  }
];

export function SupplyChainMap() {
  const [activeTab, setActiveTab] = useState('global');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on time': return 'text-emerald-500';
      case 'delayed': return 'text-amber-500';
      case 'at risk': return 'text-rose-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Supply Chain Map</CardTitle>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">Global View</TabsTrigger>
            <TabsTrigger value="routes">Active Routes</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="global" className="m-0 h-[calc(100%-52px)]">
          <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
              <p className="text-sm text-muted-foreground mb-4">Visualize your global supply chain network</p>
              <div className="p-4 border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">Map visualization will appear here</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="routes" className="m-0 data-[state=active]:h-[calc(100%-52px)]">
          <CardContent className="p-0">
            <div className="divide-y">
              {logisticsRoutes.map((route, i) => (
                <motion.div 
                  key={route.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="p-4 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-sm">{route.id}</h3>
                      <p className="text-xs text-muted-foreground">{route.carrier}</p>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(route.status)}`}>
                      {route.status.charAt(0).toUpperCase() + route.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <div>{route.origin}</div>
                    <div>→</div>
                    <div>{route.destination}</div>
                  </div>
                  
                  <div className="mb-2 bg-secondary h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        route.status === 'on time' 
                          ? 'bg-emerald-500' 
                          : route.status === 'delayed' 
                            ? 'bg-amber-500' 
                            : 'bg-rose-500'
                      }`}
                      style={{ width: `${route.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{route.departureTime.split(' ')[0]}</span>
                    <span>{route.distance}</span>
                    <span>{route.arrivalTime.split(' ')[0]}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="facilities" className="m-0 h-[calc(100%-52px)]">
          <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium mb-2">Facilities Map</h3>
              <p className="text-sm text-muted-foreground mb-4">View all warehouses, factories and distribution centers</p>
              <div className="p-4 border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">Facilities map will appear here</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
