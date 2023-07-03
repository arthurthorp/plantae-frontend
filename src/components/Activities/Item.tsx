'use client'

import { CalendarBlank, Plant, User } from '@phosphor-icons/react'
import moment from 'moment'
import Link from 'next/link'

interface ActivityItemProps {
  id: number
  status: string
  type: string
  description: string
  user: string
  date: Date
}

function formatActivityType(type: string): string {
  switch (type) {
    case 'AGRICULTURAL_INPUT':
      return 'Aplicação de insumo'
    case 'IRRIGATION':
      return 'Irrigação'
    case 'PARING':
      return 'Poda'
    case 'HARVEST':
      return 'Colheita'
    case 'OTHER':
      return 'Outros'
  }

  return ''
}

function formatActivityStatus(type: string): string {
  switch (type) {
    case 'PENDING':
      return 'Pendente'
    case 'FORBIDDEN':
      return 'Impedida'
    case 'FINISHED':
      return 'Concluída'
  }

  return ''
}

export default function ActivityItem(props: ActivityItemProps) {
  return (
    <Link
      href={`/myaccount/activities/${props.id}`}
      className="flex flex-col gap-4 border-b border-gray-02 py-4"
    >
      <div className="flex w-full items-center justify-start gap-2 text-orange">
        <Plant weight="bold" size="1rem" />
        <span className="flex-1 text-base font-semibold capitalize leading-none">
          {formatActivityType(props.type)}
        </span>
      </div>

      <div className="flex flex-col items-start justify-start gap-1">
        <div className="flex gap-2">
          <span
            className={`rounded ${
              props.status === 'PENDING' && 'bg-blue-translucid'
            } ${props.status === 'FORBIDDEN' && 'bg-red-translucid'} ${
              props.status === 'FINISHED' && 'bg-green-translucid'
            } px-2 py-1 text-xs font-medium leading-none ${
              props.status === 'PENDING' && 'text-blue'
            } ${props.status === 'FORBIDDEN' && 'text-red'} ${
              props.status === 'FINISHED' && 'text-green'
            }`}
          >
            {formatActivityStatus(props.status)}
          </span>
        </div>

        <p className="text-base font-normal leading-normal text-gray-05">
          {props.description}
        </p>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between gap-2 text-gray-03">
          <User weight="bold" size="1rem" />
          <span className="text-base font-normal leading-none">
            {props.user}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-gray-03">
          <CalendarBlank weight="bold" size="1rem" />
          <span className="text-base font-normal leading-none">
            {moment(props.date).format('DD MMM YYYY')}
          </span>
        </div>
      </div>
    </Link>
  )
}