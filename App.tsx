
import React, { useState, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import { initialTickets, users } from './lib/data';
import { Ticket, TicketStatus } from './types';
import Header from './components/Header';
import PosView from './pages/PosView';
import DashboardView from './pages/DashboardView';

type View = 'pos' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('pos');
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const generateTicketAction = useCallback((newTicket: Omit<Ticket, 'id' | 'status' | 'date' | 'user'>) => {
    const ticket: Ticket = {
      ...newTicket,
      id: `T${(tickets.length + 1).toString().padStart(4, '0')}`,
      status: TicketStatus.COMPLETED,
      date: new Date(),
      user: users[Math.floor(Math.random() * users.length)], // Assign a random user
    };
    setTickets(prevTickets => [ticket, ...prevTickets]);
  }, [tickets.length]);

  const cancelTicketAction = useCallback((ticketId: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, status: TicketStatus.CANCELLED } : ticket
      )
    );
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 text-foreground">
        <Header currentView={view} setView={setView} />
        <main className="p-4 sm:p-6 md:p-8">
          {view === 'pos' && <PosView onGenerateTicket={generateTicketAction} />}
          {view === 'dashboard' && <DashboardView tickets={tickets} onCancelTicket={cancelTicketAction} />}
        </main>
      </div>
    </CartProvider>
  );
}
