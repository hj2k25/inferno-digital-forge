
import React, { useState } from 'react';
import { Menu, X, Flame, ShoppingCart, User, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/hooks/useCart';
import { useBlockchain } from '@/hooks/useBlockchain';
import CartModal from '@/components/CartModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const { isConnected, account, connectWallet, disconnectWallet } = useBlockchain();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <header className="relative z-50 bg-volcanic-50/90 backdrop-blur-lg border-b border-inferno-800/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-inferno-500 animate-flame-flicker" />
              <h1 className="text-2xl font-bold inferno-title text-inferno-500">hells products</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium">
                Home
              </a>
              <div className="relative group">
                <span className="text-volcanic-600 hover:text-inferno-500 transition-colors font-medium cursor-pointer">
                  Shop
                </span>
                {/* Dropdown for categories */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-volcanic-100 border border-inferno-800/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <a href="/category/ebooks" className="block px-4 py-2 text-volcanic-600 hover:text-inferno-500 hover:bg-volcanic-200">E-Books</a>
                  <a href="/category/software" className="block px-4 py-2 text-volcanic-600 hover:text-inferno-500 hover:bg-volcanic-200">Software</a>
                  <a href="/category/music" className="block px-4 py-2 text-volcanic-600 hover:text-inferno-500 hover:bg-volcanic-200">Musik</a>
                  <a href="/category/videos" className="block px-4 py-2 text-volcanic-600 hover:text-inferno-500 hover:bg-volcanic-200">Videos</a>
                  <a href="/category/graphics" className="block px-4 py-2 text-volcanic-600 hover:text-inferno-500 hover:bg-volcanic-200">Grafiken</a>
                  <a href="/category/misc" className="block px-4 py-2 text-volcanic-600 hover:text-inferno-500 hover:bg-volcanic-200">Sonstiges</a>
                </div>
              </div>
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
              
              {/* Blockchain Connection */}
              {isConnected ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={disconnectWallet}
                  className="border-green-500/30 text-green-600 hover:bg-green-500 hover:text-white"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {formatAddress(account!)}
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={connectWallet}
                  className="border-inferno-500/30 text-inferno-500 hover:bg-inferno-500 hover:text-white"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </Button>
              )}

              <Button variant="outline" size="sm" className="border-inferno-500/30 text-inferno-500 hover:bg-inferno-500 hover:text-white">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              
              <Button 
                size="sm" 
                className="lava-button text-white relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Warenkorb
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-inferno-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-inferno-500 hover:bg-inferno-500/10 rounded">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-inferno-800/30">
              <nav className="flex flex-col space-y-4">
                <a href="/" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                  Home
                </a>
                <a href="/category/ebooks" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                  E-Books
                </a>
                <a href="/category/software" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                  Software
                </a>
                <a href="#support" className="text-volcanic-600 hover:text-inferno-500 transition-colors">
                  Support
                </a>
                <div className="flex items-center space-x-2 pt-4">
                  {isConnected ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={disconnectWallet}
                      className="border-green-500/30 text-green-600"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      {formatAddress(account!)}
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={connectWallet}
                      className="border-inferno-500/30 text-inferno-500"
                    >
                      <Wallet className="h-4 w-4 mr-2" />
                      Wallet
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    className="lava-button text-white relative"
                    onClick={() => setIsCartOpen(true)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Warenkorb
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-inferno-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
