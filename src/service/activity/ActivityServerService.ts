import { cookies } from 'next/headers'

import { Activity } from '@/model/Activity'
import { History } from '@/model/History'

import { AgriculturalInputService } from '@/service/agriculturalInput/AgriculturalInputServerService'
import { PlantationService } from '@/service/plantation/PlantationServerService'
import { UserResponse, UserService } from '@/service/user/UserServerService'
import { translateDate } from '@/utils/translateDate'

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
  estimateDate: string
  executionDate: string | null
  chargeIn: number
  plantationId: number
  agriculturalInputId: number | null
  estimateProdutivity: number | null
  realProdutivity: number | null
  quantityUsed: number | null
  createdAt: string
  updatedAt: string
  price: number | null
  imagePath: string | null
  user: UserResponse
  histories: HistoryResponse[]
}

export class ActivityService {
  private options: object

  constructor() {
    const cookiesStore = cookies()
    const token = cookiesStore.get('plantae.token')?.value ?? ''

    this.options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  }

  async getActivity(activityId: number): Promise<Activity> {
    const res = await fetch(
      `http://0.0.0.0/api/activities/${activityId}`,
      this.options,
    )

    if (!res.ok) throw new Error('Error to fetch data from server')

    const activity: { object: ActivityResponse } = await res.json()

    const agriculturalInputService = new AgriculturalInputService()
    const agriculturalInput = activity.object.agriculturalInputId
      ? await agriculturalInputService.getAgriculturalInput(
          activity.object.agriculturalInputId,
        )
      : null

    const userService = new UserService()
    const user = await userService.getUser(activity.object.chargeIn)

    const plantationService = new PlantationService()
    const plantation = await plantationService.getPlantation(
      activity.object.plantationId,
    )

    const newActivity = new Activity({
      id: activity.object.id,
      type: activity.object.type,
      imagePath: activity.object.imagePath ?? undefined,
      description: activity.object.description,
      status: activity.object.status,
      estimateDate: translateDate({ date: activity.object.estimateDate }),
      executionDate: activity.object.executionDate
        ? translateDate({ date: activity.object.executionDate })
        : undefined,
      plantation,
      agriculturalInput: agriculturalInput ?? undefined,
      estimateProdutivity: activity.object.estimateProdutivity ?? undefined,
      realProdutivity: activity.object.realProdutivity ?? undefined,
      quantityUsed: activity.object.quantityUsed ?? undefined,
      price: activity.object.price ?? undefined,
      user,
      updatedAt: new Date(activity.object.updatedAt),
      createdAt: new Date(activity.object.createdAt),
      histories: activity.object.histories.map(
        (history) =>
          new History({
            id: history.id,
            description: history.description,
            imagePath: history.imagePath ?? undefined,
            isImpediment: history.isImpediment,
            updatedAt: new Date(history.updatedAt),
            createdAt: new Date(history.createdAt),
          }),
      ),
    })

    return newActivity
  }

  async listActivities(): Promise<Activity[]> {
    const res = await fetch(`http://0.0.0.0/api/activities/`, this.options)

    if (!res.ok) throw new Error('Error to fetch data from server')

    const activities: { objects: ActivityResponse[] } = await res.json()

    const newActivities = await Promise.all(
      activities.objects.map(async (activity) => {
        const agriculturalInputService = new AgriculturalInputService()
        const agriculturalInput = activity.agriculturalInputId
          ? await agriculturalInputService.getAgriculturalInput(
              activity.agriculturalInputId,
            )
          : null

        const userService = new UserService()
        const user = await userService.getUser(activity.chargeIn)

        const plantationService = new PlantationService()
        const plantation = await plantationService.getPlantation(
          activity.plantationId,
        )

        const newActivity = new Activity({
          id: activity.id,
          type: activity.type,
          imagePath: activity.imagePath ?? undefined,
          description: activity.description,
          status: activity.status,
          estimateDate: translateDate({ date: activity.estimateDate }),
          executionDate: activity.executionDate
            ? translateDate({ date: activity.executionDate })
            : undefined,
          plantation,
          agriculturalInput: agriculturalInput ?? undefined,
          estimateProdutivity: activity.estimateProdutivity ?? undefined,
          realProdutivity: activity.realProdutivity ?? undefined,
          quantityUsed: activity.quantityUsed ?? undefined,
          price: activity.price ?? undefined,
          user,
          updatedAt: new Date(activity.updatedAt),
          createdAt: new Date(activity.createdAt),
        })

        return newActivity
      }),
    )

    return newActivities
  }
}
