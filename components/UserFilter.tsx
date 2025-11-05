
import React, { useState } from 'react';
import { User } from '../types';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

interface UserFilterProps {
  users: User[];
  selectedUsers: string[];
  onChange: (selected: string[]) => void;
}

export default function UserFilter({ users, selectedUsers, onChange }: UserFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleUser = (userId: string) => {
    const newSelection = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];
    onChange(newSelection);
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full sm:w-56 justify-between">
        <span>
          {selectedUsers.length === 0
            ? 'Todos los usuarios'
            : selectedUsers.length === 1
            ? users.find(u => u.id === selectedUsers[0])?.name
            : `${selectedUsers.length} usuarios seleccionados`}
        </span>
        <Icon name="chevron-down" className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>
      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full sm:w-56 bg-popover border rounded-md shadow-lg">
          <ul className="p-2 max-h-60 overflow-y-auto">
            {users.map(user => (
              <li
                key={user.id}
                className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => toggleUser(user.id)}
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  readOnly
                  className="mr-2 h-4 w-4 accent-primary"
                />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
