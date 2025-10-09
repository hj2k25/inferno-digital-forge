import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VendorOrdersProps {
  vendorId: string;
}

const VendorOrders = ({ vendorId }: VendorOrdersProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bestellungen</CardTitle>
        <CardDescription>Übersicht aller Bestellungen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Noch keine Bestellungen vorhanden.
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorOrders;
