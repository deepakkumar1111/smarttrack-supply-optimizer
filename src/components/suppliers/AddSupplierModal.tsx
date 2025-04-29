
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Omit<any, 'id'>) => void;
}

export function AddSupplierModal({ isOpen, onClose, onSave }: AddSupplierModalProps) {
  const [name, setName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [location, setLocation] = useState('');
  const [leadTimeDays, setLeadTimeDays] = useState('0');
  const [reliabilityScore, setReliabilityScore] = useState('0.95');
  const [paymentTerms, setPaymentTerms] = useState('Net 30');
  const [productCategories, setProductCategories] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSupplier = {
      name,
      contact: {
        name: contactName,
        email: contactEmail,
        phone: contactPhone
      },
      location,
      leadTimeDays: Number(leadTimeDays),
      reliabilityScore: Number(reliabilityScore),
      paymentTerms,
      productCategories: productCategories.split(',').map(cat => cat.trim())
    };
    
    onSave(newSupplier);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setLocation('');
    setLeadTimeDays('0');
    setReliabilityScore('0.95');
    setPaymentTerms('Net 30');
    setProductCategories('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Supplier</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new supplier to your network.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
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
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leadTimeDays">Lead Time (days)</Label>
              <Input 
                id="leadTimeDays" 
                type="number" 
                min="0" 
                value={leadTimeDays} 
                onChange={(e) => setLeadTimeDays(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reliabilityScore">Reliability Score (0-1)</Label>
              <Input 
                id="reliabilityScore" 
                type="number" 
                min="0" 
                max="1" 
                step="0.01" 
                value={reliabilityScore} 
                onChange={(e) => setReliabilityScore(e.target.value)} 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Input 
              id="paymentTerms" 
              value={paymentTerms} 
              onChange={(e) => setPaymentTerms(e.target.value)} 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productCategories">Product Categories (comma-separated)</Label>
            <Textarea 
              id="productCategories" 
              value={productCategories} 
              onChange={(e) => setProductCategories(e.target.value)} 
              placeholder="Electronics, Components, Materials"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Supplier</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
