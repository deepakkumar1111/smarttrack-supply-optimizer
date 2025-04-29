
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Omit<any, 'id'>) => void;
}

export function AddCustomerModal({ isOpen, onClose, onSave }: AddCustomerModalProps) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCustomer = {
      name,
      location,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone
      },
      notes
    };
    
    onSave(newCustomer);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setLocation('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new customer to your system.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company/Customer Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input 
                  id="contactName" 
                  value={contactName} 
                  onChange={(e) => setContactName(e.target.value)} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number</Label>
                <Input 
                  id="contactPhone" 
                  value={contactPhone} 
                  onChange={(e) => setContactPhone(e.target.value)} 
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input 
                id="contactEmail" 
                type="email" 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)} 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Any additional information about this customer..."
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
