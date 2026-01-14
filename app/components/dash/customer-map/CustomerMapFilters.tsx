"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";

type CustomerMapFiltersProps = {
  locations: string[];
  secureTypes: string[];
  selectedLocation: string;
  selectedSecureType: string;
  onLocationChange: (location: string) => void;
  onSecureTypeChange: (secureType: string) => void;
  className?: string;
};

export function CustomerMapFilters({
  locations,
  secureTypes,
  selectedLocation,
  selectedSecureType,
  onLocationChange,
  onSecureTypeChange,
  className,
}: CustomerMapFiltersProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className={cn(
            "appearance-none",
            "px-4 py-2 pr-10 rounded-lg",
            "bg-dark-1000 border border-white/20",
            "text-light text-sm font-medium",
            "transition-all duration-200 ease-out",
            "hover:bg-white/5 hover:border-white/30",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "cursor-pointer",
            "shadow-sm"
          )}
        >
          {locations.map((location) => (
            <option key={location} value={location} className="bg-dark-1000">
              {location}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light/70 pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={selectedSecureType}
          onChange={(e) => onSecureTypeChange(e.target.value)}
          className={cn(
            "appearance-none",
            "px-4 py-2 pr-10 rounded-lg",
            "bg-dark-1000 border border-white/20",
            "text-light text-sm font-medium",
            "transition-all duration-200 ease-out",
            "hover:bg-white/5 hover:border-white/30",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "cursor-pointer",
            "shadow-sm"
          )}
        >
          {secureTypes.map((type) => (
            <option key={type} value={type} className="bg-dark-1000">
              {type}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light/70 pointer-events-none" />
      </div>
    </div>
  );
}
