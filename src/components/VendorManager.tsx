import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Store, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Vendor {
  id: string;
  vendorName: string;
  telegramId: string;
  telegramBotToken: string;
  shopName: string;
  description: string;
  accessCode: string;
  isActive: boolean;
  rating: number;
  productCount: number;
  totalSales: number;
  createdAt: string;
}

const VendorManager = () => {
  const { toast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState({
    vendorName: '',
    telegramId: '',
    telegramBotToken: '',
    shopName: '',
    description: '',
    accessCode: '',
  });

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = () => {
    const stored = localStorage.getItem('cryloca_vendors');
    if (stored) {
      setVendors(JSON.parse(stored));
    }
  };

  const saveVendors = (updatedVendors: Vendor[]) => {
    localStorage.setItem('cryloca_vendors', JSON.stringify(updatedVendors));
    setVendors(updatedVendors);
  };

  const handleSubmit = () => {
    if (!formData.vendorName || !formData.telegramId || !formData.shopName || !formData.accessCode) {
      toast({
        title: 'Fehler',
        description: 'Bitte fülle alle Pflichtfelder aus',
        variant: 'destructive',
      });
      return;
    }

    if (editingVendor) {
      const updated = vendors.map(v => 
        v.id === editingVendor.id ? { ...v, ...formData } : v
      );
      saveVendors(updated);
      toast({ title: 'Vendor aktualisiert' });
    } else {
      const newVendor: Vendor = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        rating: 5.0,
        productCount: 0,
        totalSales: 0,
        createdAt: new Date().toISOString(),
      };
      saveVendors([...vendors, newVendor]);
      toast({ title: 'Vendor erstellt' });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      vendorName: '',
      telegramId: '',
      telegramBotToken: '',
      shopName: '',
      description: '',
      accessCode: '',
    });
    setEditingVendor(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      vendorName: vendor.vendorName,
      telegramId: vendor.telegramId,
      telegramBotToken: vendor.telegramBotToken,
      shopName: vendor.shopName,
      description: vendor.description,
      accessCode: vendor.accessCode,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Vendor wirklich löschen?')) {
      saveVendors(vendors.filter(v => v.id !== id));
      toast({ title: 'Vendor gelöscht' });
    }
  };

  const toggleActive = (id: string) => {
    const updated = vendors.map(v => 
      v.id === id ? { ...v, isActive: !v.isActive } : v
    );
    saveVendors(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Vendor-Verwaltung</h2>
          <p className="text-muted-foreground">
            Verwalte Verkäufer und ihre Telegram-Bots
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingVendor(null); resetForm(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Vendor hinzufügen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingVendor ? 'Vendor bearbeiten' : 'Neuen Vendor erstellen'}
              </DialogTitle>
              <DialogDescription>
                Erstelle einen neuen Verkäufer mit Telegram-Bot-Integration
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendorName">Vendor Name *</Label>
                  <Input
                    id="vendorName"
                    value={formData.vendorName}
                    onChange={(e) => setFormData({...formData, vendorName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shopName">Shop Name *</Label>
                  <Input
                    id="shopName"
                    value={formData.shopName}
                    onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telegramId">Telegram-ID *</Label>
                  <Input
                    id="telegramId"
                    placeholder="@username oder ID"
                    value={formData.telegramId}
                    onChange={(e) => setFormData({...formData, telegramId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessCode">Zugangscode *</Label>
                  <Input
                    id="accessCode"
                    type="password"
                    value={formData.accessCode}
                    onChange={(e) => setFormData({...formData, accessCode: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegramBotToken">Telegram Bot Token (optional)</Label>
                <Input
                  id="telegramBotToken"
                  placeholder="Bot Token für Shop-Verwaltung"
                  value={formData.telegramBotToken}
                  onChange={(e) => setFormData({...formData, telegramBotToken: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Shop Beschreibung</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>Abbrechen</Button>
              <Button onClick={handleSubmit}>
                {editingVendor ? 'Aktualisieren' : 'Erstellen'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registrierte Vendors</CardTitle>
          <CardDescription>
            {vendors.length} Vendor{vendors.length !== 1 ? 's' : ''} registriert
          </CardDescription>
        </CardHeader>
        <CardContent>
          {vendors.length === 0 ? (
            <div className="text-center py-12">
              <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Noch keine Vendors erstellt</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Shop</TableHead>
                  <TableHead>Telegram</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Produkte</TableHead>
                  <TableHead>Verkäufe</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.vendorName}</TableCell>
                    <TableCell>{vendor.shopName}</TableCell>
                    <TableCell className="font-mono text-sm">{vendor.telegramId}</TableCell>
                    <TableCell>
                      <Badge variant={vendor.isActive ? 'default' : 'secondary'}>
                        {vendor.isActive ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Aktiv</>
                        ) : (
                          <><XCircle className="h-3 w-3 mr-1" /> Inaktiv</>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.productCount}</TableCell>
                    <TableCell>{vendor.totalSales}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(vendor.id)}
                      >
                        {vendor.isActive ? 'Deaktivieren' : 'Aktivieren'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(vendor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(vendor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorManager;
