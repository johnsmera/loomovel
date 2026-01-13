import { cn } from "@/app/lib/tailwind_utils";
import { Button } from "../../components/ui/button/Button";
import { ButtonSkeleton } from "../../components/ui/button/ButtonSkeleton";
import { CheckboxField } from "../../components/ui/checkbox/CheckboxField";
import { InputField } from "../../components/ui/input/InputField";
import { PasswordInput } from "../../components/ui/input/PasswordInput";
import { TextLink } from "../../components/ui/link/TextLink";
import { useLoginForm } from "./useLoginForm";
import { type LoginFormData } from "./loginSchema";

type LoginFormProps = {
  onSubmit?: (data: LoginFormData) => Promise<void> | void;
  className?: string;
};

export function LoginForm({ onSubmit, className }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    showPassword,
    toggleShowPassword,
    isPending,
  } = useLoginForm({ onSubmit });

  const usernameValue = watch("username");
  const passwordValue = watch("password");
  const rememberMeValue = watch("rememberMe");

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)}>
      <InputField
        id="username"
        label="Usuário*"
        value={usernameValue}
        error={errors.username?.message}
        hint="Insira o seu e-mail, CPF ou passaporte."
        autoComplete="username"
        {...register("username")}
      />

      <PasswordInput
        id="password"
        label="Senha*"
        value={passwordValue}
        error={errors.password?.message}
        showPassword={showPassword}
        onToggleShowPassword={toggleShowPassword}
        autoComplete="current-password"
        {...register("password")}
      />

      <div className="flex items-center justify-between">
        <CheckboxField
          id="remember-me"
          label="Lembrar meu usuário"
          checked={rememberMeValue}
          {...register("rememberMe")}
        />
        <TextLink href="/forgot-password">Esqueci minha senha</TextLink>
      </div>

      {isPending ? (
        <ButtonSkeleton size="lg" fullWidth />
      ) : (
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Entrar
        </Button>
      )}
    </form>
  );
}
