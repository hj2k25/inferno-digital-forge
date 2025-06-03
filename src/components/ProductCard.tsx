
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Eye, Bitcoin } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useBlockchain } from '@/hooks/useBlockchain';

interface Product {
  id: number;
  title: string;
  price: number;
  cryptoPrice: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { isConnected, connectWallet } = useBlockchain();

  const handleAddToCart = () => {
    addToCart(product);
    console.log(`Added ${product.title} to cart`);
  };

  const handleCryptoPurchase = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    console.log(`Initiating crypto purchase for ${product.title}`);
  };

  if (viewMode === 'list') {
    return (
      <Card className="volcanic-texture border-inferno-800/30 bg-volcanic-100/50 backdrop-blur-sm hover:bg-inferno-500/5 transition-all">
        <div className="flex">
          <div className="w-32 h-32 flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-volcanic-700 mb-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xl font-bold text-inferno-600">
                    €{product.price}
                  </span>
                  <span className="text-sm text-volcanic-600 flex items-center">
                    <Bitcoin className="h-3 w-3 mr-1" />
                    {product.cryptoPrice}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  In Warenkorb
                </Button>
                <Button 
                  size="sm" 
                  className="lava-button text-white"
                  onClick={handleCryptoPurchase}
                >
                  <Bitcoin className="h-4 w-4 mr-2" />
                  Crypto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 volcanic-texture border-inferno-800/30 bg-volcanic-100/50 backdrop-blur-sm hover:bg-inferno-500/10">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-volcanic-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <CardTitle className="text-lg font-bold text-volcanic-700 group-hover:text-inferno-500 transition-colors mb-3">
          {product.title}
        </CardTitle>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-inferno-600">
            €{product.price}
          </span>
          <span className="text-sm text-volcanic-600 flex items-center">
            <Bitcoin className="h-3 w-3 mr-1" />
            {product.cryptoPrice}
          </span>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Warenkorb
          </Button>
          <Button 
            size="sm" 
            className="lava-button text-white"
            onClick={handleCryptoPurchase}
          >
            <Bitcoin className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
