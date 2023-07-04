import { cookies } from 'next/headers'

import { translateDate } from '@/utils/translateDate'

import { UserService } from '@/service/user/UserServerService'

import { Plantation } from '@/model/Plantation'
import { Resume } from '@/model/Resume'
import { User } from '@/model/User'

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

interface ResumeResponse {
  irrigation: {
    id: number
    type: string
    executionDate: string | null
  } | null
  agricultural_input: {
    id: number
    type: string
    executionDate: string | null
  } | null
  paring: {
    id: number
    type: string
    executionDate: string | null
  } | null
  list: {
    id: number
    description: string
    type: string
    executionDate: string | null
  }[]
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
    const cookiesStore = cookies()
    const token = cookiesStore.get('plantae.token')?.value ?? ''

    this.options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
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

  async listPlantations(): Promise<Plantation[] | undefined> {
    try {
      const res = await fetch(`http://0.0.0.0/api/plantations`, this.options)

      if (!res.ok) throw new Error('Error to fetch data from server')

      const plantations: {
        objects: PlantationResponse[]
      } = await res.json()

      const userService = new UserService()
      const user = await userService.getUserAuthenticated()

      const newPlantations = plantations.objects.map(
        (plantation) =>
          new Plantation({
            id: plantation.id,
            name: plantation.name,
            description: plantation.description,
            cultivation: plantation.cultivation,
            plantingDate: translateDate({
              date: plantation.plantingDate,
            }),
            estimateHarvestDate: translateDate({
              date: plantation.estimateHarvestDate,
            }),
            plantationSize: plantation.plantationSize,
            user,
            updatedAt: new Date(plantation.updatedAt),
            createdAt: new Date(plantation.createdAt),
          }),
      )

      return newPlantations
    } catch (error) {
      console.log(error)
    }
  }

  async getResume(plantationId: number): Promise<Resume> {
    const res = await fetch(
      `http://0.0.0.0/api/plantations/${plantationId}/activities/resume`,
      this.options,
    )

    if (!res.ok) throw new Error('Error to fetch data from server')

    const resume: { object: ResumeResponse } = await res.json()

    const newResume = new Resume()

    if (resume.object.irrigation) {
      newResume.setIrrigation({
        id: resume.object.irrigation.id,
        type: resume.object.irrigation.type,
        executionDate: resume.object.irrigation.executionDate
          ? translateDate({
              date: resume.object.irrigation.executionDate,
            })
          : undefined,
      })
    }

    if (resume.object.agricultural_input) {
      newResume.setAgriculturalInput({
        id: resume.object.agricultural_input.id,
        type: resume.object.agricultural_input.type,
        executionDate: resume.object.agricultural_input.executionDate
          ? translateDate({
              date: resume.object.agricultural_input.executionDate,
            })
          : undefined,
      })
    }

    if (resume.object.paring) {
      newResume.setParing({
        id: resume.object.paring.id,
        type: resume.object.paring.type,
        executionDate: resume.object.paring.executionDate
          ? translateDate({
              date: resume.object.paring.executionDate,
            })
          : undefined,
      })
    }

    if (resume.object.list.length) {
      newResume.setList(
        resume.object.list.map((item) => ({
          id: item.id,
          description: item.description,
          type: item.type,
          executionDate: item.executionDate
            ? translateDate({ date: item.executionDate })
            : undefined,
        })),
      )
    }

    return newResume
  }

  async getAssociates(plantationId: number) {
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
}
