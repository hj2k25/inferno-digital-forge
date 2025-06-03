
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Eye, 
  Ban, 
  UserCheck, 
  Mail,
  Shield,
  ShoppingCart
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'moderator' | 'admin';
  status: 'active' | 'banned' | 'pending';
  registrationDate: string;
  lastLogin: string;
  orderCount: number;
  totalSpent: string;
  has2FA: boolean;
}

const UserManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([
    {
      id: 'USR-001',
      email: 'admin@hell.com',
      name: 'Lucifer Admin',
      role: 'admin',
      status: 'active',
      registrationDate: '2024-01-01',
      lastLogin: '2024-01-15T14:30:00',
      orderCount: 0,
      totalSpent: '0.00',
      has2FA: true
    },
    {
      id: 'USR-002',
      email: 'user@hell.com',
      name: 'Dark Customer',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-01-10',
      lastLogin: '2024-01-15T12:15:00',
      orderCount: 5,
      totalSpent: '0.0234 BTC',
      has2FA: false
    },
    {
      id: 'USR-003',
      email: 'demon@inferno.org',
      name: 'Inferno Buyer',
      role: 'customer',
      status: 'active',
      registrationDate: '2024-01-12',
      lastLogin: '2024-01-14T18:45:00',
      orderCount: 2,
      totalSpent: '150.00 EUR',
      has2FA: true
    },
    {
      id: 'USR-004',
      email: 'spammer@evil.net',
      name: 'Suspicious User',
      role: 'customer',
      status: 'banned',
      registrationDate: '2024-01-14',
      lastLogin: '2024-01-14T09:20:00',
      orderCount: 0,
      totalSpent: '0.00',
      has2FA: false
    },
    {
      id: 'USR-005',
      email: 'newbie@dark.io',
      name: 'Fresh Soul',
      role: 'customer',
      status: 'pending',
      registrationDate: '2024-01-15',
      lastLogin: 'Nie',
      orderCount: 0,
      totalSpent: '0.00',
      has2FA: false
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'moderator':
        return 'bg-blue-500';
      case 'customer':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'banned':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktiv';
      case 'banned':
        return 'Gesperrt';
      case 'pending':
        return 'Ausstehend';
      default:
        return status;
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'moderator':
        return 'Moderator';
      case 'customer':
        return 'Kunde';
      default:
        return role;
    }
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = (userId: string, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const sendEmail = (email: string) => {
    console.log(`Sending email to: ${email}`);
  };

  return (
    <div className="space-y-6">
      {/* User Manager Header */}
      <Card className="border-inferno-800/30">
        <CardHeader>
          <CardTitle className="text-inferno-500">Benutzerverwaltung</CardTitle>
          <CardDescription>
            Verwaltung aller registrierten Seelen in deinem Reich
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-volcanic-500" />
                <Input
                  placeholder="Benutzer durchsuchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-inferno-800/30"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Gesamt-Benutzer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-inferno-500">{users.length}</div>
            <p className="text-xs text-volcanic-500">Registrierte Seelen</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              Aktive Benutzer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {users.filter(u => u.status === 'active').length}
            </div>
            <p className="text-xs text-volcanic-500">Aktuell aktiv</p>
          </CardContent>
        </Card>

        <Card className="border-inferno-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-volcanic-600">
              2FA Aktiviert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {users.filter(u => u.has2FA).length}
            </div>
            <p className="text-xs text-volcanic-500">Sicher geschützt</p>
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
              {users.filter(u => u.status === 'pending').length}
            </div>
            <p className="text-xs text-volcanic-500">Benötigen Bestätigung</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-inferno-800/30">
        <CardHeader>
          <CardTitle className="text-inferno-500">Alle Benutzer</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Benutzer-ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>E-Mail</TableHead>
                <TableHead>Rolle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bestellungen</TableHead>
                <TableHead>Ausgaben</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-volcanic-700">{user.id}</TableCell>
                  <TableCell className="text-volcanic-600">{user.name}</TableCell>
                  <TableCell className="text-volcanic-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={`${getRoleColor(user.role)} text-white`}>
                      {getRoleText(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(user.status)} text-white`}>
                      {getStatusText(user.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-volcanic-600">
                    <div className="flex items-center space-x-1">
                      <ShoppingCart className="h-4 w-4 text-volcanic-500" />
                      <span>{user.orderCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-volcanic-600">{user.totalSpent}</TableCell>
                  <TableCell>
                    {user.has2FA ? (
                      <Shield className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-volcanic-500">-</span>
                    )}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => sendEmail(user.email)}
                        className="h-8 w-8 p-0 text-blue-500"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      {user.status === 'active' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(user.id, 'banned')}
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : user.status === 'banned' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(user.id, 'active')}
                          className="h-8 w-8 p-0 text-green-500"
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      ) : null}
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

export default UserManager;
