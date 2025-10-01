
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Flame, 
  Users, 
  ShoppingCart, 
  FileText, 
  Settings, 
  Upload,
  Download,
  Eye,
  Trash2,
  Plus
} from 'lucide-react';
import FileManager from './FileManager';
import OrderManager from './OrderManager';
import UserManager from './UserManager';
import ThemeSettings from './ThemeSettings';
import TelegramBotSettings from './TelegramBotSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-volcanic-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Flame className="h-8 w-8 text-inferno-500 animate-flame-flicker" />
            <h1 className="text-3xl font-bold text-inferno-500 inferno-title">
              Höllisches Admin Portal
            </h1>
          </div>
          <p className="text-volcanic-600">
            Verwalte dein teuflisches Reich der digitalen Güter
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-volcanic-100">
            <TabsTrigger value="overview" className="text-sm">
              Übersicht
            </TabsTrigger>
            <TabsTrigger value="files" className="text-sm">
              Dateien
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm">
              Bestellungen
            </TabsTrigger>
            <TabsTrigger value="users" className="text-sm">
              Nutzer
            </TabsTrigger>
            <TabsTrigger value="design" className="text-sm">
              Design
            </TabsTrigger>
            <TabsTrigger value="telegram" className="text-sm">
              Telegram Bot
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">
              Einstellungen
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-inferno-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-volcanic-600">
                    Aktive Bestellungen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-inferno-500">24</div>
                  <p className="text-xs text-volcanic-500">+12% seit gestern</p>
                </CardContent>
              </Card>

              <Card className="border-inferno-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-volcanic-600">
                    Registrierte Nutzer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-inferno-500">1,234</div>
                  <p className="text-xs text-volcanic-500">+5% diese Woche</p>
                </CardContent>
              </Card>

              <Card className="border-inferno-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-volcanic-600">
                    Umsatz (BTC)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-inferno-500">2.458</div>
                  <p className="text-xs text-volcanic-500">+8% diesen Monat</p>
                </CardContent>
              </Card>

              <Card className="border-inferno-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-volcanic-600">
                    Gespeicherte Dateien
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-inferno-500">156</div>
                  <p className="text-xs text-volcanic-500">2.3 GB verwendet</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-inferno-800/30">
              <CardHeader>
                <CardTitle className="text-inferno-500">Letzte Aktivitäten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'order', message: 'Neue Bestellung #1234 von user@example.com', time: '2 Min' },
                    { type: 'user', message: 'Neuer Nutzer registriert: hellsuser@devil.com', time: '5 Min' },
                    { type: 'file', message: 'Datei "drainer-v2.zip" hochgeladen', time: '10 Min' },
                    { type: 'order', message: 'Zahlung bestätigt für Bestellung #1233', time: '15 Min' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-volcanic-100/50 rounded-lg">
                      <div className="flex-shrink-0">
                        {activity.type === 'order' && <ShoppingCart className="h-4 w-4 text-inferno-500" />}
                        {activity.type === 'user' && <Users className="h-4 w-4 text-inferno-500" />}
                        {activity.type === 'file' && <FileText className="h-4 w-4 text-inferno-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-volcanic-700 truncate">{activity.message}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-xs text-volcanic-500">vor {activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files">
            <FileManager />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <OrderManager />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UserManager />
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design">
            <ThemeSettings />
          </TabsContent>

          {/* Telegram Bot Tab */}
          <TabsContent value="telegram">
            <TelegramBotSettings />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-inferno-800/30">
              <CardHeader>
                <CardTitle className="text-inferno-500">System-Einstellungen</CardTitle>
                <CardDescription>
                  Konfiguriere dein höllisches System
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-volcanic-700">Zahlungsanbieter</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-inferno-800/30" />
                        <span className="text-sm text-volcanic-600">Coinbase Commerce</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded border-inferno-800/30" />
                        <span className="text-sm text-volcanic-600">BitPay</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-inferno-800/30" />
                        <span className="text-sm text-volcanic-600">Stripe (FIAT)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-volcanic-700">Captcha-Einstellungen</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="captcha" defaultChecked className="border-inferno-800/30" />
                        <span className="text-sm text-volcanic-600">Google reCAPTCHA</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="captcha" className="border-inferno-800/30" />
                        <span className="text-sm text-volcanic-600">hCaptcha</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="captcha" className="border-inferno-800/30" />
                        <span className="text-sm text-volcanic-600">Teufelstest (Custom)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="lava-button text-white">
                    Einstellungen speichern
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
