
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const transportModeData = [
  { name: 'Truck', value: 45 },
  { name: 'Ship', value: 25 },
  { name: 'Air', value: 20 },
  { name: 'Rail', value: 10 },
];

const carrierPerformanceData = [
  { name: 'FastFreight', onTime: 92, costEfficiency: 85 },
  { name: 'Pacific Ship', onTime: 78, costEfficiency: 92 },
  { name: 'AeroFreight', onTime: 95, costEfficiency: 70 },
  { name: 'RailExpress', onTime: 88, costEfficiency: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const ShipmentAnalytics = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Transport Mode Distribution</CardTitle>
          <CardDescription>
            Breakdown of shipping methods by volume
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transportModeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {transportModeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Carrier Performance</CardTitle>
          <CardDescription>
            On-time delivery vs cost efficiency
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={carrierPerformanceData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" name="On-Time %" fill="#0088FE" />
              <Bar dataKey="costEfficiency" name="Cost Efficiency" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
