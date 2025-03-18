
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, Download, RefreshCw, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

// Sample data for forecasting charts
const salesForecastData = [
  { month: 'Jan', actual: 4000, forecast: 4000 },
  { month: 'Feb', actual: 4200, forecast: 4100 },
  { month: 'Mar', actual: 4500, forecast: 4300 },
  { month: 'Apr', actual: 4700, forecast: 4600 },
  { month: 'May', actual: 5000, forecast: 4800 },
  { month: 'Jun', actual: 5200, forecast: 5100 },
  { month: 'Jul', actual: 5500, forecast: 5300 },
  { month: 'Aug', actual: 5700, forecast: 5600 },
  { month: 'Sep', actual: null, forecast: 5900 },
  { month: 'Oct', actual: null, forecast: 6200 },
  { month: 'Nov', actual: null, forecast: 6500 },
  { month: 'Dec', actual: null, forecast: 6800 },
];

const inventoryForecastData = [
  { month: 'Jan', stock: 2200, demand: 1800, forecast: 2000 },
  { month: 'Feb', stock: 2300, demand: 1900, forecast: 2100 },
  { month: 'Mar', stock: 2400, demand: 2100, forecast: 2200 },
  { month: 'Apr', stock: 2200, demand: 2000, forecast: 2100 },
  { month: 'May', stock: 2500, demand: 2200, forecast: 2300 },
  { month: 'Jun', stock: 2600, demand: 2300, forecast: 2400 },
  { month: 'Jul', stock: 2400, demand: 2200, forecast: 2300 },
  { month: 'Aug', stock: 2700, demand: 2400, forecast: 2500 },
  { month: 'Sep', stock: null, demand: null, forecast: 2600 },
  { month: 'Oct', stock: null, demand: null, forecast: 2700 },
  { month: 'Nov', stock: null, demand: null, forecast: 2800 },
  { month: 'Dec', stock: null, demand: null, forecast: 2900 },
];

const seasonalityData = [
  { category: 'Electronics', q1: 3200, q2: 3800, q3: 4500, q4: 6200 },
  { category: 'Furniture', q1: 2800, q2: 3500, q3: 3200, q4: 3800 },
  { category: 'Clothing', q1: 2200, q2: 2500, q3: 3100, q4: 4200 },
  { category: 'Appliances', q1: 1800, q2: 2200, q3: 2400, q4: 3500 },
];

const demandFactors = [
  { factor: 'Seasonal Trends', impact: 'High', confidence: 92 },
  { factor: 'Market Growth', impact: 'Medium', confidence: 78 },
  { factor: 'Competitor Actions', impact: 'Medium', confidence: 65 },
  { factor: 'Economic Indicators', impact: 'High', confidence: 85 },
  { factor: 'Marketing Campaigns', impact: 'Medium', confidence: 79 },
];

const anomalyAlerts = [
  { id: 1, category: 'Electronics', metric: 'Demand Spike', date: '2023-09-15', severity: 'High' },
  { id: 2, category: 'Furniture', metric: 'Supply Disruption', date: '2023-09-10', severity: 'Medium' },
  { id: 3, category: 'Clothing', metric: 'Price Sensitivity', date: '2023-09-05', severity: 'Low' },
];

const Forecasting = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Demand Forecasting</h1>
          <div className="flex items-center space-x-2">
            <Button className="md:w-auto w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Forecast
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sales Forecast</CardTitle>
              <CardDescription>Next quarter prediction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">+12.5%</div>
                <Badge className="flex items-center" variant="outline">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">Growing</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Compared to previous quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Inventory Forecast</CardTitle>
              <CardDescription>Projected stock requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">+8.2%</div>
                <Badge className="flex items-center" variant="outline">
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  <span className="text-green-500">Increasing</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Projected inventory needs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Anomaly Alerts</CardTitle>
              <CardDescription>Unexpected pattern detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{anomalyAlerts.length}</div>
                <Badge className="flex items-center" variant={anomalyAlerts.length > 0 ? "destructive" : "outline"}>
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  <span>{anomalyAlerts.length > 0 ? "Detected" : "None"}</span>
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Active anomaly alerts</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sales Forecast Analysis</CardTitle>
            <CardDescription>
              Projected sales trends with confidence intervals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
              <div className="flex items-center gap-4">
                <Select defaultValue="sales">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Revenue</SelectItem>
                    <SelectItem value="units">Units Sold</SelectItem>
                    <SelectItem value="growth">Growth Rate</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="12m">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="6m">6 Months</SelectItem>
                    <SelectItem value="12m">12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={salesForecastData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                  name="Actual Sales"
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#82ca9d" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Forecasted Sales"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Tabs defaultValue="inventory">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Inventory Forecast</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonality Analysis</TabsTrigger>
            <TabsTrigger value="factors">Influential Factors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory vs Demand Forecast</CardTitle>
                <CardDescription>
                  Projected inventory levels against forecasted demand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart
                    data={inventoryForecastData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="stock" stackId="1" stroke="#8884d8" fill="#8884d8" name="Stock Level" />
                    <Area type="monotone" dataKey="demand" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Actual Demand" />
                    <Line type="monotone" dataKey="forecast" stroke="#ff7300" name="Forecasted Demand" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Shaded area represents historical data; line shows forecasted demand.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="seasonal" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Demand Patterns</CardTitle>
                <CardDescription>
                  Quarterly sales distribution by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart
                    data={seasonalityData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="q1" name="Q1" fill="#8884d8" />
                    <Bar dataKey="q2" name="Q2" fill="#82ca9d" />
                    <Bar dataKey="q3" name="Q3" fill="#ffc658" />
                    <Bar dataKey="q4" name="Q4" fill="#ff7300" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Chart shows significant Q4 seasonality for electronics and clothing categories.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="factors" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Demand Influencing Factors</CardTitle>
                <CardDescription>
                  Key factors affecting demand forecasts and their confidence levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium">Factor</th>
                        <th className="py-3 px-4 text-left font-medium">Impact</th>
                        <th className="py-3 px-4 text-left font-medium">Confidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demandFactors.map((factor, index) => (
                        <tr key={index} className={index !== demandFactors.length - 1 ? "border-b" : ""}>
                          <td className="py-3 px-4">{factor.factor}</td>
                          <td className="py-3 px-4">
                            <Badge variant={factor.impact === "High" ? "default" : "outline"}>
                              {factor.impact}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-full max-w-24 bg-muted rounded-full h-2.5">
                                <div 
                                  className="bg-primary h-2.5 rounded-full" 
                                  style={{ width: `${factor.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{factor.confidence}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3">Anomaly Alerts</h4>
                  <div className="space-y-3">
                    {anomalyAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start p-3 rounded-md border">
                        <div className="mr-3">
                          <AlertTriangle className={
                            alert.severity === 'High' ? 'text-red-500' : 
                            alert.severity === 'Medium' ? 'text-amber-500' : 'text-blue-500'
                          } />
                        </div>
                        <div>
                          <div className="font-medium">{alert.metric}</div>
                          <div className="text-sm text-muted-foreground">
                            {alert.category} | {alert.date}
                          </div>
                        </div>
                        <Badge className="ml-auto" variant={
                          alert.severity === 'High' ? 'destructive' : 
                          alert.severity === 'Medium' ? 'outline' : 'secondary'
                        }>
                          {alert.severity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
};

export default Forecasting;
