"use client";

import { Logo } from "../../components/ui/brand/Logo";
import { LoginForm } from "./LoginForm";
import { LoginHeader } from "./LoginHeader";
import { LoginIllustration } from "./LoginIllustration";
import { type LoginFormData } from "./loginSchema";

export function LoginScreen() {
  const handleLogin = async (data: LoginFormData) => {
    // TODO: Implementar a lógica de autenticação via server action
    console.log("Login attempt:", data);
  };

  return (
    <div className="h-screen w-full bg-dark-1000 flex relative overflow-hidden">
      {/* Left side - Form */}
      <section className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12 lg:pr-16 bg-dark-1000 overflow-y-auto">
        <div className="pt-8 lg:pt-12">
          <Logo />
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md">
            <LoginHeader className="mb-8" />
            <LoginForm onSubmit={handleLogin} />
          </div>
        </div>
      </section>

      {/* Right side - Illustration */}
      <aside className="hidden lg:flex lg:w-1/2 relative bg-dark-1000 p-8 lg:p-12 overflow-hidden">
        <LoginIllustration />
      </aside>
    </div>
  );
}
