"use client";

import {
  LineChart,
  MessageSquare,
  Ticket,
  Calculator,
} from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";

type NavItem = {
  href: string;
  icon: typeof LineChart;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/dash", icon: LineChart, label: "Dashboard" },
  { href: "/tickets", icon: Ticket, label: "Tickets" },
  { href: "/chat", icon: MessageSquare, label: "Chat" },
  { href: "/simulator", icon: Calculator, label: "Simulador" },
];

export function SidebarNav() {
  return (
    <nav className="flex flex-col items-center gap-6">
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
