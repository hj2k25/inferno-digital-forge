
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    console.log('Proceeding to checkout with items:', items);
    onClose();
    // Navigate to checkout page
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md volcanic-texture border-inferno-800/30">
        <DialogHeader>
          <DialogTitle className="text-inferno-500 flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Warenkorb ({itemCount})
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-volcanic-600">Dein Warenkorb ist leer</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-volcanic-100/30 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-volcanic-700 text-sm">{item.title}</h4>
                    <p className="text-inferno-600 font-bold">€{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-inferno-800/30 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-volcanic-700">Gesamt:</span>
              <span className="font-bold text-xl text-inferno-600">€{total.toFixed(2)}</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="flex-1"
              >
                Leeren
              </Button>
              <Button 
                onClick={handleCheckout}
                className="flex-1 lava-button text-white"
              >
                Zur Kasse
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
