'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import { CreateHistoryData, createHistorySchema } from '@/schemas/createHistory'
import { parseCookies } from 'nookies'

interface NewHistoryFormProps {
  activityId: string
  isImpediment?: boolean
  close: () => void
}

export default function NewHistoryForm(props: NewHistoryFormProps) {
  const createHistoryForm = useForm<CreateHistoryData>({
    resolver: zodResolver(createHistorySchema),
  })

  async function handleCreateHistory(data: CreateHistoryData) {
    const { 'plantae.token': token } = parseCookies()

    let newData: any = { ...data }

    if (props.isImpediment) {
      newData = { ...newData, isImpediment: 1 }
    }

    console.log(token, newData)

    const response = await axios.post(
      `http://0.0.0.0/api/activities/${props.activityId}/histories`,
      newData,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    console.log(response)

    props.close()
  }

  return (
    <FormProvider {...createHistoryForm}>
      <form
        className="flex w-full flex-col gap-8"
        onSubmit={createHistoryForm.handleSubmit(handleCreateHistory)}
      >
        <div className="flex w-full flex-col gap-4">
          <Form.Field>
            <Form.Label htmlFor="description">
              Descrição {props.isImpediment ? 'do impedimento' : 'da execução'}
            </Form.Label>
            <Form.Input
              type="text"
              name="description"
              placeholder={`Forneça uma descrição ${
                props.isImpediment ? 'do impedimento' : 'da execução'
              }`}
            />
            <Form.ErrorMessage field="description" />
          </Form.Field>
        </div>

        <div className="flex w-full flex-col">
          <Form.Button color={props.isImpediment ? 'bg-red' : 'bg-blue'}>
            Adicionar {props.isImpediment ? 'impedimento' : 'execução'}
          </Form.Button>
        </div>
      </form>
    </FormProvider>
  )
}
