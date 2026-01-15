"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  createTicketSchema,
  type CreateTicketFormData,
} from "../createTicketSchema";

export function useCreateTicketForm() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      client: "",
      email: "",
      priority: "",
      responsible: "",
      subject: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = useCallback(
    (onSubmit: (data: CreateTicketFormData) => void | Promise<void>) => {
      return formHandleSubmit((data: CreateTicketFormData) => {
        startTransition(() => {
          (async () => {
            try {
              await onSubmit(data);
            } catch (error) {
              console.error("Create ticket error:", error);
            }
          })();
        });
      });
    },
    [formHandleSubmit]
  );

  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  return {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    isPending,
    resetForm,
  };
}
