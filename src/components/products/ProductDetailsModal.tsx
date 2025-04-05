
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, ShoppingCart, Truck } from "lucide-react";
import { Product } from "@/types/product";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  product: Product | null;
}

export const ProductDetailsModal = ({
  isOpen,
  onClose,
  onEdit,
  product,
}: ProductDetailsModalProps) => {
  if (!product) return null;

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "outline";
      case "Out of Stock":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
          <DialogDescription>
            Detailed information about this product.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.sku}</p>
            </div>
            <Badge variant={getBadgeVariant(product.status)}>
              {product.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Unit Price</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{product.stock}</p>
              <p className="text-sm text-muted-foreground">In Stock</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Description</h4>
            <p className="text-sm">{product.description || "No description available."}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Category</h4>
              <p className="text-sm">{product.category}</p>
            </div>
            <div>
              <h4 className="font-medium">Supplier</h4>
              <p className="text-sm">{product.supplier || "Not specified"}</p>
            </div>
            <div>
              <h4 className="font-medium">Last Updated</h4>
              <p className="text-sm">{product.lastUpdated || "Unknown"}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="flex gap-2 w-full sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline" onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
