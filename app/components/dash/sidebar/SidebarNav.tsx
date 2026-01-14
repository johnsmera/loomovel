"use client";

import {
  LineChart,
  Building2,
  MessageSquare,
  User,
  Calendar,
} from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";

type NavItem = {
  href: string;
  icon: typeof LineChart;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/dash", icon: LineChart, label: "Dashboard" },
  { href: "/dash/lojas", icon: Building2, label: "Lojas" },
  { href: "/dash/chat", icon: MessageSquare, label: "Chat" },
  { href: "/dash/perfil", icon: User, label: "Perfil" },
  { href: "/dash/calendario", icon: Calendar, label: "Calendário" },
];

export function SidebarNav() {
  return (
    <nav className="flex flex-col items-center gap-2 py-4">
      {navItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </nav>
  );
}
