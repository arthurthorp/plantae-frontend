import axios from 'axios'
import { parseCookies } from 'nookies'

import { Plantation } from '@/model/Plantation'
import { User } from '@/model/User'

import { UserService } from '@/service/user/UserClientService'

import { formatDate } from '@/utils/formatDate'
import { translateDate } from '@/utils/translateDate'

interface AssociatesResponse {
  id: number
  name: string
  email: string
  emailVerifiedAt?: string
  phone: string
  isOwner: boolean
  birthDate: string
  createdAt: string
  updatedAt: string
}

interface PlantationResponse {
  id: number
  name: string
  description: string
  cultivation: string
  plantingDate: string
  estimateHarvestDate: string
  plantationSize: number
  createdAt: string
  updatedAt: string
  pivot: {
    userId: number
    plantationId: number
  }
}

export class PlantationService {
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

  async createPLantation(data: Plantation): Promise<boolean> {
    const body = {
      ...data,
      estimateHarvestDate: formatDate({
        date: data.estimateHarvestDate,
        format: 'YYYY-MM-DD',
      }),
      plantingDate: formatDate({
        date: data.plantingDate,
        format: 'YYYY-MM-DD',
      }),
    }

    const response = await axios.post(
      `http://0.0.0.0/api/plantations/`,
      body,
      this.options,
    )

    return response.statusText === 'Created'
  }

  async updatePlantation(data: Plantation): Promise<boolean> {
    const body = {
      ...data,
      estimateHarvestDate: formatDate({
        date: data.estimateHarvestDate,
        format: 'YYYY-MM-DD',
      }),
      plantingDate: formatDate({
        date: data.plantingDate,
        format: 'YYYY-MM-DD',
      }),
    }

    const response = await axios.put(
      `http://0.0.0.0/api/plantations/${data.id}`,
      body,
      this.options,
    )

    return response.statusText === 'OK'
  }

  async getAssociates(plantationId: number): Promise<User[]> {
    const res = await fetch(
      `http://0.0.0.0/api/plantations/${plantationId}/associates`,
      this.options,
    )

    if (!res.ok) throw new Error('Error to fetch data from server')

    const associates: { object: AssociatesResponse[] } = await res.json()

    const newAssociates = associates.object.map(
      (associate) =>
        new User({
          id: associate.id,
          name: associate.name,
          email: associate.email,
          emailVerifiedAt: associate.emailVerifiedAt,
          phone: associate.phone,
          isOwner: associate.isOwner,
          birthDate: associate.birthDate,
          updatedAt: new Date(associate.updatedAt),
          createdAt: new Date(associate.createdAt),
        }),
    )

    return newAssociates
  }

  async getPlantation(plantationId: number): Promise<Plantation> {
    const res = await fetch(
      `http://0.0.0.0/api/plantations/${plantationId}`,
      this.options,
    )

    if (!res.ok) throw new Error('Error to fetch data from server')

    const plantation: {
      object: PlantationResponse
    } = await res.json()

    const userService = new UserService()
    const user = await userService.getUser(plantation.object.pivot.userId)

    const newPlantation = new Plantation({
      id: plantation.object.id,
      name: plantation.object.name,
      description: plantation.object.description,
      cultivation: plantation.object.cultivation,
      plantingDate: translateDate({
        date: plantation.object.plantingDate,
      }),
      estimateHarvestDate: translateDate({
        date: plantation.object.estimateHarvestDate,
      }),
      plantationSize: plantation.object.plantationSize,
      user,
      updatedAt: new Date(plantation.object.updatedAt),
      createdAt: new Date(plantation.object.createdAt),
    })

    return newPlantation
  }
}
