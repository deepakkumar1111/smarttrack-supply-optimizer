
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { suppliersData } from '@/services/mockData';

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<any, 'id'>) => void;
}

export function AddInventoryModal({ isOpen, onClose, onSave }: AddInventoryModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [location, setLocation] = useState('Warehouse A');
  const [quantity, setQuantity] = useState('0');
  const [unitCost, setUnitCost] = useState('0');
  const [reorderPoint, setReorderPoint] = useState('0');
  const [leadTimeDays, setLeadTimeDays] = useState('0');
  const [supplier, setSupplier] = useState(suppliersData[0]?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem = {
      name,
      description,
      category,
      location,
      quantity: Number(quantity),
      unitCost: Number(unitCost),
      reorderPoint: Number(reorderPoint),
      leadTimeDays: Number(leadTimeDays),
      supplier
    };
    
    onSave(newItem);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('Electronics');
    setLocation('Warehouse A');
    setQuantity('0');
    setUnitCost('0');
    setReorderPoint('0');
    setLeadTimeDays('0');
    setSupplier(suppliersData[0]?.name || '');
  };

  const categories = ['Electronics', 'Materials', 'Components', 'Accessories', 'Tools'];
  const locations = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Storage Unit 1', 'Storage Unit 2'];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
          <DialogDescription>
            Complete the form below to add a new inventory item to the system.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Storage Location</Label>
              <Select value={location} onValueChange={setLocation} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select value={supplier} onValueChange={setSupplier} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliersData.map((sup) => (
                    <SelectItem key={sup.id} value={sup.name}>{sup.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                min="0" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitCost">Unit Cost ($)</Label>
              <Input 
                id="unitCost" 
                type="number" 
                min="0" 
                step="0.01" 
                value={unitCost} 
                onChange={(e) => setUnitCost(e.target.value)} 
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input 
                id="reorderPoint" 
                type="number" 
                min="0" 
                value={reorderPoint} 
                onChange={(e) => setReorderPoint(e.target.value)} 
                required
              />
            </div>
            
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
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
