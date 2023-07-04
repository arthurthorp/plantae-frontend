'use client'

import { Lock, Plus } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'

import NewHistoryForm from '../Form/NewHistory'

import { Activity } from '@/model/Activity'

interface HistoryProps {
  isImpediment?: boolean
  activity: Activity
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
          data-isImpediment={props.isImpediment}
          className="flex h-16 w-full items-center justify-center gap-2 rounded bg-blue-translucid text-blue data-[isImpediment=true]:w-16 data-[isImpediment=true]:min-w-[4rem] data-[isImpediment=true]:bg-red data-[isImpediment=true]:text-white"
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
            activity={props.activity}
            close={handleSubmit}
            isImpediment={props.isImpediment}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
