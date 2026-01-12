import { ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

export interface ErrorCardProps {
  title: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function ErrorCard({
  title,
  message,
  icon,
  action,
  children,
  className,
}: ErrorCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-900/30 backdrop-blur-sm border border-red-500/50 bg-red-950/20 rounded-xl p-6",
        "animate-in fade-in slide-in-from-top-4 duration-300",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 text-red-400">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold mb-2 text-gray-100">
            {title}
          </h3>
          {message && (
            <p className="text-sm text-gray-300 leading-relaxed">{message}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
          {action && <div className="mt-4">{action}</div>}
        </div>
      </div>
    </div>
  );
}
