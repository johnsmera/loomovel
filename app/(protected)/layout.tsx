import { Sidebar } from "@/app/components/dash/sidebar/Sidebar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-dark-1000">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="ml-20 min-h-screen overflow-y-auto px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
