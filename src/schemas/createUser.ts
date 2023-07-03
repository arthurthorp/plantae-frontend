import { z } from 'zod'

export const createUserSchema = z
  .object({
    name: z
      .string()
      .nonempty('O nome é obrigatório')
      .transform((value) => value.trim().toLowerCase()),
    birthDate: z
      .string()
      .nonempty('A data de aniversário é obrigatória')
      .refine((value) => {
        const regex = /^(\d{4})(-{1})(\d{2})(-{1})(\d{2})$/g
        return value.match(regex)?.join('')
      }, 'Formato de data inválida. Ex: 99/99/9999'),
    email: z
      .string()
      .nonempty('O e-mail é obrigatório')
      .email('Formato de e-mail inválido')
      .transform((value) => value.trim().toLowerCase()),
    phone: z
      .string()
      .nonempty('O telefone é obrigatório')
      .refine((value) => {
        const regex = /^(\d{2})( {1})(\d{4,5})(-{1})(\d{4})$/g
        return value.match(regex)?.join('')
      }, 'Formato de telefone inválido. Ex: 99 99999-9999'),
    password: z
      .string()
      .nonempty('A senha de acesso é obrigatória')
      .min(6, 'A senha de acesso precisa ter, no mínimo, 6 caracteres'),
    passwordConfirmation: z
      .string()
      .nonempty('A confirmação da senha de acesso é obrigatória'),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['passwordConfirmation'],
        message: 'A senha de acesso e sua confirmação não são correspondentes',
      })
    }
  })

export type CreateUserData = z.infer<typeof createUserSchema>
