
import React from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency, cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Icon } from './ui/Icon';
import { Product, CartItem } from '../types';

interface CartProps {
  onGenerateTicket: (ticketData: { items: { product: Product; quantity: number; sellHour: number }[]; total: number; }) => void;
}

export default function Cart({ onGenerateTicket }: CartProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleGenerateSale = () => {
    const now = new Date();
    const currentHour = now.getHours();

    const invalidItems = cartItems.filter(item => item.sellHour < currentHour);

    if (invalidItems.length > 0) {
      alert(`Error: La hora de venta para "${invalidItems[0].product.name}" ya ha pasado.`);
      return;
    }

    if(cartItems.length > 0) {
        onGenerateTicket({ 
            items: cartItems.map(item => ({...item})), // create a copy
            total: cartTotal 
        });
        clearCart();
    }
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Carrito</span>
          <span className="text-sm font-normal bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center rounded-full">{cartItems.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("pr-2", cartItems.length > 5 ? "max-h-96 overflow-y-auto" : "")}>
        {cartItems.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Icon name="shopping-cart" className="h-12 w-12 mx-auto mb-2"/>
            <p>Tu carrito está vacío.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={`${item.product.id}-${item.sellHour}`} className="flex items-center gap-4">
                <img src={item.product.imageUrl} alt={item.product.name} className="h-16 w-16 rounded-md object-cover" />
                <div className="flex-grow">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(item.product.price)} @ {item.sellHour}:00</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                      <Icon name="minus" className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Icon name="plus" className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                        <Icon name="trash" className="h-4 w-4"/>
                    </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {cartItems.length > 0 && (
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <Button className="w-full" onClick={handleGenerateSale}>
            Generar Venta
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
