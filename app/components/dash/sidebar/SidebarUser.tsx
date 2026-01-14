import { cn } from "@/app/lib/tailwind_utils";

type SidebarUserProps = {
  initials?: string;
  className?: string;
};

export function SidebarUser({
  initials = "AC",
  className,
}: SidebarUserProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-primary text-white",
        "font-semibold text-sm",
        className
      )}
    >
      {initials}
    </div>
  );
}
