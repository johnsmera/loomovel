"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/tailwind_utils";

type SidebarNavItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export function SidebarNavItem({
  href,
  icon: Icon,
  label,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-center",
        "w-12 h-12 rounded-lg",
        "transition-all duration-300 ease-out",
        "relative",
        "hover:bg-white/10",
        isActive
          ? "bg-primary text-white shadow-[0_0_16px_rgba(59,130,246,0.6),0_0_32px_rgba(59,130,246,0.3)]"
          : "text-light/70 hover:text-light"
      )}
      title={label}
    >
      <Icon className="w-5 h-5 relative z-10" />
      {isActive && (
        <>
          <span className="absolute inset-0 rounded-lg bg-primary opacity-30 blur-xl -z-10" />
          <span className="absolute inset-0 rounded-lg bg-blue-400 opacity-20 blur-2xl -z-10" />
        </>
      )}
    </Link>
  );
}
