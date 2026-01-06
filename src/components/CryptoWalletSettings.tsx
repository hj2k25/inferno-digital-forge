import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Bitcoin, Coins, Wallet } from 'lucide-react';

export interface CryptoWallet {
  btc: string;
  eth: string;
  ltc: string;
  xmr: string;
  usdt: string;
  sol: string;
}

interface CryptoWalletSettingsProps {
  storageKey: string;
  title?: string;
  description?: string;
}

const defaultWallets: CryptoWallet = {
  btc: '',
  eth: '',
  ltc: '',
  xmr: '',
  usdt: '',
  sol: '',
};

const cryptoInfo = [
  { key: 'btc', name: 'Bitcoin (BTC)', icon: Bitcoin, color: 'text-orange-500' },
  { key: 'eth', name: 'Ethereum (ETH)', icon: Coins, color: 'text-blue-500' },
  { key: 'ltc', name: 'Litecoin (LTC)', icon: Coins, color: 'text-gray-500' },
  { key: 'xmr', name: 'Monero (XMR)', icon: Coins, color: 'text-orange-600' },
  { key: 'usdt', name: 'USDT (TRC20)', icon: Coins, color: 'text-green-500' },
  { key: 'sol', name: 'Solana (SOL)', icon: Coins, color: 'text-purple-500' },
];

const CryptoWalletSettings = ({ storageKey, title = "Crypto Wallets", description = "Wallet-Adressen für Zahlungen" }: CryptoWalletSettingsProps) => {
  const [wallets, setWallets] = useState<CryptoWallet>(defaultWallets);
  const [enabledCoins, setEnabledCoins] = useState<Record<string, boolean>>({
    btc: true,
    eth: true,
    ltc: false,
    xmr: false,
    usdt: false,
    sol: false,
  });

  useEffect(() => {
    const savedWallets = localStorage.getItem(storageKey);
    const savedEnabled = localStorage.getItem(`${storageKey}_enabled`);
    if (savedWallets) {
      setWallets(JSON.parse(savedWallets));
    }
    if (savedEnabled) {
      setEnabledCoins(JSON.parse(savedEnabled));
    }
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(wallets));
    localStorage.setItem(`${storageKey}_enabled`, JSON.stringify(enabledCoins));
    toast.success('Wallet-Adressen gespeichert!');
  };

  const handleWalletChange = (coin: string, value: string) => {
    setWallets(prev => ({ ...prev, [coin]: value }));
  };

  const toggleCoin = (coin: string) => {
    setEnabledCoins(prev => ({ ...prev, [coin]: !prev[coin] }));
  };

  return (
    <Card className="border-inferno-800/30">
      <CardHeader>
        <CardTitle className="text-inferno-500 flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {cryptoInfo.map(({ key, name, icon: Icon, color }) => (
          <div key={key} className="space-y-2 p-3 bg-volcanic-100/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${color}`} />
                <Label htmlFor={key} className="font-medium">{name}</Label>
              </div>
              <Switch
                checked={enabledCoins[key]}
                onCheckedChange={() => toggleCoin(key)}
              />
            </div>
            {enabledCoins[key] && (
              <Input
                id={key}
                placeholder={`${name} Wallet-Adresse`}
                value={wallets[key as keyof CryptoWallet]}
                onChange={(e) => handleWalletChange(key, e.target.value)}
                className="font-mono text-sm"
              />
            )}
          </div>
        ))}
        <Button onClick={handleSave} className="w-full lava-button text-white">
          Wallets speichern
        </Button>
      </CardContent>
    </Card>
  );
};

export default CryptoWalletSettings;

export const getEnabledWallets = (storageKey: string): { coin: string; name: string; address: string }[] => {
  const savedWallets = localStorage.getItem(storageKey);
  const savedEnabled = localStorage.getItem(`${storageKey}_enabled`);
  
  if (!savedWallets || !savedEnabled) return [];
  
  const wallets: CryptoWallet = JSON.parse(savedWallets);
  const enabled: Record<string, boolean> = JSON.parse(savedEnabled);
  
  return cryptoInfo
    .filter(({ key }) => enabled[key] && wallets[key as keyof CryptoWallet])
    .map(({ key, name }) => ({
      coin: key,
      name,
      address: wallets[key as keyof CryptoWallet],
    }));
};
