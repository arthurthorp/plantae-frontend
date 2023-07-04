import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .transform((value) => value.trim().toLowerCase()),
  password: z.string().nonempty('A senha de acesso é obrigatória'),
})

export type SignInData = z.infer<typeof signInSchema>
