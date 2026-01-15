import { SidebarNav } from "./SidebarNav";
import { SidebarUser } from "./SidebarUser";
import { SidebarLogo } from "./SidebarLogo";
import { getUsernameAction } from "@/app/actions/auth/get-username-action";

export async function Sidebar() {
  const username = await getUsernameAction();

  return (
    <aside className="fixed left-0 top-0 flex flex-col h-screen w-20 bg-sidebar rounded-tr-3xl z-50 shadow-[4px_0_16px_rgba(0,0,0,0.3)]">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 pt-4">
        <SidebarLogo />
      </div>

      {/* Navigation - Centralizado verticalmente, um pouco acima */}
      <div className="flex-1 flex items-center justify-center -translate-y-8">
        <SidebarNav />
      </div>

      {/* User Avatar */}
      <div className="flex items-center justify-center h-20 pb-4 border-t border-white/10">
        <SidebarUser username={username} />
      </div>
    </aside>
  );
}
