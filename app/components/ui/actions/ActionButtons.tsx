import { cn } from "@/app/lib/tailwind_utils";
import { HelpButton } from "./HelpButton";
import { LanguageSelector } from "./LanguageSelector";

type Language = {
  code: string;
  label: string;
  flag?: string;
};

type ActionButtonsProps = {
  helpLabel?: string;
  currentLanguage?: Language;
  className?: string;
};

export function ActionButtons({
  helpLabel = "Ajuda",
  currentLanguage,
  className,
}: ActionButtonsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-4 py-3 rounded-2xl",
        "bg-dark-900/90 backdrop-blur-sm",
        className
      )}
    >
      <HelpButton label={helpLabel} />
      <LanguageSelector currentLanguage={currentLanguage} />
    </div>
  );
}
