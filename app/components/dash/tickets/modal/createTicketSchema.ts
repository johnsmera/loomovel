import { z } from "zod";

export const createTicketSchema = z.object({
  client: z
    .string()
    .min(1, "O nome do cliente é obrigatório")
    .min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Insira um e-mail válido"),
  priority: z
    .string()
    .min(1, "A prioridade é obrigatória"),
  responsible: z
    .string()
    .min(1, "O responsável é obrigatório"),
  subject: z
    .string()
    .min(1, "O assunto é obrigatório")
    .min(3, "O assunto deve ter no mínimo 3 caracteres"),
});

export type CreateTicketFormData = z.infer<typeof createTicketSchema>;

export const priorityOptions = [
  { value: "Urgente", label: "Urgente" },
  { value: "Média", label: "Média" },
  { value: "Baixa", label: "Baixa" },
] as const;
