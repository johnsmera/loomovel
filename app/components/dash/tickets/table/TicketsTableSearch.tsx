"use client";

import { Search } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";

type TicketsTableSearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function TicketsTableSearch({
  value,
  onChange,
  placeholder = "Buscar por ID, cliente ou assunto...",
  className,
}: TicketsTableSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-light/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-9 pr-3 py-1.5 rounded-full",
          "bg-dark-1000",
          "text-light text-sm placeholder:text-light/40",
          "focus:outline-none focus:ring-1 focus:ring-primary/30",
          "transition-all duration-200"
        )}
      />
    </div>
  );
}
