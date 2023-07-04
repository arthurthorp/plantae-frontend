import { z } from 'zod'

export const createHistorySchema = z.object({
  image: z
    .custom<FileList>((value) => value instanceof FileList)
    .refine((value) => value.length > 0, 'A foto é obrigatória')
    .refine((value) => {
      console.log(value)
      const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
      return types.includes(value[0]?.type)
    }, 'O arquivo deve ser um arquivo PNG, JPG, JPEG ou WEBP!'),
  description: z
    .string()
    .nonempty('A descrição é obrigatória')
    .transform((value) => value.trim()),
})

export type CreateHistoryData = z.infer<typeof createHistorySchema>
