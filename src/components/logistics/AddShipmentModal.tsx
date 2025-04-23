
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

interface ShipmentFormData {
  origin: string;
  destination: string;
  carrier: string;
  mode: "Truck" | "Ship" | "Air" | "Rail";
  departureDate: string;
  eta: string;
}

export interface Shipment extends ShipmentFormData {
  id: string;
  status: "Scheduled" | "In Transit" | "Delivered";
  progress: number;
}

const initialFormData: ShipmentFormData = {
  origin: "",
  destination: "",
  carrier: "",
  mode: "Truck",
  departureDate: "",
  eta: "",
};

interface AddShipmentModalProps {
  onAddShipment: (shipment: Shipment) => void;
}

export function AddShipmentModal({ onAddShipment }: AddShipmentModalProps) {
  const [formData, setFormData] = useState<ShipmentFormData>(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random ID for the new shipment
    const newShipment: Shipment = {
      id: `SHP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      ...formData,
      status: "Scheduled",
      progress: 0,
    };

    // Send the new shipment to the parent component
    onAddShipment(newShipment);

    // Show success message
    toast({
      title: "Shipment Scheduled",
      description: `Shipment ${newShipment.id} has been created successfully.`,
    });

    setFormData(initialFormData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Schedule Shipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule New Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Origin</Label>
            <Input
              id="origin"
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              placeholder="Enter origin location"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Enter destination location"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="carrier">Carrier</Label>
            <Input
              id="carrier"
              value={formData.carrier}
              onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
              placeholder="Enter carrier name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mode">Transport Mode</Label>
            <Select
              value={formData.mode}
              onValueChange={(value: "Truck" | "Ship" | "Air" | "Rail") =>
                setFormData({ ...formData, mode: value })
              }
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
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="eta">Estimated Arrival Date</Label>
            <Input
              id="eta"
              type="date"
              value={formData.eta}
              onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
              required
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
