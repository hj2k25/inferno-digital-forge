
import React from 'react';
import { Flame, Mail, MessageCircle, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="relative bg-volcanic-50 border-t border-inferno-800/30 mt-16">
      {/* Flame border effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-inferno-500 to-transparent animate-lava-flow" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-inferno-500 animate-flame-flicker" />
              <h3 className="text-xl font-bold inferno-title text-inferno-500">InfernoShop</h3>
            </div>
            <p className="text-volcanic-600 text-sm">
              Dein Portal für digitale Schätze aus den Tiefen der Unterwelt. 
              Wo Qualität in den Flammen geschmiedet wird.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-volcanic-700">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">Impressum</a></li>
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">AGB</a></li>
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">Widerrufsrecht</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-volcanic-700">Unterstützung</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">Support</a></li>
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">Kontakt</a></li>
              <li><a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">Downloads</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-volcanic-700">Höllische Angebote</h4>
            <p className="text-sm text-volcanic-600">
              Erhalte die neuesten Deals direkt aus der Hölle
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="deine@email.de" 
                className="bg-volcanic-100 border-inferno-800/30 flex-1"
              />
              <Button size="sm" className="lava-button text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-inferno-800/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-volcanic-600">
            © 2024 InfernoShop. Alle Rechte der Hölle vorbehalten.
          </p>
          
          {/* Social Media */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
