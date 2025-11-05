
import * as React from "react"
import { cn } from "../../lib/utils"
import { Icon } from "./Icon"

interface SelectContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    triggerRef: React.RefObject<HTMLButtonElement>;
    contentRef: React.RefObject<HTMLDivElement>;
    selectedLabel: string;
    setSelectedLabel: (label: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

const useSelectContext = () => {
    const context = React.useContext(SelectContext);
    if (!context) {
        throw new Error("useSelectContext must be used within a SelectProvider");
    }
    return context;
}

// FIX: Defined an explicit interface for Select props to improve type checking and fix the missing 'children' prop error.
interface SelectProps {
    children: React.ReactNode;
    value: string;
    onValueChange: (value: string) => void;
}

const Select = ({ children, value, onValueChange }: SelectProps) => {
    const [open, setOpen] = React.useState(false);
    const [selectedLabel, setSelectedLabel] = React.useState("");

    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                triggerRef.current && !triggerRef.current.contains(event.target as Node) &&
                contentRef.current && !contentRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <SelectContext.Provider value={{ open, setOpen, value, onValueChange, triggerRef, contentRef, selectedLabel, setSelectedLabel }}>
            <div className="relative">{children}</div>
        </SelectContext.Provider>
    )
}
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useSelectContext();
    return (
        <button
            ref={triggerRef}
            onClick={() => setOpen(!open)}
            className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
            <Icon name="chevron-down" className="h-4 w-4 opacity-50" />
        </button>
    )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
    const { open, contentRef } = useSelectContext();
    if (!open) return null;
    return (
        <div
            ref={contentRef}
            className={cn(
                "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 top-full mt-1 w-full",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(({ className, children, value, ...props }, ref) => {
    const { onValueChange, setOpen, setSelectedLabel, value: selectedValue } = useSelectContext();
    
    const isSelected = value === selectedValue;
    
    React.useEffect(() => {
        if(isSelected) {
            setSelectedLabel(typeof children === 'string' ? children : '');
        }
    }, [isSelected, children, setSelectedLabel]);

    const handleSelect = () => {
        onValueChange(value);
        setOpen(false);
    }
    return (
        <div
            ref={ref}
            onClick={handleSelect}
            className={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            {...props}
        >
            {isSelected && (
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Icon name="plus" className="h-4 w-4 rotate-45" />
                </span>
            )}
            {children}
        </div>
    )
})
SelectItem.displayName = "SelectItem"

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
    const { value, selectedLabel } = useSelectContext();
    const display = selectedLabel || placeholder;
    return <span>{display}</span>
}
SelectValue.displayName = "SelectValue"

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
