import Image from "next/image";

export function SidebarLogo() {
  return (
    <div className="w-10 h-10 flex items-center justify-center">
      <Image
        src="/logo-dash.png"
        alt="Logo"
        width={32}
        height={32}
        className="w-8 h-8"
        priority
      />
    </div>
  );
}
