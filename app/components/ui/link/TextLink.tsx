import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";
import Link from "next/link";

type TextLinkProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

export function TextLink({
  children,
  href = "#",
  className,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-primary text-sm font-medium",
        "hover:text-primary/80 hover:underline",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:rounded",
        className
      )}
    >
      {children}
    </Link>
  );
}
