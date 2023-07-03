'use client'

import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { parseCookies } from 'nookies'

interface FinishedProps {
  activityId: string
}

export function Finished(props: FinishedProps) {
  async function handleConfirmFinished() {
    const { 'plantae.token': token } = parseCookies()

    console.log(token)

    await axios.patch(
      `http://0.0.0.0/api/activities/${props.activityId}/finish`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={`flex h-16 w-full items-center justify-center gap-2 rounded bg-green text-white`}
        >
          <span className="text-base font-medium leading-none">
            Concluir atividade
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed left-0 top-0 z-10 h-full w-full bg-black-translucid" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 flex w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded bg-white p-6">
          <Dialog.Title className="text-2xl font-bold leading-normal text-brown">
            Deseja marcar essa tarefa como concluída?
          </Dialog.Title>

          <div>
            <Dialog.Close asChild>
              <button
                onClick={() => handleConfirmFinished()}
                className="flex h-16 w-full items-center justify-center rounded bg-green text-white"
              >
                Sim, marcar como concluída
              </button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button className="flex h-16 w-full items-center justify-center rounded bg-transparent text-gray-03">
                Não, cancelar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
