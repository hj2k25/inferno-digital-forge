
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Eye, EyeOff, Shield } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    totp: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      if (formData.email === 'admin@hell.com' && formData.password === 'HellAdmin123!') {
        if (step === 'credentials') {
          setStep('2fa');
          setIsLoading(false);
        } else if (formData.totp === '666666') {
          // Store admin token
          localStorage.setItem('adminToken', 'hell-admin-authenticated');
          navigate('/admin');
        } else {
          alert('Ungültiger 2FA Code!');
          setIsLoading(false);
        }
      } else {
        alert('Ungültige Anmeldedaten!');
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/lovable-uploads/c00a8631-95e8-4006-a1f8-7c90e36434e6.png')`,
        filter: 'brightness(0.3)'
      }}
    >
      <div className="absolute inset-0 bg-volcanic-50/80 backdrop-blur-sm" />
      
      <Card className="relative z-10 w-full max-w-md captcha-portal border-inferno-800/30">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Flame className="h-12 w-12 text-inferno-500 animate-flame-flicker" />
          </div>
          <CardTitle className="text-2xl font-bold text-inferno-500 inferno-title">
            Höllisches Portal
          </CardTitle>
          <CardDescription className="text-volcanic-600">
            {step === 'credentials' 
              ? 'Tritt ein, Herrscher der Finsternis'
              : 'Bestätige deine teuflische Identität'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'credentials' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-volcanic-700">
                    E-Mail des Overlords
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@hell.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-inferno-800/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-volcanic-700">
                    Passwort der Verdammnis
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="border-inferno-800/30 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-volcanic-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-volcanic-500" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-4 bg-volcanic-100/50 rounded-lg border border-inferno-800/20">
                  <Shield className="h-8 w-8 text-inferno-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-volcanic-700">
                    Gib deinen 6-stelligen Authenticator-Code ein
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totp" className="text-volcanic-700">
                    2FA Code
                  </Label>
                  <Input
                    id="totp"
                    name="totp"
                    type="text"
                    placeholder="666666"
                    value={formData.totp}
                    onChange={handleInputChange}
                    maxLength={6}
                    required
                    className="border-inferno-800/30 text-center text-2xl tracking-widest"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full lava-button text-white py-3 text-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  {step === 'credentials' ? 'Prüfe Identität...' : 'Verifiziere Code...'}
                </div>
              ) : (
                step === 'credentials' ? 'Portal betreten' : 'Zugang gewähren'
              )}
            </Button>

            {step === '2fa' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('credentials')}
                className="w-full border-inferno-500/30 text-inferno-500 hover:bg-inferno-500 hover:text-white"
              >
                Zurück
              </Button>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-volcanic-500">
              Demo-Anmeldedaten: admin@hell.com / HellAdmin123! / 666666
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
