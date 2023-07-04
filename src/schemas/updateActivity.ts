import { z } from 'zod'

export const updateActivitySchema = z
  .object({
    imagePath: z.string(),
    image: z
      .custom<FileList>((value) => value instanceof FileList)
      .refine((value) => {
        const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
        return value.length === 0 || types.includes(value[0]?.type)
      }, 'O arquivo deve ser um arquivo PNG, JPG, JPEG ou WEBP!'),
    type: z
      .string()
      .nonempty('O tipo é obrigatório')
      .transform((value) => value.trim()),
    status: z
      .string()
      .nonempty('O status é obrigatório')
      .transform((value) => value.trim()),
    agriculturalInputId: z.string().trim(),
    quantityUsed: z.string().trim(),
    price: z.string().trim(),
    estimateProdutivity: z.string().trim(),
    realProdutivity: z.string().trim(),
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
  .superRefine(
    (
      {
        type,
        agriculturalInputId,
        quantityUsed,
        price,
        estimateProdutivity,
        realProdutivity,
      },
      ctx,
    ) => {
      if (type === 'AGRICULTURA_INPUT') {
        if (agriculturalInputId.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['agriculturalInputId'],
            message: 'O insumo a ser utilizado é obrigatório',
          })
        }

        if (quantityUsed.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['quantityUsed'],
            message: 'A quantidade utilizada é obrigatória',
          })
        }

        if (price.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['price'],
            message: 'O preço do insumo é obrigatório',
          })
        }
      }

      if (type === 'HARVEST') {
        if (estimateProdutivity.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['estimateProdutivity'],
            message: 'A produtividade estimada é obrigatória',
          })
        }

        if (realProdutivity.length === 0) {
          ctx.addIssue({
            code: 'custom',
            path: ['realProdutivity'],
            message: 'A produtividade real é obrigatória',
          })
        }
      }
    },
  )

export type UpdateActivityData = z.infer<typeof updateActivitySchema>
