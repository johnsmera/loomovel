import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";
import { CardHeader } from "./CardHeader";
import { CardTitle } from "./CardTitle";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function CardComponent({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "transition-all duration-200 ease-out",
        "hover:bg-white/10 hover:border-white/20",
        className
      )}
    >
      {children}
    </div>
  );
}

export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
});
