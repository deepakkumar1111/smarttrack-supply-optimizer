
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Suppliers = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Supplier Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Supplier Directory</CardTitle>
            <CardDescription>
              Manage supplier relationships, contracts, and performance metrics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display supplier data, contact information, and performance analytics.
            </p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Suppliers;
