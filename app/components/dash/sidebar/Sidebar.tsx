import { SidebarNav } from "./SidebarNav";
import { SidebarUser } from "./SidebarUser";
import { SidebarLogo } from "./SidebarLogo";

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex flex-col h-screen w-20 bg-sidebar rounded-tr-3xl z-50 shadow-[4px_0_16px_rgba(0,0,0,0.3)]">
      {/* Logo */}
      <div className="flex items-center justify-center h-16">
        <SidebarLogo />
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col py-4">
        <SidebarNav />
      </div>

      {/* User Avatar */}
      <div className="flex items-center justify-center h-16 border-t border-white/10">
        <SidebarUser />
      </div>
    </aside>
  );
}
