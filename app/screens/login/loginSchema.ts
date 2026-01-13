import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "O campo de usuário é obrigatório")
    .refine(
      (value) => {
        // Validação para email, CPF ou passaporte
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
        const passportRegex = /^[A-Z]{2}\d{6}$/;
        
        return emailRegex.test(value) || cpfRegex.test(value) || passportRegex.test(value);
      },
      {
        message: "Insira um e-mail, CPF ou passaporte válido",
      }
    ),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  rememberMe: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
