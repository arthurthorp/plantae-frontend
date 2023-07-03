import { z } from 'zod'

export const createHistorySchema = z.object({
  description: z
    .string()
    .nonempty('A descrição é obrigatória')
    .transform((value) => value.trim()),
})

export type CreateHistoryData = z.infer<typeof createHistorySchema>
