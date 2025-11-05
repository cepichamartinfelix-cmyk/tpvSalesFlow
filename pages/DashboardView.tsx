
import React, { useState, useMemo } from 'react';
import { Ticket, TicketStatus, User } from '../types';
import { users } from '../lib/data';
import KpiCard from '../components/KpiCard';
import UserFilter from '../components/UserFilter';
import HourFilter from '../components/HourFilter';
import SalesTable from '../components/SalesTable';
import { Icon } from '../components/ui/Icon';

interface DashboardViewProps {
  tickets: Ticket[];
  onCancelTicket: (ticketId: string) => void;
}

const getStartOf = (unit: 'day' | 'week' | 'month', date: Date): Date => {
  const d = new Date(date);
  if (unit === 'day') {
    d.setHours(0, 0, 0, 0);
  } else if (unit === 'week') {
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
  } else if (unit === 'month') {
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
  }
  return d;
};


export default function DashboardView({ tickets, onCancelTicket }: DashboardViewProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<number[]>([]);

  const completedTickets = useMemo(() => tickets.filter(t => t.status === TicketStatus.COMPLETED), [tickets]);

  const kpiData = useMemo(() => {
    const now = new Date();
    const startOfDay = getStartOf('day', now);
    const startOfWeek = getStartOf('week', now);
    const startOfMonth = getStartOf('month', now);

    return completedTickets.reduce((acc, ticket) => {
      const ticketDate = new Date(ticket.date);
      if (ticketDate >= startOfDay) acc.day += ticket.total;
      if (ticketDate >= startOfWeek) acc.week += ticket.total;
      if (ticketDate >= startOfMonth) acc.month += ticket.total;
      return acc;
    }, { day: 0, week: 0, month: 0 });
  }, [completedTickets]);
  
  const filteredTickets = useMemo(() => {
    const today = new Date();
    const startOfToday = getStartOf('day', today);

    return tickets
      .filter(ticket => new Date(ticket.date) >= startOfToday)
      .filter(ticket => selectedUsers.length === 0 || selectedUsers.includes(ticket.user.id))
      .filter(ticket => {
        if (selectedHours.length === 0) return true;
        return ticket.items.some(item => selectedHours.includes(item.sellHour));
      });
  }, [tickets, selectedUsers, selectedHours]);

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-6 text-primary">Dashboard de Ventas</h1>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <KpiCard title="Ganancias de Hoy" value={kpiData.day} icon="dollar" />
        <KpiCard title="Ganancias de la Semana" value={kpiData.week} icon="calendar" />
        <KpiCard title="Ganancias del Mes" value={kpiData.month} icon="bar-chart" />
      </div>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <UserFilter users={users} selectedUsers={selectedUsers} onChange={setSelectedUsers} />
          <HourFilter selectedHours={selectedHours} onChange={setSelectedHours} />
        </div>
        <SalesTable tickets={filteredTickets} onCancelTicket={onCancelTicket} />
      </div>
    </div>
  );
}
