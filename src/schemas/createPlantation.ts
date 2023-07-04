import { z } from 'zod'

export const createPlantationSchema = z.object({
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .transform((value) => value.trim().toLowerCase()),
  description: z
    .string()
    .nonempty('A descrição é obrigatória')
    .transform((value) => value.trim()),
  cultivation: z
    .string()
    .nonempty('A cultura produzida é obrigatória')
    .transform((value) => value.trim().toLowerCase()),
  plantingDate: z
    .string()
    .nonempty('A data de plantio é obrigatória')
    .refine((value) => {
      const regex = /^(\d{4})(-{1})(\d{2})(-{1})(\d{2})$/g
      return value.match(regex)?.join('')
    }, 'Formato de data inválida. Ex: 99/99/9999'),
  estimateHarvestDate: z
    .string()
    .nonempty('A previsão da data de colheita é obrigatória')
    .refine((value) => {
      const regex = /^(\d{4})(-{1})(\d{2})(-{1})(\d{2})$/g
      return value.match(regex)?.join('')
    }, 'Formato de data inválida. Ex: 99/99/9999'),
  plantationSize: z
    .string()
    .nonempty('O tamanho da plantação é obrigatório')
    .refine((value) => {
      const regex = /\d+.*,*/g
      return value.match(regex)?.join('')
    }, 'Só pode haver números, ponto e vírgula'),
})

export type CreatePlantationData = z.infer<typeof createPlantationSchema>
