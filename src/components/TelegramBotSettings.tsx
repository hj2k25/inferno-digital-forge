import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Send, Bot, Package, ShoppingCart, Settings, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TelegramBotSettings = () => {
  const [botConfig, setBotConfig] = useState({
    enabled: false,
    botToken: '',
    chatId: '',
    notifications: {
      newOrders: true,
      productUpdates: false,
      lowStock: false,
      systemAlerts: true
    }
  });

  const handleSave = () => {
    localStorage.setItem('telegram-bot-config', JSON.stringify(botConfig));
    toast.success('Telegram-Bot-Einstellungen gespeichert');
  };

  const handleTestMessage = async () => {
    if (!botConfig.botToken || !botConfig.chatId) {
      toast.error('Bitte Bot-Token und Chat-ID eingeben');
      return;
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botConfig.botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: botConfig.chatId,
            text: '✅ Telegram-Bot erfolgreich verbunden!\n\nDies ist eine Testnachricht von Ihrem Shop-Admin-Panel.',
            parse_mode: 'HTML'
          })
        }
      );

      if (response.ok) {
        toast.success('Testnachricht erfolgreich gesendet!');
      } else {
        toast.error('Fehler beim Senden der Testnachricht');
      }
    } catch (error) {
      toast.error('Verbindungsfehler');
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Der Telegram-Bot ermöglicht es Ihnen, Benachrichtigungen über Bestellungen, 
          Produkte und System-Events direkt in Telegram zu erhalten. Alle Funktionen sind optional.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Bot-Konfiguration
          </CardTitle>
          <CardDescription>
            Erstellen Sie einen Bot über @BotFather und fügen Sie die Zugangsdaten hier ein
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Telegram-Bot aktivieren</Label>
              <p className="text-sm text-muted-foreground">
                Aktiviert Benachrichtigungen über Telegram
              </p>
            </div>
            <Switch
              checked={botConfig.enabled}
              onCheckedChange={(checked) =>
                setBotConfig({ ...botConfig, enabled: checked })
              }
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="bot-token">Bot Token</Label>
            <Input
              id="bot-token"
              type="password"
              placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              value={botConfig.botToken}
              onChange={(e) =>
                setBotConfig({ ...botConfig, botToken: e.target.value })
              }
              disabled={!botConfig.enabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chat-id">Chat ID</Label>
            <Input
              id="chat-id"
              placeholder="Ihre Telegram Chat ID"
              value={botConfig.chatId}
              onChange={(e) =>
                setBotConfig({ ...botConfig, chatId: e.target.value })
              }
              disabled={!botConfig.enabled}
            />
            <p className="text-xs text-muted-foreground">
              Nutzen Sie @userinfobot um Ihre Chat-ID zu erhalten
            </p>
          </div>

          <Button 
            onClick={handleTestMessage} 
            disabled={!botConfig.enabled}
            variant="outline"
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            Testnachricht senden
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benachrichtigungen</CardTitle>
          <CardDescription>
            Wählen Sie, welche Events Sie über Telegram erhalten möchten
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>Neue Bestellungen</Label>
                <p className="text-sm text-muted-foreground">
                  Benachrichtigung bei jeder neuen Bestellung
                </p>
              </div>
            </div>
            <Switch
              checked={botConfig.notifications.newOrders}
              onCheckedChange={(checked) =>
                setBotConfig({
                  ...botConfig,
                  notifications: { ...botConfig.notifications, newOrders: checked }
                })
              }
              disabled={!botConfig.enabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>Produkt-Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Änderungen an Produkten und Beständen
                </p>
              </div>
            </div>
            <Switch
              checked={botConfig.notifications.productUpdates}
              onCheckedChange={(checked) =>
                setBotConfig({
                  ...botConfig,
                  notifications: { ...botConfig.notifications, productUpdates: checked }
                })
              }
              disabled={!botConfig.enabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>Niedriger Bestand</Label>
                <p className="text-sm text-muted-foreground">
                  Warnung bei niedrigem Produktbestand
                </p>
              </div>
            </div>
            <Switch
              checked={botConfig.notifications.lowStock}
              onCheckedChange={(checked) =>
                setBotConfig({
                  ...botConfig,
                  notifications: { ...botConfig.notifications, lowStock: checked }
                })
              }
              disabled={!botConfig.enabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>System-Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Wichtige System- und Sicherheitsmeldungen
                </p>
              </div>
            </div>
            <Switch
              checked={botConfig.notifications.systemAlerts}
              onCheckedChange={(checked) =>
                setBotConfig({
                  ...botConfig,
                  notifications: { ...botConfig.notifications, systemAlerts: checked }
                })
              }
              disabled={!botConfig.enabled}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full" disabled={!botConfig.enabled}>
        Einstellungen speichern
      </Button>
    </div>
  );
};

export default TelegramBotSettings;
