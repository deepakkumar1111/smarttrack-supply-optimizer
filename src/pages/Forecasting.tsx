
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Forecasting = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Demand Forecasting</h1>
        <Card>
          <CardHeader>
            <CardTitle>Predictive Analytics</CardTitle>
            <CardDescription>
              Predict future demand trends and optimize inventory planning.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display demand forecasts, sales predictions, and trend analysis tools.
            </p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Forecasting;
