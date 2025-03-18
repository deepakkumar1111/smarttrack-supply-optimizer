
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>
              Manage your inventory levels, stock locations, and product availability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display inventory data, stock levels, and allow inventory management.
            </p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Inventory;
