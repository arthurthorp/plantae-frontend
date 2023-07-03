'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import {
  UpdateActivityData,
  updateActivitySchema,
} from '@/schemas/updateActivity'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface UpdateActivityFormProps {
  agriculturalInputs: any[]
  plantations: any[]
  userAuth: any
  data: UpdateActivityData
  activityId: string
}

async function getAssociates(plantationId: string) {
  const { 'plantae.token': token } = parseCookies()

  const res = await fetch(
    `http://0.0.0.0/api/plantations/${plantationId}/associates`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )

  const response = await res.json()

  if (!response.object) return

  return response.object
}

export default function UpdateActivityForm(props: UpdateActivityFormProps) {
  const [users, setUsers] = useState<any[]>([])

  const router = useRouter()

  const updateActivityForm = useForm<UpdateActivityData>({
    resolver: zodResolver(updateActivitySchema),
  })

  const { watch } = updateActivityForm

  async function handleUpdateActivity(data: UpdateActivityData) {
    const { 'plantae.token': token } = parseCookies()

    const response = await axios.post(
      `http://0.0.0.0/api/activities/${props.activityId}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    if (!response.data.object) return

    router.push('/myaccount/activities')
  }

  useEffect(() => {
    getAssociates(watch('plantationId')).then((data) => setUsers(data))
  }, [watch('plantationId')])

  useEffect(() => {
    console.log({
      type: props.data.type,
      agriculturalInputId: props.data.agriculturalInputId,
      chargeIn: props.data.chargeIn,
      description: props.data.description,
      estimateDate: props.data.estimateDate,
      estimateProdutivity: props.data.estimateProdutivity,
      plantationId: props.data.plantationId,
      status: props.data.status,
      price: props.data.price,
      quantityUsed: props.data.quantityUsed,
      realProdutivity: props.data.realProdutivity,
    })

    updateActivityForm.reset({
      type: props.data.type,
      agriculturalInputId: props.data.agriculturalInputId,
      chargeIn: props.data.chargeIn,
      description: props.data.description,
      estimateDate: props.data.estimateDate,
      estimateProdutivity: props.data.estimateProdutivity,
      plantationId: props.data.plantationId,
      status: props.data.status,
      price: props.data.price,
      quantityUsed: props.data.quantityUsed,
      realProdutivity: props.data.realProdutivity,
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
            <Form.Label htmlFor="status">Status</Form.Label>
            <Form.Select name="status">
              <Form.SelectOption
                selected={props.data.status === 'PENDING'}
                value="PENDING"
              >
                Pendente
              </Form.SelectOption>
              <Form.SelectOption
                selected={props.data.status === 'FINISHED'}
                value="FINISHED"
              >
                Concluída
              </Form.SelectOption>
              <Form.SelectOption
                selected={props.data.status === 'FORBIDDEN'}
                value="FORBIDDEN"
              >
                Impedida
              </Form.SelectOption>
            </Form.Select>
            <Form.ErrorMessage field="status" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="type">Tipo de atividade</Form.Label>
            <Form.Select name="type">
              <Form.SelectOption
                selected={props.data.type === 'AGRICULTURAL_INPUT'}
                value="AGRICULTURAL_INPUT"
              >
                Utilização de insumo
              </Form.SelectOption>
              <Form.SelectOption
                selected={props.data.type === 'HARVEST'}
                value="HARVEST"
              >
                Colheita
              </Form.SelectOption>
              <Form.SelectOption
                selected={props.data.type === 'IRRIGATION'}
                value="IRRIGATION"
              >
                Irrigação
              </Form.SelectOption>
              <Form.SelectOption
                selected={props.data.type === 'PARING'}
                value="PARING"
              >
                Poda
              </Form.SelectOption>
              <Form.SelectOption
                selected={props.data.type === 'OTHER'}
                value="OTHER"
              >
                Outro
              </Form.SelectOption>
            </Form.Select>
            <Form.ErrorMessage field="type" />
          </Form.Field>

          {watch('type') === 'AGRICULTURAL_INPUT' && (
            <>
              <Form.Field>
                <Form.Label htmlFor="agriculturalInputId">
                  Tipo de insumo
                </Form.Label>
                <Form.Select name="agriculturalInputId">
                  {props.agriculturalInputs.map((agriculturalInput: any) => (
                    <Form.SelectOption
                      key={agriculturalInput.id}
                      value={agriculturalInput.id}
                      selected={
                        props.data.agriculturalInputId === agriculturalInput.id
                      }
                    >
                      <span>{agriculturalInput.name}</span>
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
                <Form.Label htmlFor="price">
                  Valor do insumo utilizado
                </Form.Label>
                <Form.Input
                  type="text"
                  name="price"
                  placeholder="Forneça o valor do insumo utilizado"
                />
                <Form.ErrorMessage field="price" />
              </Form.Field>
            </>
          )}

          {watch('type') === 'HARVEST' && (
            <>
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
            </>
          )}

          <Form.Field>
            <Form.Label htmlFor="plantationId">Plantação</Form.Label>
            <Form.Select name="plantationId">
              {props.plantations.map((plantation) => (
                <Form.SelectOption
                  key={plantation.id}
                  selected={props.data.plantationId === plantation.id}
                  value={plantation.id}
                >
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
              <Form.SelectOption
                selected={props.data.chargeIn === props.userAuth.id}
                value={props.userAuth.id}
              >
                (Eu) {props.userAuth.name}
              </Form.SelectOption>
              {users.map((user) => (
                <Form.SelectOption
                  key={user.id}
                  selected={props.data.chargeIn === user.id}
                  value={user.id}
                >
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
