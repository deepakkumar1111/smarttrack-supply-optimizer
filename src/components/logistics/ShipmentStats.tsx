
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shipment } from "./AddShipmentModal";

interface ShipmentStatsProps {
  shipments: Shipment[];
}

export const ShipmentStats = ({ shipments }: ShipmentStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>Currently in transit</CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {shipments.filter(s => s.status === "In Transit").length}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Upcoming Departures</CardTitle>
          <CardDescription>Scheduled for next 7 days</CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {shipments.filter(s => s.status === "Scheduled").length}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Completed</CardTitle>
          <CardDescription>Delivered this month</CardDescription>
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {shipments.filter(s => s.status === "Delivered").length}
        </CardContent>
      </Card>
    </div>
  );
};
