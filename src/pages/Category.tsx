
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  // Mock products data - in real app this would come from blockchain/API
  const categoryData = {
    'ebooks': {
      title: 'Verfluchte E-Books',
      description: 'Dunkle Literatur aus den Tiefen des Wissens',
      products: [
        { id: 1, title: 'Das Buch der Schatten', price: 19.99, cryptoPrice: '0.001 BTC', image: '/lovable-uploads/31f0803c-706f-4424-8df0-4a511674eeba.png' },
        { id: 2, title: 'Höllenpoesie', price: 15.99, cryptoPrice: '0.0008 BTC', image: '/lovable-uploads/f62ca559-4768-440a-964b-cd9ca4364f57.png' },
        { id: 3, title: 'Infernale Geheimnisse', price: 24.99, cryptoPrice: '0.0012 BTC', image: '/lovable-uploads/345119e5-c5ee-4a85-b0c1-4bdf4c35af0a.png' }
      ]
    },
    'software': {
      title: 'Höllische Software',
      description: 'Mächtige Tools für die digitale Unterwelt',
      products: [
        { id: 4, title: 'Daemon Toolkit', price: 49.99, cryptoPrice: '0.0025 BTC', image: '/lovable-uploads/c00a8631-95e8-4006-a1f8-7c90e36434e6.png' },
        { id: 5, title: 'Inferno IDE', price: 79.99, cryptoPrice: '0.004 BTC', image: '/lovable-uploads/34e5d3d8-8381-44f4-8e75-66ce84cc582f.png' }
      ]
    }
  };

  const currentCategory = categoryData[categoryId as keyof typeof categoryData];

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-volcanic-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-inferno-500 mb-4">Kategorie nicht gefunden</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-volcanic-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-inferno-500 hover:text-inferno-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Shop
          </Button>
        </div>

        {/* Category Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-inferno-500 inferno-title mb-4">
            {currentCategory.title}
          </h1>
          <p className="text-lg text-volcanic-600 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-volcanic-100 border border-inferno-800/30 rounded px-3 py-2 text-volcanic-700"
            >
              <option value="name">Nach Name</option>
              <option value="price">Nach Preis</option>
              <option value="newest">Neueste zuerst</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {currentCategory.products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              viewMode={viewMode}
            />
          ))}
        </div>

        {currentCategory.products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-volcanic-600 text-lg">
              Noch keine Produkte in dieser Kategorie verfügbar.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
