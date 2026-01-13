import { cn } from "@/app/lib/tailwind_utils";

type InputErrorProps = {
  message?: string;
  visible?: boolean;
  className?: string;
};

export function InputError({
  message,
  visible = false,
  className,
}: InputErrorProps) {
  if (!visible || !message) return null;

  return (
    <span
      className={cn(
        "text-error text-xs mt-1 block",
        "animate-in fade-in slide-in-from-top-1 duration-200",
        className
      )}
    >
      {message}
    </span>
  );
}
