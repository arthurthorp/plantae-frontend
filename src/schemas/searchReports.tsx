import { z } from 'zod'

export const reportsSchema = z.object({
  plantationId: z.string().nonempty('A plantação é obrigatória'),
})

export type ReportsData = z.infer<typeof reportsSchema>
