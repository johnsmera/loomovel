import { cn } from "@/app/lib/tailwind_utils";

type LogoProps = {
  text?: string;
  className?: string;
};

export function Logo({
  text = "Nortus",
  className,
}: LogoProps) {
  return (
    <h1 className={cn("text-4xl font-bold text-blue-400", className)}>
      {text}
    </h1>
  );
}
