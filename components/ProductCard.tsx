
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useHasMounted } from '../hooks/useHasMounted';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Icon } from './ui/Icon';

interface ProductCardProps {
  product: Product;
  isPromotional?: boolean;
  promotionalReason?: string;
}

export default function ProductCard({ product, isPromotional = false, promotionalReason }: ProductCardProps) {
  const { addToCart } = useCart();
  const [sellHour, setSellHour] = useState(new Date().getHours());
  
  const hasMounted = useHasMounted();

  const isTimePassed = useMemo(() => {
    if (!hasMounted) return true; // Disable on server/initial render
    return new Date().getHours() > sellHour;
  }, [sellHour, hasMounted]);

  const handleAddToCart = () => {
    addToCart(product, sellHour);
  };

  const timeOptions = Array.from({ length: 13 }, (_, i) => 7 + i); // 7 AM to 7 PM

  return (
    <Card className={`flex flex-col transition-all duration-300 ${isPromotional ? 'border-primary shadow-lg ring-2 ring-primary/50' : ''}`}>
      <CardHeader className="p-0">
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-t-lg" />
         {isPromotional && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-md">
            OFERTA
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
        <p className="text-primary font-semibold text-xl mt-2">{formatCurrency(product.price)}</p>
         {isPromotional && promotionalReason && (
          <p className="text-sm text-primary/90 mt-2 italic flex items-center gap-1">
            <Icon name="star" className="h-4 w-4 text-yellow-500" /> {promotionalReason}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-3">
        <div>
          <label htmlFor={`time-select-${product.id}`} className="text-xs text-muted-foreground mb-1 block">Hora de venta</label>
          <Select value={String(sellHour)} onValueChange={(value) => setSellHour(Number(value))}>
            <SelectTrigger id={`time-select-${product.id}`} className="w-full">
              <SelectValue placeholder="Seleccionar hora" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map(hour => (
                <SelectItem key={hour} value={String(hour)}>{`${hour}:00`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddToCart} disabled={isTimePassed} className="w-full">
          <Icon name="plus" className="h-4 w-4 mr-2" />
          Añadir
        </Button>
        {isTimePassed && <p className="text-xs text-destructive text-center w-full">La hora de venta ha pasado.</p>}
      </CardFooter>
    </Card>
  );
}
