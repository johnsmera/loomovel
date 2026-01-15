"use client";

import { ChevronDown, Check, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/tailwind_utils";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  error?: string;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  variant?: "default" | "compact";
  disabled?: boolean;
};

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Selecione uma opção",
  className,
  triggerClassName,
  variant = "default",
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const hasValue = value.length > 0;
  const hasError = Boolean(error);
  const showSearch = options.length > 10;

  const selectedOption = options.find((opt) => opt.value === value);

  // Filtrar opções baseado na busca
  const filteredOptions = showSearch
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Resetar busca quando fechar o dropdown
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Focar no input de busca quando abrir
  useEffect(() => {
    if (isOpen && showSearch && searchInputRef.current) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, showSearch]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const isCompact = variant === "compact";

  return (
    <div className={cn("flex flex-col", className)} ref={containerRef}>
      <div className="relative">
        {/* Trigger Button */}
        <button
          id={id}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full text-left relative overflow-hidden",
            "flex items-center",
            !triggerClassName && "bg-transparent border rounded-xl",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            disabled && "opacity-50 cursor-not-allowed",
            !triggerClassName && (hasError
              ? "border-error"
              : isOpen
              ? "border-primary"
              : "border-light/20 hover:border-light/30"),
            !triggerClassName && (isCompact
              ? "py-1.5 px-3 text-sm"
              : hasValue
                ? "px-4 pt-[20px] pb-[4px]"
                : "py-3 px-4"),
            triggerClassName
          )}
        >
          {hasValue && !isCompact && !triggerClassName && label && (
            <span className="absolute left-4 top-1.5 text-xs text-light/60 z-10 leading-none">
              {label}
            </span>
          )}
          <span
            className={cn(
              triggerClassName 
                ? "pr-8 whitespace-nowrap overflow-hidden text-ellipsis leading-normal"
                : "inline-block pr-8 whitespace-nowrap overflow-hidden text-ellipsis",
              !triggerClassName && (
                isCompact 
                  ? "text-light text-sm" 
                  : hasValue 
                    ? "text-light text-sm leading-[1.15]" 
                    : "text-light/40"
              )
            )}
          >
            {selectedOption?.label || placeholder}
          </span>
          <div className={cn(
            "absolute top-1/2 -translate-y-1/2",
            isCompact ? "right-2.5" : "right-3"
          )}>
            <ChevronDown
              className={cn(
                "text-light/40 transition-transform duration-200 pointer-events-none",
                isOpen && "rotate-180",
                isCompact ? "w-3.5 h-3.5" : "w-4 h-4"
              )}
            />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-[100] w-full mt-1",
              "bg-dark-900 border border-white/15 rounded-xl",
              "shadow-2xl shadow-black/50",
              "overflow-hidden",
              "backdrop-blur-none",
              "animate-in fade-in slide-in-from-top-2 duration-150"
            )}
            style={{ backgroundColor: "rgb(17, 24, 39)" }}
          >
            {/* Search Input */}
            {showSearch && (
              <div className="p-2 border-b border-white/10 bg-dark-900">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light/40" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar..."
                    className={cn(
                      "w-full bg-dark-800/50 border border-white/10 rounded-lg",
                      "px-9 py-2 text-sm text-light placeholder-light/40",
                      "outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
                      "transition-all duration-200"
                    )}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setSearchQuery("");
                        e.stopPropagation();
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="py-1 max-h-60 overflow-y-auto bg-dark-900">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full px-3 py-2.5 text-left",
                        "flex items-center justify-between",
                        "transition-colors duration-150",
                        "bg-dark-900",
                        isSelected
                          ? "bg-primary/20 text-primary"
                          : "text-light/80 hover:bg-white/10 hover:text-light"
                      )}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="w-4 h-4" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-4 text-center text-light/50 text-sm">
                  Nenhum resultado encontrado
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
}
