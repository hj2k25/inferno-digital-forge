
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Eye, 
  Download, 
  RefreshCw,
  ExternalLink,
  Copy
} from 'lucide-react';

interface Order {
  id: string;
  customerEmail: string;
  product: string;
  amount: string;
  currency: 'BTC' | 'ETH' | 'LTC' | 'USDT' | 'EUR';
  status: 'pending' | 'confirmed' | 'completed' | 'failed';
  txHash?: string;
  orderDate: string;
  downloadCount: number;
  maxDownloads: number;
}

const OrderManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      customerEmail: 'user@hell.com',
      product: 'Premium Drainer v2.0',
      amount: '0.00234',
      currency: 'BTC',
      status: 'completed',
      txHash: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      orderDate: '2024-01-15T14:30:00',
      downloadCount: 3,
      maxDownloads: 5
    },
    {
      id: 'ORD-2024-002',
      customerEmail: 'demon@inferno.org',
      product: 'Dark Web Landing Page Kit',
      amount: '150.00',
      currency: 'EUR',
      status: 'pending',
      orderDate: '2024-01-15T12:15:00',
      downloadCount: 0,
      maxDownloads: 3
    },
    {
      id: 'ORD-2024-003',
      customerEmail: 'devil@evil.net',
      product: 'Crypto Bot Suite',
      amount: '0.0045',
      currency: 'ETH',
      status: 'confirmed',
      txHash: '0x742d35cc6e8f9f6f6e8e8f6f6e8e8f6f6e8e8f6f',
      orderDate: '2024-01-14T18:45:00',
      downloadCount: 1,
      maxDownloads: 10
    },
    {
      id: 'ORD-2024-004',
      customerEmail: 'hacker@dark.io',
      product: 'NFT Art Generator',
      amount: '50.0',
      currency: 'USDT',
      status: 'failed',
      orderDate: '2024-01-14T09:20:00',
      downloadCount: 0,
      maxDownloads: 1
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Abgeschlossen';
      case 'confirmed':
        return 'Bestätigt';
      case 'pending':
        return 'Ausstehend';
      case 'failed':
        return 'Fehlgeschlagen';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const copyTxHash = (txHash: string) => {
    navigator.clipboard.writeText(txHash);
  };

  const openBlockchainExplorer = (txHash: string, currency: string) => {
    let url = '';
    switch (currency) {
      case 'BTC':
        url = `https://blockstream.info/tx/${txHash}`;
        break;
      case 'ETH':
        url = `https://etherscan.io/tx/${txHash}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Order Manager Header */}
      <Card className="border-inferno-800/30">
        <CardHeader>
          <CardTitle className="text-inferno-500">Bestellverwaltung</CardTitle>
          <CardDescription>
            Übersicht und Verwaltung aller Kundenbestellungen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-volcanic-500" />
                <Input
                  placeholder="Bestellungen durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-inferno-800/30"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Gesamt-Bestellungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-inferno-500">{orders.length}</div>
            <p className="text-xs text-volcanic-500">Alle Zeit</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Ausstehend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <p className="text-xs text-volcanic-500">Benötigen Aufmerksamkeit</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Abgeschlossen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {orders.filter(o => o.status === 'completed').length}
            </div>
            <p className="text-xs text-volcanic-500">Erfolgreich</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Umsatz heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-inferno-500">1.2 BTC</div>
            <p className="text-xs text-volcanic-500">≈ €45,600</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border-inferno-800/30">
        <CardHeader>
          <CardTitle className="text-inferno-500">Alle Bestellungen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bestell-ID</TableHead>
                <TableHead>Kunde</TableHead>
                <TableHead>Produkt</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>TX Hash</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-volcanic-700">{order.id}</TableCell>
                  <TableCell className="text-volcanic-600">{order.customerEmail}</TableCell>
                  <TableCell className="text-volcanic-600">{order.product}</TableCell>
                  <TableCell className="text-volcanic-600">
                    {order.amount} {order.currency}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {getStatusText(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.txHash ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-volcanic-600">
                          {order.txHash.substring(0, 8)}...
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyTxHash(order.txHash!)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openBlockchainExplorer(order.txHash!, order.currency)}
                          className="h-6 w-6 p-0"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-volcanic-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-volcanic-600">
                    {order.downloadCount}/{order.maxDownloads}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                          className="h-8 w-8 p-0 text-green-500"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManager;
