import { z } from 'zod'

export const createActivitySchema = z
  .object({
    type: z
      .string()
      .nonempty('O tipo é obrigatório')
      .transform((value) => value.trim()),
    agriculturalInputId: z.string().trim(),
    estimateProdutivity: z.string().trim(),
    plantationId: z
      .string()
      .nonempty('A plantação é obrigatória')
      .transform((value) => value.trim().toLowerCase()),
    description: z.string(),
    estimateDate: z
      .string()
      .nonempty('A data de realização é obrigatória')
      .refine((value) => {
        const regex = /^(\d{4})(-{1})(\d{2})(-{1})(\d{2})$/g
        return value.match(regex)?.join('')
      }, 'Formato de data inválida. Ex: 99/99/9999'),
    chargeIn: z
      .string()
      .nonempty('A plantação é obrigatória')
      .transform((value) => value.trim().toLowerCase()),
  })
  .superRefine(({ type, agriculturalInputId, estimateProdutivity }, ctx) => {
    if (type === 'AGRICULTURA_INPUT' && agriculturalInputId.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['agriculturalInputId'],
        message: 'O insumo a ser utilizado é obrigatório',
      })
    }

    if (type === 'HARVEST' && estimateProdutivity.length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['estimateProdutivity'],
        message: 'A produtividade estimada é obrigatória',
      })
    }
  })

export type CreateActivityData = z.infer<typeof createActivitySchema>
