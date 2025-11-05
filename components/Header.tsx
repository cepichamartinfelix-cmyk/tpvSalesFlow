
import React from 'react';
import { cn } from '../lib/utils';
import { Icon } from './ui/Icon';

interface HeaderProps {
  currentView: 'pos' | 'dashboard';
  setView: (view: 'pos' | 'dashboard') => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  const navLinkClasses = "transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="mr-4 flex items-center">
            <Icon name="logo" className="h-6 w-6 mr-2 text-primary"/>
            <span className="font-bold font-serif text-lg">SalesFlow</span>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <button 
            onClick={() => setView('pos')} 
            className={cn(navLinkClasses, currentView === 'pos' ? 'text-primary' : 'text-muted-foreground')}
          >
            Punto de Venta
          </button>
          <button 
            onClick={() => setView('dashboard')} 
            className={cn(navLinkClasses, currentView === 'dashboard' ? 'text-primary' : 'text-muted-foreground')}
          >
            Dashboard
          </button>
        </nav>
      </div>
    </header>
  );
}
