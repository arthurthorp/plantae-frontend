'use client'

import { formatDate } from '@/utils/formatDate'
import {
  CalendarBlank,
  Drop,
  Leaf,
  Plus,
  Scissors,
} from '@phosphor-icons/react'

interface BoardResumeProps {
  type: 'IIRIGATION' | 'AGRICULTURAL_INPUT' | 'PARING'
  title: string
  executionDate?: Date
}

export default function BoardResume(props: BoardResumeProps) {
  function getIcon() {
    switch (props.type) {
      case 'IIRIGATION':
        return <Drop weight="bold" size="1rem" className="text-brown" />
      case 'AGRICULTURAL_INPUT':
        return <Leaf weight="bold" size="1rem" className="text-brown" />
      case 'PARING':
        return <Scissors weight="bold" size="1rem" className="text-brown" />
    }
  }

  function getExecutionDate() {
    switch (props.type) {
      case 'PARING':
      case 'IIRIGATION': {
        if (!props.executionDate) return 'Ainda não foi realizada'

        return (
          <>
            Última realizada em{' '}
            <b className="font-semibold text-gray-04">
              {formatDate({ date: props.executionDate })}
            </b>
          </>
        )
      }
      case 'AGRICULTURAL_INPUT': {
        if (!props.executionDate) return 'Ainda não foi aplicado'

        return (
          <>
            Último aplicado em{' '}
            <b className="font-semibold text-gray-04">
              {formatDate({ date: props.executionDate })}
            </b>
          </>
        )
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 border-b border-gray-02 py-5">
      <div className="flex items-center gap-2">
        {getIcon()}
        <span className="flex-1 text-base font-semibold leading-none text-brown">
          {props.title}
        </span>
        <Plus weight="bold" size="1rem" className="text-gray-03" />
      </div>
      <div className="flex items-center gap-2 text-gray-03">
        <CalendarBlank weight="bold" size="1rem" />
        <span className="flex-1 text-base font-normal leading-none">
          {getExecutionDate()}
        </span>
      </div>
    </div>
  )
}
