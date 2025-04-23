
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ShipmentFormData {
  origin: string;
  destination: string;
  carrier: string;
  mode: "Truck" | "Ship" | "Air" | "Rail";
  departureDate: string;
  eta: string;
  weight: string;
  volume: string;
  trackingNotes: string;
  priority: "Low" | "Medium" | "High";
  customsDeclaration: string;
  estimatedCost: string;
}

export interface Shipment extends ShipmentFormData {
  id: string;
  status: "Scheduled" | "In Transit" | "Delivered" | "Delayed" | "Cancelled";
  progress: number;
  lastUpdated: string;
}

const initialFormData: ShipmentFormData = {
  origin: "",
  destination: "",
  carrier: "",
  mode: "Truck",
  departureDate: "",
  eta: "",
  weight: "",
  volume: "",
  trackingNotes: "",
  priority: "Medium",
  customsDeclaration: "",
  estimatedCost: ""
};

interface AddShipmentModalProps {
  onAddShipment: (shipment: Shipment) => void;
}

export function AddShipmentModal({ onAddShipment }: AddShipmentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<ShipmentFormData>({
    defaultValues: initialFormData
  });

  const handleSubmit = (formData: ShipmentFormData) => {
    const newShipment: Shipment = {
      id: `SHP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...formData,
      status: "Scheduled",
      progress: 0,
      lastUpdated: new Date().toISOString()
    };

    onAddShipment(newShipment);

    toast({
      title: "Shipment Scheduled",
      description: `Shipment ${newShipment.id} has been created successfully.`,
    });

    form.reset(initialFormData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Schedule New Shipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Schedule New Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                {...form.register("origin")}
                placeholder="Enter origin location"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                {...form.register("destination")}
                placeholder="Enter destination location"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Input
                id="carrier"
                {...form.register("carrier")}
                placeholder="Enter carrier name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mode">Transport Mode</Label>
              <Select 
                onValueChange={(value: "Truck" | "Ship" | "Air" | "Rail") =>
                  form.setValue("mode", value)
                }
                defaultValue={form.getValues("mode")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transport mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="Ship">Ship</SelectItem>
                  <SelectItem value="Air">Air</SelectItem>
                  <SelectItem value="Rail">Rail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                {...form.register("weight")}
                placeholder="Enter shipment weight"
                type="number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volume (m³)</Label>
              <Input
                id="volume"
                {...form.register("volume")}
                placeholder="Enter shipment volume"
                type="number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                onValueChange={(value: "Low" | "Medium" | "High") =>
                  form.setValue("priority", value)
                }
                defaultValue={form.getValues("priority")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Cost ($)</Label>
              <Input
                id="estimatedCost"
                {...form.register("estimatedCost")}
                placeholder="Enter estimated cost"
                type="number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="datetime-local"
                {...form.register("departureDate")}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eta">Estimated Arrival</Label>
              <Input
                id="eta"
                type="datetime-local"
                {...form.register("eta")}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customsDeclaration">Customs Declaration Number</Label>
            <Input
              id="customsDeclaration"
              {...form.register("customsDeclaration")}
              placeholder="Enter customs declaration number (if applicable)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="trackingNotes">Additional Notes</Label>
            <Input
              id="trackingNotes"
              {...form.register("trackingNotes")}
              placeholder="Enter any additional tracking notes"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Shipment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
