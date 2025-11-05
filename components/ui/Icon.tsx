
import React from 'react';
import { cn } from '../../lib/utils';

export type IconName =
  | 'logo'
  | 'star'
  | 'plus'
  | 'shopping-cart'
  | 'minus'
  | 'trash'
  | 'chevron-down'
  | 'x-circle'
  | 'loader'
  | 'dollar'
  | 'calendar'
  | 'bar-chart';

// FIX: Changed interface with extends to a type with intersection to solve type resolution issues.
// This ensures that SVG props like `className` are correctly included in the component's props.
export type IconProps = {
  name: IconName;
} & React.SVGProps<SVGSVGElement>;

export const Icon = ({ name, className, ...props }: IconProps) => {
  const commonProps = {
    className: cn('h-full w-full', className),
    ...props,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case 'logo':
      return (
        <svg {...commonProps}><path d="M17.5 19H9a7 7 0 1 1 6.32-10.95l.4-1.95A9 9 0 1 0 9 21h8.5a4.5 4.5 0 1 0 0-9h-5"></path></svg>
      );
    case 'star':
      return (
        <svg {...commonProps}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      );
    case 'plus':
      return (
        <svg {...commonProps}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      );
    case 'shopping-cart':
      return (
        <svg {...commonProps}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      );
    case 'minus':
      return (
        <svg {...commonProps}><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      );
    case 'trash':
      return (
        <svg {...commonProps}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      );
    case 'chevron-down':
        return (
            <svg {...commonProps}><path d="m6 9 6 6 6-6" /></svg>
        )
    case 'x-circle':
        return (
            <svg {...commonProps}><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
        )
    case 'loader':
        return (
            <svg {...commonProps}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        )
    case 'dollar':
        return (
            <svg {...commonProps}><line x1="12" y1="2" x2="12" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        )
    case 'calendar':
        return (
            <svg {...commonProps}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        )
    case 'bar-chart':
        return (
            <svg {...commonProps}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
        )
    default:
      return null;
  }
};
