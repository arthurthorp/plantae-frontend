import { cookies } from 'next/headers'

import { AgriculturalInput } from '@/model/AgriculturalInput'

interface AgriculturalInputResponse {
  id: number
  name: string
  type: 'FERTILIZER' | 'FUNGICIDE' | 'HERBICIDE' | 'OTHER'
  rules: string
  createdAt: null
  updatedAt: null
}

export class AgriculturalInputService {
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

  async getAgriculturalInput(
    agriculturalInputId: number,
  ): Promise<AgriculturalInput> {
    const res = await fetch(
      `http://0.0.0.0/api/agricultural-inputs/${agriculturalInputId}`,
      this.options,
    )

    if (!res.ok) throw new Error('Error to fetch data from server')

    const agriculturalInput: { object: AgriculturalInputResponse } =
      await res.json()

    const newAgriculturalInput = new AgriculturalInput({
      id: agriculturalInput.object.id,
      name: agriculturalInput.object.name,
      type: agriculturalInput.object.type,
      rules: agriculturalInput.object.rules,
    })

    return newAgriculturalInput
  }

  async listAgriculturalInput(): Promise<AgriculturalInput[]> {
    const res = await fetch(
      `http://0.0.0.0/api/agricultural-inputs`,
      this.options,
    )

    if (!res.ok) throw new Error('Error to fetch data from server')

    const agriculturalInputs: {
      objects: AgriculturalInputResponse[]
    } = await res.json()

    const newAgriculturalInputs = agriculturalInputs.objects.map(
      (agriculturalInput) =>
        new AgriculturalInput({
          id: agriculturalInput.id,
          name: agriculturalInput.name,
          type: agriculturalInput.type,
          rules: agriculturalInput.rules,
        }),
    )

    return newAgriculturalInputs
  }
}
