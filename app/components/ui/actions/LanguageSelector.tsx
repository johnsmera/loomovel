import { IconButton } from "../button/IconButton";

type Language = {
  code: string;
  label: string;
  flag?: string;
};

type LanguageSelectorProps = {
  currentLanguage?: Language;
  className?: string;
};

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const DEFAULT_LANGUAGE: Language = {
  code: "pt-br",
  label: "PT-br",
  flag: "🇧🇷",
};

export function LanguageSelector({
  currentLanguage = DEFAULT_LANGUAGE,
  className,
}: LanguageSelectorProps) {
  return (
    <IconButton variant="filled" size="md" className={className}>
      <span className="flex items-center gap-1.5">
        <ChevronDownIcon />
        {currentLanguage.flag && (
          <span className="text-base leading-none">{currentLanguage.flag}</span>
        )}
        <span>{currentLanguage.label}</span>
      </span>
    </IconButton>
  );
}
