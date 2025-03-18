
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Logistics = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Logistics</h1>
        <Card>
          <CardHeader>
            <CardTitle>Logistics Operations</CardTitle>
            <CardDescription>
              Track shipments, manage carriers, and optimize delivery routes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display logistics data, shipment tracking, and carrier management tools.
            </p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Logistics;
