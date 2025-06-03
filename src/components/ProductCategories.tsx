
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Code, Music, Video, Image, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCategories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 'ebooks',
      title: 'Verfluchte E-Books',
      description: 'Dunkle Literatur aus den Tiefen des Wissens',
      icon: Book,
      count: '156 Bücher'
    },
    {
      id: 'software',
      title: 'Höllische Software',
      description: 'Mächtige Tools für die digitale Unterwelt',
      icon: Code,
      count: '89 Programme'
    },
    {
      id: 'music',
      title: 'Infernale Klänge',
      description: 'Musik, die in den Flammen geboren wurde',
      icon: Music,
      count: '234 Tracks'
    },
    {
      id: 'videos',
      title: 'Dämonische Videos',
      description: 'Visuelle Meisterwerke aus der Finsternis',
      icon: Video,
      count: '67 Videos'
    },
    {
      id: 'graphics',
      title: 'Feurige Grafiken',
      description: 'Assets, die in der Glut erschaffen wurden',
      icon: Image,
      count: '312 Assets'
    },
    {
      id: 'misc',
      title: 'Sonstige Schätze',
      description: 'Geheimnisvolle digitale Artefakte',
      icon: Package,
      count: '45 Items'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <section className="py-16 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-inferno-500 inferno-title mb-4">
            Kategorien der Verdammnis
          </h2>
          <p className="text-lg text-volcanic-600 max-w-2xl mx-auto">
            Durchstöbere unsere Sammlungen digitaler Güter aus den verschiedenen Kreisen der Hölle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 volcanic-texture border-inferno-800/30 bg-volcanic-100/50 backdrop-blur-sm hover:bg-inferno-500/10"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-inferno-500/20 group-hover:bg-inferno-500/30 transition-colors">
                    <Icon className="h-8 w-8 text-inferno-500" />
                  </div>
                  <CardTitle className="text-xl font-bold text-volcanic-700 group-hover:text-inferno-500 transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-volcanic-600">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <span className="text-sm font-medium text-inferno-600 bg-inferno-500/10 px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
