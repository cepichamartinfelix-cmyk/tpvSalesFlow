
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { categories, products as allProducts } from '../lib/data';
import { Product, Category } from '../types';
import { highlightPromotionalProduct } from '../services/geminiService';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { Icon } from '../components/ui/Icon';

interface PosViewProps {
  onGenerateTicket: (ticketData: { items: { product: Product; quantity: number; sellHour: number }[]; total: number; }) => void;
}

const MemoizedProductCard = React.memo(ProductCard);

export default function PosView({ onGenerateTicket }: PosViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [promotionalInfo, setPromotionalInfo] = useState<{ [categoryId: string]: { productId: string, reason: string } }>({});
  const [isLoadingPromo, setIsLoadingPromo] = useState(false);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => p.category === activeCategory);
  }, [activeCategory]);
  
  const fetchPromotionalProduct = useCallback(async (category: Category, products: Product[]) => {
    if (promotionalInfo[category.id] || products.length === 0) return;

    setIsLoadingPromo(true);
    try {
      const promo = await highlightPromotionalProduct(products, category.name);
      if (promo) {
        setPromotionalInfo(prev => ({ ...prev, [category.id]: promo }));
      }
    } catch (error) {
      console.error('Failed to fetch promotional product', error);
    } finally {
      setIsLoadingPromo(false);
    }
  }, [promotionalInfo]);


  useEffect(() => {
    const currentCategory = categories.find(c => c.id === activeCategory);
    if (currentCategory) {
      fetchPromotionalProduct(currentCategory, filteredProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, filteredProducts]);
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="font-serif text-4xl font-bold mb-6 text-primary">Catálogo de Productos</h1>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {isLoadingPromo && <div className="col-span-full text-center p-8 text-muted-foreground">
                  <Icon name="loader" className="animate-spin h-8 w-8 mx-auto" />
                  <p>Buscando la mejor oferta para ti...</p>
                </div>}
                {!isLoadingPromo && filteredProducts.map(product => (
                  <MemoizedProductCard 
                    key={product.id} 
                    product={product} 
                    isPromotional={promotionalInfo[activeCategory]?.productId === product.id}
                    promotionalReason={promotionalInfo[activeCategory]?.reason}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div>
        <Cart onGenerateTicket={onGenerateTicket}/>
      </div>
    </div>
  );
}
