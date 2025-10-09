import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VendorLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [telegramId, setTelegramId] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleLogin = () => {
    const storedVendors = localStorage.getItem('cryloca_vendors');
    if (!storedVendors) {
      toast({
        title: 'Fehler',
        description: 'Kein Vendor-Account gefunden',
        variant: 'destructive',
      });
      return;
    }

    const vendors = JSON.parse(storedVendors);
    const vendor = vendors.find(
      (v: any) => v.telegramId === telegramId && v.accessCode === accessCode
    );

    if (vendor) {
      localStorage.setItem('cryloca_vendor_session', JSON.stringify({
        id: vendor.id,
        telegramId: vendor.telegramId,
        vendorName: vendor.vendorName,
      }));
      toast({
        title: 'Erfolgreich angemeldet',
        description: `Willkommen zurück, ${vendor.vendorName}!`,
      });
      navigate('/vendor/dashboard');
    } else {
      toast({
        title: 'Login fehlgeschlagen',
        description: 'Telegram-ID oder Zugangscode ungültig',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Vendor Login</CardTitle>
          <CardDescription>
            Melde dich mit deiner Telegram-ID und deinem Zugangscode an
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram-ID</Label>
            <Input
              id="telegram"
              placeholder="@username oder ID"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Zugangscode</Label>
            <Input
              id="code"
              type="password"
              placeholder="Dein Zugangscode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleLogin}>
            Anmelden
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Noch kein Account? Kontaktiere den Admin für die Registrierung.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorLogin;
