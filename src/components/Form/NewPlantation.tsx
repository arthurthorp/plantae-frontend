'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import {
  CreatePlantationData,
  createPlantationSchema,
} from '@/schemas/createPlantation'

export default function NewPlantationForm() {
  const router = useRouter()

  const createPlantationForm = useForm<CreatePlantationData>({
    resolver: zodResolver(createPlantationSchema),
  })

  async function handleCreatePlantation(data: CreatePlantationData) {
    const { 'plantae.token': token } = parseCookies()

    const response = await axios.post('http://0.0.0.0/api/plantations', data, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.data.object) return

    router.push('/myaccount/plantations')
  }

  return (
    <FormProvider {...createPlantationForm}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={createPlantationForm.handleSubmit(handleCreatePlantation)}
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
              type="number"
              name="plantationSize"
              placeholder="Forneça o tamanho da plantação"
            />
            <Form.ErrorMessage field="plantationSize" />
          </Form.Field>
        </div>

        <div className="flex w-full flex-col">
          <Form.Button>Cadastrar plantação</Form.Button>
        </div>
      </form>
    </FormProvider>
  )
}
