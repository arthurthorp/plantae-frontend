'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import { Activity } from '@/model/Activity'
import {
  CreateActivityData,
  createActivitySchema,
} from '@/schemas/createActivity'
import { ActivityService } from '@/service/activity/ActivityClientService'
import { AgriculturalInputService } from '@/service/agriculturalInput/AgriculturalInputClientService'
import { PlantationService } from '@/service/plantation/PlantationClientService'
import { UserService } from '@/service/user/UserClientService'
import { translateDate } from '@/utils/translateDate'
import { useEffect, useState } from 'react'

interface NewActivityFormProps {
  agriculturalInputs: any[]
  plantations: any[]
  userAuth: any
}

async function getAssociates(plantationId: string) {
  const { 'plantae.token': token } = parseCookies()

  const res = await fetch(
    `http://0.0.0.0/api/plantations/${plantationId}/associates`,
    {
      headers: { Authorization: `Bearer ${token}` },
      // next: { revalidate: 1 },
      cache: 'no-store',
    },
  )

  const response = await res.json()

  if (!response.object) return

  return response.object
}

export default function NewActivityForm(props: NewActivityFormProps) {
  const [users, setUsers] = useState<any[]>([])
  const router = useRouter()

  const createActivityForm = useForm<CreateActivityData>({
    resolver: zodResolver(createActivitySchema),
  })

  const { watch } = createActivityForm

  async function handleCreateActivity(data: CreateActivityData) {
    console.log('teste')

    const plantationService = new PlantationService()
    const plantation = await plantationService.getPlantation(
      parseInt(data.plantationId),
    )

    const userService = new UserService()
    const user = await userService.getUser(parseInt(data.chargeIn))

    const agriculturalInputService = new AgriculturalInputService()
    const agriculturalInput =
      await agriculturalInputService.getAgriculturalInput(
        parseInt(data.agriculturalInputId),
      )

    const activity = new Activity({
      type: data.type,
      image: data.image[0],
      status: 'PENDING',
      description: data.description,
      estimateDate: translateDate({ date: data.estimateDate }),
      plantation,
      user,
      agriculturalInput,
      estimateProdutivity: data.estimateProdutivity
        ? parseFloat(data.estimateProdutivity)
        : undefined,
    })

    const activityService = new ActivityService()
    const success = await activityService.createActivity(activity)

    if (!success) return

    router.push('/myaccount/activities')
  }

  useEffect(() => {
    getAssociates(watch('plantationId')).then((data) => setUsers(data))
  }, [watch('plantationId')])

  return (
    <FormProvider {...createActivityForm}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={createActivityForm.handleSubmit(handleCreateActivity)}
      >
        <div className="flex w-full flex-col gap-4">
          <Form.Field>
            <Form.Label htmlFor="image">Foto</Form.Label>
            <Form.InputFile name="image" placeholder="Adicione uma foto" />
            <Form.ErrorMessage field="image" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="type">Tipo de atividade</Form.Label>
            <Form.Select name="type">
              <Form.SelectOption value="AGRICULTURA_INPUT">
                Utilização de insumo
              </Form.SelectOption>
              <Form.SelectOption value="HARVEST">Colheita</Form.SelectOption>
              <Form.SelectOption value="IRRIGATION">
                Irrigação
              </Form.SelectOption>
              <Form.SelectOption value="PARING">Poda</Form.SelectOption>
              <Form.SelectOption value="OTHER">Outro</Form.SelectOption>
            </Form.Select>
            <Form.ErrorMessage field="type" />
          </Form.Field>

          <div
            data-show={watch('type') === 'AGRICULTURA_INPUT'}
            className="hidden data-[show=true]:block"
          >
            <Form.Field>
              <Form.Label htmlFor="agriculturalInputId">
                Tipo de insumo
              </Form.Label>
              <Form.Select name="agriculturalInputId">
                {props.agriculturalInputs.map((agriculturalInput: any) => (
                  <Form.SelectOption
                    key={agriculturalInput.id}
                    value={agriculturalInput.id}
                  >
                    {agriculturalInput.name}
                  </Form.SelectOption>
                ))}
              </Form.Select>
              <Form.ErrorMessage field="agriculturalInputId" />
              <span>
                {props.agriculturalInputs[
                  parseInt(watch('agriculturalInputId')) - 1
                ]?.rules ?? ''}
              </span>
            </Form.Field>
          </div>

          <div
            data-show={watch('type') === 'HARVEST'}
            className="hidden data-[show=true]:block"
          >
            <Form.Field>
              <Form.Label htmlFor="estimateProdutivity">
                Produtividade estimada
              </Form.Label>
              <Form.Input
                type="text"
                name="estimateProdutivity"
                placeholder="Forneça o produtividade estimada"
              />
              <Form.ErrorMessage field="estimateProdutivity" />
            </Form.Field>
          </div>

          <Form.Field>
            <Form.Label htmlFor="plantationId">Plantação</Form.Label>
            <Form.Select name="plantationId">
              {props.plantations.map((plantation) => (
                <Form.SelectOption key={plantation.id} value={plantation.id}>
                  {plantation.name}
                </Form.SelectOption>
              ))}
            </Form.Select>
            <Form.ErrorMessage field="plantationId" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="description">Descrição</Form.Label>
            <Form.Input
              type="text"
              name="description"
              placeholder="Forneça uma descrição da atividade"
            />
            <Form.ErrorMessage field="description" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="estimateDate">Data de realização</Form.Label>
            <Form.Input
              type="date"
              name="estimateDate"
              placeholder="Forneça a data de realização"
            />
            <Form.ErrorMessage field="estimateDate" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="chargeIn">Responsável</Form.Label>
            <Form.Select name="chargeIn">
              <Form.SelectOption value={props.userAuth.id}>
                (Eu) {props.userAuth.name}
              </Form.SelectOption>
              {users.map((user) => (
                <Form.SelectOption key={user.id} value={user.id}>
                  {user.name}
                </Form.SelectOption>
              ))}
            </Form.Select>
            <Form.ErrorMessage field="chargeIn" />
          </Form.Field>
        </div>

        <div className="flex w-full flex-col">
          <Form.Button>Cadastrar atividade</Form.Button>
        </div>
      </form>
    </FormProvider>
  )
}
