import React from 'react';
import { Button } from "@/components/ui/button";
import { Flame, ArrowDown } from 'lucide-react';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with volcanic imagery */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('/lovable-uploads/ad21844b-65e0-410a-8d4f-a5db02f1c9f3.png')`,
      filter: 'brightness(0.4) contrast(1.2)'
    }} />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-volcanic-50/20 via-volcanic-50/60 to-volcanic-50/90" />
      
      {/* Animated flame borders */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-inferno-500 to-transparent animate-lava-flow" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-inferno-500 to-transparent animate-lava-flow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <Flame className="h-16 w-16 text-inferno-500 mx-auto mb-4 animate-flame-flicker" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 inferno-title text-transparent bg-clip-text bg-gradient-to-b from-inferno-400 to-inferno-600">Hells Products</h1>
          <p className="text-xl md:text-2xl text-volcanic-600 mb-8 leading-relaxed">Tritt ein in die Flammen, kaufe das Unaussprechliche!</p>
          <p className="text-lg text-volcanic-500 mb-12 max-w-2xl mx-auto">Entdecke eine düstere Welt digitaler Schätze - DRAINER, LANDING PAGES, BOTS UND SOFTWARE WIE VOM TEUFEL GEMACHT!</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="lava-button text-white text-lg px-8 py-6 rounded-lg font-semibold shadow-2xl transform transition-all duration-300 hover:scale-105">
            <Flame className="h-5 w-5 mr-2" />
            Scharfe Ware entdecken
          </Button>
          
          <Button variant="outline" size="lg" className="border-2 border-inferno-500/50 text-inferno-400 hover:bg-inferno-500 hover:text-white text-lg px-8 py-6 bg-volcanic-50/10 backdrop-blur-sm">
            Zur Hölle eintreten
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-inferno-500" />
        </div>
      </div>

      {/* Floating embers effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => <div key={i} className="absolute w-2 h-2 bg-inferno-500 rounded-full opacity-70 animate-ember-float" style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${10 + Math.random() * 5}s`
      }} />)}
      </div>
    </section>;
};
export default HeroSection;