import { SidebarNav } from "./SidebarNav";
import { SidebarUser } from "./SidebarUser";
import { SidebarLogo } from "./SidebarLogo";

export function Sidebar() {
  return (
    <aside className="flex flex-col h-screen w-20 bg-dark-1000 border-r border-white/10">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-white/10">
        <SidebarLogo />
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col">
        <SidebarNav />
      </div>

      {/* User Avatar */}
      <div className="flex items-center justify-center h-20 border-t border-white/10">
        <SidebarUser />
      </div>
    </aside>
  );
}
