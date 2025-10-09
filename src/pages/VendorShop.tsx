import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, Star, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const VendorShop = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState<any>(null);

  useEffect(() => {
    const storedVendors = localStorage.getItem('cryloca_vendors');
    if (storedVendors) {
      const vendors = JSON.parse(storedVendors);
      const found = vendors.find((v: any) => v.id === vendorId);
      setVendor(found);
    }
  }, [vendorId]);

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="p-12 text-center">
            <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Shop nicht gefunden</h3>
            <p className="text-muted-foreground">
              Dieser Shop existiert nicht oder wurde deaktiviert.
            </p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Shop Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center">
              <Store className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{vendor.shopName}</h1>
                <Badge variant="default">Verifiziert</Badge>
              </div>
              <p className="text-muted-foreground mb-3">{vendor.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{vendor.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">Bewertung</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.productCount} Produkte</span>
                </div>
                <div className="text-muted-foreground">
                  {vendor.totalSales} Verkäufe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Produkte</h2>
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Noch keine Produkte</h3>
            <p className="text-muted-foreground">
              Der Verkäufer hat noch keine Produkte eingestellt.
            </p>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorShop;
