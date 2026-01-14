import { Sidebar } from "@/app/components/dash/sidebar/Sidebar";
import { Shield } from "lucide-react";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-dark-1000">
      {/* Header que se estende por toda a largura */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-sidebar z-40 flex items-center">
        {/* Espaço da sidebar */}
        <div className="w-20 flex-shrink-0" />
        {/* Título da página */}
        <div className="flex items-center gap-3 px-8">
          <Shield className="w-5 h-5 text-light/60" />
          <h1 className="text-lg font-medium text-light">Dashboard</h1>
        </div>
      </header>
      
      {/* Sidebar em cima do header */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="ml-20 pt-16 min-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
