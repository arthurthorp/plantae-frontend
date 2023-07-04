'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import {
  CreatePlantationData,
  createPlantationSchema,
} from '@/schemas/createPlantation'

import { Plantation } from '@/model/Plantation'

import { PlantationService } from '@/service/plantation/PlantationClientService'

import { formatDate } from '@/utils/formatDate'
import { translateDate } from '@/utils/translateDate'

interface UpdatePlantationFormProps {
  plantation: Plantation
}

export default function UpdatePlantationForm(props: UpdatePlantationFormProps) {
  const router = useRouter()

  const updatePlantationForm = useForm<CreatePlantationData>({
    resolver: zodResolver(createPlantationSchema),
  })

  async function updatePlantation(data: CreatePlantationData) {
    const plantation = new Plantation({
      id: props.plantation.id,
      cultivation: data.cultivation,
      description: data.description,
      name: data.name,
      plantationSize: parseFloat(data.plantationSize),
      plantingDate: translateDate({ date: data.plantingDate }),
      estimateHarvestDate: translateDate({ date: data.estimateHarvestDate }),
      user: props.plantation.user,
    })

    const plantationService = new PlantationService()
    const success = await plantationService.updatePlantation(plantation)

    if (!success) return

    router.push('/myaccount/plantations')
  }

  useEffect(() => {
    updatePlantationForm.reset({
      name: props.plantation.name,
      description: props.plantation.description,
      cultivation: props.plantation.cultivation,
      plantingDate: formatDate({
        date: props.plantation.plantingDate,
        format: 'YYYY-MM-DD',
      }),
      estimateHarvestDate: formatDate({
        date: props.plantation.estimateHarvestDate,
        format: 'YYYY-MM-DD',
      }),
      plantationSize: props.plantation.plantationSize.toString(),
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
