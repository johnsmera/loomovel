"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "./loginSchema";

type UseLoginFormOptions = {
  onSubmit?: (data: LoginFormData) => Promise<void> | void;
};

export function useLoginForm(options?: UseLoginFormOptions) {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmitHandler = handleSubmit((data: LoginFormData) => {
    startTransition(() => {
      (async () => {
        try {
          if (options?.onSubmit) {
            await options.onSubmit(data);
          } else {
            // Lógica de submit será implementada futuramente
            console.log("Login attempt:", data);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      })();
    });
  });

  return {
    register,
    handleSubmit: onSubmitHandler,
    errors,
    watch,
    showPassword,
    toggleShowPassword,
    isPending,
  };
}
