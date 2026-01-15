"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth/login-action";
import type { LoginFormData } from "@/app/screens/login/loginSchema";

export function useLogin() {
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    const result = await loginAction(data.username, data.password);

    if (result.success) {
      toast.success("Login realizado com sucesso!");
      router.push("/dash");
    } else {
      toast.error(result.error);
    }
  };

  return {
    handleLogin,
  };
}
