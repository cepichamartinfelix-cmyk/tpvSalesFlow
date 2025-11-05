
import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { cn } from '../lib/utils';

interface HourFilterProps {
  selectedHours: number[];
  onChange: (selected: number[]) => void;
}

export default function HourFilter({ selectedHours, onChange }: HourFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hours = Array.from({ length: 13 }, (_, i) => 7 + i); // 7 to 19

  const toggleHour = (hour: number) => {
    const newSelection = selectedHours.includes(hour)
      ? selectedHours.filter(h => h !== hour)
      : [...selectedHours, hour];
    onChange(newSelection);
  };

  return (
    <div className="relative">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="w-full sm:w-56 justify-between">
        <span>
          {selectedHours.length === 0
            ? 'Todas las horas'
            : selectedHours.length === 1
            ? `${selectedHours[0]}:00`
            : `${selectedHours.length} horas seleccionadas`}
        </span>
        <Icon name="chevron-down" className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </Button>
      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full sm:w-56 bg-popover border rounded-md shadow-lg">
          <ul className="p-2 max-h-60 overflow-y-auto">
            {hours.map(hour => (
              <li
                key={hour}
                className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => toggleHour(hour)}
              >
                <input
                  type="checkbox"
                  checked={selectedHours.includes(hour)}
                  readOnly
                  className="mr-2 h-4 w-4 accent-primary"
                />
                <span>{`${hour}:00`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
