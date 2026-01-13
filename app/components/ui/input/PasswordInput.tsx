import { type InputHTMLAttributes } from "react";
import { InputField } from "./InputField";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & {
  id: string;
  label: string;
  value?: string;
  error?: string;
  showPassword?: boolean;
  onToggleShowPassword?: () => void;
  className?: string;
};

const eyeIconBase = "text-light/50 hover:text-light transition-colors";

function EyeOpenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={eyeIconBase}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={eyeIconBase}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function TogglePasswordButton({
  showPassword,
  onClick,
}: {
  showPassword: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
    >
      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
    </button>
  );
}

export function PasswordInput({
  id,
  label,
  value = "",
  error,
  showPassword = false,
  onToggleShowPassword,
  className,
  ...props
}: PasswordInputProps) {
  return (
    <InputField
      id={id}
      label={label}
      value={value}
      error={error}
      type={showPassword ? "text" : "password"}
      rightElement={
        <TogglePasswordButton showPassword={showPassword} onClick={onToggleShowPassword} />
      }
      className={className}
      {...props}
    />
  );
}
