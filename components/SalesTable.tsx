
import React from 'react';
import { Ticket, TicketStatus } from '../types';
import { formatCurrency } from '../lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

interface SalesTableProps {
  tickets: Ticket[];
  onCancelTicket: (ticketId: string) => void;
}

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    }).format(date);
};

export default function SalesTable({ tickets, onCancelTicket }: SalesTableProps) {
  return (
    <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Ticket</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length > 0 ? (
                tickets.map(ticket => (
                <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.user.name}</TableCell>
                    <TableCell>{formatDate(new Date(ticket.date))}</TableCell>
                    <TableCell>
                    <Badge variant={ticket.status === TicketStatus.COMPLETED ? 'secondary' : 'destructive'}>
                        {ticket.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(ticket.total)}</TableCell>
                    <TableCell className="text-center">
                    {ticket.status === TicketStatus.COMPLETED && (
                        <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onCancelTicket(ticket.id)}
                        >
                            <Icon name="x-circle" className="h-4 w-4 mr-2"/>
                            Anular
                        </Button>
                    )}
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                        No hay ventas para mostrar con los filtros seleccionados.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}
