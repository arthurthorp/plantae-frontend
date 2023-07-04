'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import { Activity } from '@/model/Activity'
import { AgriculturalInput } from '@/model/AgriculturalInput'
import { Plantation } from '@/model/Plantation'
import { User } from '@/model/User'

import {
  UpdateActivityData,
  updateActivitySchema,
} from '@/schemas/updateActivity'

import { ActivityService } from '@/service/activity/ActivityClientService'
import { AgriculturalInputService } from '@/service/agriculturalInput/AgriculturalInputClientService'
import { PlantationService } from '@/service/plantation/PlantationClientService'
import { UserService } from '@/service/user/UserClientService'

import { formatDate } from '@/utils/formatDate'
import { translateDate } from '@/utils/translateDate'

interface UpdateActivityFormProps {
  activity: Activity
  agriculturalInputs: AgriculturalInput[]
  plantations: Plantation[]
  user: User
}

async function getAssociates(plantationId: number) {
  const plantationService = new PlantationService()
  const associates = await plantationService.getAssociates(plantationId)

  return associates
}

export default function UpdateActivityForm(props: UpdateActivityFormProps) {
  const [users, setUsers] = useState<User[]>([])

  const router = useRouter()

  const updateActivityForm = useForm<UpdateActivityData>({
    resolver: zodResolver(updateActivitySchema),
  })

  const { watch } = updateActivityForm

  async function handleUpdateActivity(data: UpdateActivityData) {
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
      ...props.activity,
      type: data.type,
      status: data.status,
      description: data.description,
      estimateDate: translateDate({ date: data.estimateDate }),
      plantation,
      user,
      agriculturalInput,
      quantityUsed: data.quantityUsed
        ? parseFloat(data.quantityUsed)
        : undefined,
      price: data.price ? parseFloat(data.price) : undefined,
      realProdutivity: data.realProdutivity
        ? parseFloat(data.realProdutivity)
        : undefined,
      estimateProdutivity: data.estimateProdutivity
        ? parseFloat(data.estimateProdutivity)
        : undefined,
    })

    if (data.image[0]) activity.image = data.image[0]

    console.log(activity)

    const activityService = new ActivityService()
    const success = await activityService.updateActivity(activity)

    if (!success) return

    router.push('/myaccount/activities')
  }

  useEffect(() => {
    getAssociates(parseInt(watch('plantationId'))).then((data) =>
      setUsers(data),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('plantationId')])

  useEffect(() => {
    updateActivityForm.reset({
      type: props.activity.type,
      imagePath: props.activity.imagePath,
      agriculturalInputId: props.activity.agriculturalInput?.id.toString(),
      chargeIn: props.activity.user.id?.toString(),
      description: props.activity.description,
      estimateDate: formatDate({
        date: props.activity.estimateDate,
        format: 'YYYY-MM-DD',
      }),
      estimateProdutivity: props.activity.estimateProdutivity?.toString(),
      plantationId: props.activity.plantation.id?.toString(),
      status: props.activity.status,
      price: props.activity.price?.toString(),
      quantityUsed: props.activity.quantityUsed?.toString(),
      realProdutivity: props.activity.realProdutivity?.toString(),
    })
  }, [])

  return (
    <FormProvider {...updateActivityForm}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={updateActivityForm.handleSubmit(handleUpdateActivity)}
      >
        <div className="flex w-full flex-col gap-4">
          <Form.Field>
            <Form.Label htmlFor="image">Foto</Form.Label>
            <Form.InputFile
              name="image"
              previewName="imagePath"
              placeholder="Adicione uma foto"
            />
            <Form.ErrorMessage field="image" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Select name="status">
              <Form.SelectOption value="PENDING">Pendente</Form.SelectOption>
              <Form.SelectOption value="FINISHED">Concluída</Form.SelectOption>
              <Form.SelectOption value="FORBIDDEN">Impedida</Form.SelectOption>
            </Form.Select>
            <Form.ErrorMessage field="status" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="type">Tipo de atividade</Form.Label>
            <Form.Select name="type">
              <Form.SelectOption value="AGRICULTURAL_INPUT">
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
            data-show={watch('type') === 'AGRICULTURAL_INPUT'}
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
                {props.agriculturalInputs.find((agriculturalInput) => {
                  return (
                    agriculturalInput.id ===
                    parseInt(watch('agriculturalInputId'))
                  )
                })?.rules ?? ''}
              </span>
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="quantityUsed">
                Quantidade utilizada do insumo
              </Form.Label>
              <Form.Input
                type="text"
                name="quantityUsed"
                placeholder="Forneça o quantidade utilizada"
              />
              <Form.ErrorMessage field="quantityUsed" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="price">Valor do insumo utilizado</Form.Label>
              <Form.Input
                type="text"
                name="price"
                placeholder="Forneça o valor do insumo utilizado"
              />
              <Form.ErrorMessage field="price" />
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

            <Form.Field>
              <Form.Label htmlFor="realProdutivity">
                Produtividade real
              </Form.Label>
              <Form.Input
                type="text"
                name="realProdutivity"
                placeholder="Forneça o produtividade real"
              />
              <Form.ErrorMessage field="realProdutivity" />
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
              <Form.SelectOption value={props.user.id}>
                (Eu) {props.user.name}
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
          <Form.Button>Alterar atividade</Form.Button>
        </div>
      </form>
    </FormProvider>
  )
}
