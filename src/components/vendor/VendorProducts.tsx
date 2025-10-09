import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface VendorProductsProps {
  vendorId: string;
}

const VendorProducts = ({ vendorId }: VendorProductsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Meine Produkte</CardTitle>
            <CardDescription>Verwalte deine Produktangebote</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Produkt hinzufügen
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Noch keine Produkte erstellt. Füge dein erstes Produkt hinzu.
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorProducts;
