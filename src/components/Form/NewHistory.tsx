'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { Form } from '@/components/Form/parts'

import { Activity } from '@/model/Activity'

import { History } from '@/model/History'
import { CreateHistoryData, createHistorySchema } from '@/schemas/createHistory'
import { ActivityService } from '@/service/activity/ActivityClientService'

interface NewHistoryFormProps {
  activity: Activity
  isImpediment?: boolean
  close: () => void
}

export default function NewHistoryForm(props: NewHistoryFormProps) {
  const createHistoryForm = useForm<CreateHistoryData>({
    resolver: zodResolver(createHistorySchema),
  })

  async function handleCreateHistory(data: CreateHistoryData) {
    if (!props.activity.id) return

    console.log(data)

    const body = new History({
      description: data.description,
      image: data.image[0],
      isImpediment: props.isImpediment ?? false,
    })

    const activityService = new ActivityService()
    const success = activityService.createHistory(props.activity.id, body)

    if (!success) return

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
            <Form.Label htmlFor="image">
              Foto {props.isImpediment ? 'do impedimento' : 'da execução'}
            </Form.Label>
            <Form.InputFile name="image" placeholder="Adicione uma foto" />
            <Form.ErrorMessage field="image" />
          </Form.Field>

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
