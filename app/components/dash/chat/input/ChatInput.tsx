"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";

type ChatInputProps = {
  onSend?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function ChatInput({
  onSend,
  placeholder = "Escreva aqui...",
  disabled = false,
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full bg-white/5 backdrop-blur-sm",
            "border border-white/10 rounded-full",
            "px-6 py-4 pr-14",
            "text-sm text-light placeholder:text-light/40",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className={cn(
            "absolute right-2",
            "w-10 h-10 rounded-full",
            "bg-primary flex items-center justify-center",
            "text-white",
            "transition-all duration-200",
            "hover:bg-primary/90 hover:scale-105",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "shadow-lg shadow-primary/30"
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
