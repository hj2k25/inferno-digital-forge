
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CaptchaGate from '@/components/CaptchaGate';
import ProductCategories from '@/components/ProductCategories';
import Footer from '@/components/Footer';
import EmberParticles from '@/components/EmberParticles';

const Index = () => {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaPassed, setCaptchaPassed] = useState(false);

  const handleEnterShop = () => {
    setShowCaptcha(true);
  };

  const handleCaptchaSuccess = () => {
    setCaptchaPassed(true);
    setShowCaptcha(false);
  };

  return (
    <div className="min-h-screen bg-volcanic-50 relative overflow-x-hidden">
      {/* Ember particles background effect */}
      <EmberParticles />
      
      {/* Captcha overlay */}
      {showCaptcha && <CaptchaGate onSuccess={handleCaptchaSuccess} />}
      
      {/* Main content */}
      <Header />
      <main className="relative z-10">
        <HeroSection />
        
        {/* Show shop content after captcha is passed */}
        {captchaPassed && (
          <>
            <ProductCategories />
            
            {/* Featured products section */}
            <section className="py-16 px-4">
              <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-inferno-500 inferno-title mb-8">
                  Brennende Bestseller
                </h2>
                <p className="text-lg text-volcanic-600 mb-12">
                  Die heißesten digitalen Güter aus den Flammen der Popularität
                </p>
                
                {/* Placeholder for products */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="volcanic-texture border border-inferno-800/30 rounded-lg p-6 bg-volcanic-100/50 backdrop-blur-sm">
                      <div className="h-32 bg-gradient-to-br from-inferno-600 to-inferno-800 rounded mb-4" />
                      <h3 className="font-semibold text-volcanic-700 mb-2">Höllisches Produkt {i}</h3>
                      <p className="text-sm text-volcanic-600 mb-4">Beschreibung des teuflischen digitalen Guts</p>
                      <div className="flex justify-between items-center">
                        <span className="text-inferno-600 font-bold">€{(i * 15.99).toFixed(2)}</span>
                        <button className="text-sm bg-inferno-500 hover:bg-inferno-600 text-white px-3 py-1 rounded">
                          In Warenkorb
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        
        {/* Show call-to-action if captcha not passed */}
        {!captchaPassed && !showCaptcha && (
          <section className="py-16 px-4 text-center">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-inferno-500 inferno-title mb-6">
                Bereit für die Unterwelt?
              </h2>
              <p className="text-lg text-volcanic-600 mb-8">
                Durchschreite das Portal und entdecke unsere teuflischen Schätze
              </p>
              <button 
                onClick={handleEnterShop}
                className="lava-button text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-2xl hover:scale-105 transition-transform"
              >
                Portal betreten
              </button>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
