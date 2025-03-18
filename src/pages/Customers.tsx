
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Customers = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>
              Manage customer accounts, orders, and relationship data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display customer profiles, order history, and contact information.
            </p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Customers;
