'use client'

import { Lock, Plus } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import NewHistoryForm from '../Form/NewHistory'

interface HistoryProps {
  isImpediment?: boolean
  activityId: string
}

export function History(props: HistoryProps) {
  const [open, setOpen] = useState<boolean>(false)

  function handleSubmit() {
    setOpen(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={`flex ${
            props.isImpediment ? 'w-16 min-w-[4rem]' : 'w-full'
          } h-16 items-center justify-center gap-2 rounded ${
            props.isImpediment ? 'bg-red' : 'bg-blue-translucid'
          } ${props.isImpediment ? 'text-white' : 'text-blue'}`}
        >
          {props.isImpediment ? (
            <Lock weight="bold" size="1.25rem" />
          ) : (
            <>
              <Plus weight="bold" size="1rem" />
              <span className="text-base font-medium leading-none">
                Adicionar execução
              </span>
            </>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed left-0 top-0 z-10 h-full w-full bg-black-translucid" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 flex w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 rounded bg-white p-6">
          <Dialog.Title className="text-2xl font-bold leading-normal text-brown">
            {props.isImpediment ? (
              <>Adicionar um impedimento na atividade</>
            ) : (
              <>Adicionar uma execução na atividade</>
            )}
          </Dialog.Title>

          <NewHistoryForm
            activityId={props.activityId}
            close={handleSubmit}
            isImpediment={props.isImpediment}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
