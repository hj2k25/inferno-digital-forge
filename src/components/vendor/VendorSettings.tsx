import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CryptoWalletSettings from '@/components/CryptoWalletSettings';

interface VendorSettingsProps {
  vendorId: string;
}

const VendorSettings = ({ vendorId }: VendorSettingsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shop-Einstellungen</CardTitle>
          <CardDescription>Passe deine Shop-Informationen an</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shopName">Shop Name</Label>
            <Input id="shopName" placeholder="Dein Shop Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea id="description" placeholder="Beschreibe deinen Shop" rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram Bot Token</Label>
            <Input id="telegram" placeholder="Bot Token für Benachrichtigungen" />
          </div>
          <Button>Einstellungen speichern</Button>
        </CardContent>
      </Card>

      <CryptoWalletSettings 
        storageKey={`vendor_wallets_${vendorId}`}
        title="Deine Crypto Wallets"
        description="Wallet-Adressen für Zahlungen an deinen Shop"
      />
    </div>
  );
};

export default VendorSettings;
