
export interface User {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name:string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  sellHour: number;
}

export enum TicketStatus {
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Ticket {
  id: string;
  user: User;
  date: Date;
  items: {
    product: Product;
    quantity: number;
    sellHour: number;
  }[];
  total: number;
  status: TicketStatus;
}
