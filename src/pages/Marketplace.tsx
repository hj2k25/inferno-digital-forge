import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, Package, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface VendorShop {
  id: string;
  vendorName: string;
  telegramId: string;
  shopName: string;
  description: string;
  rating: number;
  productCount: number;
  totalSales: number;
  isActive: boolean;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<VendorShop[]>([]);

  useEffect(() => {
    // Load vendors from localStorage
    const storedVendors = localStorage.getItem('cryloca_vendors');
    if (storedVendors) {
      const allVendors = JSON.parse(storedVendors);
      // Only show active vendors with shops
      setVendors(allVendors.filter((v: VendorShop) => v.isActive));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Marktplatz</h1>
          <p className="text-muted-foreground">
            Entdecke Shops von verifizierten Verkäufern
          </p>
        </div>

        {vendors.length === 0 ? (
          <Card className="p-12 text-center">
            <Store className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Noch keine Shops verfügbar</h3>
            <p className="text-muted-foreground">
              Verkäufer können sich über das Admin-Panel registrieren
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Store className="h-8 w-8 text-primary" />
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-4">{vendor.shopName}</CardTitle>
                  <CardDescription>{vendor.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Produkte
                      </span>
                      <span className="font-semibold">{vendor.productCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Verkäufe
                      </span>
                      <span className="font-semibold">{vendor.totalSales}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => navigate(`/vendor/${vendor.id}`)}
                  >
                    Shop besuchen
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
