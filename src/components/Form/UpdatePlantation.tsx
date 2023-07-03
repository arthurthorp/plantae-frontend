'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import {
  CreatePlantationData,
  createPlantationSchema,
} from '@/schemas/createPlantation'

import axios from 'axios'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

interface UpdatePlantationFormProps {
  data: CreatePlantationData
  plantationId: string
}

export default function UpdatePlantationForm(props: UpdatePlantationFormProps) {
  const router = useRouter()

  const updatePlantationForm = useForm<CreatePlantationData>({
    resolver: zodResolver(createPlantationSchema),
  })

  async function updatePlantation(data: Partial<CreatePlantationData>) {
    const { 'plantae.token': token } = parseCookies()

    const response = await axios.put(
      `http://0.0.0.0/api/plantations/${props.plantationId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    if (!response.data.object) return

    router.push('/myaccount/plantations')
  }

  useEffect(() => {
    console.log(props.data)

    updatePlantationForm.reset({
      name: props.data.name,
      description: props.data.description,
      cultivation: props.data.cultivation,
      plantingDate: props.data.plantingDate,
      estimateHarvestDate: props.data.estimateHarvestDate,
      plantationSize: props.data.plantationSize,
    })
  }, [])

  return (
    <FormProvider {...updatePlantationForm}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={updatePlantationForm.handleSubmit(updatePlantation)}
      >
        <div className="flex w-full flex-col gap-4">
          <Form.Field>
            <Form.Label htmlFor="name">Nome da plantação</Form.Label>
            <Form.Input
              type="text"
              name="name"
              placeholder="Forneça um no me da plantação"
            />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="description">Descrição</Form.Label>
            <Form.Input
              type="text"
              name="description"
              placeholder="Forneça uma descrição"
            />
            <Form.ErrorMessage field="description" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cultivation">Cultura produzida</Form.Label>
            <Form.Input
              type="text"
              name="cultivation"
              placeholder="Forneça a cultura produzida"
            />
            <Form.ErrorMessage field="cultivation" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="plantingDate">Data de plantio</Form.Label>
            <Form.Input
              type="date"
              name="plantingDate"
              placeholder="Forneça a data de plantio"
            />
            <Form.ErrorMessage field="plantingDate" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="estimateHarvestDate">
              Previsão de data de colheita
            </Form.Label>
            <Form.Input
              type="date"
              name="estimateHarvestDate"
              placeholder="Forneça uma previsão para colheita"
            />
            <Form.ErrorMessage field="estimateHarvestDate" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="plantationSize">
              Tamanho da plantação
            </Form.Label>
            <Form.Input
              type="text"
              name="plantationSize"
              placeholder="Forneça o tamanho da plantação"
            />
            <Form.ErrorMessage field="plantationSize" />
          </Form.Field>
        </div>

        <div className="flex w-full flex-col">
          <Form.Button>Alterar plantação</Form.Button>
        </div>
      </form>
    </FormProvider>
  )
}
