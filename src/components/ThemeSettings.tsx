import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme, ThemeVariant } from '@/contexts/ThemeContext';
import { Flame, TreePine, Beaker, Upload, Check } from 'lucide-react';
import { toast } from 'sonner';

const ThemeSettings = () => {
  const { theme, setThemeVariant, setCustomBackground } = useTheme();
  const [bgUrl, setBgUrl] = useState('');

  const themes = [
    {
      id: 'inferno' as ThemeVariant,
      name: 'Inferno Original',
      description: 'Klassisches Höllisches Design',
      icon: Flame,
      preview: 'bg-gradient-to-br from-red-900 via-orange-800 to-red-950'
    },
    {
      id: 'anden-jungle' as ThemeVariant,
      name: 'Anden Urwald',
      description: 'Bolivianischer Dschungel-Stil',
      icon: TreePine,
      preview: 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-950'
    },
    {
      id: 'underground-lab' as ThemeVariant,
      name: 'Underground Labor',
      description: 'Unter Tage Chemie Labor',
      icon: Beaker,
      preview: 'bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-950'
    }
  ];

  const handleThemeChange = (variant: ThemeVariant) => {
    setThemeVariant(variant);
    toast.success(`Design gewechselt zu: ${themes.find(t => t.id === variant)?.name}`);
  };

  const handleBackgroundUpload = () => {
    if (bgUrl) {
      setCustomBackground(bgUrl);
      toast.success('Hintergrundbild aktualisiert');
      setBgUrl('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design-Varianten</CardTitle>
          <CardDescription>Wählen Sie das Erscheinungsbild Ihres Shops</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme.variant === t.id;
              
              return (
                <div
                  key={t.id}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                    isActive 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleThemeChange(t.id)}
                >
                  <div className={`h-32 rounded-t-lg ${t.preview} relative overflow-hidden`}>
                    <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 text-white/30" />
                    {isActive && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eigenes Hintergrundbild</CardTitle>
          <CardDescription>
            Laden Sie ein eigenes Hintergrundbild für Ihren Shop hoch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bg-url">Bild-URL</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-url"
                  placeholder="https://example.com/background.jpg"
                  value={bgUrl}
                  onChange={(e) => setBgUrl(e.target.value)}
                />
                <Button onClick={handleBackgroundUpload} disabled={!bgUrl}>
                  <Upload className="h-4 w-4 mr-2" />
                  Hochladen
                </Button>
              </div>
            </div>
            {theme.customBackground && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Aktuelles Hintergrundbild:</p>
                <img 
                  src={theme.customBackground} 
                  alt="Custom Background" 
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;
