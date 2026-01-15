import { z } from "zod";

export const updateTicketSchema = z.object({
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
  status: z
    .string()
    .min(1, "O status é obrigatório"),
});

export type UpdateTicketFormData = z.infer<typeof updateTicketSchema>;

export const statusOptions = [
  { value: "Aberto", label: "Aberto" },
  { value: "Em andamento", label: "Em andamento" },
  { value: "Resolvido", label: "Resolvido" },
  { value: "Fechado", label: "Fechado" },
] as const;

export { priorityOptions } from "./createTicketSchema";
