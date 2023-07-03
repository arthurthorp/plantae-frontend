import { User } from '@/model/User'

export interface Activity {
  id: number
  type: string
  description: string
  status: string
  estimateDate: string
  executionDate: string
  plantationId: number
  agriculturalInputId: number
  estimateProdutivity: string
  realProdutivity: string
  quantityUsed: number
  price: number
  user: User
  updatedAt: string
  createdAt: string
}
