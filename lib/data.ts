
import { Product, Category, User, Ticket, TicketStatus } from '../types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice' },
  { id: 'user-2', name: 'Bob' },
  { id: 'user-3', name: 'Charlie' },
];

export const categories: Category[] = [
  { id: 'coffee', name: 'Café' },
  { id: 'bakery', name: 'Panadería' },
  { id: 'drinks', name: 'Bebidas' },
];

export const products: Product[] = [
  // Café
  { id: 'p-1', name: 'Espresso', price: 2.50, category: 'coffee', imageUrl: 'https://picsum.photos/id/225/400/300' },
  { id: 'p-2', name: 'Latte', price: 3.50, category: 'coffee', imageUrl: 'https://picsum.photos/id/30/400/300' },
  { id: 'p-3', name: 'Cappuccino', price: 3.50, category: 'coffee', imageUrl: 'https://picsum.photos/id/320/400/300' },
  { id: 'p-4', name: 'Americano', price: 3.00, category: 'coffee', imageUrl: 'https://picsum.photos/id/431/400/300' },
  { id: 'p-5', name: 'Mocha', price: 4.00, category: 'coffee', imageUrl: 'https://picsum.photos/id/454/400/300' },
  
  // Panadería
  { id: 'p-6', name: 'Croissant', price: 2.75, category: 'bakery', imageUrl: 'https://picsum.photos/id/368/400/300' },
  { id: 'p-7', name: 'Muffin de Arándanos', price: 2.50, category: 'bakery', imageUrl: 'https://picsum.photos/id/102/400/300' },
  { id: 'p-8', name: 'Pastel de Chocolate', price: 4.50, category: 'bakery', imageUrl: 'https://picsum.photos/id/103/400/300' },
  { id: 'p-9', name: 'Dona Glaseada', price: 1.50, category: 'bakery', imageUrl: 'https://picsum.photos/id/1074/400/300' },
  { id: 'p-10', name: 'Baguette', price: 3.00, category: 'bakery', imageUrl: 'https://picsum.photos/id/658/400/300' },

  // Bebidas
  { id: 'p-11', name: 'Jugo de Naranja', price: 3.00, category: 'drinks', imageUrl: 'https://picsum.photos/id/1050/400/300' },
  { id: 'p-12', name: 'Té Helado', price: 2.50, category: 'drinks', imageUrl: 'https://picsum.photos/id/129/400/300' },
  { id: 'p-13', name: 'Agua Embotellada', price: 1.50, category: 'drinks', imageUrl: 'https://picsum.photos/id/357/400/300' },
  { id: 'p-14', name: 'Limonada Fresca', price: 3.25, category: 'drinks', imageUrl: 'https://picsum.photos/id/379/400/300' },
  { id: 'p-15', name: 'Smoothie de Frutas', price: 4.50, category: 'drinks', imageUrl: 'https://picsum.photos/id/1080/400/300' },
];

const generateRandomTicket = (index: number): Ticket => {
  const numItems = Math.floor(Math.random() * 3) + 1;
  const items = [];
  let total = 0;

  for (let i = 0; i < numItems; i++) {
    const product = products[Math.floor(Math.random() * products.length)];
    const quantity = Math.floor(Math.random() * 2) + 1;
    items.push({
      product,
      quantity,
      sellHour: Math.floor(Math.random() * 12) + 7,
    });
    total += product.price * quantity;
  }

  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // tickets from the last 30 days

  return {
    id: `T${(index + 1).toString().padStart(4, '0')}`,
    user: users[Math.floor(Math.random() * users.length)],
    date: date,
    items,
    total,
    status: Math.random() > 0.1 ? TicketStatus.COMPLETED : TicketStatus.CANCELLED,
  };
};

export const initialTickets: Ticket[] = Array.from({ length: 50 }, (_, i) => generateRandomTicket(i));
