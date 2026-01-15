"use client";

import { useState, useEffect, useRef } from "react";
import { User, LogOut } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";
import { logoutAction } from "@/app/actions/auth/logout-action";
import { Button } from "@/app/components/ui/button/Button";

type SidebarUserProps = {
  username: string | null;
  className?: string;
};

function getFirstLetter(username: string | null): string | null {
  if (!username) return null;
  
  // Remove espaços e pega a primeira letra
  const trimmed = username.trim();
  if (trimmed.length === 0) return null;
  
  // Pega a primeira letra (pode ser de username ou email)
  const firstChar = trimmed[0].toUpperCase();
  
  // Verifica se é uma letra
  if (/[A-Za-z]/.test(firstChar)) {
    return firstChar;
  }
  
  return null;
}

export function SidebarUser({
  username,
  className,
}: SidebarUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const firstLetter = getFirstLetter(username);

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

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center",
          "w-12 h-12 rounded-full",
          "bg-primary text-white",
          "font-semibold text-sm",
          "transition-all duration-200 ease-out",
          "hover:bg-primary/90",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "cursor-pointer",
          className
        )}
        aria-label="Menu do usuário"
        aria-expanded={isOpen}
      >
        {firstLetter ? (
          firstLetter
        ) : (
          <User className="w-5 h-5" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-full bottom-0 mb-1 ml-2",
            "z-[100] min-w-[140px]",
            "bg-dark-900 border border-white/10 rounded-lg",
            "shadow-xl shadow-black/40",
            "overflow-hidden",
            "backdrop-blur-none",
            "animate-in fade-in slide-in-from-left-2 duration-150"
          )}
          style={{ backgroundColor: "rgb(17, 24, 39)" }}
        >
          <div className="py-1.5 px-1">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              onClick={handleLogout}
              disabled={isLoggingOut}
              loading={isLoggingOut}
              className="flex items-center justify-start gap-2 h-8 px-2 py-0 text-sm font-normal"
            >
              <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
