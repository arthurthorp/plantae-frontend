'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import {
  CreateActivityData,
  createActivitySchema,
} from '@/schemas/createActivity'
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
    const { 'plantae.token': token } = parseCookies()

    const newDate = {
      ...data,
      status: 'PENDING',
    }

    const response = await axios.post(
      'http://0.0.0.0/api/activities',
      newDate,
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

  return (
    <FormProvider {...createActivityForm}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={createActivityForm.handleSubmit(handleCreateActivity)}
      >
        <div className="flex w-full flex-col gap-4">
          <Form.Field>
            <Form.Label htmlFor="type">Tipo de atividade</Form.Label>
            <Form.Select name="type">
              <Form.SelectOption selected value="AGRICULTURA_INPUT">
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

          {watch('type') === 'AGRICULTURA_INPUT' && (
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
          )}

          {watch('type') === 'HARVEST' && (
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
          )}

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
              <Form.SelectOption selected value={props.userAuth.id}>
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
