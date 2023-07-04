import { Activity } from '@/model/Activity'
import { translateDate } from '@/utils/translateDate'
import axios from 'axios'
import { parseCookies } from 'nookies'
import { AgriculturalInputService } from '../agriculturalInput/AgriculturalInputClientService'
import { PlantationService } from '../plantation/PlantationClientService'
import { UserResponse, UserService } from '../user/UserClientService'

export interface AgriculturalInputExpensesResponse {
  types: {
    type: string
    quantityUsed: number
    totalPrice: number
  }[]
  total: number
}

interface HistoryResponse {
  id: number
  description: string
  imagePath: string | null
  isImpediment: boolean
  activityId: number
  createdAt: string
  updatedAt: string
}

interface ActivityResponse {
  id: number
  description: string
  type: string
  status: string
  estimate_date: string
  execution_date: string | null
  charge_in: number
  plantation_id: number
  agricultural_input_id: number | null
  estimate_produtivity: number | null
  real_produtivity: number | null
  quantity_used: number | null
  created_at: string
  updated_at: string
  price: number | null
  image_path: string | null
  user: UserResponse
  histories: HistoryResponse[]
}

export class ReportsService {
  private options: object

  constructor() {
    const { 'plantae.token': token } = parseCookies()

    this.options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  }

  async getAgriculturalInput(
    plantationId: number,
  ): Promise<AgriculturalInputExpensesResponse> {
    const res = await axios.get(
      `http://0.0.0.0/api/analysis/agricultural-input-expenses/${plantationId}`,
      this.options,
    )

    if (res.statusText !== 'OK')
      throw new Error('Error to fetch data from server')

    return res.data.object as AgriculturalInputExpensesResponse
  }

  async getFinishedActivities(plantationId: number): Promise<Activity[]> {
    const activities = await axios.get<{ objects: ActivityResponse[] }>(
      `http://0.0.0.0/api/analysis/finished-activities/${plantationId}`,
      this.options,
    )

    if (activities.statusText !== 'OK')
      throw new Error('Error to fetch data from server')

    const newActivities = await Promise.all(
      activities.data.objects.map(async (activity: ActivityResponse) => {
        const agriculturalInputService = new AgriculturalInputService()
        const agriculturalInput = activity.agricultural_input_id
          ? await agriculturalInputService.getAgriculturalInput(
              activity.agricultural_input_id,
            )
          : null

        const userService = new UserService()
        const user = await userService.getUser(activity.charge_in)

        const plantationService = new PlantationService()
        const plantation = await plantationService.getPlantation(
          activity.plantation_id,
        )

        const newActivity = new Activity({
          id: activity.id,
          type: activity.type,
          imagePath: activity.image_path ?? undefined,
          description: activity.description,
          status: activity.status,
          estimateDate: translateDate({ date: activity.estimate_date }),
          executionDate: activity.execution_date
            ? translateDate({ date: activity.execution_date })
            : undefined,
          plantation,
          agriculturalInput: agriculturalInput ?? undefined,
          estimateProdutivity: activity.estimate_produtivity ?? undefined,
          realProdutivity: activity.real_produtivity ?? undefined,
          quantityUsed: activity.quantity_used ?? undefined,
          price: activity.price ?? undefined,
          user,
          updatedAt: new Date(activity.updated_at),
          createdAt: new Date(activity.created_at),
        })

        return newActivity
      }),
    )

    return newActivities
  }

  async getLateActivities(
    plantationId: number,
  ): Promise<{ quantity: number; dateAverage: number }> {
    const info = await axios.get<{
      object: { quantity: number; dateAverage: number }
    }>(
      `http://0.0.0.0/api/analysis/late-activities/${plantationId}`,
      this.options,
    )

    if (info.statusText !== 'OK')
      throw new Error('Error to fetch data from server')

    return info.data.object
  }
}
