
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TruckIcon, Plane, Ship, Train, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Shipment } from "./AddShipmentModal";

interface ShipmentTableProps {
  shipments: Shipment[];
  activeTab: string;
}

const getTransportIcon = (mode: string) => {
  switch (mode) {
    case "Truck":
      return <TruckIcon className="h-4 w-4" />;
    case "Ship":
      return <Ship className="h-4 w-4" />;
    case "Air":
      return <Plane className="h-4 w-4" />;
    case "Rail":
      return <Train className="h-4 w-4" />;
    default:
      return <TruckIcon className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "In Transit":
      return "secondary";
    case "Scheduled":
      return "outline";
    case "Delayed":
      return "destructive";
    case "Cancelled":
      return "secondary";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "Delayed":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "Cancelled":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-blue-500" />;
  }
};

export const ShipmentTable = ({ shipments, activeTab }: ShipmentTableProps) => {
  const filteredShipments = shipments.filter(shipment => {
    if (activeTab === "all") return true;
    if (activeTab === "transit") return shipment.status === "In Transit";
    if (activeTab === "scheduled") return shipment.status === "Scheduled";
    if (activeTab === "delivered") return shipment.status === "Delivered";
    if (activeTab === "delayed") return shipment.status === "Delayed";
    return true;
  });

  const getTableColumns = () => {
    switch (activeTab) {
      case "all":
        return (
          <TableRow>
            <TableHead>Tracking #</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        );
      case "transit":
        return (
          <TableRow>
            <TableHead>Tracking #</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        );
      case "scheduled":
        return (
          <TableRow>
            <TableHead>Tracking #</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>ETA</TableHead>
          </TableRow>
        );
      default:
        return (
          <TableRow>
            <TableHead>Tracking #</TableHead>
            <TableHead>Route</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        );
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {getTableColumns()}
        </TableHeader>
        <TableBody>
          {filteredShipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell className="font-medium">{shipment.id}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm">{shipment.origin}</span>
                  <span className="text-xs text-muted-foreground">to</span>
                  <span className="text-sm">{shipment.destination}</span>
                </div>
              </TableCell>
              <TableCell>{shipment.carrier}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {getTransportIcon(shipment.mode)}
                  <span>{shipment.mode}</span>
                </div>
              </TableCell>
              {activeTab === "all" && (
                <>
                  <TableCell>
                    <Badge variant={
                      shipment.priority === "High" ? "destructive" :
                      shipment.priority === "Medium" ? "default" :
                      "secondary"
                    }>
                      {shipment.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>${shipment.estimatedCost}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(shipment.status)}
                      <Badge variant={getStatusColor(shipment.status)}>
                        {shipment.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress value={shipment.progress} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(shipment.departureDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {shipment.progress}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </>
              )}
              {activeTab === "transit" && (
                <>
                  <TableCell>
                    {new Date(shipment.eta).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="w-full">
                      <Progress value={shipment.progress} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {new Date(shipment.departureDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {shipment.progress}%
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </>
              )}
              {activeTab === "scheduled" && (
                <>
                  <TableCell>
                    {new Date(shipment.departureDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(shipment.eta).toLocaleDateString()}
                  </TableCell>
                </>
              )}
              {(activeTab === "delivered" || activeTab === "delayed") && (
                <TableCell>
                  <Badge variant={getStatusColor(shipment.status)}>
                    {shipment.status}
                  </Badge>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
