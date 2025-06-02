
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Shield, Eye } from 'lucide-react';

interface CaptchaGateProps {
  onSuccess: () => void;
}

const CaptchaGate: React.FC<CaptchaGateProps> = ({ onSuccess }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const symbols = [
    { id: 'flame', icon: Flame, name: 'Flamme' },
    { id: 'shield', icon: Shield, name: 'Schild' },
    { id: 'eye', icon: Eye, name: 'Auge' }
  ];
  
  const correctSymbol = 'flame'; // In real implementation, this would be dynamic

  const handleVerification = () => {
    if (selectedSymbol === correctSymbol) {
      setIsVerifying(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      // Show error state
      setSelectedSymbol(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-volcanic-50/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md captcha-portal border-inferno-800/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-inferno-500 inferno-title">
            Teufelstest
          </CardTitle>
          <CardDescription className="text-volcanic-600">
            Wähle das Symbol, das in den Flammen brennt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Challenge question */}
          <div className="text-center p-4 bg-volcanic-100/50 rounded-lg border border-inferno-800/20">
            <p className="text-lg font-medium text-volcanic-700">
              Welches Symbol lodert in den ewigen Flammen der Hölle?
            </p>
          </div>

          {/* Symbol selection */}
          <div className="grid grid-cols-3 gap-4">
            {symbols.map((symbol) => {
              const Icon = symbol.icon;
              return (
                <button
                  key={symbol.id}
                  onClick={() => setSelectedSymbol(symbol.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 ${
                    selectedSymbol === symbol.id
                      ? 'border-inferno-500 bg-inferno-500/20 text-inferno-400'
                      : 'border-volcanic-300 hover:border-inferno-400 hover:bg-inferno-500/10'
                  }`}
                >
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">{symbol.name}</span>
                </button>
              );
            })}
          </div>

          {/* Verification button */}
          <Button
            onClick={handleVerification}
            disabled={!selectedSymbol || isVerifying}
            className="w-full lava-button text-white py-3 text-lg font-semibold"
          >
            {isVerifying ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Portal öffnet sich...
              </div>
            ) : (
              'In die Hölle eintreten'
            )}
          </Button>

          {/* Additional security text */}
          <p className="text-xs text-volcanic-500 text-center">
            Dieser Schutz verhindert, dass Dämonenbots unsere heiligen Hallen betreten
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaptchaGate;
