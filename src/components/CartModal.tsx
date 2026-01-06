
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, Trash2, ShoppingBag, Copy, Check, Bitcoin, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { getEnabledWallets } from './CryptoWalletSettings';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendorId?: string;
}

const coinIcons: Record<string, { icon: typeof Bitcoin; color: string }> = {
  btc: { icon: Bitcoin, color: 'text-orange-500' },
  eth: { icon: Coins, color: 'text-blue-500' },
  ltc: { icon: Coins, color: 'text-gray-500' },
  xmr: { icon: Coins, color: 'text-orange-600' },
  usdt: { icon: Coins, color: 'text-green-500' },
  sol: { icon: Coins, color: 'text-purple-500' },
};

const CartModal = ({ isOpen, onClose, vendorId }: CartModalProps) => {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [wallets, setWallets] = useState<{ coin: string; name: string; address: string }[]>([]);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  useEffect(() => {
    // First try vendor wallets, then fall back to admin wallets
    let enabledWallets = vendorId ? getEnabledWallets(`vendor_wallets_${vendorId}`) : [];
    if (enabledWallets.length === 0) {
      enabledWallets = getEnabledWallets('admin_wallets');
    }
    setWallets(enabledWallets);
  }, [vendorId, isOpen]);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast.success('Adresse kopiert!');
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handleBack = () => {
    setShowCheckout(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md volcanic-texture border-inferno-800/30">
        <DialogHeader>
          <DialogTitle className="text-inferno-500 flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            {showCheckout ? 'Zahlung' : `Warenkorb (${itemCount})`}
          </DialogTitle>
        </DialogHeader>

        {!showCheckout ? (
          <>
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
          </>
        ) : (
          <div className="space-y-4">
            <div className="text-center p-4 bg-volcanic-100/30 rounded-lg">
              <p className="text-volcanic-600 text-sm mb-2">Zu zahlender Betrag:</p>
              <p className="text-2xl font-bold text-inferno-500">€{total.toFixed(2)}</p>
            </div>

            {wallets.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-volcanic-600 text-center">Wähle eine Zahlungsmethode:</p>
                {wallets.map(({ coin, name, address }) => {
                  const { icon: Icon, color } = coinIcons[coin] || { icon: Coins, color: 'text-gray-500' };
                  return (
                    <div key={coin} className="p-3 bg-volcanic-100/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`h-5 w-5 ${color}`} />
                        <span className="font-medium text-volcanic-700">{name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs bg-volcanic-200/50 p-2 rounded overflow-x-auto">
                          {address}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(address)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedAddress === address ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-volcanic-500">
                <p>Keine Zahlungsmethoden konfiguriert.</p>
              </div>
            )}

            <Button 
              variant="outline" 
              onClick={handleBack}
              className="w-full"
            >
              Zurück zum Warenkorb
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
