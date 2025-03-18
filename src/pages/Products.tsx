
import { Shell } from "@/components/Layout/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>
              Manage your product catalog, categories, and product information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page will display product listings, details, and allow product management.
            </p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Products;
