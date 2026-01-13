import { cn } from "@/app/lib/tailwind_utils";

type LoginHeaderProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export function LoginHeader({
  title = "Login",
  subtitle = "Entre com suas credenciais para acessar a sua conta.",
  className,
}: LoginHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-2", className)}>
      <h2 className="text-2xl font-semibold text-light">{title}</h2>
      <p className="text-light/60 text-sm">{subtitle}</p>
    </header>
  );
}
