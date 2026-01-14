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
        "transition-all duration-200 ease-out",
        "hover:bg-white/10",
        isActive
          ? "bg-primary text-white"
          : "text-light/70 hover:text-light"
      )}
      title={label}
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
