import { type ReactNode } from "react";
import { cn } from "@/app/lib/tailwind_utils";

type PageHeaderProps = {
  children: ReactNode;
  className?: string;
};

function PageHeaderComponent({ children, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 h-16 bg-sidebar z-40",
        "flex items-center justify-between",
        className
      )}
    >
      {children}
    </header>
  );
}

type PageHeaderTitleProps = {
  children: ReactNode;
  className?: string;
};

function PageHeaderTitle({ children, className }: PageHeaderTitleProps) {
  return (
    <div className="flex items-center">
      <div className="w-20 flex-shrink-0" />
      <div className={cn("flex items-center gap-3 px-8 lg:px-12", className)}>
        <h1 className="text-lg font-medium text-light">{children}</h1>
      </div>
    </div>
  );
}

type PageHeaderActionsProps = {
  children: ReactNode;
  className?: string;
};

function PageHeaderActions({ children, className }: PageHeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-4 px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export const PageHeader = Object.assign(PageHeaderComponent, {
  Title: PageHeaderTitle,
  Actions: PageHeaderActions,
});
