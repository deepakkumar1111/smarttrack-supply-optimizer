
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const weeklyData = [
  { name: 'Mon', value: 2400, prev: 2200 },
  { name: 'Tue', value: 1800, prev: 2100 },
  { name: 'Wed', value: 3200, prev: 2500 },
  { name: 'Thu', value: 3600, prev: 3000 },
  { name: 'Fri', value: 3000, prev: 2700 },
  { name: 'Sat', value: 2100, prev: 1800 },
  { name: 'Sun', value: 1900, prev: 1500 },
];

const monthlyData = [
  { name: 'Jan', value: 22400, prev: 19800 },
  { name: 'Feb', value: 24500, prev: 20100 },
  { name: 'Mar', value: 25800, prev: 23400 },
  { name: 'Apr', value: 27100, prev: 25600 },
  { name: 'May', value: 29400, prev: 26500 },
  { name: 'Jun', value: 31200, prev: 28900 },
  { name: 'Jul', value: 32200, prev: 30100 },
  { name: 'Aug', value: 34600, prev: 31800 },
  { name: 'Sep', value: 36200, prev: 33200 },
  { name: 'Oct', value: 37800, prev: 35100 },
  { name: 'Nov', value: 39200, prev: 36800 },
  { name: 'Dec', value: 42000, prev: 38400 },
];

export function PerformanceChart() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Tabs defaultValue="volume">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="volume">Order Volume</TabsTrigger>
              <TabsTrigger value="delivery">Delivery Times</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="volume" className="space-y-4 px-6 mt-4">
            <h4 className="text-sm font-medium">Order Processing Volume</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} 
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border text-sm p-2 rounded shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-primary text-xs">
                              Current: {payload[0].value.toLocaleString()}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Previous: {payload[1].value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="prev" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="3 3" 
                    fillOpacity={1} 
                    fill="url(#colorPrev)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-4 px-6 mt-4">
            <h4 className="text-sm font-medium">Average Delivery Times</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border text-sm p-2 rounded shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-primary text-xs">
                              Current: {payload[0].value.toLocaleString()} min
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Previous: {payload[1].value.toLocaleString()} min
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="prev" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeDasharray="3 3" 
                    strokeWidth={2} 
                    dot={{ r: 3, fill: 'hsl(var(--muted-foreground))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="efficiency" className="space-y-4 px-6 mt-4">
            <h4 className="text-sm font-medium">Operational Efficiency</h4>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-card border text-sm p-2 rounded shadow-lg">
                            <p className="font-medium">{label}</p>
                            <p className="text-primary text-xs">
                              Current: {payload[0].value.toLocaleString()}%
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Previous: {payload[1].value.toLocaleString()}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="prev" 
                    fill="hsl(var(--muted-foreground))" 
                    radius={[4, 4, 0, 0]} 
                    opacity={0.3} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
