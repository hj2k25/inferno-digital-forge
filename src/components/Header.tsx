import React, { useState } from 'react';
import { Menu, X, Flame, ShoppingCart, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return <header className="relative z-50 bg-volcanic-50/90 backdrop-blur-lg border-b border-inferno-800/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Flame className="h-8 w-8 text-inferno-500 animate-flame-flicker" />
            <h1 className="text-2xl font-bold inferno-title text-inferno-500">hells products</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium">
              Home
            </a>
            <div className="relative group">
              <button className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium">
                Shop
              </button>
              {/* Dropdown for later */}
            </div>
            <a href="#top-seller" className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium">
              Top-Seller
            </a>
            <a href="#neuerscheinungen" className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium">
              Neuerscheinungen
            </a>
            <a href="#support" className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium">
              Support
            </a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <select className="bg-volcanic-100 border border-inferno-800/30 rounded px-2 py-1 text-sm">
              <option value="de">DE</option>
              <option value="en">EN</option>
            </select>
            <Button variant="outline" size="sm" className="border-inferno-500/30 text-inferno-500 hover:bg-inferno-500 hover:text-white">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="lava-button text-white">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Warenkorb
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-inferno-500 hover:bg-inferno-500/10 rounded">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && <div className="md:hidden py-4 border-t border-inferno-800/30">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                Home
              </a>
              <a href="#shop" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                Shop
              </a>
              <a href="#top-seller" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                Top-Seller
              </a>
              <a href="#neuerscheinungen" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                Neuerscheinungen
              </a>
              <a href="#support" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                Support
              </a>
              <div className="flex items-center space-x-2 pt-4">
                <Button variant="outline" size="sm" className="border-inferno-500/30 text-inferno-500 hover:bg-inferno-500 hover:text-white">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="lava-button text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Warenkorb
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;